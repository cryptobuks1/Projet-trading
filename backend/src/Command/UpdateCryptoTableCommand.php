<?php

namespace App\Command;

use App\Service\CallApiService;
use App\Repository\CryptoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Serializer\SerializerInterface;


// to execute command : bin/console update-crypto-table


class UpdateCryptoTableCommand extends Command
{
    protected static $defaultName = 'update-crypto-table';
    protected static $defaultDescription = 'update prices and 24h variations in crypto table';

    private $em;

    public function __construct(EntityManagerInterface $em, CallApiService $callApiService, CryptoRepository $cryptoRepository, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->callApiService = $callApiService;
        $this->cryptoRepository = $cryptoRepository;
        $this->serializer = $serializer;
        
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $cryptos = $this->cryptoRepository->findAll();

        foreach ($cryptos as $currentCrypto) {

            $cryptoEntityAsArray = $this->serializer->normalize($currentCrypto, null, ['groups' => 'normal']);
            $pairs[] = $cryptoEntityAsArray['pairName'];
        }

        $datas = $this->callApiService->getBinance24hData($pairs);

        foreach ($datas as $data) {

            $thisCrypto = $this->cryptoRepository->findOneBy(['pairName' => $data[0]]);

            $thisCrypto->setPrice($data[1]);
            $thisCrypto->setPriceChangePercent24h($data[2]);

            $this->em->flush();
        }

        $io->success('Mise à jour des prix et variation 24h terminée');

        return Command::SUCCESS;
    }
}
