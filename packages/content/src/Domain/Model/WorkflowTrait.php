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

namespace Sulu\Content\Domain\Model;

use FriendsOfSulu\Bundle\SuluAttributesBundle\Attributes\ListConfiguration\SinglePropertyMetadata;

trait WorkflowTrait
{
    #[SinglePropertyMetadata(name: 'publishedState', title: 'sulu_content.published_state')]
    protected ?string $workflowPlace = null;

    #[SinglePropertyMetadata(name: 'published', title: 'sulu_admin.published')]
    protected ?\DateTimeImmutable $workflowPublished = null;

    public static function getWorkflowName(): string
    {
        return WorkflowInterface::WORKFLOW_DEFAULT_NAME;
    }

    public static function getWorkflowInitialPlace(): string
    {
        return WorkflowInterface::WORKFLOW_PLACE_UNPUBLISHED;
    }

    public static function getWorkflowTransitionEdit(): string
    {
        return WorkflowInterface::WORKFLOW_TRANSITION_EDIT;
    }

    public function getWorkflowPlace(): ?string
    {
        return $this->workflowPlace;
    }

    public function setWorkflowPlace(?string $workflowPlace): void
    {
        $this->workflowPlace = $workflowPlace;
    }

    public function getWorkflowPublished(): ?\DateTimeImmutable
    {
        return $this->workflowPublished;
    }

    public function setWorkflowPublished(?\DateTimeImmutable $workflowPublished): void
    {
        $this->workflowPublished = $workflowPublished;
    }
}
