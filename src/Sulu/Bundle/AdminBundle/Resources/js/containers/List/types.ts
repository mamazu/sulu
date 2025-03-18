import {RequestPromise} from '../../services/Requester';
import type {ReactNode} from 'react';
import type {IObservableValue} from 'mobx/lib/mobx';
import type {Width} from '../../components/Table/types';

export type DataItem = {
    id: string | number
};

export type ColumnItem = DataItem & {
    hasChildren: boolean
};

export type SchemaEntry = {
    filterType: string | null | undefined,
    filterTypeParameters: {
        [key: string]: unknown
    } | null | undefined,
    label: string,
    sortable: boolean,
    transformerTypeParameters: {
        [key: string]: unknown
    },
    type: string,
    visibility: 'always' | 'yes' | 'no' | 'never',
    width?: Width
};

export type Schema = {
    [key: string]: SchemaEntry
};

export type SortOrder = 'asc' | 'desc';

export type ActionConfig = {
    disabled?: boolean,
    icon: string,
    label?: string,
    onClick: () => void | null | undefined
};

export type ItemActionConfig = {
    disabled?: boolean,
    icon: string,
    onClick: (rowId: string | number, index: number) => void | null | undefined
};

export type ItemActionsProvider = (item?: any | null | undefined) => Array<ItemActionConfig>;

export type AdapterOptions = {
    [key: string]: unknown
};

export type ListAdapterProps = {
    active: string | null | undefined | number,
    activeItems: Array<string | null | undefined | number> | null | undefined,
    adapterOptions?: AdapterOptions,
    data: Array<any>,
    disabledIds: Array<string | number>,
    itemActionsProvider?: ItemActionsProvider,
    limit: number,
    loading: boolean,
    onAllSelectionChange: (selected?: boolean) => void | null | undefined,
    onItemActivate: (itemId: string | null | undefined | number) => void,
    onItemAdd: (id: string | null | undefined | number) => void | null | undefined,
    onItemClick: (itemId: string | number) => void | null | undefined,
    onItemDeactivate: (itemId: string | number) => void,
    onItemSelectionChange: (rowId: string | number, selected?: boolean) => void | null | undefined,
    onLimitChange: (limit: number) => void,
    onPageChange: (page: number) => void,
    onRequestItemCopy: (id: string | number) => Promise<{
        copied: boolean,
        parent: any | null | undefined
    }> | null | undefined,
    onRequestItemDelete: (id: string | number) => Promise<{
        deleted: boolean
    }> | null | undefined,
    onRequestItemMove: (id: string | number) => Promise<{
        moved: boolean,
        parent: any | null | undefined
    }> | null | undefined,
    onRequestItemOrder: (id: string | number, position: number) => Promise<{
        ordered: boolean
    }> | null | undefined,
    onSort: (column: string, order: SortOrder) => void,
    options: any,
    page: number | null | undefined,
    pageCount: number | null | undefined,
    paginated: boolean,
    schema: Schema,
    selections: Array<number | string>,
    sortColumn: string | null | undefined,
    sortOrder: SortOrder | null | undefined
};

export type ObservableOptions = {
    locale?: IObservableValue<string> | null | undefined,
    page: IObservableValue<number>
};

export type LoadOptions = {
    limit?: number,
    locale?: string | null | undefined,
    page?: number,
    sortBy?: string,
    sortOrder?: SortOrder
};

export interface LoadingStrategyInterface {
    constructor(options: LoadingStrategyOptions): void;
    load(
        resourceKey: string,
        options: LoadOptions,
        parentId: string | null | undefined | number,
    ): RequestPromise<any>;
    setStructureStrategy(structureStrategy: StructureStrategyInterface): void;
}

export type LoadingStrategyOptions = {
    paginated: boolean
};

export interface StructureStrategyInterface {
    readonly activate?: (id: string | null | undefined | number) => void;
    readonly activeItems?: Array<any>;
    readonly addItem: (item: any, parentId: string | null | undefined | number) => void;
    readonly clear: (parentId: string | null | undefined | number) => void;
    readonly constructor: () => void;
    readonly data: Array<any>;
    readonly deactivate?: (id: string | null | undefined | number) => void;
    readonly findById: (identifier: string | number) => any | null | undefined;
    readonly order: (id: string | number, position: number) => void;
    readonly remove: (id: string | number) => void;
    readonly visibleItems: Array<any>;
}

export type TreeItem = {
    children: Array<TreeItem>,
    data: DataItem,
    hasChildren: boolean
};

export interface FieldTransformer {
    transform(
        value: any,
        parameters: {
            [key: string]: unknown
        },
        item: any,
    ): Node;
}

export type ResolveCopyArgument = {
    copied: boolean,
    parent?: any | null | undefined
};
export type ResolveDeleteArgument = {
    deleted: boolean
};
export type ResolveMoveArgument = {
    moved: boolean,
    parent?: any | null | undefined
};
export type ResolveOrderArgument = {
    ordered: boolean
};
