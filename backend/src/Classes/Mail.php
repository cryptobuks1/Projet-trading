<?php


namespace App\Classes;


use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class Mail
{
    private $From = "contact.cryptomatch@gmail.com";
    private $To = null;
    private $Message = null;
    private $Subject = "Redéfinition de votre mot de passe";
    private $Mailer = null;

    public function __construct($To, $Message, $Mailer)
    {
        $this->To = $To;
        $this->Message = $Message;
        $this->Mailer = $Mailer;
    }

    public function SendMail()
    {
        $Mail = (new Email())
            ->from($this->From)
            ->to($this->To)
            ->subject($this->Subject)
            ->html($this->Message)
            ;

        $this->Mailer->send($Mail);
    }


}