"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const MultiSelection_1 = __importDefault(require("../MultiSelection"));
const MultiSelectionStore_1 = __importDefault(require("../../../stores/MultiSelectionStore"));
const MultiItemSelection_1 = __importDefault(require("../../../components/MultiItemSelection"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../containers/List', () => (function List() {
    return <div className="list"/>;
}));
jest.mock('../../../containers/List/stores/ListStore', () => jest.fn(function (resourceKey, listKey, userSettingsKey, observableOptions) {
    this.clearSelection = jest.fn();
    this.destroy = jest.fn();
    this.resourceKey = resourceKey;
    this.listKey = listKey;
    this.observableOptions = observableOptions;
    this.select = jest.fn();
    this.setActive = jest.fn();
    this.clear = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        selections: [],
    });
}));
jest.mock('../../../stores/MultiSelectionStore', () => jest.fn(function () {
    this.set = jest.fn();
    this.move = jest.fn();
    this.removeById = jest.fn();
    this.loadItems = jest.fn();
    this.setRequestParameters = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        items: [],
    });
}));
beforeEach(() => {
    const body = document.body;
    if (body) {
        body.innerHTML = '';
    }
});
test('Show with passed icon and label and open overlay', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [{ id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' }, { id: 5, title: 'Title 5' }];
        this.loadItems = jest.fn();
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" displayProperties={['id', 'title']} icon="su-document" label="Select Snippets" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('Button[icon="su-document"]').simulate('click');
    expect(selection.render()).toMatchSnapshot();
});
test('Pass correct props to MultiItemSelection component', () => {
    const multiSelection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" disabled={true} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" sortable={false}/>);
    expect(multiSelection.find('MultiItemSelection').prop('disabled')).toEqual(true);
    expect(multiSelection.find('MultiItemSelection').prop('sortable')).toEqual(false);
});
test('Render with disabled item', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            { id: 1 },
            { id: 2 },
        ];
    });
    const multiSelection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" disabledIds={[2, 4]} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    expect(multiSelection.find('Item').at(0).prop('disabled')).toEqual(false);
    expect(multiSelection.find('Item').at(1).prop('disabled')).toEqual(true);
});
test('Pass locale to MultiListOverlay', () => {
    const locale = mobx_1.observable.box('de');
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" locale={locale} onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    expect(selection.find('MultiListOverlay').prop('locale').get()).toEqual('de');
});
test('Pass options to MultiListOverlay', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={jest.fn()} options={{ types: 'test' }} overlayTitle="Selection" resourceKey="snippets"/>);
    expect(selection.find('MultiListOverlay').prop('options')).toEqual({ types: 'test' });
});
test('Pass disabledIds to MultiListOverlay', () => {
    const disabledIds = [1, 2, 4];
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" disabledIds={disabledIds} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    expect(selection.find('MultiListOverlay').prop('disabledIds')).toEqual(disabledIds);
});
test('Pass itemDisabledCondition to MultiListOverlay', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" itemDisabledCondition='status == "inactive"' listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    expect(selection.find('MultiListOverlay').prop('itemDisabledCondition')).toEqual('status == "inactive"');
});
test('Construct MultiSelectionStore with correct parameters', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<MultiSelection_1.default adapter="table" displayProperties={['id', 'title']} listKey="snippets" locale={locale} onChange={jest.fn()} options={{ key: 'value-1' }} overlayTitle="Selection" resourceKey="snippets" value={[1, 2, 5]}/>);
    expect(MultiSelectionStore_1.default).toBeCalledWith('snippets', [1, 2, 5], locale, 'ids', { key: 'value-1' });
});
test('Update requestParameters and reload items of MultiSelectionStore when options prop is changed', () => {
    const locale = mobx_1.observable.box('en');
    const selection = (0, enzyme_1.shallow)(<MultiSelection_1.default adapter="table" displayProperties={['id', 'title']} listKey="snippets" locale={locale} onChange={jest.fn()} options={{ key: 'value-1' }} overlayTitle="Selection" resourceKey="snippets" value={[1, 2, 5]}/>);
    expect(selection.instance().selectionStore.setRequestParameters).not.toBeCalled();
    expect(selection.instance().selectionStore.loadItems).not.toBeCalled();
    selection.setProps({
        options: { key: 'value-2' },
    });
    expect(selection.instance().selectionStore.setRequestParameters).toBeCalledWith({ key: 'value-2' });
    expect(selection.instance().selectionStore.loadItems).toBeCalledWith([1, 2, 5]);
});
test('Not reload items of MultiSelectionStore when new value of option prop is equal to old value', () => {
    const locale = mobx_1.observable.box('en');
    const selection = (0, enzyme_1.shallow)(<MultiSelection_1.default adapter="table" displayProperties={['id', 'title']} listKey="snippets" locale={locale} onChange={jest.fn()} options={{ key: 'value-1' }} overlayTitle="Selection" resourceKey="snippets" value={[]}/>);
    expect(selection.instance().selectionStore.setRequestParameters).not.toBeCalled();
    expect(selection.instance().selectionStore.loadItems).not.toBeCalled();
    selection.setProps({
        options: { key: 'value-1' },
    });
    expect(selection.instance().selectionStore.setRequestParameters).not.toBeCalled();
    expect(selection.instance().selectionStore.loadItems).not.toBeCalled();
});
test('Should not open an overlay on icon-click when disabled', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" disabled={true} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    selection.update();
    expect(selection.find('MultiListOverlay').prop('open')).toEqual(false);
});
test('Should close an overlay using the close button', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const closeButton = document.querySelector('.su-times');
    if (closeButton) {
        closeButton.click();
    }
    selection.update();
    expect(selection.find('MultiListOverlay').prop('open')).toEqual(false);
});
test('Should close an overlay using the confirm button', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    listStore.selections = [1];
    const confirmButton = document.querySelector('button.primary');
    if (confirmButton) {
        confirmButton.click();
    }
    selection.update();
    expect(selection.find('MultiListOverlay').prop('open')).toEqual(false);
});
test('Should call the onChange callback when clicking the confirm button', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    listStore.selections = [3, 7, 2];
    const confirmButton = document.querySelector('button.primary');
    if (confirmButton) {
        confirmButton.click();
    }
    expect(selection.instance().selectionStore.set).toBeCalledWith([3, 7, 2]);
});
test('Should not call the onChange callback when items have not changed', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[1]}/>);
    expect(changeSpy).not.toBeCalled();
    selection.instance().selectionStore.items = [{ id: 1 }];
    selection.setProps({ value: [1] });
    expect(changeSpy).not.toBeCalled();
});
test('Should call the onItemClick callback when an item was clicked', () => {
    const itemClickSpy = jest.fn();
    const item1 = { id: 1, title: 'Title 1' };
    const item2 = { id: 2, title: 'Title 2' };
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            item1,
            item2,
        ];
        this.loadItems = jest.fn();
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" displayProperties={['id', 'title']} icon="su-document" label="Select Snippets" listKey="snippets" onChange={jest.fn()} onItemClick={itemClickSpy} overlayTitle="Selection" resourceKey="snippets"/>);
    selection.find('.content').at(0).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith(1, item1);
    selection.find('.content').at(1).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith(2, item2);
});
test('Should load the items if value prop changes', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[1]}/>);
    selection.setProps({ value: [1, 3] });
    expect(selection.instance().selectionStore.loadItems).toBeCalledWith([1, 3]);
});
test('Should instantiate the ListStore with the correct resourceKey and destroy it on unmount', () => {
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="pages_list" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages"/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    expect(listStore.listKey).toEqual('pages_list');
    expect(listStore.resourceKey).toEqual('pages');
    selection.unmount();
    expect(listStore.destroy).toBeCalled();
});
test('Should instantiate the ListStore with the preselected ids', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [{ id: 1 }, { id: 5 }, { id: 8 }];
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    expect(listStore.select).toBeCalledWith({ id: 1 });
    expect(listStore.select).toBeCalledWith({ id: 5 });
    expect(listStore.select).toBeCalledWith({ id: 8 });
});
test('Should reinstantiate the ListStore with the preselected ids when new props are received', () => {
    const locale = mobx_1.observable.box('en');
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [{ id: 1 }, { id: 5 }, { id: 8 }];
        this.loadItems = jest.fn();
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" locale={locale} onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    expect(listStore.select).toBeCalledWith({ id: 1 });
    expect(listStore.select).toBeCalledWith({ id: 5 });
    expect(listStore.select).toBeCalledWith({ id: 8 });
    selection.setProps({ value: [1, 3] });
    const loadItemsCall = selection.instance().selectionStore.loadItems.mock.calls[0];
    expect(loadItemsCall[0]).toEqual([1, 3]);
});
test('Should not reload items if none of the items changed', () => {
    const locale = mobx_1.observable.box('en');
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [{ id: 1 }, { id: 5 }, { id: 8 }];
        this.loadItems = jest.fn();
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" locale={locale} onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    const listStore = selection.find('MultiListOverlay').instance().listStore;
    expect(listStore.select).toBeCalledWith({ id: 1 });
    expect(listStore.select).toBeCalledWith({ id: 5 });
    expect(listStore.select).toBeCalledWith({ id: 8 });
    selection.setProps({ value: [1, 5, 8] });
    expect(selection.instance().selectionStore.loadItems).not.toBeCalled();
});
test('Should not reinstantiate the ListStore with the preselected ids when new props have the same values', () => {
    const locale = mobx_1.observable.box('en');
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [{ id: 1 }, { id: 5 }, { id: 8 }];
        this.loadItems = jest.fn();
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" locale={locale} onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    selection.find('Button[icon="su-plus"]').simulate('click');
    selection.setProps({ value: [1, 5, 8] });
    expect(selection.instance().selectionStore.loadItems).not.toBeCalled();
});
test('Should remove an item when the remove button is clicked', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.shallow)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[3, 7, 9]}/>);
    selection.find('MultiItemSelection').prop('onItemRemove')(7);
    expect(selection.instance().selectionStore.removeById).toBeCalledWith(7);
});
test('Should reorder the items on drag and drop', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.shallow)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[3, 7, 9]}/>);
    selection.find('MultiItemSelection').prop('onItemsSorted')(1, 2);
    expect(selection.instance().selectionStore.move).toBeCalledWith(1, 2);
});
test('Should call the onChange callback if the value of the selection-store changes', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[1]}/>);
    selection.instance().selectionStore.items = [{ id: 22 }, { id: 23 }];
    expect(changeSpy).toBeCalledWith([22, 23]);
});
test('Should not call the onChange callback if the component props change', () => {
    const changeSpy = jest.fn();
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[1]}/>);
    selection.setProps({ overlayTitle: 'New Selection Title' });
    expect(changeSpy).not.toBeCalled();
});
test('Should not call onChange callback if an unrelated observable that is accessed in the callback changes', () => {
    const unrelatedObservable = mobx_1.observable.box(22);
    const changeSpy = jest.fn(() => {
        jest.fn()(unrelatedObservable.get());
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="snippets" onChange={changeSpy} overlayTitle="Selection" resourceKey="snippets" value={[1]}/>);
    // change callback should be called when item of the store mock changes
    selection.instance().selectionStore.items = [{ id: 22 }, { id: 23 }];
    expect(changeSpy).toBeCalledWith([22, 23]);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    // change callback should not be called when the unrelated observable changes
    unrelatedObservable.set(55);
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
test('Should render selected item in disabled state if it fulfills passed itemDisabledCondition', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            { id: 1, status: 'active' },
            { id: 2, status: 'inactive' },
        ];
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" itemDisabledCondition='status == "inactive"' listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    expect(selection.find(MultiItemSelection_1.default.Item).at(0).prop('disabled')).toEqual(false);
    expect(selection.find(MultiItemSelection_1.default.Item).at(1).prop('disabled')).toEqual(true);
});
test('Should render selected item in disabled state if passed disabledIds contain id of item', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            { id: 1 },
            { id: 2 },
        ];
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" disabledIds={[2, 4]} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    expect(selection.find(MultiItemSelection_1.default.Item).at(0).prop('disabled')).toEqual(false);
    expect(selection.find(MultiItemSelection_1.default.Item).at(1).prop('disabled')).toEqual(true);
});
test('Pass correct allowRemoveWhileDisabled prop to Item of MultiItemSelection', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            { id: 1 },
        ];
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" allowDeselectForDisabledItems={true} listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 5, 8]}/>);
    expect(selection.find(MultiItemSelection_1.default.Item).at(0).prop('allowRemoveWhileDisabled')).toEqual(true);
});
test('PublishIndicator should be rendered if necessary', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1, // Published
                published: '2020-11-16',
                publishedState: true,
            },
            {
                id: 2, // Draft
                published: '2020-11-16',
                publishedState: false,
            },
            {
                id: 3, // Unpublished
                published: null,
                publishedState: false,
            },
        ];
    });
    const selection = (0, enzyme_1.mount)(<MultiSelection_1.default adapter="table" listKey="pages" onChange={jest.fn()} overlayTitle="Selection" resourceKey="pages" value={[1, 2, 3]}/>);
    // Published
    expect(selection.find(MultiItemSelection_1.default.Item).at(0).contains('PublishIndicator')).toBe(false);
    // Draft
    expect(selection.find(MultiItemSelection_1.default.Item).at(1).find('PublishIndicator').prop('draft')).toBe(true);
    expect(selection.find(MultiItemSelection_1.default.Item).at(1).find('PublishIndicator').prop('published')).toBe(true);
    // Unpublished
    expect(selection.find(MultiItemSelection_1.default.Item).at(2).find('PublishIndicator').prop('draft')).toBe(true);
    expect(selection.find(MultiItemSelection_1.default.Item).at(2).find('PublishIndicator').prop('published')).toBe(false);
});
