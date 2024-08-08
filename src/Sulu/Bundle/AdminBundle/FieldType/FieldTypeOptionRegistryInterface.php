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
namespace Sulu\Bundle\AdminBundle\FieldType;

interface FieldTypeOptionRegistryInterface
{
    public function add(string $name, string $baseFieldType, array $fieldTypeOptions): void;

    public function toArray(): array;
}
