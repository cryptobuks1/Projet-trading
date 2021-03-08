<?php
namespace App\EventListener;

use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();
        if (!$user instanceof UserInterface) {
            return;
        }
        $data['data'] = array(
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'USDAmount' => $user->getUSDAmount(),
            'rankValorisationAmount' => $user->getrankValorisationAmount()
        );
        $event->setData($data);
    }

}