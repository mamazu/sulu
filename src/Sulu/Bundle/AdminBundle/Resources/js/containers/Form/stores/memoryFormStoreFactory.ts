import MemoryFormStore from './MemoryFormStore';
import SchemaFormStoreDecorator from './SchemaFormStoreDecorator';
import type {IObservableValue} from 'mobx/lib/mobx';
import type {Schema} from '../types';

class MemoryFormStoreFactory {
    createFromFormKey(
        formKey: string,
        data: any = {},
        locale?: IObservableValue<string> | null,
        type?: string | null,
        metadataOptions?: any | null
    ) {
        return new SchemaFormStoreDecorator(
            (schema, jsonSchema) => new MemoryFormStore(data, schema, jsonSchema, locale, metadataOptions),
            formKey,
            type,
            metadataOptions
        );
    }

    createFromSchema(schema: Schema, jsonSchema: any, data: any = {}) {
        return new MemoryFormStore(data, schema, jsonSchema);
    }
}

export default new MemoryFormStoreFactory();
