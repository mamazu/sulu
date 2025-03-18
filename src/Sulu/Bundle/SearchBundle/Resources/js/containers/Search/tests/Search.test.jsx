"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const services_1 = require("sulu-admin-bundle/services");
const Search_1 = __importDefault(require("../Search"));
const indexStore_1 = __importDefault(require("../stores/indexStore"));
const searchStore_1 = __importDefault(require("../stores/searchStore"));
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../stores/indexStore', () => ({
    loadIndexes: jest.fn(),
}));
jest.mock('../stores/searchStore', () => ({
    indexName: undefined,
    query: undefined,
    results: [],
    search: jest.fn(),
    setPage: jest.fn(),
    setLimit: jest.fn(),
}));
beforeEach(() => {
    searchStore_1.default.indexName = undefined;
    searchStore_1.default.query = undefined;
    searchStore_1.default.loading = false;
    searchStore_1.default.result = [];
});
test('Render loader while loading indexes and show SearchField afterwards', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    expect(search.render()).toMatchSnapshot();
    return indexPromise.then(() => {
        search.update();
        expect(search.render()).toMatchSnapshot();
    });
});
test('Render loader while loading search results', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    searchStore_1.default.loading = true;
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        expect(search.render()).toMatchSnapshot();
    });
});
test('Render hint that nothing was found', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    searchStore_1.default.loading = false;
    searchStore_1.default.result = [];
    searchStore_1.default.query = 'something';
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        expect(search.render()).toMatchSnapshot();
    });
});
test('Render search results', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            icon: 'su-page',
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
        {
            icon: 'su-contact',
            indexName: 'contact',
            name: 'Contact',
            route: {
                name: 'sulu_contact.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    searchStore_1.default.loading = false;
    searchStore_1.default.result = [
        {
            document: {
                description: 'something',
                id: 3,
                imageUrl: '/image.jgp',
                index: 'page',
                locale: 'de',
                resource: 'page',
                title: 'Test1',
            },
        },
        {
            document: {
                description: 'something 2',
                id: 5,
                imageUrl: undefined,
                index: 'contact',
                locale: undefined,
                resource: 'contact',
                title: 'Max Mustermann',
            },
        },
    ];
    searchStore_1.default.query = 'something';
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        expect(search.render()).toMatchSnapshot();
    });
});
test('Set the query and index name from the SearchStore as start value', () => {
    const router = new services_1.Router({});
    searchStore_1.default.indexName = undefined;
    searchStore_1.default.query = 'Test';
    searchStore_1.default.indexName = 'page';
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        expect(search.find('SearchField input').prop('value')).toEqual('Test');
        expect(search.find('SearchField .indexButton .index').prop('children')).toEqual('Page');
    });
});
test('Search when the search button is clicked', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
        {
            indexName: 'contact',
            name: 'Contact',
            route: {
                name: 'sulu_contact.edit_form',
                resultToRoute: {},
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        search.find('SearchField input').prop('onChange')({ currentTarget: { value: 'Test' } });
        search.find('Icon[name="su-search"]').prop('onClick')();
        expect(searchStore_1.default.search).toBeCalledWith('Test', undefined);
    });
});
test('Navigate to route for search result item', () => {
    const router = new services_1.Router({});
    const indexes = [
        {
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {
                    id: 'id',
                    locale: 'locale',
                    'properties/webspace_key': 'webspace',
                },
            },
        },
        {
            indexName: 'contact',
            name: 'Contact',
            route: {
                name: 'sulu_contact.edit_form',
                resultToRoute: {
                    id: 'id',
                },
            },
        },
    ];
    const indexPromise = Promise.resolve(indexes);
    indexStore_1.default.loadIndexes.mockReturnValue(indexPromise);
    searchStore_1.default.loading = false;
    searchStore_1.default.result = [
        {
            document: {
                description: 'something',
                id: 3,
                imageUrl: '/image.jgp',
                index: 'page',
                locale: 'de',
                properties: {
                    webspace_key: 'example',
                },
                resource: 'page',
                title: 'Test1',
            },
        },
        {
            document: {
                description: 'something 2',
                id: 5,
                index: 'contact',
                imageUrl: '/image2.jgp',
                locale: undefined,
                resource: 'contact',
                title: 'Max Mustermann',
            },
        },
    ];
    searchStore_1.default.query = 'something';
    const search = (0, enzyme_1.mount)(<Search_1.default router={router}/>);
    return indexPromise.then(() => {
        search.update();
        search.find('SearchResult').at(1).find('div').at(0).simulate('click');
        expect(router.navigate).toHaveBeenLastCalledWith('sulu_contact.edit_form', { id: 5 });
        search.find('SearchResult').at(0).find('div').at(0).simulate('click');
        expect(router.navigate).toHaveBeenLastCalledWith('sulu_page.edit_form', { id: 3, locale: 'de', webspace: 'example' });
    });
});
