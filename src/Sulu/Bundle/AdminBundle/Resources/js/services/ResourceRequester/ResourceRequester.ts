import Requester from '../Requester';
import resourceRouteRegistry from './registries/resourceRouteRegistry';
import type {ListOptions} from './types';

export default class ResourceRequester {
    static get(resourceKey: string, parameters?: any | null) {
        return Requester.get(resourceRouteRegistry.getUrl('detail', resourceKey, {...parameters}));
    }

    static post(resourceKey: string, data?: any | null, parameters?: any | null) {
        return Requester.post(resourceRouteRegistry.getUrl('detail', resourceKey, {...parameters}), data);
    }

    static put(resourceKey: string, data?: any | null, parameters?: any | null) {
        return Requester.put(resourceRouteRegistry.getUrl('detail', resourceKey, {...parameters}), data);
    }

    static patch(resourceKey: string, data: any, parameters?: any | null) {
        return Requester.patch(resourceRouteRegistry.getUrl('detail', resourceKey, {...parameters}), data);
    }

    static patchList(resourceKey: string, data: Array<any>) {
        return Requester.patch(resourceRouteRegistry.getUrl('list', resourceKey), data);
    }

    static getList(resourceKey: string, options: ListOptions = {}) {
        return Requester.get(resourceRouteRegistry.getUrl('list', resourceKey, {...options, flat: true}));
    }

    static delete(resourceKey: string, parameters?: any | null) {
        return Requester.delete(resourceRouteRegistry.getUrl('detail', resourceKey, {...parameters}));
    }

    static deleteList(resourceKey: string, parameters: any){
        return Requester.delete(resourceRouteRegistry.getUrl('list', resourceKey, parameters));
    }
}
