<?php

namespace App\Controller\API;

use App\Entity\Portfolio;
use App\Entity\User;
use App\Service\CallApiService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PortfolioController extends AbstractController
{
    private $Em;
    private $Security;
    private $Response;
    private $Serializer;
    private $RepPortfolio;

    public function __construct(EntityManagerInterface $Em, Security $Security, SerializerInterface $Serializer)
    {
        $this->Em = $Em;
        $this->Security = $Security;
        $this->Serializer = $Serializer;
        $this->Response = new Response();
        $this->Response->headers->set('Content-Type', 'application/json');
        $this->RepPortfolio = $this->Em->getRepository(Portfolio::class);
    }

    /**
     * @Route("/portfolio/{username}", name="apiPortfolio")
     */
    public function getPortfolio($username, CallApiService $callApi): Response
    {
        $RepUser = $this->Em->getRepository(User::class);
        $User = $RepUser->findOneBy(['username' => $username]);

        if($User)
        {
            $Portfolio = $this->RepPortfolio->findBy(['user' => $User]);
            $cryptoslist = null;

            foreach ($Portfolio as $currentPortfolio)
            {
                $Crypto = $this->Serializer->normalize($currentPortfolio, null, ['groups' => 'normal']); //For circular reference..

                $realTimePrice = floatval($callApi->getBinanceQuotation($Crypto['cryptoname']));
                $realTimeUSDTAmount = round(($Crypto['actualQuantity'] * $realTimePrice), 2);

                $cryptoslist[] = [
                    "symbol" => $Crypto['pairName'][0]['symbol'],
                    "name" => $Crypto['pairName'][0]['name'],
                    "pairName" => $Crypto['cryptoname'],
                    "logoUrl" => $Crypto['pairName'][0]['imageUrl'],
                    "actualQuantity" => $Crypto['actualQuantity'],
                    "buyingPrice" => $Crypto['averagePrice'],
                    "realTimePrice" => $realTimePrice,
                    "realTimeUSDTAmount" => $realTimeUSDTAmount
                ];
            }

            $jsonCryptolist = json_encode($cryptoslist, JSON_UNESCAPED_SLASHES);
            $this->Response->setContent($jsonCryptolist);
        }
        else
        {
            $this->Response->setStatusCode(404);
            $this->Response->setContent(json_encode(array(
                "Message" => "Désolé, aucun compte avec ce nom d'utilisateur n'a été trouvé"
            )));
        }

        return $this->Response;
    }


    /**
     * @Route("/api/v1/portfolio/quantity_crypto/{crypto}", name="apiPortfolio_By_PairName")
     */
    public function getQuantityCrypto($crypto): Response
    {
        $currentCrypto = $this->RepPortfolio->findOneBy(['cryptoname' => $crypto, 'user' => $this->Security->getUser()]);

        if($currentCrypto)
        {
            $this->Response->setStatusCode(200);
            $this->Response->setContent(json_encode(array(
                'actualQuantity' => $currentCrypto->getActualQuantity()
            )));
        }
        else
        {
            $this->Response->setStatusCode(200);
            $this->Response->setContent(json_encode(array(
                'actualQuantity' => 0
            )));
        }

        return $this->Response;
    }
}
