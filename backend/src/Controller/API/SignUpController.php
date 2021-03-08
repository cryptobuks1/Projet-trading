<?php

namespace App\Controller\API;

use DateTime;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints as Assert;


class SignUpController extends AbstractController
{
    /**
     * @Route("/signup", name="apiSignUp")
     */
    public function signup(Request $Request, UserPasswordEncoderInterface $Encoder, ValidatorInterface $Validator): Response
    {
        $Response = new Response();

        if($Request->getContent() != null)
        {
            //Get request data and convert in array
            $Data = (array) json_decode($Request->getContent());
        
            if(isset($Data['email']) && (($Data['email']) != '') && isset($Data['password']) && isset($Data['username']) )
            {
                $Date = new DateTime();
                $User = new User();

                //Verification valid email
                $EmailConstraint = new Assert\Email();
                $EmailConstraint->message = 'Adresse e-mail invalide.';
                $Errors = $Validator->validate($Data['email'], $EmailConstraint);

                if(count($Errors) == 0)
                {
                    //Setter user...
                    $User->setEmail($Data['email']);

                    //Verify if username exists
                    $Em = $this->getDoctrine()->getManager();
                    $RepUser = $Em->getRepository(User::class);
                    $UserExist = $RepUser->findOneBy(['username' => $Data['username'] ] );

                    if(!$UserExist) {
                    
                        $User->setUsername($Data['username']);
                        $Pass = $Encoder->encodePassword($User, $Data['password']);
                        $User->setPassword($Pass);
                        $User->setCreatedAt($Date);
                        $User->setUSDAmount(10000);
                        $User->setRankValorisationAmount(0);

                        $Em->persist($User);
                        $Em->flush();

                        $Response->setStatusCode("201");
                        $Response->setContent(json_encode(array(
                            'Message' => 'Inscription réussie'
                        )));
                    }
                    else
                    {
                        $Response->setStatusCode("403");
                        $Response->setContent(json_encode(array(
                            'Message' => 'Ce nom d\'utilisateur existe déjà.'
                        )));
                    }
                }
                else
                {
                    $Response->setStatusCode("400");
                    $Response->setContent(json_encode(array(
                        'Message' => $Errors[0]->getMessage()
                    )));
                }
            }
            else
            {
                $Response->setStatusCode("500");
                $Response->setContent(json_encode(array(
                    'Message' => 'Requête invalide'
                )));
            }
        }
        else
        {
            $Response->setStatusCode("500");
            $Response->setContent(json_encode(array(
                'Message' => 'Requête nulle'
            )));
        }
        
        return $Response;
    }
}
