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
namespace Sulu\Component\Webspace\StructureProvider;

use Sulu\Component\Content\Compat\StructureInterface;

/**
 * Provide templates which are implemented in a single webspace.
 */
interface WebspaceStructureProviderInterface
{
    /**
     * Returns page templates which are implemented in given webspace.
     *
     * @param string $webspaceKey
     *
     * @return StructureInterface[]
     */
    public function getStructures($webspaceKey);
}
