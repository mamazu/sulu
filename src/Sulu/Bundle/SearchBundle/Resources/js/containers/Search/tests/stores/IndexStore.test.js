"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const indexStore_1 = __importDefault(require("../../stores/indexStore"));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    getList: jest.fn().mockReturnValue({
        then: jest.fn(),
    }),
}));
beforeEach(() => {
    indexStore_1.default.clear();
});
test('Load indexes', () => {
    const response = {
        _embedded: {
            search_indexes: [
                {
                    indexName: 'contact',
                    name: 'People',
                },
                {
                    indexName: 'page_example',
                    name: 'example.com',
                },
            ],
        },
    };
    const promise = Promise.resolve(response);
    services_1.ResourceRequester.getList.mockReturnValue(promise);
    const indexPromise = indexStore_1.default.loadIndexes();
    expect(services_1.ResourceRequester.getList).toBeCalledWith('search_indexes');
    return indexPromise.then((webspaces) => {
        // check if promise have been cached
        expect(indexStore_1.default.indexPromise).toEqual(promise);
        expect(webspaces).toBe(response._embedded.search_indexes);
    });
});
