import ResourceStore from '../../../stores/ResourceStore';
import Router from '../../../services/Router';
import List from '../../../views/List/List';
import ListStore from '../../../containers/List/stores/ListStore';
import type {ToolbarItemConfig} from '../../../containers/Toolbar/types';
import type {ReactNode} from 'react';

export default class AbstractListToolbarAction {
    listStore: ListStore;
    list: List;
    router: Router;
    locales: Array<string> | null | undefined;
    resourceStore: ResourceStore | null | undefined;
    options: {
        [key: string]: unknown
    };

    constructor(
        listStore: ListStore,
        list: List,
        router: Router,
        locales: Array<string> | null | undefined,
        resourceStore: ResourceStore | null | undefined,
        options: {
            [key: string]: unknown
        }
    ) {
        this.listStore = listStore;
        this.list = list;
        this.router = router;
        this.locales = locales;
        this.resourceStore = resourceStore;
        this.options = options;
    }

    setLocales(locales: Array<string>) {
        this.locales = locales;
    }

    getNode(): Node {
        return null;
    }

    getToolbarItemConfig(): ToolbarItemConfig<any> | null | undefined {
        throw new Error('The getToolbarItemConfig method must be implemented by the sub class!');
    }

    destroy() {

    }
}
