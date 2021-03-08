<?php

namespace App\Entity;

use App\Repository\HistoricalValorisationAccountRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=HistoricalValorisationAccountRepository::class)
 */
class HistoricalValorisationAccount
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="float")
     */
    private $USDAmount;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="historicalValorisationAccounts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getUSDAmount(): ?float
    {
        return $this->USDAmount;
    }

    public function setUSDAmount(float $USDAmount): self
    {
        $this->USDAmount = $USDAmount;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
