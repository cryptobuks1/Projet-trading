<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"normal"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"normal"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"normal"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"normal"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"normal"})
     */
    private $email;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"normal"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"normal"})
     */
    private $USDAmount;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"normal"})
     */
    private $rankValorisationAmount;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="user")
     */
    private $orders;

    /**
     * @ORM\OneToMany(targetEntity=Portfolio::class, mappedBy="user")
     */
    private $portfolios;

    /**
     * @ORM\OneToMany(targetEntity=HistoricalValorisationAccount::class, mappedBy="user")
     */
    private $historicalValorisationAccounts;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->portfolios = new ArrayCollection();
        $this->historicalValorisationAccounts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
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

    public function getUSDAmount(): ?float
    {
        return $this->USDAmount;
    }

    public function setUSDAmount(?float $USDAmount): self
    {
        $this->USDAmount = $USDAmount;

        return $this;
    }

    public function getRankValorisationAmount(): ?float
    {
        return $this->rankValorisationAmount;
    }

    public function setRankValorisationAmount(?float $rankValorisationAmount): self
    {
        $this->rankValorisationAmount = $rankValorisationAmount;

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
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

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
            $portfolio->setUser($this);
        }

        return $this;
    }

    public function removePortfolio(Portfolio $portfolio): self
    {
        if ($this->portfolios->removeElement($portfolio)) {
            // set the owning side to null (unless already changed)
            if ($portfolio->getUser() === $this) {
                $portfolio->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|HistoricalValorisationAccount[]
     */
    public function getHistoricalValorisationAccounts(): Collection
    {
        return $this->historicalValorisationAccounts;
    }

    public function addHistoricalValorisationAccount(HistoricalValorisationAccount $historicalValorisationAccount): self
    {
        if (!$this->historicalValorisationAccounts->contains($historicalValorisationAccount)) {
            $this->historicalValorisationAccounts[] = $historicalValorisationAccount;
            $historicalValorisationAccount->setUser($this);
        }

        return $this;
    }

    public function removeHistoricalValorisationAccount(HistoricalValorisationAccount $historicalValorisationAccount): self
    {
        if ($this->historicalValorisationAccounts->removeElement($historicalValorisationAccount)) {
            // set the owning side to null (unless already changed)
            if ($historicalValorisationAccount->getUser() === $this) {
                $historicalValorisationAccount->setUser(null);
            }
        }

        return $this;
    }
}
