<?php

namespace App\Command;

use App\Repository\UserRepository;
use App\Repository\OrderRepository;
use App\Repository\CryptoRepository;
use App\Repository\PortfolioRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\HistoricalValorisationAccount;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Serializer\SerializerInterface;

// to execute command : bin/console update-rank


class UpdateRankCommand extends Command
{
    protected static $defaultName = 'update-rank';
    protected static $defaultDescription = 'update rank';

    private $em;
    private $repoCrypto;
    private $repoUser;
    private $repOrder;
    private $repPortfolio;

    public function __construct(EntityManagerInterface $em, CryptoRepository $repoCrypto, OrderRepository $repOrder, PortfolioRepository $repPortfolio, UserRepository $repoUser, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->repoCrypto = $repoCrypto;
        $this->repOrder = $repOrder;
        $this->repPortfolio = $repPortfolio;
        $this->repoUser = $repoUser;
        $this->serializer = $serializer;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);


        // calculate array of users who have placed at least 1 order

        $allUsers = $this->repoUser->findAll();

        foreach ($allUsers as $currentUser) {

            $Orders = $this->repOrder->findBy(['user' => $currentUser]);

            if ($Orders) {
                $usersId[] = $currentUser->getId();
            }
        }


        foreach ($usersId as $userId) {

            $portfolio = $this->repPortfolio->findBy(['user' => $userId]);

            $cryptoslist = [];

            foreach ($portfolio as $currentPortfolio) {
                $Crypto = $this->serializer->normalize($currentPortfolio, null, ['groups' => 'normal']); // To avoid circular reference
                $cryptoslist[] = [
                    "cryptoName" => $Crypto['cryptoname'],
                    "actualQuantity" => $Crypto['actualQuantity'],
                    "averagePrice" => $Crypto['averagePrice']
                ];
            }

            $amountPortfolio = 0;

            foreach ($cryptoslist as $currentCrypto) {

                $cryptoRepo = $this->repoCrypto->findOneBy(['pairName' => $currentCrypto['cryptoName']]);

                $amountPortfolio += $currentCrypto['actualQuantity'] * $cryptoRepo->getPrice();
            }

            $currentUser = $this->repoUser->findOneBy(['id' => $userId]);;
            $newRankAmount = $currentUser->getUSDAmount() + $amountPortfolio;
            $currentUser->setRankValorisationAmount($newRankAmount);


            // update historical valorization account
            $histoValAccount = new HistoricalValorisationAccount;

            $datetime = new \DateTime();
            $timezone = new \DateTimeZone('Europe/Paris');
            $datetime->setTimezone($timezone);
            $histoValAccount->setDate($datetime);
            $histoValAccount->setUser($currentUser);
            $histoValAccount->setUSDAmount($newRankAmount);

            $this->em->persist($histoValAccount);
            $this->em->flush();
        }

        $io->success('Le classement a été mise à jour.');
        return Command::SUCCESS;
    }
}
