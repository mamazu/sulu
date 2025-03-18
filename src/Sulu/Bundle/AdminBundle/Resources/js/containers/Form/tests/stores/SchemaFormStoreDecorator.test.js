"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadataStore_1 = __importDefault(require("../../stores/metadataStore"));
const SchemaFormStoreDecorator_1 = __importDefault(require("../../stores/SchemaFormStoreDecorator"));
jest.mock('../../stores/metadataStore', () => ({
    getJsonSchema: jest.fn(),
    getSchema: jest.fn(),
}));
test('Call given initializer with correct properties', () => {
    const schema = { title: {} };
    const schemaPromise = Promise.resolve(schema);
    metadataStore_1.default.getSchema.mockReturnValue(schemaPromise);
    const jsonSchema = { schema: {} };
    const jsonSchemaPromise = Promise.resolve(jsonSchema);
    metadataStore_1.default.getJsonSchema.mockReturnValue(jsonSchemaPromise);
    const mockedStore = jest.fn();
    const initializerSpy = jest.fn().mockReturnValue(mockedStore);
    const schemaFormStore = new SchemaFormStoreDecorator_1.default(initializerSpy, 'test', 'type', {});
    expect(metadataStore_1.default.getSchema).toBeCalledWith('test', 'type', {});
    expect(metadataStore_1.default.getJsonSchema).toBeCalledWith('test', 'type', {});
    return Promise.all([schemaPromise, jsonSchemaPromise]).then(() => {
        expect(initializerSpy).toBeCalledWith(schema, jsonSchema);
        expect(schemaFormStore.innerFormStore).toEqual(mockedStore);
    });
});
test('Forward method calls after inner formstore was initialized', () => {
    const schema = { title: {} };
    const schemaPromise = Promise.resolve(schema);
    metadataStore_1.default.getSchema.mockReturnValue(schemaPromise);
    const jsonSchema = { schema: {} };
    const jsonSchemaPromise = Promise.resolve(jsonSchema);
    metadataStore_1.default.getJsonSchema.mockReturnValue(jsonSchemaPromise);
    const changeSpy = jest.fn();
    const changeTypeSpy = jest.fn();
    const changeMultipleSpy = jest.fn();
    const destroySpy = jest.fn();
    const finishFieldSpy = jest.fn();
    const initializer = () => ({
        change: changeSpy,
        changeType: changeTypeSpy,
        changeMultiple: changeMultipleSpy,
        destroy: destroySpy,
        finishField: finishFieldSpy,
    });
    const schemaFormStore = new SchemaFormStoreDecorator_1.default(initializer, 'test', 'type', {});
    schemaFormStore.change('data-path', 'value', { isServerValue: true });
    schemaFormStore.changeType('new-type', { isServerValue: true });
    schemaFormStore.changeMultiple({ propertyName: 'propertyValue' }, { isServerValue: true });
    schemaFormStore.destroy();
    schemaFormStore.finishField('data-path-123');
    expect(changeSpy).not.toBeCalled();
    expect(changeTypeSpy).not.toBeCalled();
    expect(changeMultipleSpy).not.toBeCalled();
    expect(destroySpy).not.toBeCalled();
    expect(finishFieldSpy).not.toBeCalled();
    return Promise.all([schemaPromise, jsonSchemaPromise]).then(() => {
        expect(changeSpy).toBeCalledWith('data-path', 'value', { isServerValue: true });
        expect(changeTypeSpy).toBeCalledWith('new-type', { isServerValue: true });
        expect(changeMultipleSpy).toBeCalledWith({ propertyName: 'propertyValue' }, { isServerValue: true });
        expect(destroySpy).toBeCalledWith();
        expect(finishFieldSpy).toBeCalledWith('data-path-123');
    });
});
