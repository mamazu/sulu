"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("url-search-params-polyfill");
const PaginatedLoadingStrategy_1 = __importDefault(require("../../loadingStrategies/PaginatedLoadingStrategy"));
const ResourceRequester_1 = __importDefault(require("../../../../services/ResourceRequester"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../services/ResourceRequester', () => ({
    getList: jest.fn().mockReturnValue(Promise.resolve({
        _embedded: {
            snippets: [],
        },
    })),
}));
jest.mock('../../../List/stores/metadataStore', () => ({
    getSchema: jest.fn().mockReturnValue(Promise.resolve()),
}));
class StructureStrategy {
    constructor() {
        this.addItem = jest.fn();
        this.clear = jest.fn();
        this.data = [];
        this.findById = jest.fn();
        this.remove = jest.fn();
        this.order = jest.fn();
        this.visibleItems = [];
    }
}
test('Should load items and add to empty array', () => {
    const paginatedLoadingStrategy = new PaginatedLoadingStrategy_1.default();
    const structureStrategy = new StructureStrategy();
    paginatedLoadingStrategy.setStructureStrategy(structureStrategy);
    const promise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 2 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(promise);
    paginatedLoadingStrategy.load('snippets', {
        page: 2,
    }, undefined);
    return promise.then(() => {
        expect(structureStrategy.clear).toBeCalledWith(undefined);
        expect(structureStrategy.addItem).toBeCalledWith({ id: 1 }, undefined);
        expect(structureStrategy.addItem).toBeCalledWith({ id: 2 }, undefined);
    });
});
test('Should load items and replace existing entries in array', () => {
    const paginatedLoadingStrategy = new PaginatedLoadingStrategy_1.default();
    const structureStrategy = new StructureStrategy();
    paginatedLoadingStrategy.setStructureStrategy(structureStrategy);
    const promise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 2 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(promise);
    const parentId = 15;
    paginatedLoadingStrategy.load('snippets', {
        page: 1,
        locale: 'en',
    }, parentId);
    return promise.then(() => {
        expect(structureStrategy.clear).toBeCalledWith(parentId);
        expect(structureStrategy.addItem).toBeCalledWith({ id: 1 }, parentId);
        expect(structureStrategy.addItem).toBeCalledWith({ id: 2 }, parentId);
    });
});
test('Should load items with correct options', () => {
    const paginatedLoadingStrategy = new PaginatedLoadingStrategy_1.default();
    const structureStrategy = new StructureStrategy();
    paginatedLoadingStrategy.setStructureStrategy(structureStrategy);
    paginatedLoadingStrategy.load('snippets', {
        page: 2,
        limit: 10,
        locale: 'en',
    }, undefined);
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', { limit: 10, page: 2, locale: 'en' });
});
