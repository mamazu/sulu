import {action, observable} from 'mobx';
import {ResourceRequester} from '../../services';
import type {IObservableValue} from 'mobx/lib/mobx';

export default class SingleSelectionStore<T, U extends {
    id: T
} = any> {
    @observable
    item: U | null | undefined;
    @observable
    loading: boolean = false;
    resourceKey: string;
    locale: IObservableValue<string> | null | undefined;
    options: any;

    constructor(
        resourceKey: string,
        selectedItemId?: T | null,
        locale?: IObservableValue<string> | null,
        options: any = {}
    ) {
        this.resourceKey = resourceKey;
        this.locale = locale;
        this.options = options;
        if (selectedItemId) {
            this.loadItem(selectedItemId);
        }
    }

    @action set(item: U) {
        this.item = item;
    }

    @action clear() {
        this.item = undefined;
    }

    @action setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action loadItem(itemId?: T | null) {
        if (!itemId) {
            this.item = undefined;
            return;
        }

        this.setLoading(true);
        return ResourceRequester
            .get(this.resourceKey, {
                ...this.options,
                id: itemId,
                locale: this.locale ? this.locale.get() : undefined,
            })
            .then(action((data) => {
                this.item = data;
                this.setLoading(false);
            }))
            .catch(action((error) => {
                if (error.status !== 404) {
                    return Promise.reject(error);
                }

                this.item = null;
                this.setLoading(false);
            }));
    }
}
