import {ResourceRequester} from 'sulu-admin-bundle/services';
import type {Index} from '../types';

class IndexStore {
    indexPromise: Promise<any> | null | undefined;

    clear() {
        this.indexPromise = undefined;
    }

    sendRequest(): Promise<any> {
        if (!this.indexPromise) {
            this.indexPromise = ResourceRequester.getList('search_indexes');
        }

        return this.indexPromise;
    }

    loadIndexes(): Promise<Array<Index>> {
        return this.sendRequest().then((response: any) => {
            return response._embedded.search_indexes;
        });
    }
}

export default new IndexStore();
