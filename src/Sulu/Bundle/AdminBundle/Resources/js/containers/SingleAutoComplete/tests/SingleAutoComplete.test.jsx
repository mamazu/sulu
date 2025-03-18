"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const SingleAutoComplete_1 = __importDefault(require("../SingleAutoComplete"));
const SingleAutoComplete_2 = __importDefault(require("../../../components/SingleAutoComplete"));
const SearchStore_1 = __importDefault(require("../../../stores/SearchStore"));
const SingleSelectionStore_1 = __importDefault(require("../../../stores/SingleSelectionStore"));
jest.mock('../../../stores/SearchStore', () => jest.fn());
jest.mock('../../../stores/SingleSelectionStore', () => jest.fn(function (resourceKey, selectedItemId, locale) {
    this.resourceKey = resourceKey;
    this.locale = locale;
    this.set = jest.fn();
    this.loading = false;
    (0, mobx_1.extendObservable)(this, { item: selectedItemId ? { id: selectedItemId } : undefined });
}));
test('Render in loading state when SearchStore is loading', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    const singleAutoComplete = (0, enzyme_1.shallow)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(singleAutoComplete.find('SingleAutoComplete').prop('loading')).toBeTruthy();
});
test('Render in loading state when SingleSelectionStore is loading', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    selectionStore.loading = true;
    const singleAutoComplete = (0, enzyme_1.shallow)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    expect(singleAutoComplete.find('SingleAutoComplete').prop('loading')).toBeTruthy();
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
    const selectionStore = new SingleSelectionStore_1.default('tags');
    const singleAutoComplete = (0, enzyme_1.mount)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={['name', 'number']} selectionStore={selectionStore}/>);
    singleAutoComplete.find(SingleAutoComplete_2.default).instance().displaySuggestions = true;
    singleAutoComplete.update();
    expect(singleAutoComplete.find('SingleAutoComplete').find('Suggestion').at(0).prop('value'))
        .toEqual(suggestions[0]);
    expect(singleAutoComplete.find('SingleAutoComplete').find('Suggestion').at(1).prop('value'))
        .toEqual(suggestions[1]);
});
test('Render with value of given SingleSelectionStore', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    selectionStore.item = { id: 7, name: 'James Bond', number: '007' };
    expect((0, enzyme_1.render)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>)).toMatchSnapshot();
});
test('Render in disabled state', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = true;
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    selectionStore.item = { id: 7, name: 'James Bond', number: '007' };
    expect((0, enzyme_1.render)(<SingleAutoComplete_1.default disabled={true} displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>)).toMatchSnapshot();
});
test('Search using store when new search value is retrieved from SingleAutoComplete component', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
        this.search = jest.fn();
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    const singleAutoComplete = (0, enzyme_1.shallow)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    singleAutoComplete.find('SingleAutoComplete').simulate('search', 'James');
    expect(singleAutoComplete.instance().searchStore.search).toBeCalledWith('James');
});
test('Call set item to SingleSelectionStore and clear search result when chosen option has changed', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [data];
        this.loading = false;
        this.clearSearchResults = jest.fn();
    });
    const selectionStore = new SingleSelectionStore_1.default('tags');
    const data = {
        id: 7,
        name: 'James Bond',
        number: '007',
    };
    const singleAutoComplete = (0, enzyme_1.shallow)(<SingleAutoComplete_1.default displayProperty="name" searchProperties={[]} selectionStore={selectionStore}/>);
    singleAutoComplete.find('SingleAutoComplete').simulate('change', data);
    expect(selectionStore.set).toBeCalledWith(data);
    expect(singleAutoComplete.instance().searchStore.clearSearchResults).toBeCalledWith();
});
test('Construct SearchStore with correct parameters on mount', () => {
    SearchStore_1.default.mockImplementation(function () {
        this.searchResults = [];
        this.loading = false;
        this.search = jest.fn();
    });
    const locale = mobx_1.observable.box('cz');
    const selectionStore = new SingleSelectionStore_1.default('tags', undefined, locale);
    (0, enzyme_1.shallow)(<SingleAutoComplete_1.default displayProperty="name" options={{ country: 'US' }} searchProperties={['firstName', 'lastName']} selectionStore={selectionStore}/>);
    expect(SearchStore_1.default).toBeCalledWith('tags', ['firstName', 'lastName'], { country: 'US' }, locale);
});
