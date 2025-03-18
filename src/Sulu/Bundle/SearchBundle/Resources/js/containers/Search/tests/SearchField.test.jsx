"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SearchField_1 = __importDefault(require("../SearchField"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render without selected index', () => {
    expect((0, enzyme_1.render)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={jest.fn()} onSearch={jest.fn()}/>)).toMatchSnapshot();
});
test('Render with selected and query', () => {
    const indexes = {
        contact: {
            icon: 'su-test',
            indexName: 'contact',
            name: 'Contact',
            route: {
                name: 'sulu_contact.edit_form',
                resultToRoute: {},
            },
        },
        page: {
            icon: 'su-test',
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    };
    expect((0, enzyme_1.render)(<SearchField_1.default indexes={indexes} indexName="page" onIndexChange={jest.fn()} onQueryChange={jest.fn()} onSearch={jest.fn()} query="Test"/>)).toMatchSnapshot();
});
test('Call callback when index changes', () => {
    const indexChangeSpy = jest.fn();
    const indexes = {
        contact: {
            icon: 'su-test',
            indexName: 'contact',
            name: 'Contact',
            route: {
                name: 'sulu_contact.edit_form',
                resultToRoute: {},
            },
        },
        page: {
            icon: 'su-test',
            indexName: 'page',
            name: 'Page',
            route: {
                name: 'sulu_page.edit_form',
                resultToRoute: {},
            },
        },
    };
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={indexes} indexName="page" onIndexChange={indexChangeSpy} onQueryChange={jest.fn()} onSearch={jest.fn()}/>);
    expect(searchField.find('ArrowMenu').prop('open')).toEqual(false);
    searchField.find('button.indexButton').simulate('click');
    expect(searchField.find('ArrowMenu').prop('open')).toEqual(true);
    searchField.find('Item[value="contact"] button').simulate('click');
    expect(searchField.find('ArrowMenu').prop('open')).toEqual(false);
    expect(indexChangeSpy).toBeCalledWith('contact');
});
test('Call callback when query changes', () => {
    const queryChangeSpy = jest.fn();
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={queryChangeSpy} onSearch={jest.fn()}/>);
    searchField.find('input.input').prop('onChange')({ currentTarget: { value: 'test' } });
    expect(queryChangeSpy).toBeCalledWith('test');
});
test('Call search with query when enter is pressed', () => {
    const searchSpy = jest.fn();
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={jest.fn()} onSearch={searchSpy} query="Test"/>);
    searchField.find('input.input').prop('onKeyPress')({ key: 'Enter' });
    expect(searchSpy).toBeCalledWith();
});
test('Do not call search when other key than enter is pressed', () => {
    const searchSpy = jest.fn();
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={jest.fn()} onSearch={searchSpy} query="Test"/>);
    searchField.find('input.input').prop('onKeyPress')({ key: 'a' });
    expect(searchSpy).not.toBeCalledWith();
});
test('Call search with query when search icon is clicked', () => {
    const searchSpy = jest.fn();
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={jest.fn()} onSearch={searchSpy} query="Test"/>);
    searchField.find('Icon[name="su-search"]').prop('onClick')();
    expect(searchSpy).toBeCalledWith();
});
test('Remove query when clear icon is clicked', () => {
    const searchSpy = jest.fn();
    const queryChangeSpy = jest.fn();
    const searchField = (0, enzyme_1.mount)(<SearchField_1.default indexes={undefined} indexName={undefined} onIndexChange={jest.fn()} onQueryChange={queryChangeSpy} onSearch={searchSpy} query="Test"/>);
    searchField.find('Icon[name="su-times"]').prop('onClick')();
    expect(searchSpy).toBeCalledWith();
    expect(queryChangeSpy).toBeCalledWith(undefined);
});
