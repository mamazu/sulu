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

use FriendsOfSulu\Bundle\SuluAttributesBundle\Attributes\ListConfiguration\ConcatPropertyMetadata;
use FriendsOfSulu\Bundle\SuluAttributesBundle\Attributes\ListConfiguration\JoinMetadata;
use Sulu\Component\Security\Authentication\UserInterface;

/**
 * Trait with basic implementation of UserBlameInterface.
 */
trait UserBlameTrait
{
    #[ConcatPropertyMetadata(fields: [
        'le_creator.firstName',
        'le_creator.lastName',
    ], glue: ' ')]
    #[JoinMetadata('creator', 'creatorUser')]
    #[JoinMetadata('creatorUser.contact', 'le_creator')]
    protected ?UserInterface $creator = null;

    #[ConcatPropertyMetadata(fields: [
        'le_changer.firstName',
        'le_changer.lastName',
    ], glue: ' ')]
    #[JoinMetadata('changer', 'changerUser')]
    #[JoinMetadata('changerUser.contact', 'le_changer')]
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
