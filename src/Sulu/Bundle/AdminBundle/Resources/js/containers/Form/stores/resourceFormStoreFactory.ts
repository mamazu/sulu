import ResourceStore from '../../../stores/ResourceStore';
import ResourceFormStore from './ResourceFormStore';

class ResourceFormStoreFactory {
    createFromResourceStore(
        resourceStore: ResourceStore,
        formKey: string,
        options: any = {},
        metadataOptions?: any | null
    ) {
        return new ResourceFormStore(resourceStore, formKey, options, metadataOptions);
    }
}

export default new ResourceFormStoreFactory();
