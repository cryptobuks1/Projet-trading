<?php

namespace App\Entity;

use App\Repository\CryptoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

  
/**
 * @ORM\Entity(repositoryClass=CryptoRepository::class)
 */
class Crypto
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"normal"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=300)
     * @Groups({"normal"})
     */
    private $pairName;

    /**
     * @ORM\Column(type="string", length=300, nullable=true)
     * @Groups({"normal"})
     */
    private $imageUrl;

    /**
     * @ORM\ManyToMany(targetEntity=Portfolio::class, mappedBy="pairName")
     */
    private $portfolios;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="crypto")
     * @Groups({"normal"})
     */
    private $orders;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"normal"})
     */
    private $symbol;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"normal"})
     */
    private $name;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"normal"})
     */
    private $price;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"normal"})
     */
    private $priceChangePercent24h;

    public function __construct()
    {
        $this->portfolios = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPairName(): ?string
    {
        return $this->pairName;
    }

    public function setPairName(string $pairName): self
    {
        $this->pairName = $pairName;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    /**
     * @return Collection|Portfolio[]
     */
    public function getPortfolios(): Collection
    {
        return $this->portfolios;
    }

    public function addPortfolio(Portfolio $portfolio): self
    {
        if (!$this->portfolios->contains($portfolio)) {
            $this->portfolios[] = $portfolio;
            $portfolio->addPairName($this);
        }

        return $this;
    }

    public function removePortfolio(Portfolio $portfolio): self
    {
        if ($this->portfolios->removeElement($portfolio)) {
            $portfolio->removePairName($this);
        }

        return $this;
    }

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setCrypto($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getCrypto() === $this) {
                $order->setCrypto(null);
            }
        }

        return $this;
    }

    public function getSymbol(): ?string
    {
        return $this->symbol;
    }

    public function setSymbol(string $symbol): self
    {
        $this->symbol = $symbol;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceChangePercent24h(): ?float
    {
        return $this->priceChangePercent24h;
    }

    public function setPriceChangePercent24h(?float $priceChangePercent24h): self
    {
        $this->priceChangePercent24h = $priceChangePercent24h;

        return $this;
    }
}
