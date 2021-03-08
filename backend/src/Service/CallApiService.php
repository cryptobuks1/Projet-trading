<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


class CallApiService
{
    private $client;
    
    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function getBinance24hData($pairs): array
    {
        foreach ($pairs as $currentPair) {
                        
            $response = $this->client->request(
                'GET',
                'https://api.binance.com/api/v3/ticker/24hr?symbol='. $currentPair
            );
            
            $data = $response->toArray();
            
            $data_light[] = [
                $data['symbol'],
                $data['lastPrice'],
                $data['priceChangePercent']            
            ];
        }

        return $data_light;
    }


    public function getBinanceQuotation($pair)
    {
        $response = $this->client->request(
            'GET',
            'https://api.binance.com/api/v3/ticker/24hr?symbol='. $pair
        );
        
        $data = $response->toArray();
        
        return $data['lastPrice'];
    }
    
}