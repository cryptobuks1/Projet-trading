<?php

namespace App\Controller\API;

use App\Classes\Mail;
use App\Entity\ResetPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\VarDumper\Cloner\Data;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class PasswordResetController extends AbstractController
{

    private $Response;
    private $Em;

    public function __construct(EntityManagerInterface $Em)
    {
        $this->Em = $Em;
        $this->Response = new Response();

        $this->Response->headers->set('Content-Type', 'application/json');
    }

    /**
     * @Route("/password-reset/{username}", name="password_reset")
     */
    public function SendResetPasswordToken($username, MailerInterface $Mailer): Response //Est appelé quand l'user met son username pour changer de mot de passe..
    {
        //On vérifie si l'user existe, si c'est le cas on appelle la SendToken...
        $RepUser = $this->Em->getRepository(User::class);

        $User = $RepUser->findOneBy(['username' => $username] );

        if($User && !empty($username))
        {
            $RouteUpdatePassword = "http://cryptomatch.surge.sh/nouveau-mot-de-passe/"; //Par exemple.. le front devra la créer..

            //On génère un Token et on l'insert dans la table ResetPassword..
            $Token = uniqid();
            $ResetPassword = new ResetPassword();
            $ResetPassword->setUserId($User->getId() );
            $ResetPassword->setToken($Token );
            $ResetPassword->setCreatedAt(new \DateTime());


            $RouteUpdatePassword = $RouteUpdatePassword.$Token;
            //On crée le message et on envoie le mail..
            $Content = "Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :<br/><br/>";
            $UrlResetPassword = "<a href=$RouteUpdatePassword >Cliquez ici pour réinitialiser votre mot de passe</a>";


            $Mail = new Mail($User->getEmail(), $Content.$UrlResetPassword, $Mailer);
            $Mail->sendMail();

            $this->Em->persist($ResetPassword);
            $this->Em->flush();

            $this->Response->setStatusCode(200);
            $this->Response->setContent(json_encode(array('message' => 'Vous allez recevor un e-mail contenant un lien afin de redéfinir votre mot de passe'), JSON_UNESCAPED_SLASHES));
        }
       else
       {
           $this->Response->setStatusCode(404);
           $this->Response->setContent(json_encode(array('message' => "Désolé, aucun utilisateur avec ce nom n'a été trouvé.") ));
       }


       return $this->Response;
    }


    /**
     * @Route("/reset-password/{token}", name="UpdatePassword")
     */
    public function UpdatePassword(Request $Request, $token, UserPasswordEncoderInterface $Encoder): Response //Est appelé quand l'user change son mot de passe
    {
            //On vérifie let token et si les deux mots de passes sont identiques et on l'insert dans la bdd..
            $RepResetPass = $this->Em->getRepository(ResetPassword::class);
            $ResetPass = $RepResetPass->findOneBy(['Token' => $token]);

            if($ResetPass)
            {
                $RepUser = $this->Em->getRepository(User::class);
                $User = $RepUser->find($ResetPass->getUserId() );

                //On vérife les deux mots de passes..
                $Data =  (array) json_decode($Request->getContent());

                //On vérifie si il y a bien tous les champs attendus..
                if(array_key_exists('password_first', $Data) && array_key_exists('password_second', $Data) )
                {
                    if($Data['password_first'] === $Data['password_second'] )
                    {
                        //On insert le nouveau password et on supprimé le Token de la table resetpassword..
                        $User->setPassword($Encoder->encodePassword($User, $Data['password_first']));
                        $this->Em->remove($ResetPass);
                        $this->Em->flush();

                        $this->Response->setStatusCode(201);
                        $this->Response->setContent(json_encode(array("message" => 'Votre mot de passe a bien été modifié.') ));
                    }
                    else
                    {
                        $this->Response->setStatusCode(500);
                        $this->Response->setContent(json_encode(array("message" => 'Les mots de passe ne sont pas identiques')) );
                    }
                }
                else
                {
                    $this->Response->setStatusCode(400);
                    $this->Response->setContent(json_encode(array("message" => "La requête n'est pas valide.") ));
                }
            }
            else
            {
                $this->Response->setStatusCode(400);
                $this->Response->setContent(json_encode(array("message" => "Désolé, le lien n'est pas valide.")) );
            }


        return $this->Response;
    }

}
