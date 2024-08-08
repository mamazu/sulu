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
namespace Sulu\Component\DocumentManager\Event;

use Symfony\Component\OptionsResolver\OptionsResolver;

class ConfigureOptionsEvent extends AbstractEvent
{
    use EventOptionsTrait;

    public function __construct(OptionsResolver $options)
    {
        $this->options = $options;
    }
}
