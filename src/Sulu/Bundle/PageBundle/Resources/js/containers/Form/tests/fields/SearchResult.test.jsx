"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const SearchResult_1 = __importDefault(require("../../fields/SearchResult"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (formStore) {
        this.getValueByPath = jest.fn();
        this.locale = formStore.locale;
    }),
    ResourceFormStore: jest.fn(function (resourceStore) {
        this.locale = resourceStore.locale;
    }),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(function (resourceKey, id, observableOptions = {}) {
        this.locale = observableOptions.locale;
    }),
}));
test('Pass correct fields to SearchResult component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/ext/seo/description':
                return 'SEO description';
            case '/ext/seo/title':
                return 'SEO title';
            case '/url':
                return '/url';
        }
    });
    const searchResult = (0, enzyme_1.shallow)(<SearchResult_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector}/>);
    expect(searchResult.prop('description')).toEqual('SEO description');
    expect(searchResult.prop('title')).toEqual('SEO title');
    expect(searchResult.prop('url')).toEqual('www.example.org/url');
});
test('Pass correct fields to SearchResult component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/ext/seo/description':
                return 'SEO description';
            case '/ext/seo/title':
                return 'SEO title';
            case '/url':
                return '/url';
        }
    });
    const searchResult = (0, enzyme_1.shallow)(<SearchResult_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector}/>);
    expect(searchResult.prop('description')).toEqual('SEO description');
    expect(searchResult.prop('title')).toEqual('SEO title');
    expect(searchResult.prop('url')).toEqual('www.example.org/en/url');
});
