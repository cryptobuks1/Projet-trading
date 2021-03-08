<?php

namespace App\Controller\API;

use App\Repository\CryptoRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CryptoController extends AbstractController
{
    /**
     * @Route("/cryptos", name="apiCryptos")
     */
    public function list(CryptoRepository $cryptoRepository, SerializerInterface $serializer): Response
    {
        $response = new Response();
        $cryptos = $cryptoRepository->findAll();

        foreach($cryptos as $currentCrypto)
        {
            $cryptoEntityAsArray = $serializer->normalize($currentCrypto, null, ['groups' => 'normal']);
            $cryptoslist[] = [
                "symbol" => $cryptoEntityAsArray['symbol'],
                "name" => $cryptoEntityAsArray['name'],
                "logo" => $cryptoEntityAsArray['imageUrl'],
                "pairName" => $cryptoEntityAsArray['pairName'],
                "lastPrice" => $cryptoEntityAsArray['price'],
                "priceChangePercent24h" => $cryptoEntityAsArray['priceChangePercent24h']
            ];
        }

        $jsonCryptoslist = json_encode($cryptoslist, JSON_UNESCAPED_SLASHES);

        $response->setStatusCode(Response::HTTP_OK);
        $response->setContent($jsonCryptoslist);

        return $response;
    }
}
