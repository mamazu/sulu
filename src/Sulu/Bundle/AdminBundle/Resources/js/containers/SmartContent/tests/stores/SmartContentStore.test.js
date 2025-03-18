"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const SmartContentStore_1 = __importDefault(require("../../stores/SmartContentStore"));
const ResourceRequester_1 = __importDefault(require("../../../../services/ResourceRequester"));
const Requester_1 = __importDefault(require("../../../../services/Requester"));
jest.mock('../../../../services/Config', () => ({
    endpoints: {
        items: '/api/items',
    },
}));
jest.mock('../../../../services/ResourceRequester', () => ({
    get: jest.fn(),
}));
jest.mock('../../../../services/Requester', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve({ _embedded: {} })),
}));
test('Load categories and datasource when constructed', () => {
    const locale = mobx_1.observable.box('en');
    const dataSource = { id: 4 };
    const dataSourcePromise = Promise.resolve(dataSource);
    const categories = [
        { id: 1 },
        { id: 2 },
        { id: 4 },
    ];
    const categoriesPromise = Promise.resolve({
        _embedded: {
            categories,
        },
    });
    ResourceRequester_1.default.get.mockImplementation((resourceKey) => {
        switch (resourceKey) {
            case 'pages':
                return dataSourcePromise;
            case 'categories':
                return categoriesPromise;
        }
    });
    const smartContentStore = new SmartContentStore_1.default('content', {
        audienceTargeting: undefined,
        categories: [1, 2, 4],
        categoryOperator: undefined,
        dataSource: 4,
        includeSubFolders: undefined,
        limitResult: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        presentAs: undefined,
        types: undefined,
    }, locale, 'pages');
    expect(smartContentStore.loading).toEqual(true);
    expect(ResourceRequester_1.default.get).toBeCalledWith('pages', { id: 4, locale: 'en' });
    expect(ResourceRequester_1.default.get).toBeCalledWith('categories', { ids: [1, 2, 4], locale: 'en' });
    return Promise.all([dataSourcePromise, categoriesPromise]).then(() => {
        expect(smartContentStore.loading).toEqual(false);
        expect(smartContentStore.dataSource).toEqual(dataSource);
        expect(smartContentStore.categories).toEqual(categories);
        smartContentStore.destroy();
    });
});
test('Reset dataSourceLoading if loading of dataSource fails', (done) => {
    const locale = mobx_1.observable.box('en');
    const dataSourcePromise = Promise.reject();
    ResourceRequester_1.default.get.mockReturnValue(dataSourcePromise);
    const smartContentStore = new SmartContentStore_1.default('content', {
        audienceTargeting: undefined,
        categories: undefined,
        categoryOperator: undefined,
        dataSource: 4,
        includeSubFolders: undefined,
        limitResult: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        presentAs: undefined,
        types: undefined,
    }, locale, 'pages');
    expect(smartContentStore.loading).toEqual(true);
    expect(ResourceRequester_1.default.get).toBeCalledWith('pages', { id: 4, locale: 'en' });
    setTimeout(() => {
        expect(smartContentStore.loading).toEqual(false);
        expect(smartContentStore.dataSource).toEqual(undefined);
        smartContentStore.destroy();
        done();
    });
});
test('Load items if FilterCriteria is given with datasource', () => {
    const locale = mobx_1.observable.box('en');
    const filterCriteria = {
        dataSource: 3,
        includeSubFolders: undefined,
        categories: undefined,
        categoryOperator: undefined,
        tags: undefined,
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: undefined,
    };
    const datasourcePromise = Promise.resolve({ id: 3 });
    ResourceRequester_1.default.get.mockReturnValue(datasourcePromise);
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4, {}, 'sulu_io');
    smartContentStore.start();
    return datasourcePromise.then(() => {
        expect(Requester_1.default.get)
            .toBeCalledWith('/api/items?provider=content&excluded=4&locale=en&params=%7B%7D&webspace=sulu_io&dataSource=3');
    });
});
test('Load items if FilterCriteria is given with categories', () => {
    const locale = mobx_1.observable.box('en');
    const params = { provider: { name: 'provider', value: 'content' } };
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: undefined,
        categories: [1, 5],
        categoryOperator: undefined,
        tags: undefined,
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: undefined,
    };
    const categoriesPromise = Promise.resolve({
        _embedded: {
            categories: [{ id: 1 }, { id: 5 }],
        },
    });
    ResourceRequester_1.default.get.mockReturnValue(categoriesPromise);
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4, params);
    smartContentStore.start();
    const expectedParams = '%7B%22provider%22%3A%7B%22name%22%3A%22provider%22,%22value%22%3A%22content%22%7D%7D';
    return categoriesPromise.then(() => {
        expect(Requester_1.default.get).toBeCalledWith('/api/items?provider=content&excluded=4&locale=en&params=' + expectedParams + '&categories=1,5');
    });
});
test('Load items if FilterCriteria is given with tags', () => {
    const locale = mobx_1.observable.box('en');
    const params = { provider: { name: 'provider', value: 'content' } };
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: undefined,
        categories: undefined,
        categoryOperator: undefined,
        tags: ['Tag2'],
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: undefined,
    };
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4, params);
    smartContentStore.start();
    const expectedParams = '%7B%22provider%22%3A%7B%22name%22%3A%22provider%22,%22value%22%3A%22content%22%7D%7D';
    expect(Requester_1.default.get).toBeCalledWith('/api/items?provider=content&excluded=4&locale=en&params=' + expectedParams + '&tags=Tag2');
});
test('Load items if FilterCriteria is given with types', () => {
    const locale = mobx_1.observable.box('en');
    const params = { provider: { name: 'provider', value: 'content' } };
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: undefined,
        categories: undefined,
        categoryOperator: undefined,
        tags: undefined,
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: ['default', 'homepage'],
    };
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4, params);
    smartContentStore.start();
    const expectedParams = '%7B%22provider%22%3A%7B%22name%22%3A%22provider%22,%22value%22%3A%22content%22%7D%7D';
    expect(Requester_1.default.get).toBeCalledWith('/api/items?provider=content&excluded=4&locale=en&params=' + expectedParams + '&types=default,homepage');
});
test('Load items excluding given ids', () => {
    const locale = mobx_1.observable.box('en');
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: undefined,
        categories: undefined,
        categoryOperator: undefined,
        tags: undefined,
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: undefined,
    };
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4);
    smartContentStore.setExcludedIds([1, 2, 6]);
    smartContentStore.start();
    expect(Requester_1.default.get).toBeCalledWith('/api/items?provider=content&excluded=4,1,2,6&locale=en');
});
test('Do not load items if FilterCriteria is given with empty categories and tags arrays', () => {
    const locale = mobx_1.observable.box('en');
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: undefined,
        categories: [],
        categoryOperator: undefined,
        tags: [],
        tagOperator: undefined,
        audienceTargeting: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        presentAs: undefined,
        limitResult: undefined,
        types: undefined,
    };
    new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4);
    expect(Requester_1.default.get).not.toBeCalled();
});
test('Load items and store them in the items variable', () => {
    const locale = mobx_1.observable.box('en');
    const filterCriteria = {
        dataSource: undefined,
        includeSubFolders: true,
        categories: undefined,
        categoryOperator: 'and',
        tags: ['Test1', 'Test3'],
        tagOperator: 'or',
        audienceTargeting: true,
        sortBy: 'changed',
        sortMethod: 'asc',
        presentAs: 'large',
        limitResult: 9,
        types: ['default'],
    };
    const items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ];
    const itemsPromise = Promise.resolve({
        _embedded: {
            items,
        },
    });
    Requester_1.default.get.mockReturnValue(itemsPromise);
    const smartContentStore = new SmartContentStore_1.default('content', filterCriteria, locale, 'pages', 4);
    smartContentStore.start();
    expect(Requester_1.default.get).toHaveBeenLastCalledWith('/api/items?provider=content&excluded=4&locale=en&audienceTargeting=true&categoryOperator=and'
        + '&includeSubFolders=true&limitResult=9&sortBy=changed&sortMethod=asc&tagOperator=or&tags=Test1,Test3'
        + '&types=default&presentAs=large');
    return itemsPromise.then(() => {
        expect(smartContentStore.items).toEqual(items);
        const updatedItems = [
            { id: 1 },
        ];
        const updatedItemsPromise = Promise.resolve({
            _embedded: {
                items: updatedItems,
            },
        });
        Requester_1.default.get.mockReturnValue(updatedItemsPromise);
        smartContentStore.limit = 1;
        expect(Requester_1.default.get).toHaveBeenLastCalledWith('/api/items?provider=content&excluded=4&locale=en&audienceTargeting=true&categoryOperator=and'
            + '&includeSubFolders=true&limitResult=1&sortBy=changed&sortMethod=asc&tagOperator=or&tags=Test1,Test3'
            + '&types=default&presentAs=large');
        return updatedItemsPromise.then(() => {
            expect(smartContentStore.items).toEqual(updatedItems);
        });
    });
});
test('Generate filterCriteria from current state', () => {
    const smartContentStore = new SmartContentStore_1.default('content');
    smartContentStore.dataSource = { id: 6 };
    smartContentStore.includeSubElements = true;
    smartContentStore.categories = [{ id: 4 }, { id: 8 }];
    smartContentStore.categoryOperator = 'and';
    smartContentStore.tags = ['Test1', 'Test3'];
    smartContentStore.tagOperator = 'or';
    smartContentStore.audienceTargeting = true;
    smartContentStore.sortBy = 'changed';
    smartContentStore.sortOrder = 'asc';
    smartContentStore.presentation = 'large';
    smartContentStore.limit = 9;
    smartContentStore.types = ['default'];
    expect(smartContentStore.filterCriteria).toEqual({
        audienceTargeting: true,
        categories: [4, 8],
        categoryOperator: 'and',
        dataSource: 6,
        includeSubFolders: true,
        limitResult: 9,
        presentAs: 'large',
        sortBy: 'changed',
        sortMethod: 'asc',
        tagOperator: 'or',
        tags: ['Test1', 'Test3'],
        types: ['default'],
    });
    smartContentStore.destroy();
});
test('Generate filterCriteria from current state with empty arrays', () => {
    const smartContentStore = new SmartContentStore_1.default('content');
    smartContentStore.dataSource = { id: 6 };
    smartContentStore.includeSubElements = true;
    smartContentStore.categories = [];
    smartContentStore.categoryOperator = 'and';
    smartContentStore.tags = [];
    smartContentStore.tagOperator = 'or';
    smartContentStore.audienceTargeting = true;
    smartContentStore.sortBy = 'changed';
    smartContentStore.sortOrder = 'asc';
    smartContentStore.presentation = 'large';
    smartContentStore.limit = 9;
    smartContentStore.types = [];
    expect(smartContentStore.filterCriteria).toEqual({
        audienceTargeting: true,
        categories: undefined,
        categoryOperator: 'and',
        dataSource: 6,
        includeSubFolders: true,
        limitResult: 9,
        presentAs: 'large',
        sortBy: 'changed',
        sortMethod: 'asc',
        tagOperator: 'or',
        tags: undefined,
        types: undefined,
    });
    smartContentStore.destroy();
});
test('Dispose autorun on unmount', () => {
    const smartContentStore = new SmartContentStore_1.default('content');
    const itemDisposerSpy = jest.fn();
    smartContentStore.itemDisposer = itemDisposerSpy;
    smartContentStore.destroy();
    expect(itemDisposerSpy).toBeCalledWith();
});
