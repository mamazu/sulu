<?php

declare(strict_types=1);

namespace Sulu\Page\UserInterface\Command;

use Doctrine\ORM\EntityManagerInterface;
use Sulu\Component\Webspace\Manager\WebspaceManagerInterface;
use Sulu\Component\Webspace\Webspace;
use Sulu\Content\Domain\Model\WorkflowInterface;
use Sulu\Messenger\Infrastructure\Symfony\Messenger\FlushMiddleware\EnableFlushStamp;
use Sulu\Page\Application\MessageHandler\CreatePageMessageHandler;
use Sulu\Page\Application\Message\ApplyWorkflowTransitionPageMessage;
use Sulu\Page\Application\Message\CreatePageMessage;
use Sulu\Page\Domain\Model\PageInterface;
use Sulu\Page\Domain\Repository\PageRepositoryInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\HandleTrait;

#[AsCommand('sulu:articles')]
class MassiveArticles extends Command
{
    use HandleTrait;

    public function __construct(
        private WebspaceManagerInterface $webspaceManager,
        private PageRepositoryInterface $pageRepository,
        private EntityManagerInterface $entityManager,
        MessageBusInterface $messageBus
    ) {
        parent::__construct();
        $this->messageBus = $messageBus;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $ui = new SymfonyStyle($input, $output);

        $webspaces = $this->webspaceManager->getWebspaceCollection();
        foreach ($webspaces as $webspace) {
            $localizations = $webspace->getLocalizations();
            foreach ($localizations as $localization) {
                $this->createPage($webspace, $localization->getLocale());
            }
            $this->entityManager->flush();
        }
        $ui->success('Homepage initialization completed');

        return Command::SUCCESS;
    }


    private function createPage(Webspace $webspace, string $locale): PageInterface
    {
        $webspaceKey = $webspace->getKey();

        for ($i = 3; $i < 10_000; $i++) {
            $data = [
                'title' => $webspace->getName().' '.$i,
                'template' => $webspace->getDefaultTemplate('page'),
                'locale' => $locale,
                'url' => '/test-'.$i,
            ];

            $message = new CreatePageMessage($webspaceKey, CreatePageMessageHandler::HOMEPAGE_PARENT_ID, $data);

            /** @see CreatePageMessageHandler */
            /** @var PageInterface $page */
            $page = $this->handle(new Envelope($message), [new EnableFlushStamp()]);

            $message = new ApplyWorkflowTransitionPageMessage(
                identifier: ['uuid' => $page->getUuid()],
                locale: $locale,
                transitionName: WorkflowInterface::WORKFLOW_TRANSITION_PUBLISH
            );

            /** @see ApplyWorkflowTransitionPageMessageHandler */
            $this->handle(new Envelope($message));
            if ($i % 1000 === 0) {
                echo 'Batch done'.PHP_EOL;
            }
        }
    }

}
