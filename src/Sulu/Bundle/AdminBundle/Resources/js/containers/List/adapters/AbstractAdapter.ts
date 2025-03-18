import {Flow} from 'flow-to-typescript-codemod';
import React from 'react';
import type {LoadingStrategyInterface, ListAdapterProps, StructureStrategyInterface} from '../types';

export default class AbstractAdapter extends React.Component<ListAdapterProps> {
    static LoadingStrategy: Flow.Class<LoadingStrategyInterface>;

    static StructureStrategy: Flow.Class<StructureStrategyInterface>;

    static icon: string;

    static hasColumnOptions: boolean = false;

    static searchable: boolean = true;

    static paginatable: boolean = true;
}
