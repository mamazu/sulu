<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PageBundle\Search\Reindex;

use Massive\Bundle\SearchBundle\Search\Reindex\LocalizedReindexProviderInterface;
use Sulu\Bundle\DocumentManagerBundle\Bridge\DocumentInspector;
use Sulu\Component\Content\Document\Behavior\SecurityBehavior;
use Sulu\Component\Content\Document\Behavior\WorkflowStageBehavior;
use Sulu\Component\Content\Document\WorkflowStage;
use Sulu\Component\Content\Metadata\Factory\StructureMetadataFactoryInterface;
use Sulu\Component\DocumentManager\DocumentManagerInterface;
use Sulu\Component\DocumentManager\MetadataFactoryInterface;
use Sulu\Component\HttpKernel\SuluKernel;

/**
 * Provides structures for the MassiveSearch reindex process.
 */
class StructureProvider implements LocalizedReindexProviderInterface
{
    /**
     * @param string $context
     */
    public function __construct(
        private DocumentManagerInterface $documentManager,
        private MetadataFactoryInterface $metadataFactory,
        private StructureMetadataFactoryInterface $structureFactory,
        private DocumentInspector $inspector,
        private $context
    ) {
    }

    public function getLocalesForObject($object)
    {
        return $this->inspector->getLocales($object);
    }

    public function translateObject($object, $locale)
    {
        $document = $this->documentManager->find($this->inspector->getUuid($object), $locale);

        if ($document instanceof WorkflowStageBehavior && SuluKernel::CONTEXT_ADMIN === $this->context) {
            // set the workflowstage to test, so that the document will be indexed in the index for drafting
            // this change must not be persisted
            // is required because of the expression for the index name uses the workflowstage
            $document->setWorkflowStage(WorkflowStage::TEST);
        }

        return $document;
    }

    public function provide($classFqn, $offset, $maxResults)
    {
        $query = $this->getQuery($classFqn);
        $query->setFirstResult($offset);
        $query->setMaxResults($maxResults);

        $documents = $query->execute();
        $newDocuments = [];
        foreach ($documents as $document) {
            if ($document instanceof SecurityBehavior) {
                // we do not currently index documents which have permissions.
                if (false === empty($document->getPermissions())) {
                    continue;
                }
            }

            $newDocuments[] = $document;
        }

        return $newDocuments;
    }

    public function cleanUp($classFqn)
    {
        $this->documentManager->clear();
    }

    public function getCount($classFqn)
    {
        $query = $this->getQuery($classFqn);

        // note that this count does NOT take into account any documents that
        // may have security (and should thus be excluded) - checking the
        // permissions on each document here would cause significant overhead.
        return \count($query->execute());
    }

    public function getClassFqns()
    {
        $classFqns = [];
        foreach ($this->metadataFactory->getAllMetadata() as $metadata) {
            if (!$this->structureFactory->hasStructuresFor($metadata->getAlias())) {
                continue;
            }

            $classFqns[] = $metadata->getClass();
        }

        return $classFqns;
    }

    private function getQuery($classFqn)
    {
        $metadata = $this->metadataFactory->getMetadataForClass($classFqn);

        // TODO: Use the document manager query builder.
        return $this->documentManager->createQuery(\sprintf(
            'SELECT * FROM [nt:unstructured] AS a WHERE [jcr:mixinTypes] = "%s"',
            $metadata->getPhpcrType()
        ));
    }
}
