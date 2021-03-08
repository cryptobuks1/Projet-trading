<?php


namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationFailureListener
{
    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $Response = new Response();
        $Response->headers->set('Content-Type', 'application/json');

        $Response->setStatusCode(401);
        $Response->setContent(json_encode(array("message" => "Utilisateur et/ou mot de passe incorrect"), JSON_UNESCAPED_SLASHES) );

        $event->setResponse($Response);
    }
}