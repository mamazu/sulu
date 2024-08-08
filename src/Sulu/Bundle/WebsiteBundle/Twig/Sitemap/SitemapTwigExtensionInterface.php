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
namespace Sulu\Bundle\WebsiteBundle\Twig\Sitemap;

use Twig\Extension\ExtensionInterface;

/**
 * Provides twig functions for sitemap.
 */
interface SitemapTwigExtensionInterface extends ExtensionInterface
{
    /**
     * Returns prefixed resourcelocator with the url and locale.
     */
    public function sitemapUrlFunction($url, $locale = null, $webspaceKey = null);

    /**
     * Returns full sitemap of webspace and language from the content.
     */
    public function sitemapFunction($locale = null, $webspaceKey = null);
}
