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
namespace Sulu\Bundle\RouteBundle\PageTree;

use Sulu\Bundle\PageBundle\Document\BasePageDocument;

/**
 * Interface for page-tree-updater.
 */
interface PageTreeUpdaterInterface
{
    /**
     * Updates routes of linked documents.
     */
    public function update(BasePageDocument $document);
}
