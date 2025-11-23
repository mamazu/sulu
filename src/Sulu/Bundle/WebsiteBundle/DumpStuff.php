<?php

declare(strict_types=1);

namespace Sulu\Bundle\WebsiteBundle;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Compiler\ServiceReferenceGraphNode;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class DumpStuff implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        $graph = $container->getCompiler()->getServiceReferenceGraph();

        $stats = [
        ];

        $lines = [];
        foreach ($graph->getNodes() as $node) {
            if (str_starts_with($node->getId(), '.')) {
                continue;
            }
            if (!str_contains(strtolower($node->getId()), 'sulu')) {
                continue;
            }
            $lines[] = sprintf(
                '%s [id="%s" label="%s"]',
                self::serviceNameToNodeId($node->getId()),
                $node->getId(),
                $node->getId(),
            );
            foreach ($node->getOutEdges() as $edge) {
                $edgeString = '';
                if ($edge->isLazy()) {
                    $edgeString.='[label="Lazy"]';
                }
                $lines[]= self::serviceNameToNodeId($node). '->'.self::serviceNameToNodeId($edge->getDestNode());
            }
            foreach ($node->getInEdges() as $edge) {
                $edgeString = '';
                if ($edge->isLazy()) {
                    $edgeString.='[label="Lazy"]';
                }
                $lines[]= self::serviceNameToNodeId($edge->getSourceNode()). '->'.self::serviceNameToNodeId($node);
            }
            $outEdges = array_unique(array_map(fn ($x) => $x->getDestNode()->getId(), $node->getOutEdges()));
            $inEdges = array_unique(array_map(fn ($x) => $x->getSourceNode()->getId(), $node->getInEdges()));
                $stats[$node->getId()] = ['out' => $outEdges, 'in' => $inEdges];
        }

        uasort($stats, fn ($a, $b) => $b['in'] <=> $a['in']);
        dump(array_slice($stats, 0, 5));
echo '====';
        uasort($stats, fn ($a, $b) => $b['out'] <=> $a['out']);
        dump(array_slice($stats, 0, 5));

        die();
        $content = implode("\n",
            [
                'digraph services {',
                ...array_values(array_unique($lines)),
                '}',
            ]
        );

        file_put_contents(__DIR__.'/some_container_stuff.dot', $content);
    }

    private static function serviceNameToNodeId(ServiceReferenceGraphNode|string $service): string {
        if ($service instanceof ServiceReferenceGraphNode) {
            $service = $service->getId();
        }
        return preg_replace('/\W/', '_', $service);
    }
}
