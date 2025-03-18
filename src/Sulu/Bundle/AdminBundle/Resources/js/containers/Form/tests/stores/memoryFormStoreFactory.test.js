"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryFormStore_1 = __importDefault(require("../../stores/MemoryFormStore"));
const memoryFormStoreFactory_1 = __importDefault(require("../../stores/memoryFormStoreFactory"));
const metadataStore_1 = __importDefault(require("../../stores/metadataStore"));
const SchemaFormStoreDecorator_1 = __importDefault(require("../../stores/SchemaFormStoreDecorator"));
jest.mock('../../stores/metadataStore', () => ({
    getJsonSchema: jest.fn(),
    getSchema: jest.fn(),
}));
test('Create a MemoryFormStore with schema', (done) => {
    const schema = {
        title: {},
    };
    const jsonSchema = {
        type: 'object',
        required: [],
    };
    const schemaPromise = Promise.resolve(schema);
    const jsonSchemaPromise = Promise.resolve(jsonSchema);
    metadataStore_1.default.getSchema.mockReturnValue(schemaPromise);
    metadataStore_1.default.getJsonSchema.mockReturnValue(jsonSchemaPromise);
    const metadataOptions = { test: 'value' };
    const memoryFormStore = memoryFormStoreFactory_1.default.createFromFormKey('test', {}, undefined, 'type', metadataOptions);
    expect(memoryFormStore).toBeInstanceOf(SchemaFormStoreDecorator_1.default);
    expect(metadataStore_1.default.getSchema).toBeCalledWith('test', 'type', { test: 'value' });
    expect(metadataStore_1.default.getJsonSchema).toBeCalledWith('test', 'type', { test: 'value' });
    return Promise.all([schemaPromise, jsonSchemaPromise]).then(() => {
        expect(memoryFormStore.innerFormStore).toBeInstanceOf(MemoryFormStore_1.default);
        expect(memoryFormStore.schema).toEqual(schema);
        expect(memoryFormStore.metadataOptions).toEqual(metadataOptions);
        done();
    });
});
