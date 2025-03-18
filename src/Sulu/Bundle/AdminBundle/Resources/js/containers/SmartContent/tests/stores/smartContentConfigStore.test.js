"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const smartContentConfigStore_1 = __importDefault(require("../../stores/smartContentConfigStore"));
beforeEach(() => {
    smartContentConfigStore_1.default.clear();
});
test('Set config and return config for given provider', () => {
    const mediaProviderConfig = {
        audienceTargeting: true,
        categories: true,
        datasourceResourceKey: 'collections',
        datasourceAdapter: 'table',
        tags: true,
        presentAs: true,
        sorting: [],
        limit: true,
        types: [
            { name: 'default', value: 'default' },
            { name: 'homepage', value: 'homepage' },
        ],
    };
    const contentProviderConfig = {
        audienceTargeting: true,
        categories: true,
        datasourceResourceKey: 'pages',
        datasourceAdapter: 'column_list',
        tags: true,
        presentAs: true,
        sorting: [],
        limit: true,
        types: [
            { name: 'default', value: 'default' },
            { name: 'homepage', value: 'homepage' },
        ],
    };
    smartContentConfigStore_1.default.setConfig({
        media: mediaProviderConfig,
        content: contentProviderConfig,
    });
    expect(smartContentConfigStore_1.default.getConfig('media')).toBe(mediaProviderConfig);
    expect(smartContentConfigStore_1.default.getConfig('content')).toBe(contentProviderConfig);
});
test('Return default value for given provider with presentations', () => {
    const mediaProviderConfig = {
        audienceTargeting: false,
        categories: false,
        datasourceResourceKey: 'collections',
        datasourceAdapter: 'table',
        tags: false,
        presentAs: false,
        sorting: [],
        limit: false,
        types: [],
    };
    const pagesProviderConfig = {
        audienceTargeting: true,
        categories: true,
        datasourceResourceKey: 'pages',
        datasourceAdapter: 'column_list',
        tags: true,
        presentAs: true,
        sorting: [{ name: 'title', value: 'Title' }],
        limit: true,
        types: [{ name: 'default', value: 'default' }],
    };
    smartContentConfigStore_1.default.setConfig({
        media: mediaProviderConfig,
        pages: pagesProviderConfig,
    });
    expect(smartContentConfigStore_1.default.getDefaultValue('pages', [{ name: 'two', value: 'Two columns' }]))
        .toEqual({
        audienceTargeting: false,
        categories: undefined,
        categoryOperator: 'or',
        dataSource: undefined,
        includeSubFolders: false,
        limitResult: undefined,
        presentAs: 'two',
        sortBy: 'title',
        sortMethod: 'asc',
        tagOperator: 'or',
        tags: undefined,
        types: ['default'],
    });
    expect(smartContentConfigStore_1.default.getDefaultValue('media', []))
        .toEqual({
        audienceTargeting: undefined,
        categories: undefined,
        categoryOperator: undefined,
        dataSource: undefined,
        includeSubFolders: false,
        limitResult: undefined,
        presentAs: undefined,
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        types: undefined,
    });
});
