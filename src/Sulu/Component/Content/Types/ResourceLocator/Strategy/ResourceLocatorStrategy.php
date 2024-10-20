<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Content\Types\ResourceLocator\Strategy;

use Sulu\Bundle\DocumentManagerBundle\Bridge\DocumentInspector;
use Sulu\Component\Content\Compat\StructureManagerInterface;
use Sulu\Component\Content\ContentTypeManagerInterface;
use Sulu\Component\Content\Document\Behavior\ResourceSegmentBehavior;
use Sulu\Component\Content\Exception\ResourceLocatorAlreadyExistsException;
use Sulu\Component\Content\Exception\ResourceLocatorGeneratorException;
use Sulu\Component\Content\Exception\ResourceLocatorNotFoundException;
use Sulu\Component\Content\Exception\ResourceLocatorNotValidException;
use Sulu\Component\Content\Types\ResourceLocator\Mapper\ResourceLocatorMapperInterface;
use Sulu\Component\DocumentManager\Behavior\Mapping\ParentBehavior;
use Sulu\Component\DocumentManager\DocumentManagerInterface;
use Sulu\Component\PHPCR\PathCleanupInterface;
use Sulu\Component\Util\SuluNodeHelper;

/**
 * Basic implementation for resource-locator-strategies.
 */
abstract class ResourceLocatorStrategy implements ResourceLocatorStrategyInterface
{
    /**
     * @var ResourceLocatorMapperInterface
     */
    protected $mapper;

    /**
     * @var PathCleanupInterface
     */
    protected $cleaner;

    /**
     * @var StructureManagerInterface
     */
    protected $structureManager;

    /**
     * @var ContentTypeManagerInterface
     */
    protected $contentTypeManager;

    /**
     * @var SuluNodeHelper
     */
    protected $nodeHelper;

    /**
     * @var DocumentInspector
     */
    protected $documentInspector;

    /**
     * @var DocumentManagerInterface
     */
    protected $documentManager;

    public function __construct(
        ResourceLocatorMapperInterface $mapper,
        PathCleanupInterface $cleaner,
        StructureManagerInterface $structureManager,
        ContentTypeManagerInterface $contentTypeManager,
        SuluNodeHelper $nodeHelper,
        DocumentInspector $documentInspector,
        DocumentManagerInterface $documentManager,
        private ResourceLocatorGeneratorInterface $resourceLocatorGenerator
    ) {
        $this->mapper = $mapper;
        $this->cleaner = $cleaner;
        $this->structureManager = $structureManager;
        $this->contentTypeManager = $contentTypeManager;
        $this->nodeHelper = $nodeHelper;
        $this->documentInspector = $documentInspector;
        $this->documentManager = $documentManager;
    }

    public function generate($title, $parentUuid, $webspaceKey, $languageCode, $segmentKey = null/*, $uuid = null*/)
    {
        $uuid = null;

        if (\func_num_args() >= 6) {
            $uuid = \func_get_arg(5);
        }

        // title should not have a slash
        $title = \str_replace('/', '-', $title);

        $parentPath = $this->getClosestResourceLocator($parentUuid, $webspaceKey, $languageCode);

        // get generated path from childClass
        $path = $this->resourceLocatorGenerator->generate($title, $parentPath);

        // cleanup path
        $path = $this->cleaner->cleanup($path, $languageCode);

        // if no path was added throw an except that no url could be generated for the given title
        if (\substr($path, 0, -1) === $parentPath) {
            throw new ResourceLocatorGeneratorException($title, $parentPath);
        }

        // get unique path
        $path = $this->mapper->getUniquePath($path, $webspaceKey, $languageCode, $segmentKey, $uuid);

        return $path;
    }

    /**
     * Returns the closes resourcelocator possible. Skips pages without URLs as internal/external links or unpublished
     * pages.
     *
     * @param string $uuid
     * @param string $webspaceKey
     * @param string $languageCode
     *
     * @return null|string
     */
    private function getClosestResourceLocator($uuid, $webspaceKey, $languageCode)
    {
        if (!$uuid) {
            return null;
        }

        $document = $this->documentManager->find($uuid, $languageCode, ['load_ghost_content' => false]);

        do {
            try {
                return $this->loadByContentUuid($this->documentInspector->getUuid($document), $webspaceKey, $languageCode);
            } catch (ResourceLocatorNotFoundException $e) {
                $document = $document->getParent();
            }
        } while ($document instanceof ParentBehavior);
    }

    public function save(ResourceSegmentBehavior $document, $userId)
    {
        $path = $document->getResourceSegment();
        $webspaceKey = $this->documentInspector->getWebspace($document);
        $languageCode = $this->documentInspector->getOriginalLocale($document);

        try {
            $treeValue = $this->loadByContent($document);
        } catch (ResourceLocatorNotFoundException $e) {
            $treeValue = null;
        }

        if ($treeValue === $path) {
            return false;
        }

        if (!$this->isValid($path, $webspaceKey, $languageCode)) {
            throw new ResourceLocatorNotValidException($path);
        }

        if (!$this->mapper->unique($path, $webspaceKey, $languageCode)) {
            try {
                $treeContent = $this->loadByResourceLocator($path, $webspaceKey, $languageCode);
                // FIXME Required because jackalope-doctrine-dbal does not return references which only exist in the current
                // session. If it would loadByContent would already return some value, which would make this check obsolete.
                if ($treeContent === $this->documentInspector->getUuid($document)) {
                    return false;
                }

                throw new ResourceLocatorAlreadyExistsException($path, $treeContent);
            } catch (ResourceLocatorNotFoundException $exception) {
                // a node exists but is not a resource-locator.
            }
        }

        $this->mapper->save($document);
    }

    public function loadByContent(ResourceSegmentBehavior $document)
    {
        // delegate to mapper
        return $this->mapper->loadByContent(
            $this->documentInspector->getNode($document),
            $this->documentInspector->getWebspace($document),
            $this->documentInspector->getOriginalLocale($document),
            null
        );
    }

    public function loadByContentUuid($uuid, $webspaceKey, $languageCode, $segmentKey = null)
    {
        // delegate to mapper
        return $this->mapper->loadByContentUuid($uuid, $webspaceKey, $languageCode, $segmentKey);
    }

    public function loadHistoryByContentUuid($uuid, $webspaceKey, $languageCode, $segmentKey = null)
    {
        return $this->mapper->loadHistoryByContentUuid($uuid, $webspaceKey, $languageCode, $segmentKey);
    }

    public function loadByResourceLocator($resourceLocator, $webspaceKey, $languageCode, $segmentKey = null)
    {
        // delegate to mapper
        return $this->mapper->loadByResourceLocator($resourceLocator, $webspaceKey, $languageCode, $segmentKey);
    }

    public function isValid($path, $webspaceKey, $languageCode, $segmentKey = null)
    {
        return '/' !== $path && $this->cleaner->validate($path);
    }

    public function deleteById($id, $languageCode, $segmentKey = null)
    {
        $this->mapper->deleteById($id, $languageCode, $segmentKey);
    }
}
