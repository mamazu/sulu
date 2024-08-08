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
namespace Sulu\Component\Snippet\Export;

use Symfony\Component\Console\Output\OutputInterface;

/**
 * Interface for Snippet export.
 */
interface SnippetExportInterface
{
    /**
     * Export all data from snippet by given locale.
     *
     * @param string $locale
     * @param OutputInterface $output
     * @param string $format
     *
     * @return array
     */
    public function export($locale, $output, $format = '1.2.xliff');
}
