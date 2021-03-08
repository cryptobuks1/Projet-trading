<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 */
class Order
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"normalitem"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"normalitem"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="float")
     * @Groups({"normalitem"})
     */
    private $quantity;

    /**
     * @ORM\Column(type="float")
     * @Groups({"normalitem"})
     */
    private $quotation;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"normalitem"})
     */
    private $orderType;

    /**
     * @ORM\Column(type="float")
     * @Groups({"normalitem"})
     */
    private $amount;

    /**
     * @ORM\ManyToOne(targetEntity=Crypto::class, inversedBy="orders")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"normalitem"})
     */
    private $crypto;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="orders")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"normalitem"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getQuotation(): ?float
    {
        return $this->quotation;
    }

    public function setQuotation(float $quotation): self
    {
        $this->quotation = $quotation;

        return $this;
    }

    public function getOrderType(): ?string
    {
        return $this->orderType;
    }

    public function setOrderType(string $orderType): self
    {
        $this->orderType = $orderType;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getCrypto(): ?Crypto
    {
        return $this->crypto;
    }

    public function setCrypto(?Crypto $crypto): self
    {
        $this->crypto = $crypto;

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
