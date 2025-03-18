import {action, autorun, computed, observable, toJS} from 'mobx';
import equals from 'fast-deep-equal';
import Requester from '../../../services/Requester';
import Config from '../../../services/Config';
import ResourceRequester from '../../../services/ResourceRequester';
import {buildQueryString} from '../../../utils/Request';
import type {IObservableValue} from 'mobx/lib/mobx';
import type {Conjunction, FilterCriteria, SortOrder} from '../types';

export default class SmartContentStore {
    provider: string;
    locale: IObservableValue<string> | null | undefined;
    dataSourceResourceKey: string | null | undefined;
    params: any;
    webspaceKey: string | null | undefined;
    @observable
    items: Array<any> = [];
    @observable
    itemsLoading: boolean = true;
    @observable
    categoriesLoading: boolean;
    @observable
    dataSourceLoading: boolean;
    @observable
    dataSource: any | null | undefined;
    @observable
    includeSubElements: boolean | null | undefined;
    @observable
    categories: Array<any> | null | undefined;
    @observable
    categoryOperator: Conjunction | null | undefined;
    @observable
    tags: Array<string | number> | null | undefined;
    @observable
    tagOperator: Conjunction | null | undefined;
    @observable
    types: Array<string> | null | undefined;
    @observable
    audienceTargeting: boolean | null | undefined;
    @observable
    sortBy: string | null | undefined;
    @observable
    sortOrder: SortOrder | null | undefined;
    @observable
    presentation: string | null | undefined;
    @observable
    limit: number | null | undefined;
    @observable
    excludedIds: Array<string | number> = [];
    itemDisposer: () => void | null | undefined;
    id: string | null | undefined | number;

    constructor(
        provider: string,
        filterCriteria: FilterCriteria | null | undefined,
        locale: IObservableValue<string> | null | undefined,
        dataSourceResourceKey: string | null | undefined,
        id: string | null | undefined | number,
        params: any,
        webspaceKey?: string | null
    ) {
        this.provider = provider;
        this.locale = locale;
        this.dataSourceResourceKey = dataSourceResourceKey;
        this.id = id;
        this.params = params;
        this.webspaceKey = webspaceKey;

        if (filterCriteria) {
            this.audienceTargeting = filterCriteria.audienceTargeting;
            this.categoryOperator = filterCriteria.categoryOperator;
            this.includeSubElements = filterCriteria.includeSubFolders;
            this.limit = filterCriteria.limitResult;
            this.sortBy = filterCriteria.sortBy;
            this.sortOrder = filterCriteria.sortMethod;
            this.tagOperator = filterCriteria.tagOperator;
            this.tags = filterCriteria.tags;
            this.types = filterCriteria.types;
            this.presentation = filterCriteria.presentAs;

            if (filterCriteria.categories) {
                this.categoriesLoading = true;
                // TODO extract 'categories' into some kind of variable?
                ResourceRequester.get(
                    'categories',
                    {
                        ids: filterCriteria.categories,
                        locale: this.locale ? this.locale.get() : undefined,
                    }
                ).then(action((response) => {
                    this.categoriesLoading = false;
                    this.categories = response._embedded.categories;
                }));
            }

            if (filterCriteria.dataSource && this.dataSourceResourceKey) {
                this.dataSourceLoading = true;
                ResourceRequester.get(
                    this.dataSourceResourceKey,
                    {id: filterCriteria.dataSource, locale: this.locale ? this.locale.get() : undefined}
                ).then(action((response) => {
                    this.dataSource = response;
                    this.dataSourceLoading = false;
                })).catch(action(() => {
                    this.dataSourceLoading = false;
                }));
            }
        }
    }

    start() {
        this.itemDisposer = autorun(this.loadItems);
    }

    destroy() {
        if (this.itemDisposer) {
            this.itemDisposer();
        }
    }

    loadItems = () => {
        if (this.loading) {
            this.setItems([]);
            return;
        }

        this.setItemsLoading(true);

        return Requester.get(
            Config.endpoints.items + buildQueryString({
                provider: this.provider,
                excluded: [this.id, ...this.excludedIds],
                locale: this.locale,
                params: JSON.stringify(this.params),
                webspace: this.webspaceKey,
                ...this.filterCriteria,
            })
        ).then(action((response) => {
            this.setItems(response._embedded.items);
            this.setItemsLoading(false);
        }));
    };

    @action setItems(items: Array<any>) {
        this.items = items;
    }

    @action setItemsLoading(itemsLoading: boolean) {
        this.itemsLoading = itemsLoading;
    }

    @action setExcludedIds(excludedIds: Array<string | number>) {
        if (equals(toJS(this.excludedIds), excludedIds)) {
            return;
        }

        this.excludedIds = excludedIds;
    }

    @computed get loading() {
        return !!this.dataSourceLoading || !!this.categoriesLoading;
    }

    @computed
    get filterCriteria(): FilterCriteria {
        return {
            audienceTargeting: this.audienceTargeting,
            categories: this.categories && this.categories.length > 0
                ? this.categories.map((category) => category.id)
                : undefined,
            categoryOperator: this.categoryOperator,
            dataSource: this.dataSource ? this.dataSource.id : undefined,
            includeSubFolders: this.includeSubElements,
            limitResult: this.limit,
            sortBy: this.sortBy,
            sortMethod: this.sortOrder,
            tagOperator: this.tagOperator,
            tags: this.tags && this.tags.length > 0 ? toJS(this.tags) : undefined,
            types: this.types && this.types.length > 0 ? toJS(this.types) : undefined,
            presentAs: this.presentation,
        };
    }
}
