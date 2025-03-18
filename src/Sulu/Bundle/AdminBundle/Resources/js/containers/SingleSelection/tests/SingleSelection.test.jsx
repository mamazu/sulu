"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const SingleSelectionStore_1 = __importDefault(require("../../../stores/SingleSelectionStore"));
const SingleListOverlay_1 = __importDefault(require("../../../containers/SingleListOverlay"));
const SingleSelection_1 = __importDefault(require("../SingleSelection"));
const SingleItemSelection_1 = __importDefault(require("../../../components/SingleItemSelection"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../containers/SingleListOverlay', () => jest.fn(function () {
    return <div />;
}));
jest.mock('../../../containers/List/stores/ListStore', () => jest.fn());
jest.mock('../../../stores/SingleSelectionStore', () => jest.fn(function () {
    this.set = jest.fn((item) => {
        this.item = item;
    });
    this.loadItem = jest.fn((id) => {
        this.item = { id };
    });
    this.clear = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        item: undefined,
        loading: false,
    });
}));
test('Show with passed emptyText and icon', () => {
    expect((0, enzyme_1.render)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Test" icon="su-document" listKey="test" onChange={jest.fn()} overlayTitle="" resourceKey="test" value={undefined}/>)).toMatchSnapshot();
});
test('Render with selected item', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" listKey="test" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(SingleSelectionStore_1.default).toBeCalledWith('test', 3, locale, undefined);
    singleSelection.instance().singleSelectionStore.item = {
        id: 3,
        name: 'Name',
        value: 'Value',
    };
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
    expect(singleSelection.find('SingleItemSelection').render()).toMatchSnapshot();
});
test('Render with selected item in disabled state', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabled={true} disabledIds={[]} displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" listKey="test" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.instance().singleSelectionStore.item = {
        id: 3,
        name: 'Name',
        value: 'Value',
    };
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
    expect(singleSelection.find('SingleItemSelection').render()).toMatchSnapshot();
});
test('Pass resourceKey and locale to SingleListOverlay', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" listKey="test_list" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(singleSelection.find(SingleListOverlay_1.default).prop('locale')).toEqual(locale);
    expect(singleSelection.find(SingleListOverlay_1.default).prop('resourceKey')).toEqual('test');
    expect(singleSelection.find(SingleListOverlay_1.default).prop('listKey')).toEqual('test_list');
    expect(singleSelection.find(SingleListOverlay_1.default).prop('options')).toEqual(undefined);
});
test('Pass options to SingleListOverlay and SingleSelectionStore', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" detailOptions={{ 'ghost-content': true }} disabledIds={[]} displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" listKey="test_list" listOptions={{ value: 'Test' }} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(SingleSelectionStore_1.default).toBeCalledWith('test', 3, undefined, { 'ghost-content': true });
    expect(singleSelection.find(SingleListOverlay_1.default).prop('options')).toEqual({ value: 'Test' });
});
test('Pass disabledIds to SingleListOverlay', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" disabledIds={[1, 2, 3]} displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" listKey="test" onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(singleSelection.find(SingleListOverlay_1.default).prop('disabledIds')).toEqual([1, 2, 3]);
});
test('Pass itemDisabledCondition to SingleListOverlay', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" displayProperties={['name', 'value']} emptyText="Nothing" icon="su-test" itemDisabledCondition='status == "inactive"' listKey="test" onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(singleSelection.find(SingleListOverlay_1.default).prop('itemDisabledCondition')).toEqual('status == "inactive"');
});
test('Should open and close an overlay', () => {
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.find('.button').prop('onClick')();
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(true);
    singleSelection.find(SingleListOverlay_1.default).prop('onClose')();
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
});
test('Should not open an overlay on button-click when disabled', () => {
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabled={true} disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={3}/>);
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
    singleSelection.find('.button').simulate('click');
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
});
test('Should call the onChange callback with null if the current item does not exist and set to null', () => {
    const changeSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.instance().singleSelectionStore.item = null;
    expect(changeSpy).toBeCalledWith(null, null);
});
test('Should call the onChange callback if a new item was selected', () => {
    const changeSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.find('.button').prop('onClick')();
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(true);
    singleSelection.find(SingleListOverlay_1.default).prop('onConfirm')({ id: 6 });
    expect(singleSelection.instance().singleSelectionStore.loadItem).toBeCalledWith(6);
    expect(changeSpy).toBeCalledWith(6, { id: 6 });
    singleSelection.update();
    expect(singleSelection.find(SingleListOverlay_1.default).prop('open')).toEqual(false);
});
test('Should not call onChange callback if an unrelated observable that is accessed in the callback changes', () => {
    const unrelatedObservable = mobx_1.observable.box(22);
    const changeSpy = jest.fn(() => {
        jest.fn()(unrelatedObservable.get());
    });
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={3}/>);
    // disable load-item mock that would overwrite the item property of the store mock
    singleSelection.instance().singleSelectionStore.loadItem = jest.fn();
    // change callback should be called when item of the store mock changes
    singleSelection.instance().singleSelectionStore.item = { id: 7 };
    expect(changeSpy).toBeCalledWith(7, { id: 7 });
    expect(changeSpy).toHaveBeenCalledTimes(1);
    // change callback should not be called when the unrelated observable changes
    unrelatedObservable.set(55);
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
test('Should not call the onChange callback if the same item was selected', () => {
    const changeSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={6}/>);
    singleSelection.find(SingleListOverlay_1.default).prop('onConfirm')({ id: 6 });
    expect(changeSpy).not.toBeCalled();
});
test('Should load the item if value prop changes', () => {
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    singleSelection.setProps({ value: 3 });
    expect(singleSelection.instance().singleSelectionStore.loadItem).toBeCalledWith(3);
});
test('Should call the onItemClick callback when an item when the item is clicked', () => {
    const itemClickSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} onItemClick={itemClickSpy} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    singleSelection.instance().singleSelectionStore.item = { id: 1 };
    singleSelection.find('SingleItemSelection .item').simulate('click');
    expect(itemClickSpy).toBeCalledWith(1, { id: 1 });
});
test('Should remove an item when the remove button is clicked', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    singleSelection.instance().singleSelectionStore.item = {
        name: 'Name',
        value: 'Value',
    };
    singleSelection.find('SingleItemSelection').prop('onRemove')();
    expect(singleSelection.instance().singleSelectionStore.clear).toBeCalledWith();
});
test('Should call the onChange callback if the value of the selection-store changes', () => {
    const changeSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.instance().singleSelectionStore.item = { id: 6 };
    expect(changeSpy).toBeCalledWith(6, { id: 6 });
});
test('Should not call the onChange callback if the component props change', () => {
    const changeSpy = jest.fn();
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={[]} emptyText="Nothing" icon="su-test" listKey="test" onChange={changeSpy} overlayTitle="Test" resourceKey="test" value={3}/>);
    singleSelection.setProps({ emptyText: 'New Empty Text' });
    expect(changeSpy).not.toBeCalled();
});
test('Correct props should be passed to SingleItemSelection component', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" disabled={true} displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('disabled')).toEqual(true);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('emptyText')).toEqual('nothing');
});
test('Pass correct itemDisabled prop to SingleItemSelection component when item fulfills itemDisabledCondition', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" displayProperties={[]} emptyText="nothing" itemDisabledCondition='status == "inactive"' listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('itemDisabled')).toEqual(false);
    singleSelection.instance().singleSelectionStore.item = {
        id: 3,
        status: 'inactive',
    };
    expect(singleSelection.find(SingleItemSelection_1.default).prop('itemDisabled')).toEqual(true);
});
test('Pass correct itemDisabled prop to SingleItemSelection component when disabledIds contains id of item', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" disabledIds={[1, 3, 5]} displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('itemDisabled')).toEqual(false);
    singleSelection.instance().singleSelectionStore.item = {
        id: 3,
        status: 'inactive',
    };
    expect(singleSelection.find(SingleItemSelection_1.default).prop('itemDisabled')).toEqual(true);
});
test('Set loading prop of SingleItemSelection component if SingleSelectionStore is loading', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" disabled={true} displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('loading')).toEqual(false);
    singleSelection.instance().singleSelectionStore.loading = true;
    expect(singleSelection.find(SingleItemSelection_1.default).prop('loading')).toEqual(true);
    expect(singleSelection.find(SingleListOverlay_1.default)).toHaveLength(0);
});
test('Pass correct allowRemoveWhileItemDisabled prop to SingleItemSelection component', () => {
    const singleSelection = (0, enzyme_1.shallow)(<SingleSelection_1.default adapter="table" allowDeselectForDisabledItems={true} disabledIds={[1, 3, 5]} displayProperties={[]} emptyText="nothing" listKey="snippets" onChange={jest.fn()} overlayTitle="Selection" resourceKey="snippets" value={1}/>);
    expect(singleSelection.find(SingleItemSelection_1.default).prop('allowRemoveWhileItemDisabled')).toEqual(true);
});
test('PublishIndicator should not be rendered if not necessary', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={['name']} emptyText="Nothing" icon="su-test" listKey="test" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={1}/>);
    singleSelection.instance().singleSelectionStore.item = {
        id: 1,
        name: 'Name',
        published: '2020-11-16',
        publishedState: true,
    };
    singleSelection.update();
    expect(singleSelection.contains('PublishIndicator')).toBe(false);
});
test('PublishIndicator should be rendered as draft if necessary', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={['name']} emptyText="Nothing" icon="su-test" listKey="test" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={1}/>);
    singleSelection.instance().singleSelectionStore.item = {
        id: 1,
        name: 'Name',
        published: '2020-11-16',
        publishedState: false,
    };
    singleSelection.update();
    expect(singleSelection.find('PublishIndicator').prop('draft')).toBe(true);
    expect(singleSelection.find('PublishIndicator').prop('published')).toBe(true);
});
test('PublishIndicator should be rendered as unpublished if necessary', () => {
    const locale = mobx_1.observable.box('en');
    const singleSelection = (0, enzyme_1.mount)(<SingleSelection_1.default adapter="table" disabledIds={[]} displayProperties={['name']} emptyText="Nothing" icon="su-test" listKey="test" locale={locale} onChange={jest.fn()} overlayTitle="Test" resourceKey="test" value={1}/>);
    singleSelection.instance().singleSelectionStore.item = {
        id: 1,
        name: 'Name',
        published: null,
        publishedState: false,
    };
    singleSelection.update();
    expect(singleSelection.find('PublishIndicator').prop('draft')).toBe(true);
    expect(singleSelection.find('PublishIndicator').prop('published')).toBe(false);
});
