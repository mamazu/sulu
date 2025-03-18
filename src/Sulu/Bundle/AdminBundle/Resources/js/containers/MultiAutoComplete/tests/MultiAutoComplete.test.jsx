"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const MultiAutoComplete_1 = __importDefault(require("../MultiAutoComplete"));
const MultiAutoComplete_2 = __importDefault(require("../../../components/MultiAutoComplete"));
const SearchStore_1 = __importDefault(require("../../../stores/SearchStore"));
const MultiSelectionStore_1 = __importDefault(require("../../../stores/MultiSelectionStore"));
jest.mock('../../../stores/SearchStore', () => jest.fn());
jest.mock('../../../stores/MultiSelectionStore', () => jest.fn(function (resourceKey, selectedItemIds, locale) {
    this.resourceKey = resourceKey;
    this.locale = locale;
    this.set = jest.fn();
    this.loading = false;
    (0, mobx_1.extendObservable)(this, {
        ids: [],
        items: [],
    });
}));
test('Render in loading state', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    expect((0, enzyme_1.render)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>)).toMatchSnapshot();
});
test('Should assign input as ref to inputRef', () => {
    const inputRefSpy = jest.fn();
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.mount)(<MultiAutoComplete_1.default displayProperty="name" inputRef={inputRefSpy} searchProperties={[]} selectionStore={selectionStore}/>);
    expect(inputRefSpy).toBeCalledWith(multiAutoComplete.find('input').instance());
});
test('Pass loading flag if MultiSelectionStore and SearchStore is loading', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    selectionStore.loading = true;
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(multiAutoComplete.find('MultiAutoComplete').prop('loading')).toEqual(true);
});
test('Pass loading flag if only SearchStore is loading', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(multiAutoComplete.find('MultiAutoComplete').prop('loading')).toEqual(true);
});
test('Pass loading flag if only MultiSelectionStore is loading', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    selectionStore.loading = true;
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(multiAutoComplete.find('MultiAutoComplete').prop('loading')).toEqual(true);
});
test('Pass allowAdd and idProperty prop to component', () => {
    SearchStore_1.default.mockImplementation(function () { });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default allowAdd={true} displayProperty="name" idProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(multiAutoComplete.find('MultiAutoComplete').props()).toEqual(expect.objectContaining({
        allowAdd: true,
        idProperty: 'name',
    }));
});
test('Render with loaded suggestions', () => {
    const suggestions = [
        { id: 7, number: '007', name: 'James Bond' },
        { id: 6, number: '006', name: 'John Doe' },
    ];
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = suggestions;
        this.loading = false;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.mount)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={['name', 'number']} selectionStore={selectionStore}/>);
    multiAutoComplete.find(MultiAutoComplete_2.default).instance().displaySuggestions = true;
    multiAutoComplete.update();
    expect(multiAutoComplete.find('MultiAutoComplete').find('Suggestion').at(0).prop('value'))
        .toEqual(suggestions[0]);
    expect(multiAutoComplete.find('MultiAutoComplete').find('Suggestion').at(1).prop('value'))
        .toEqual(suggestions[1]);
});
test('Render with given value', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.mount)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    selectionStore.items = [
        { id: 1, name: 'James Bond', number: '007' },
        { id: 2, name: 'John Doe', number: '005' },
    ];
    expect(multiAutoComplete.render()).toMatchSnapshot();
});
test('Render in disabled state', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.mount)(<MultiAutoComplete_1.default disabled={true} displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    selectionStore.items = [
        { id: 1, name: 'James Bond', number: '007' },
        { id: 2, name: 'John Doe', number: '005' },
    ];
    expect(multiAutoComplete.render()).toMatchSnapshot();
});
test('Search using store when new search value is retrieved from MultiAutoComplete component', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
        this.search = jest.fn();
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    multiAutoComplete.find('MultiAutoComplete').simulate('search', 'James');
    expect(multiAutoComplete.instance().searchStore.search).toBeCalledWith('James', []);
});
test('Search using store with excluded-ids when new search value is retrieved from MultiAutoComplete component', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
        this.search = jest.fn();
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const multiAutoComplete = (0, enzyme_1.shallow)(<MultiAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    selectionStore.ids = [1, 3];
    multiAutoComplete.find('MultiAutoComplete').simulate('search', 'James');
    expect(multiAutoComplete.instance().searchStore.search).toBeCalledWith('James', [1, 3]);
});
test('Clear search result when chosen option has been selected with idProperty', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [data];
        this.loading = false;
        this.clearSearchResults = jest.fn();
    });
    const selectionStore = new MultiSelectionStore_1.default('contact', []);
    const data = {
        id: 7,
        name: 'James Bond',
        number: '007',
    };
    const multiAutoComplete = (0, enzyme_1.mount)(<MultiAutoComplete_1.default displayProperty="name" idProperty="number" searchProperties={[]} selectionStore={selectionStore}/>);
    multiAutoComplete.find('MultiAutoComplete > MultiAutoComplete').prop('onChange')(data);
    expect(selectionStore.set).toBeCalledWith(data);
    expect(multiAutoComplete.instance().searchStore.clearSearchResults).toBeCalledWith();
});
test('Construct SearchStore with correct parameters on mount', () => {
    SearchStore_1.default.mockImplementation(function () { });
    const locale = mobx_1.observable.box('de');
    const selectionStore = new MultiSelectionStore_1.default('contact', [], locale);
    (0, enzyme_1.shallow)(<MultiAutoComplete_1.default allowAdd={true} displayProperty="name" idProperty="name" options={{ country: 'US' }} searchProperties={['firstName', 'lastName']} selectionStore={selectionStore}/>);
    expect(SearchStore_1.default).toBeCalledWith('contact', ['firstName', 'lastName'], { country: 'US' }, locale);
});
