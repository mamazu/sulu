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
namespace Sulu\Bundle\ActivityBundle\Infrastructure\Sulu\Metadata;

use Sulu\Bundle\AdminBundle\Metadata\ListMetadata\ListMetadata;
use Sulu\Bundle\AdminBundle\Metadata\ListMetadata\ListMetadataVisitorInterface;

/**
 * @internal This class is internal. Create a separate visitor if you want to manipulate the metadata in your project.
 */
class ActivitiesListMetadataVisitor implements ListMetadataVisitorInterface
{
    public static function getDefaultPriority(): int
    {
        return 50;
    }

    public function visitListMetadata(ListMetadata $listMetadata, string $key, string $locale, array $metadataOptions = []): void
    {
        if ('activities' !== $key) {
            return;
        }

        if ($metadataOptions['showResource'] ?? false) {
            $resourceField = $listMetadata->getField('resource');
            $resourceField->setVisibility('yes');
        }
    }
}
