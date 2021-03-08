<?php

namespace App\Controller\API;

use App\Classes\CheckOrder;
use App\Entity\Crypto;
use App\Entity\Order;
use App\Entity\Portfolio;
use App\Entity\User;
use App\Service\CallApiService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

class OrderController extends AbstractController
{
    private $Em;
    private $Response;
    private $Security;
    private $Serializer;

    public function __construct(EntityManagerInterface $Em, Security $Security,
                                SerializerInterface $Serializer)
    {
        $this->Em = $Em;
        $this->Serializer = $Serializer;
        $this->Security = $Security; //for getUser()..
        $this->Response = new Response();

        $this->Response->headers->set('Content-Type', 'application/json');
    }

    /**
     * @Route("/api/v1/order", name="apiOrder")
     */
    public function postOrder(Request $Request,CallApiService $callApiService): Response
    {

       //check the conformity of the request sent by the Front
        $RepCrypto = $this->Em->getRepository(Crypto::class);
        $Data = $Request->toArray();

        if(empty($Data['pair_name']) || empty($Data['quantity']) || empty($Data['quotation']) ||
            empty($Data['ordertype']) )
        {
            $this->ResponseFormate("Désolé l'ordre n'est pas valide..", '400');
            return $this->Response;
            exit;
        }


        //We check if the crypto exists
        $CryptoByPairName = $RepCrypto->findOneBy(['pairName' => $Data['pair_name']]);

        if(!$CryptoByPairName)
            $this->ResponseFormate("Cette Cryptomonnaie n'existe pas", '404');
        else
        {
            //Vérifie si l'ordre est conforme.. avec OrderIsValid()..
            $OrderCheck = new CheckOrder($this->Em, $Data['quantity'], $Data['ordertype'],
                $Data['quotation'], $this->Security->getUser(), $Data['pair_name']);

            $TotalPrice = $Data['quantity'] * $Data['quotation'];

            $MessageOrderCheck = $OrderCheck->OrderIsValid($callApiService);
            if($MessageOrderCheck['value'])
            {
                $NewUSDAmount = 0;
                $NewQuantity = 0;

                //Insert Order...
                $Order = new Order();

                $Order->setCreatedAt(new \DateTime());
                $Order->setUser($this->Security->getUser() );
                $Order->setCrypto($CryptoByPairName);
                $Order->setOrderType($Data['ordertype'] );
                $Order->setQuantity($Data['quantity'] );
                $Order->setQuotation($Data['quotation'] );
                $Order->setAmount($TotalPrice);
                $this->Em->persist($Order);

                //Insert Portfolio....
                $Portfolio = new Portfolio();

                $RepPortfolio = $this->Em->getRepository(Portfolio::class);
                $CheckPortfolio = $RepPortfolio->findOneBy([
                    'user' => $this->Security->getUser(),
                    'cryptoname' => $Data['pair_name']
                ]);

                //Si le portfolio avec cette crypto et cet user n'existe pas alors on l'ajoute
                $NewQuantity = 0;
                if(!$CheckPortfolio)
                {
                    $NewQuantity = $Data['quantity'];

                    $Portfolio->setUser($this->Security->getUser() );
                    $Portfolio->setActualQuantity($NewQuantity);
                    $Portfolio->setCryptoName($Data['pair_name'] );
                    $Portfolio->addPairName($CryptoByPairName);
                    $Portfolio->setAveragePrice($Data['quotation']);

                    $this->Em->persist($Portfolio);
                }
                //Sinon, on le modifie..uniquement la quantity et le averageprice..
                else if($CheckPortfolio->getActualQuantity() > 0)
                {
                    if($Data['ordertype'] == 'Buy' )
                        $NewQuantity = $Data['quantity'] + $CheckPortfolio->getActualQuantity();
                    if($Data['ordertype'] == 'Sell')
                        $NewQuantity = $CheckPortfolio->getActualQuantity() - $Data['quantity'];


                    if($NewQuantity > 0) {
                        $CheckPortfolio->setActualQuantity($NewQuantity);

                    }
                    else
                        $this->Em->remove($CheckPortfolio);
                }

                //Update Amount User...
                $User = $this->Em->getRepository(User::class)->find($this->Security->getUser());
                $USDAmount = $User->getUSDAmount();

                if($Data['ordertype'] == 'Buy' )
                    $NewUSDAmount = ($USDAmount - $TotalPrice);
                if($Data['ordertype'] == 'Sell' )
                    $NewUSDAmount = ($USDAmount + $TotalPrice);

                $User->setUSDAmount($NewUSDAmount);
                $this->Em->flush();


                $this->ResponseFormateOrderSuccess($MessageOrderCheck['message'], $NewUSDAmount, $NewQuantity, '200');
            }
            else
            {
                //Order is not valid, message possible : "Quantity insuffisantes", "Fonds insuffisants",
                //ou "invalid order"..
                $this->ResponseFormate($MessageOrderCheck['message'], 403);
            }
        }


        return $this->Response;
    }

    /**
     * @Route("/orders/{username}", name="apiOrdersByUsername")
     */
    public function listOrders($username)
    {
        $RepUser = $this->Em->getRepository(User::class);
        $currentUser = $RepUser->findOneBy(['username' => $username]);

        if($currentUser)
        {
            $RepOrder = $this->Em->getRepository(Order::class);
            $Orders = $RepOrder->findBy(['user' => $currentUser], ['id' => 'DESC'] );

            $OrderList = array();
            foreach ($Orders as $currentOrder)
            {
                $Order = $this->Serializer->normalize($currentOrder, 'json', ['groups' => 'normalitem']);

                $OrderList [] =
                    [
                        "pairname" => $currentOrder->getCrypto()->getPairName(),
                        "quantity" => $Order['quantity'],
                        "quotation" => $Order['quotation'],
                        "orderType" => $Order['orderType'],
                        "amount" => $Order["amount"],
                        "createdAt" => $Order["createdAt"]
                    ];
            }

            $this->Response->setContent(json_encode($OrderList));
        }
        else
            $this->ResponseFormate("Désolé, aucun compte avec ce nom d'utilisateur n'a été trouvé", 401);


        return $this->Response;
    }

    public function ResponseFormate($Message,  $Code)
    {
        $this->Response->setStatusCode($Code);
        $this->Response->setContent(json_encode(array(
            'message' => $Message
        )));
    }

    public function ResponseFormateOrderSuccess($Message, $NewAmount, $NewQuantity,  $Code)
    {
        $this->Response->setStatusCode($Code);
        $this->Response->setContent(json_encode(array(
            'message' => $Message,
            'new_amount' => $NewAmount,
            'new_quantity' => $NewQuantity
        )));
    }
}
