"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResourceListStore_1 = __importDefault(require("../../../stores/ResourceListStore"));
const ResourceSingleSelect_1 = __importDefault(require("../ResourceSingleSelect"));
jest.mock('../../../stores/ResourceListStore', () => jest.fn());
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render in loading state', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = true;
        this.data = undefined;
    });
    expect((0, enzyme_1.render)(<ResourceSingleSelect_1.default displayProperty="name" idProperty="id" onChange={jest.fn()} resourceKey="test" value={undefined}/>)).toMatchSnapshot();
    expect(ResourceListStore_1.default).toBeCalledWith('test', { limit: '' }, 'id');
});
test('Render in disabled state', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [];
    });
    expect((0, enzyme_1.render)(<ResourceSingleSelect_1.default disabled={true} displayProperty="name" idProperty="id" onChange={jest.fn()} resourceKey="test" value={undefined}/>)).toMatchSnapshot();
});
test('Render with data', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                id: 1,
                name: 'Test 1',
            },
            {
                id: 2,
                name: 'Test 2',
            },
        ];
    });
    const resourceSingleSelect = (0, enzyme_1.mount)(<ResourceSingleSelect_1.default displayProperty="name" idProperty="id" onChange={jest.fn()} resourceKey="test" value={undefined}/>);
    resourceSingleSelect.find('DisplayValue').simulate('click');
    resourceSingleSelect.update();
    expect(resourceSingleSelect.render()).toMatchSnapshot();
    expect(resourceSingleSelect.find('Menu').render()).toMatchSnapshot();
});
test('Render with data with editable option', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                id: 1,
                name: 'Test 1',
            },
            {
                id: 2,
                name: 'Test 2',
            },
        ];
    });
    const resourceSingleSelect = (0, enzyme_1.mount)(<ResourceSingleSelect_1.default displayProperty="name" editable={true} idProperty="id" onChange={jest.fn()} resourceKey="test" value={undefined}/>);
    resourceSingleSelect.find('DisplayValue').simulate('click');
    resourceSingleSelect.update();
    expect(resourceSingleSelect.find('SingleSelect').render()).toMatchSnapshot();
    expect(resourceSingleSelect.find('Menu').render()).toMatchSnapshot();
});
test('Render in value', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                id: 1,
                name: 'Test 1',
            },
        ];
    });
    expect((0, enzyme_1.render)(<ResourceSingleSelect_1.default disabled={true} displayProperty="name" idProperty="id" onChange={jest.fn()} resourceKey="test" value={1}/>)).toMatchSnapshot();
});
test('Pass requestParameters to ResourceListStore', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                id: 1,
                name: 'Test 1',
            },
        ];
    });
    const requestParameters = {
        flat: true,
    };
    (0, enzyme_1.mount)(<ResourceSingleSelect_1.default disabled={true} displayProperty="name" idProperty="id" onChange={jest.fn()} requestParameters={requestParameters} resourceKey="test" value={1}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', { limit: '', flat: true }, 'id');
});
test('Trigger the change callback when the selection changes', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                id: 1,
                name: 'Test 1',
            },
            {
                id: 2,
                name: 'Test 2',
            },
        ];
    });
    const changeSpy = jest.fn();
    const resourceSingleSelect = (0, enzyme_1.shallow)(<ResourceSingleSelect_1.default displayProperty="name" idProperty="id" onChange={changeSpy} resourceKey="test" value={1}/>);
    resourceSingleSelect.find('SingleSelect').prop('onChange')(2);
    expect(changeSpy).toHaveBeenCalledWith(2);
});
test('Trigger the change callback with undefined when the reset action is clicked', () => {
    const changeSpy = jest.fn();
    const resourceSingleSelect = (0, enzyme_1.shallow)(<ResourceSingleSelect_1.default displayProperty="name" idProperty="id" onChange={changeSpy} resourceKey="test" value={1}/>);
    resourceSingleSelect.find('Action[children="sulu_admin.please_choose"]').prop('onClick')();
    expect(changeSpy).toHaveBeenCalledWith(undefined);
});
test('Updated data in EditOverlay should disappear when overlay is closed', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            { id: 1, name: 'Test1' },
            { id: 2, name: 'Test2' },
        ];
        this.deleteList = jest.fn();
        this.patchList = jest.fn();
    });
    const resourceSingleSelect = (0, enzyme_1.mount)(<ResourceSingleSelect_1.default displayProperty="name" editable={true} idProperty="id" onChange={jest.fn()} resourceKey="test" value={1}/>);
    resourceSingleSelect.find('DisplayValue').simulate('click');
    resourceSingleSelect.find('Action[children="sulu_admin.edit"]').prop('onClick')();
    resourceSingleSelect.update();
    resourceSingleSelect.find('EditLine Input').at(0).prop('onChange')('Test1 Update');
    resourceSingleSelect.find('EditLine Button').at(1).prop('onClick')();
    resourceSingleSelect.find('EditOverlay Button[icon="su-plus"]').prop('onClick')();
    resourceSingleSelect.find('EditLine Input').at(1).prop('onChange')('Test3 Update');
    resourceSingleSelect.find('Icon[name="su-times"]').prop('onClick')();
    expect(resourceSingleSelect.instance().resourceListStore.deleteList).not.toBeCalled();
    expect(resourceSingleSelect.instance().resourceListStore.patchList).not.toBeCalled();
});
test('Updated data in EditOverlay should be displayed in Select when overlay is confirmed', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            { id: 1, name: 'Test1' },
            { id: 2, name: 'Test2' },
        ];
        this.deleteList = jest.fn();
        this.patchList = jest.fn();
    });
    const resourceSingleSelect = (0, enzyme_1.mount)(<ResourceSingleSelect_1.default displayProperty="name" editable={true} idProperty="id" onChange={jest.fn()} resourceKey="test" value={1}/>);
    resourceSingleSelect.find('DisplayValue').simulate('click');
    resourceSingleSelect.find('Action[children="sulu_admin.edit"]').prop('onClick')();
    resourceSingleSelect.update();
    resourceSingleSelect.find('EditLine Input').at(0).prop('onChange')('Test1 Update');
    resourceSingleSelect.find('EditLine Button').at(1).prop('onClick')();
    resourceSingleSelect.find('EditOverlay Button[icon="su-plus"]').prop('onClick')();
    resourceSingleSelect.find('EditLine Input').at(1).prop('onChange')('Test3 Update');
    resourceSingleSelect.find('Button[skin="primary"]').prop('onClick')();
    expect(resourceSingleSelect.instance().resourceListStore.deleteList).toBeCalledWith([2]);
    expect(resourceSingleSelect.instance().resourceListStore.patchList).toBeCalledWith([
        { name: 'Test3 Update' },
        { id: 1, 'name': 'Test1 Update' },
    ]);
});
