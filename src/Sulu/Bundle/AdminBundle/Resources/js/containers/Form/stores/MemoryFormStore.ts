import {action, observable, set} from 'mobx';
import log from 'loglevel';
import jsonpointer from 'json-pointer';
import {createAjv} from '../../../utils/Ajv';
import AbstractFormStore from './AbstractFormStore';
import type {ChangeContext, FormStoreInterface, Schema, SchemaType} from '../types';
import type {IObservableValue} from 'mobx/lib/mobx';

const ajv = createAjv();

export default class MemoryFormStore extends AbstractFormStore implements FormStoreInterface {
    id = undefined;
    options = {};
    resourceKey = undefined;
    @observable
    data: {
        [key: string]: any
    };
    @observable
    dirty: boolean = false;
    @observable
    loading: boolean = false;
    @observable
    types: {
        [key: string]: SchemaType
    } = {};

    constructor(
        data: {
            [key: string]: any
        },
        schema: Schema,
        jsonSchema?: any | null,
        locale?: IObservableValue<string> | null,
        metadataOptions?: {
            [key: string]: any
        } | null
    ) {
        super();

        this.data = data;
        this.schema = schema;
        this.locale = locale;
        this.addMissingSchemaProperties();
        this.validator = jsonSchema ? ajv.compile(jsonSchema) : undefined;
        this.metadataOptions = metadataOptions;
    }

    @action change(dataPath: string, value: unknown, context?: ChangeContext) {
        const sanitizedDataPath = !dataPath.startsWith('/') ? '/' + dataPath : dataPath;

        jsonpointer.set( this.data, sanitizedDataPath, value );

        if (!context?.isDefaultValue && !context?.isServerValue) {
            this.dirty = true;
        }
    }

    @action changeMultiple(values: {
        [dataPath: string]: unknown
    }, context?: ChangeContext) {
        Object.keys(values).forEach((path) => {
            this.change(path, values[path], context);
        });
        set(this.data, this.data);
    }

    get hasInvalidType() {
        return false;
    }

    /**
     * @deprecated
     */
    @action setMultiple(data: any) {
        log.warn(
            'The "setMultiple" method is deprecated and will be removed. ' +
            'Use the "changeMultiple" method instead.'
        );

        this.data = {...this.data, ...data};
    }

    changeType() {
        throw new Error('The MemoryFormStore cannot handle types');
    }
}
