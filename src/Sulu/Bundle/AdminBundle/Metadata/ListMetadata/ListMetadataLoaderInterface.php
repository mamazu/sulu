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
namespace Sulu\Bundle\AdminBundle\Metadata\ListMetadata;

interface ListMetadataLoaderInterface
{
    /**
     * @param mixed[] $metadataOptions
     *
     * @return ListMetadata|null
     */
    public function getMetadata(string $key, string $locale, array $metadataOptions);
}
