<?php

namespace App\Entity;

use App\Repository\PortfolioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=PortfolioRepository::class)
 */
class Portfolio
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"normal"})
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=Crypto::class, inversedBy="portfolios")
     * @Groups({"normal"})
     */
    private $pairName;

    /**
     * @ORM\Column(type="float")
     * @Groups({"normal"})
     */
    private $actualQuantity;

    /**
     * @ORM\Column(type="float")
     * @Groups({"normal"})
     */
    private $averagePrice;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="portfolios")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"normal"})
     */
    private $cryptoname;

    public function __construct()
    {
        $this->pairName = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Crypto[]
     */
    public function getPairName(): Collection
    {
        return $this->pairName;
    }

    public function addPairName(Crypto $pairName): self
    {
        if (!$this->pairName->contains($pairName)) {
            $this->pairName[] = $pairName;
        }

        return $this;
    }

    public function removePairName(Crypto $pairName): self
    {
        $this->pairName->removeElement($pairName);

        return $this;
    }

    public function getActualQuantity(): ?float
    {
        return $this->actualQuantity;
    }

    public function setActualQuantity(float $actualQuantity): self
    {
        $this->actualQuantity = $actualQuantity;

        return $this;
    }

    public function getAveragePrice(): ?float
    {
        return $this->averagePrice;
    }

    public function setAveragePrice(float $averagePrice): self
    {
        $this->averagePrice = $averagePrice;

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

    public function setPairname(string $pairname): self
    {
        $this->pairname = $pairname;

        return $this;
    }

    public function getCryptoName()
    {
        return $this->cryptoname;
    }
    public function setCryptoName(string $cryptoname) : self
    {
        $this->cryptoname = $cryptoname;
        return  $this;
    }
}
