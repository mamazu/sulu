<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\RouteBundle\Manager;

use Sulu\Bundle\RouteBundle\Model\RoutableInterface;

/**
 * This exception indicates that a entity already has a route.
 */
class RouteNotCreatedException extends \Exception
{
    public function __construct(private RoutableInterface $entity)
    {
        parent::__construct(
            \sprintf(
                'Route for entity of type "%s" and identifier "%s" was not created.',
                \get_class($entity),
                $entity->getId()
            )
        );
    }

    /**
     * @return RoutableInterface
     */
    public function getEntity()
    {
        return $this->entity;
    }
}
