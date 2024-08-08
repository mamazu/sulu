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
namespace Sulu\Component\Category\Request;

use Sulu\Bundle\CategoryBundle\Entity\CategoryInterface;

/**
 * Handles categories in current request.
 */
interface CategoryRequestHandlerInterface
{
    /**
     * Determine categories from current request.
     *
     * @param string $categoriesParameter
     *
     * @return string[]
     */
    public function getCategories($categoriesParameter = 'categories');

    /**
     * Extends current URL with given category.
     *
     * @param array|CategoryInterface $category will be included in the URL
     * @param string $categoriesParameter GET parameter name
     *
     * @return string
     */
    public function appendCategoryToUrl($category, $categoriesParameter = 'categories');

    /**
     * Removes given category from current URL.
     *
     * @param array|CategoryInterface $category will be removed from the URL
     * @param string $categoriesParameter GET parameter name
     *
     * @return string
     */
    public function removeCategoryFromUrl($category, $categoriesParameter = 'categories');

    /**
     * Toggles given category in current URL.
     *
     * @param array|CategoryInterface $category will be toggled in the URL
     * @param string $categoriesParameter GET parameter name
     *
     * @return string
     */
    public function toggleCategoryInUrl($category, $categoriesParameter = 'categories');

    /**
     * Set category to current URL.
     *
     * @param array|CategoryInterface $category will be included in the URL
     * @param string $categoriesParameter GET parameter name
     *
     * @return string
     */
    public function setCategoryToUrl($category, $categoriesParameter = 'categories');

    /**
     * Remove category from current URL.
     *
     * @param string $categoriesParameter GET parameter name
     *
     * @return string
     */
    public function removeCategoriesFromUrl($categoriesParameter = 'categories');
}
