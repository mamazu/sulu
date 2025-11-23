<?php

declare(strict_types=1);

namespace Sulu\Bundle\WebsiteBundle\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\EntityManagerInterface;
use Sulu\Route\Domain\Model\Route;

final readonly class DebugNotFoundExceptionListener implements EventSubscriberInterface
{
    public function __construct(private EntityManagerInterface $entityManager) {
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $throwable = $event->getThrowable();
        if (!$throwable instanceof NotFoundHttpException) {
            return;
        }

        if ($this->hasRoutes()) {
            return;
        }

        $newException = new NotFoundHttpException(
            'No Sulu routes found. Did you forget to run "bin/console sulu:build dev"?',
            $throwable,
            $throwable->getCode(),
            $throwable->getHeaders()
        );
        $event->setThrowable($newException);
    }

    private function hasRoutes(): bool
    {
        return $this->entityManager->getRepository(Route::class)->count([]) > 0;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException'
        ];
    }
}
