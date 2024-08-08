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
namespace Sulu\Bundle\PreviewBundle\Preview\Renderer;

use Sulu\Component\HttpKernel\SuluKernel;

/**
 * Creates new Website-Kernels foreach preview request.
 */
class WebsiteKernelFactory implements KernelFactoryInterface
{
    public function create($environment)
    {
        $kernel = new PreviewKernel($environment, 'dev' === $environment, SuluKernel::CONTEXT_WEBSITE);
        $kernel->boot();

        return $kernel;
    }
}
