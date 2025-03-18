"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const resourceFormStoreFactory_1 = __importDefault(require("../../stores/resourceFormStoreFactory"));
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
test('Create a ResourceFormStore with a given ResourceStore', () => {
    const resourceStore = new ResourceStore_1.default('test');
    const options = {
        test: 'value',
    };
    const metadataOptions = {
        metadataTest: 'metadataValue',
    };
    const resourceFormStore = resourceFormStoreFactory_1.default.createFromResourceStore(resourceStore, 'test', options, metadataOptions);
    expect(ResourceFormStore_1.default).toBeCalledWith(resourceStore, 'test', options, metadataOptions);
    expect(resourceFormStore).toBe(ResourceFormStore_1.default.mock.instances[0]);
});
