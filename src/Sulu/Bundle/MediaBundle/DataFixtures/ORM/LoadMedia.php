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

namespace Sulu\Bundle\MediaBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Sulu\Bundle\MediaBundle\Entity\Collection;
use Sulu\Bundle\MediaBundle\Entity\CollectionType;
use Sulu\Bundle\MediaBundle\Entity\File;
use Sulu\Bundle\MediaBundle\Entity\FileVersion;
use Sulu\Bundle\MediaBundle\Entity\FileVersionMeta;
use Sulu\Bundle\MediaBundle\Entity\Media;
use Sulu\Bundle\MediaBundle\Entity\MediaInterface;
use Sulu\Bundle\MediaBundle\Media\Storage\FlysystemStorage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LoadMedia extends AbstractFixture implements OrderedFixtureInterface
{
    public function __construct(
        private FlysystemStorage $storage,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $type = $manager->getRepository(CollectionType::class)->findAll()[1];

        $collection = new Collection();
        $collection->setType($type);

        $manager->persist($collection);

        $imageCount = 10_000;

        $dir = __DIR__ . '/test-images';
        if (!\file_exists($dir)) {
            \mkdir($dir);
            $this->generateRandomImages($dir, $imageCount);
        }

        echo "Done generating $imageCount images";

        for ($i = 0; $i < $imageCount; ++$i) {
            $file = new \SplFileInfo($dir . '/' . ($i + 1) . '.png');
            $fileName = $file->getFilename();
            $uploadedFile = new UploadedFile($file->getPathname(), $fileName);

            $storageOptions = $this->storage->save($uploadedFile->getPathname(), $fileName);

            $media = new Media();

            $file = new File();
            $file->setVersion(1)
                ->setMedia($media);

            $media->addFile($file)
                ->setType(MediaInterface::TYPE_IMAGE)
                ->setCollection($collection);

            $mimeType = $uploadedFile->getMimeType();

            $fileVersion = new FileVersion();
            $fileVersion->setVersion($file->getVersion())
                ->setSize($uploadedFile->getSize())
                ->setName($fileName)
                ->setStorageOptions($storageOptions)
                ->setMimeType($mimeType ?: 'image/jpeg')
                ->setFile($file);

            $file->addFileVersion($fileVersion);

            $fileVersionMeta = new FileVersionMeta();
            $fileVersionMeta->setTitle('Example Media ' . ($i + 1))
                ->setDescription('Example Media description')
                ->setLocale('en')
                ->setFileVersion($fileVersion);

            $fileVersion->addMeta($fileVersionMeta)
                ->setDefaultMeta($fileVersionMeta);

            $manager->persist($fileVersionMeta);
            $manager->persist($fileVersion);
            $manager->persist($media);

            if (0 === $i % 1_000) {
                $manager->flush();
            }
        }
        $manager->flush();
    }

    private function generateRandomImages(string $directory, int $imageCount): void
    {
        for ($i = 0; $i < $imageCount; ++$i) {
            $imagick = new \Imagick();
            $imagick->newPseudoImage(100, 100, 'plasma:fractal');
            $imagick->setImageFormat('png');

            \file_put_contents($directory . '/' . ($i + 1) . '.png', $imagick->getImageBlob());
        }
    }

    public function getOrder(): int
    {
        return 4;
    }
}
