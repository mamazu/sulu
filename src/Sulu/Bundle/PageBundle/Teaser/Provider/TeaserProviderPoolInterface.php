<?php

declare(strict_types=1);

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */
namespace Sulu\Bundle\PageBundle\Teaser\Provider;

use Sulu\Bundle\PageBundle\Teaser\Configuration\TeaserConfiguration;

/**
 * Interface for teaser-provider-pool.
 */
interface TeaserProviderPoolInterface
{
    /**
     * Returns provider by name.
     *
     * @param string $name
     *
     * @return TeaserProviderInterface
     *
     * @throws ProviderNotFoundException
     */
    public function getProvider($name);

    /**
     * Returns true if provider exists.
     *
     * @param string $name
     *
     * @return bool
     */
    public function hasProvider($name);

    /**
     * Returns configuration for content-type.
     *
     * @return TeaserConfiguration[]
     */
    public function getConfiguration();
}
