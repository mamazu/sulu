"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadataStore_1 = __importDefault(require("../../stores/metadataStore"));
const metadataStore_2 = __importDefault(require("../../../../stores/metadataStore"));
jest.mock('../../../../stores/metadataStore', () => ({
    loadMetadata: jest.fn(),
}));
test('Return list fields for given resourceKey from MetadataStore', () => {
    const promise = Promise.resolve();
    metadataStore_2.default.loadMetadata.mockReturnValue(promise);
    const snippetPromise = metadataStore_1.default.getSchema('snippets', { id: 10 });
    expect(metadataStore_2.default.loadMetadata).toHaveBeenLastCalledWith('list', 'snippets', { id: 10 });
    const contactPromise = metadataStore_1.default.getSchema('contacts');
    expect(metadataStore_2.default.loadMetadata).toHaveBeenLastCalledWith('list', 'contacts', undefined);
    const contactPromise2 = metadataStore_1.default.getSchema('contacts', undefined);
    expect(metadataStore_2.default.loadMetadata).toHaveBeenLastCalledWith('list', 'contacts', undefined);
    expect(snippetPromise).toEqual(promise);
    expect(contactPromise).toEqual(promise);
    expect(contactPromise2).toEqual(promise);
});
