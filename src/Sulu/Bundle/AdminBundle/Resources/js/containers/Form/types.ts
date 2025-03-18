import Router from '../../services/Router';
import FormInspector from './FormInspector';
import type {IObservableValue} from 'mobx/lib/mobx';
import type {ColSpan} from '../../components/Grid';

export type SchemaType = {
    key: string,
    title: string
};

export type SchemaTypes = {
    defaultType: string | null | undefined,
    types: {
        [key: string]: SchemaType
    }
};

export type Tag = {
    name: string,
    priority?: number
};

export type Type = {
    form: Schema,
    title: string
};

export type Types = {
    [key: string]: Type
};

export type PropertyError = {
    keyword: string,
    parameters: {
        [key: string]: unknown
    }
};

export type BlockError = Array<{
    [key: string]: Error
} | null | undefined>;

export type Error = BlockError | PropertyError;

export type ErrorCollection = {
    [key: string]: Error
};

export type SchemaOption = {
    infoText?: string,
    name: string | number,
    title?: string,
    value?: string | null | undefined | number | boolean | Array<SchemaOption>
};

export type SchemaOptions = {
    [key: string]: SchemaOption | typeof undefined
};

export type SchemaEntry = {
    colSpan?: ColSpan,
    defaultType?: string,
    description?: string,
    disabledCondition?: string,
    items?: Schema,
    label?: string,
    maxOccurs?: number,
    minOccurs?: number,
    onInvalid?: string,
    options?: SchemaOptions,
    required?: boolean,
    spaceAfter?: ColSpan,
    tags?: Array<Tag>,
    type: string,
    types?: Types,
    visibleCondition?: string
};

export type Schema = {
    [key: string]: SchemaEntry
};

export type FinishFieldHandler = (dataPath: string, schemaPath: string) => void;

export type SaveHandler = (
    action: string | null | undefined | {
        [key: string]: any
    },
) => void;

export type ChangeContext = {
    isDefaultValue?: boolean,
    isServerValue?: boolean
};

export type ConditionDataProvider = (
    data: {
        [key: string]: any
    },
    dataPath: string | null | undefined,
    formInspector: FormInspector,
) => {
    [key: string]: any
};

export interface FormStoreInterface {
    readonly change: (dataPath: string, value: unknown, context?: ChangeContext) => void;
    readonly changeMultiple: (
        values: {
            [dataPath: string]: unknown
        },
        context?: ChangeContext,
    ) => void;
    readonly changeType: (type: string, context?: ChangeContext) => void;
    // Only exists in one implementation, therefore optional. Maybe we can remove that definition one day...
    readonly copyFromLocale?: (arg1: string, arg2: any) => Promise<any>;
    readonly data: {
        [key: string]: any
    };
    readonly destroy: () => void;
    dirty: boolean;
    readonly errors: any;
    readonly finishField: (dataPath: string) => void;
    readonly forbidden: boolean;
    readonly getPathsByTag: (tagName: string) => Array<string>;
    readonly getSchemaEntryByPath: (schemaPath: string) => SchemaEntry | null | undefined;
    readonly getValueByPath: (dataPath: string) => unknown;
    readonly getValuesByTag: (tagName: string) => Array<unknown>;
    readonly hasErrors: boolean;
    readonly hasInvalidType: boolean;
    readonly id: string | null | undefined | number;
    readonly isFieldModified: (dataPath: string) => boolean;
    readonly loading: boolean;
    readonly locale: IObservableValue<string> | null | undefined;
    readonly metadataOptions: {
        [key: string]: any
    } | null | undefined;
    readonly notFound: boolean;
    readonly options: SchemaOptions;
    readonly resourceKey: string | null | undefined;
    readonly schema: any;
    readonly types: {
        [key: string]: SchemaType
    };
    readonly unexpectedError: boolean;
    readonly validate: () => boolean;
}

export type FieldTypeProps<T> = {
    data: any,
    dataPath: string,
    defaultType: string | null | undefined,
    disabled: boolean | null | undefined,
    error: Error | null | undefined | ErrorCollection,
    fieldTypeOptions: any,
    formInspector: FormInspector,
    label: string | null | undefined,
    maxOccurs: number | null | undefined,
    minOccurs: number | null | undefined,
    onChange: (value: T, context?: ChangeContext) => void,
    onFinish: (
        subDataPath?: string | null | undefined,
        subSchemaPath?: string | null | undefined,
    ) => void,
    onFocus?: (target: EventTarget) => void,
    onSuccess: () => void | null | undefined,
    router: Router | null | undefined,
    schemaOptions: SchemaOptions,
    schemaPath: string,
    showAllErrors: boolean,
    types: Types | null | undefined,
    value: T | null | undefined
};
