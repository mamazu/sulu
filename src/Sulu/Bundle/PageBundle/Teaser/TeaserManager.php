<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PageBundle\Teaser;

use Sulu\Bundle\PageBundle\Teaser\Provider\TeaserProviderPoolInterface;

/**
 * Provides functionality for interacting with teasers.
 */
class TeaserManager implements TeaserManagerInterface
{
    public function __construct(private TeaserProviderPoolInterface $providerPool)
    {
    }

    public function find(array $items, $locale)
    {
        if (0 === \count($items)) {
            return [];
        }

        $result = [];
        list($sortedIds, $positions) = $this->sortItems($items);
        foreach ($sortedIds as $type => $typeIds) {
            $teasers = $this->providerPool->getProvider($type)->find($typeIds, $locale);
            $result = $this->sortTeasers($teasers, $result, $positions, $items);
        }

        \ksort($result);

        return \array_values($result);
    }

    /**
     * Returns sorted teaser by given position array.
     *
     * @param Teaser[] $teasers
     *
     * @return array
     */
    private function sortTeasers(array $teasers, array $result, array $positions, array $items)
    {
        foreach ($teasers as $teaser) {
            $index = $positions[\sprintf('%s;%s', $teaser->getType(), $teaser->getId())];
            $result[$index] = $teaser;

            $item = $items[$index];
            if (['type', 'id'] !== \array_keys($item)) {
                $result[$index] = $result[$index]->merge($item);
            }
        }

        return $result;
    }

    /**
     * Returns items sorted by type.
     *
     * @param array $items
     *
     * @return array
     */
    private function sortItems($items)
    {
        $ids = [];
        $positions = [];
        $index = 0;
        foreach ($items as $item) {
            if (!\array_key_exists($item['type'], $ids)) {
                $ids[$item['type']] = [];
            }
            $ids[$item['type']][] = $item['id'];
            $positions[\sprintf('%s;%s', $item['type'], $item['id'])] = $index++;
        }

        return [$ids, $positions];
    }
}
