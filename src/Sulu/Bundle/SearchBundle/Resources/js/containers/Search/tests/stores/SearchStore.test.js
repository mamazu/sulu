"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const searchStore_1 = __importDefault(require("../../stores/searchStore"));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    getList: jest.fn(),
}));
beforeEach(() => {
    searchStore_1.default.search(undefined);
});
test.each([
    ['test1', undefined, 1, 10],
    ['test2', undefined, 1, undefined],
    ['test1', 'page', 1, undefined],
    ['test2', 'snippet', 1, undefined],
])('Search results for "%s" in index "%s" should be loaded from server', (query, index, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [
        { id: 1 },
    ];
    const searchPromise = Promise.resolve({
        _embedded: {
            result,
        },
    });
    services_1.ResourceRequester.getList.mockReturnValue(searchPromise);
    expect(searchStore_1.default.loading).toEqual(false);
    searchStore_1.default.search(query, index);
    expect(services_1.ResourceRequester.getList).toBeCalledWith('search', { q: query, index, page, limit });
    expect(searchStore_1.default.loading).toEqual(true);
    yield searchPromise; // Wait for the promise to resolve
    return searchPromise.then(() => {
        expect(searchStore_1.default.loading).toEqual(false);
        expect(searchStore_1.default.result).toEqual(result);
    });
}));
test('Do not send search request when no search term is given and reset to empty array', () => {
    searchStore_1.default.search(undefined);
    expect(services_1.ResourceRequester.getList).not.toBeCalled();
    expect(searchStore_1.default.result).toEqual([]);
});
