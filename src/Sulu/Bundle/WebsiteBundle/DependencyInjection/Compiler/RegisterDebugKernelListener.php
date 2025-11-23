<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\WebsiteBundle\DependencyInjection\Compiler;

use Sulu\Bundle\WebsiteBundle\EventListener\DebugNotFoundExceptionListener;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;
use Doctrine\ORM\EntityManagerInterface;

class RegisterDebugKernelListener implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        $definition = new Definition(
            DebugNotFoundExceptionListener::class,
            [
                new Reference(EntityManagerInterface::class),
            ]
        )
            ->addTag('kernel.event_subscriber')
        ;

        $container->addDefinitions(['sulu_website.not_found_exception_listener' => $definition]);
    }
}
