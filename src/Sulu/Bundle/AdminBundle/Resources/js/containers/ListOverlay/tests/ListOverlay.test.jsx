"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const Overlay_1 = __importDefault(require("../../../components/Overlay"));
const List_1 = __importDefault(require("../../../containers/List"));
const ListStore_1 = __importDefault(require("../../../containers/List/stores/ListStore"));
const ListOverlay_1 = __importDefault(require("../ListOverlay"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
const ExampleList = function ExampleList(props) {
    return <div className={props.adapter ? props.className : null}/>;
};
jest.mock('../../../containers/List', () => jest.fn(function List(props) {
    return <ExampleList adapter={props.adapter} className="list"/>;
}));
jest.mock('../../../containers/List/stores/ListStore', () => jest.fn(function (resourceKey, observableOptions, options) {
    this.options = options;
    this.clearSelection = jest.fn();
    this.observableOptions = observableOptions;
    this.select = jest.fn();
    this.setActive = jest.fn();
    this.selections = [];
    this.reset = jest.fn();
    this.reload = jest.fn();
    this.loading = false;
}));
test('Should use an Overlay by default', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const disabledIds = [1, 2, 5];
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" disabledIds={disabledIds} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} title="Selection"/>);
    expect(listOverlay.find(Dialog_1.default)).toHaveLength(0);
    expect(listOverlay.find(Overlay_1.default)).toHaveLength(1);
});
test('Should use a dialog if overlayType is set to dialog', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const disabledIds = [1, 2, 5];
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" disabledIds={disabledIds} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} overlayType="dialog" title="Selection"/>);
    expect(listOverlay.find(Dialog_1.default)).toHaveLength(1);
    expect(listOverlay.find(Overlay_1.default)).toHaveLength(0);
});
test('Should pass disabledIds to the List', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const disabledIds = [1, 2, 5];
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" disabledIds={disabledIds} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} title="Selection"/>);
    expect(listOverlay.find(List_1.default).prop('disabledIds')).toBe(disabledIds);
    expect(listOverlay.find(List_1.default).prop('allowActivateForDisabledItems')).toEqual(true);
});
test('Should pass allowActivateForDisabledItems to the List', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const disabledIds = [1, 2, 5];
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" allowActivateForDisabledItems={false} disabledIds={disabledIds} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} title="Selection"/>);
    expect(listOverlay.find(List_1.default).prop('disabledIds')).toBe(disabledIds);
    expect(listOverlay.find(List_1.default).prop('allowActivateForDisabledItems')).toEqual(false);
});
test('Should pass itemDisabledCondition to the List', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" itemDisabledCondition='status == "inactive"' listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} title="Selection"/>);
    expect(listOverlay.find(List_1.default).prop('itemDisabledCondition')).toBe('status == "inactive"');
});
test('Should pass correct flags to the List', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const disabledIds = [1, 2, 5];
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" disabledIds={disabledIds} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} title="Selection"/>);
    expect(listOverlay.find(List_1.default).prop('copyable')).toEqual(false);
    expect(listOverlay.find(List_1.default).prop('deletable')).toEqual(false);
    expect(listOverlay.find(List_1.default).prop('movable')).toEqual(false);
    expect(listOverlay.find(List_1.default).prop('orderable')).toEqual(false);
    expect(listOverlay.find(List_1.default).prop('searchable')).toEqual(true);
});
test('Should pass confirmLoading and confirmDisabled flag to the Overlay', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} title="Test"/>);
    expect(listOverlay.find(Overlay_1.default).prop('confirmLoading')).toEqual(false);
    expect(listOverlay.find(Overlay_1.default).prop('confirmDisabled')).toEqual(true);
});
test('Should pass confirmLoading and negative confirmDisabled flag to the Overlay', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.shallow)(<ListOverlay_1.default adapter="table" confirmLoading={true} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} preSelectedItems={[{}]} title="Test"/>);
    expect(listOverlay.find(Overlay_1.default).prop('confirmLoading')).toEqual(true);
    expect(listOverlay.find(Overlay_1.default).prop('confirmDisabled')).toEqual(false);
});
test('Should call onConfirm when the confirm button is clicked', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const confirmSpy = jest.fn();
    (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} preSelectedItems={[{ id: 1 }, { id: 2 }, { id: 3 }]} title="Selection"/>);
    listStore.selections = [{ id: 1 }, { id: 2 }];
    const confirmButton = document.querySelector('button.primary');
    if (confirmButton) {
        confirmButton.click();
    }
    expect(confirmSpy).toBeCalledWith();
});
test('Should instantiate the list with the passed adapter', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay1 = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} title="test"/>);
    expect(listOverlay1.find(List_1.default).prop('adapters')).toEqual(['table']);
    const listOverlay2 = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="column_list" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} title="test"/>);
    expect(listOverlay2.find(List_1.default).prop('adapters')).toEqual(['column_list']);
});
test('Should reload on open if reloadOnOpen is set to true', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} preSelectedItems={[{ id: 1 }]} reloadOnOpen={true} title="test"/>);
    listStore.reset.mockReset();
    listStore.reload.mockReset();
    expect(listStore.reset).not.toBeCalled();
    expect(listStore.reload).not.toBeCalled();
    listOverlay.setProps({
        open: true,
    });
    expect(listStore.reset).toBeCalledWith();
    expect(listStore.reload).toBeCalledWith();
});
test('Should not reload on open if reloadOnOpen is set to true but listStore is still loading', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    listStore.loading = true;
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} preSelectedItems={[{ id: 1 }]} title="test"/>);
    listStore.reset.mockReset();
    listStore.reload.mockReset();
    expect(listStore.reset).not.toBeCalled();
    expect(listStore.reload).not.toBeCalled();
    listOverlay.setProps({
        open: true,
    });
    expect(listStore.reset).not.toBeCalled();
    expect(listStore.reload).not.toBeCalled();
});
test('Should not reload on open if reloadOnOpen is not set', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={false} preSelectedItems={[{ id: 1 }]} title="test"/>);
    listStore.reset.mockReset();
    listStore.reload.mockReset();
    expect(listStore.reset).not.toBeCalled();
    expect(listStore.reload).not.toBeCalled();
    listOverlay.setProps({
        open: true,
    });
    expect(listStore.reset).not.toBeCalled();
    expect(listStore.reload).not.toBeCalled();
});
test('Should not clear selection on close if clearSelectionOnClose prop is not set', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" clearSelectionOnClose={false} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} preSelectedItems={[{ id: 1 }]} title="test"/>);
    listStore.clearSelection.mockReset();
    listStore.select.mockReset();
    expect(listStore.clearSelection).not.toBeCalled();
    expect(listStore.select).not.toBeCalled();
    listOverlay.setProps({
        open: false,
    });
    expect(listStore.clearSelection).not.toBeCalled();
});
test('Should clear selection on close if clearSelectionOnClose prop is set', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" clearSelectionOnClose={true} listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} preSelectedItems={[{ id: 1 }]} title="test"/>);
    listStore.clearSelection.mockReset();
    listStore.select.mockReset();
    expect(listStore.clearSelection).not.toBeCalled();
    expect(listStore.select).not.toBeCalled();
    listOverlay.setProps({
        open: false,
    });
    expect(listStore.clearSelection).toBeCalledWith();
});
test('Should update selection if passed preSelectedItems prop changes', () => {
    const listStore = new ListStore_1.default('snippets', 'snippets', 'list_overlay_test', { page: mobx_1.observable.box(1) });
    const listOverlay = (0, enzyme_1.mount)(<ListOverlay_1.default adapter="table" listStore={listStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} preSelectedItems={[{ id: 1 }]} title="test"/>);
    listStore.clearSelection.mockReset();
    listStore.select.mockReset();
    listOverlay.setProps({
        title: 'bla',
    });
    expect(listStore.clearSelection).not.toBeCalled();
    expect(listStore.select).not.toBeCalled();
    listOverlay.setProps({
        preSelectedItems: [{ id: 2 }],
    });
    expect(listStore.clearSelection).toBeCalledWith();
    expect(listStore.select).toBeCalledWith({ id: 2 });
});
