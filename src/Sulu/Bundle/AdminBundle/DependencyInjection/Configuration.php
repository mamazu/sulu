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
namespace Sulu\Bundle\AdminBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    public function __construct(private bool $debug)
    {
    }

    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('sulu_admin');

        $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('name')->defaultValue('Sulu Admin')->end()
                ->scalarNode('email')->defaultValue('')->end()
                ->scalarNode('user_data_service')->defaultValue('sulu_security.user_manager')->end()
                ->arrayNode('resources')
                    ->useAttributeAsKey('resourceKey')
                    ->prototype('array')
                        ->children()
                            ->arrayNode('routes')
                                ->children()
                                    ->scalarNode('list')->end()
                                    ->scalarNode('detail')->end()
                                ->end()
                            ->end()
                            ->arrayNode('views')
                                ->children()
                                    ->scalarNode('list')->end()
                                    ->scalarNode('detail')->end()
                                ->end()
                            ->end()
                            ->scalarNode('security_context')->end()
                            ->scalarNode('security_class')->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('collaboration')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->booleanNode('enabled')
                            ->defaultValue(!$this->debug)
                        ->end()
                        ->scalarNode('interval')
                            ->defaultValue(20)
                            ->info('The seconds between the keep alive messages for the collaboration feature')
                        ->end()
                        ->scalarNode('threshold')
                            ->defaultValue(60)
                            ->info('The time after which a collabaration without keep alive signal is terminated')
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('forms')
                    ->children()
                        ->arrayNode('directories')
                            ->prototype('scalar')->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('lists')
                    ->children()
                        ->arrayNode('directories')
                            ->prototype('scalar')->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('field_type_options')
                    ->children()
                        ->arrayNode('selection')
                            ->useAttributeAsKey('name')
                            ->prototype('array')
                                ->children()
                                    ->scalarNode('default_type')
                                        ->isRequired()
                                        ->validate()
                                            ->ifNotInArray(['auto_complete', 'list', 'list_overlay'])
                                            ->thenInvalid('Invalid selection type "%s"')
                                        ->end()
                                    ->end()
                                    ->scalarNode('resource_key')->isRequired()->end()
                                    ->arrayNode('view')
                                        ->children()
                                            ->scalarNode('name')->isRequired()->end()
                                            ->arrayNode('result_to_view')
                                                ->isRequired()
                                                ->prototype('scalar')->end()
                                            ->end()
                                        ->end()
                                    ->end()
                                    ->arrayNode('types')
                                        ->isRequired()
                                        ->children()
                                            ->arrayNode('auto_complete')
                                                ->children()
                                                    ->booleanNode('allow_add')->defaultFalse()->end()
                                                    ->scalarNode('id_property')->defaultValue('id')->end()
                                                    ->scalarNode('display_property')->isRequired()->end()
                                                    ->scalarNode('filter_parameter')->end()
                                                    ->arrayNode('search_properties')
                                                        ->isRequired()
                                                        ->requiresAtLeastOneElement()
                                                        ->prototype('scalar')
                                                        ->end()
                                                    ->end()
                                                ->end()
                                            ->end()
                                            ->arrayNode('list')
                                                ->children()
                                                    ->scalarNode('adapter')->isRequired()->end()
                                                    ->scalarNode('list_key')->end()
                                                ->end()
                                            ->end()
                                            ->arrayNode('list_overlay')
                                                ->children()
                                                    ->scalarNode('adapter')->isRequired()->end()
                                                    ->scalarNode('list_key')->end()
                                                    ->arrayNode('display_properties')
                                                        ->isRequired()
                                                        ->requiresAtLeastOneElement()
                                                        ->prototype('scalar')
                                                        ->end()
                                                    ->end()
                                                    ->scalarNode('icon')->isRequired()->end()
                                                    ->scalarNode('label')->isRequired()->end()
                                                    ->scalarNode('overlay_title')->isRequired()->end()
                                                ->end()
                                            ->end()
                                        ->end()
                                    ->end()
                                ->end()
                            ->end()
                        ->end()
                        ->arrayNode('single_selection')
                            ->useAttributeAsKey('name')
                            ->prototype('array')
                                ->children()
                                    ->scalarNode('default_type')
                                        ->isRequired()
                                        ->validate()
                                            ->ifNotInArray(['auto_complete', 'list_overlay', 'single_select'])
                                            ->thenInvalid('Invalid selection type "%s"')
                                        ->end()
                                    ->end()
                                    ->scalarNode('resource_key')->isRequired()->end()
                                    ->arrayNode('view')
                                        ->children()
                                            ->scalarNode('name')->isRequired()->end()
                                            ->arrayNode('result_to_view')
                                                ->isRequired()
                                                ->prototype('scalar')->end()
                                            ->end()
                                        ->end()
                                    ->end()
                                    ->arrayNode('types')
                                        ->isRequired()
                                        ->children()
                                            ->arrayNode('auto_complete')
                                                ->children()
                                                    ->scalarNode('display_property')->isRequired()->end()
                                                    ->arrayNode('search_properties')
                                                        ->isRequired()
                                                        ->requiresAtLeastOneElement()
                                                        ->prototype('scalar')
                                                        ->end()
                                                    ->end()
                                                ->end()
                                            ->end()
                                            ->arrayNode('list_overlay')
                                                ->children()
                                                    ->scalarNode('adapter')->isRequired()->end()
                                                    ->arrayNode('detail_options')
                                                        ->normalizeKeys(false)
                                                        ->prototype('scalar')
                                                        ->end()
                                                    ->end()
                                                    ->scalarNode('list_key')->end()
                                                    ->arrayNode('display_properties')
                                                        ->isRequired()
                                                        ->requiresAtLeastOneElement()
                                                        ->prototype('scalar')
                                                        ->end()
                                                    ->end()
                                                    ->scalarNode('icon')->isRequired()->end()
                                                    ->scalarNode('empty_text')->isRequired()->end()
                                                    ->scalarNode('overlay_title')->isRequired()->end()
                                                ->end()
                                            ->end()
                                            ->arrayNode('single_select')
                                                ->children()
                                                    ->scalarNode('display_property')->isRequired()->end()
                                                    ->scalarNode('id_property')->isRequired()->end()
                                                    ->scalarNode('overlay_title')->isRequired()->end()
                                                ->end()
                                            ->end()
                                        ->end()
                                    ->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ->end();

        return $treeBuilder;
    }
}
