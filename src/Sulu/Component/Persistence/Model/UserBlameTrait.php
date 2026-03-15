<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Persistence\Model;

use Sulu\Component\Security\Authentication\UserInterface;
use FriendsOfSulu\Bundle\SuluAttributesBundle\Attributes\ListConfiguration\ConcatPropertyMetadata;
use FriendsOfSulu\Bundle\SuluAttributesBundle\Attributes\ListConfiguration\JoinMetadata;

/**
 * Trait with basic implementation of UserBlameInterface.
 */
trait UserBlameTrait
{
    #[ConcatPropertyMetadata(fields: [
        ['firstName', 'le_creator'],
        ['lastName', 'le_creator'],
    ], glue: ' ')]
    #[JoinMetadata('creatorUser', '(this).creator')]
    #[JoinMetadata('le_creator', 'creatorUser.contact')]
    protected ?UserInterface $creator = null;

    #[ConcatPropertyMetadata(fields: [
        ['firstName', 'le_changer'],
        ['lastName', 'le_changer'],
    ], glue: ' ')]
    #[JoinMetadata('changerUser', '(this).changer')]
    #[JoinMetadata('le_changer', 'changerUser.contact')]
    protected ?UserInterface $changer = null;

    /**
     * @see UserBlameInterface::getCreator()
     */
    public function getCreator(): ?UserInterface
    {
        return $this->creator;
    }

    public function setCreator(?UserInterface $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * @see UserBlameInterface::getChanger()
     */
    public function getChanger(): ?UserInterface
    {
        return $this->changer;
    }

    public function setChanger(?UserInterface $changer): self
    {
        $this->changer = $changer;

        return $this;
    }
}
