"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const Router_1 = __importDefault(require("../../../../services/Router"));
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const SmartContent_1 = __importDefault(require("../../fields/SmartContent"));
const SmartContentStore_1 = __importDefault(require("../../../SmartContent/stores/SmartContentStore"));
const smartContentConfigStore_1 = __importDefault(require("../../../SmartContent/stores/smartContentConfigStore"));
const smartContentStorePool_1 = __importDefault(require("../../fields/smartContentStorePool"));
jest.mock('../../../../containers/MultiListOverlay', () => jest.fn(() => null));
jest.mock('../../../../services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id) {
    this.resourceKey = resourceKey;
    this.id = id;
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options, metadataOptions) {
    this.resourceKey = resourceStore.resourceKey;
    this.id = resourceStore.id;
    this.metadataOptions = metadataOptions;
}));
jest.mock('../../FormInspector', () => jest.fn(function (formStore) {
    this.resourceKey = formStore.resourceKey;
    this.id = formStore.id;
    this.metadataOptions = formStore.metadataOptions;
}));
jest.mock('../../../SmartContent/stores/SmartContentStore', () => jest.fn(function () {
    this.loading = false;
    this.destroy = jest.fn();
    this.start = jest.fn();
    (0, mobx_1.extendObservable)(this, { items: [], itemsLoading: false, filterCriteria: {} });
}));
jest.mock('../../../SmartContent/stores/smartContentConfigStore', () => ({
    getConfig: jest.fn(),
    getDefaultValue: jest.fn().mockReturnValue({ audienceTargeting: false }),
}));
jest.mock('../../fields/smartContentStorePool', () => ({
    add: jest.fn(),
    findPreviousStores: jest.fn().mockReturnValue([]),
    stores: [],
    remove: jest.fn(),
    updateExcludedIds: jest.fn(),
}));
beforeEach(() => {
    smartContentConfigStore_1.default.getConfig.mockReturnValue({});
});
test('Should correctly initialize SmartContentStore', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 1), 'test', {}, { webspace: 'sulu_io' }));
    smartContentConfigStore_1.default.getConfig.mockReturnValue({ datasourceResourceKey: 'collections' });
    const value = {
        audienceTargeting: undefined,
        categoryOperator: undefined,
        categories: [1, 2],
        dataSource: undefined,
        includeSubFolders: undefined,
        limitResult: undefined,
        presentAs: 'large',
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        types: ['default', 'homepage'],
    };
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions} value={value}/>);
    const smartContentStore = smartContent.instance().smartContentStore;
    expect(smartContentStore.start).toBeCalledWith();
    expect(smartContentStorePool_1.default.add).toBeCalledWith(smartContentStore, false);
    expect(smartContentConfigStore_1.default.getConfig).toBeCalledWith('media');
    expect(SmartContentStore_1.default)
        .toBeCalledWith('media', value, undefined, 'collections', undefined, schemaOptions, 'sulu_io');
    smartContent.unmount();
    expect(smartContentStorePool_1.default.remove).toBeCalledWith(smartContentStore);
});
test('Should correctly initialize SmartContentStore with a exclude_duplicates value of false', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 1), 'test'));
    smartContentConfigStore_1.default.getConfig.mockReturnValue({ datasourceResourceKey: 'collections' });
    const schemaOptions = {
        exclude_duplicates: {
            name: 'exclude_duplicates',
            value: true,
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    const smartContentStore = smartContent.instance().smartContentStore;
    expect(smartContentStore.start).toBeCalledWith();
    expect(smartContentStorePool_1.default.add).toBeCalledWith(smartContentStore, true);
});
test('Defer start of smartContentStore until all previous stores have loaded their items', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 1), 'test'));
    const smartContentStore1 = new SmartContentStore_1.default('pages');
    smartContentStore1.itemsLoading = true;
    const smartContentStore2 = new SmartContentStore_1.default('pages');
    smartContentStore2.itemsLoading = true;
    smartContentStorePool_1.default.findPreviousStores.mockReturnValue([smartContentStore1, smartContentStore2]);
    const schemaOptions = {
        exclude_duplicates: {
            name: 'exclude_duplicates',
            value: true,
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    const smartContentStore = smartContent.instance().smartContentStore;
    expect(smartContentStorePool_1.default.updateExcludedIds).not.toBeCalled();
    expect(smartContentStore.start).not.toBeCalled();
    smartContentStore1.itemsLoading = false;
    expect(smartContentStorePool_1.default.updateExcludedIds).not.toBeCalled();
    expect(smartContentStore.start).not.toBeCalled();
    smartContentStore2.itemsLoading = false;
    expect(smartContentStorePool_1.default.updateExcludedIds).toBeCalledWith();
    expect(smartContentStore.start).toBeCalledWith();
});
test('Should pass id to SmartContentStore if resourceKeys match', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('pages', 4), 'pages'));
    smartContentConfigStore_1.default.getConfig.mockReturnValue({ datasourceResourceKey: 'pages' });
    const value = {
        audienceTargeting: undefined,
        categoryOperator: undefined,
        categories: [1, 2],
        dataSource: undefined,
        includeSubFolders: undefined,
        limitResult: undefined,
        presentAs: 'large',
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        types: undefined,
    };
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'pages',
        },
    };
    (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions} value={value}/>);
    expect(smartContentConfigStore_1.default.getConfig).toBeCalledWith('pages');
    expect(SmartContentStore_1.default).toBeCalledWith('pages', value, undefined, 'pages', 4, schemaOptions, undefined);
});
test('Pass correct props to SmartContent component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        category_root: {
            name: 'category_root',
            value: 'test1',
        },
        provider: {
            name: 'provider',
            value: 'media',
        },
        present_as: {
            name: 'present_as',
            value: [
                { name: 'one', title: 'One column' },
                { name: 'two', title: 'Two column' },
            ],
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} label="Test" schemaOptions={schemaOptions}/>);
    expect(smartContent.find('SmartContent').prop('categoryRootKey')).toEqual('test1');
    expect(smartContent.find('SmartContent').prop('presentations')).toEqual([
        { name: 'one', value: 'One column' },
        { name: 'two', value: 'Two column' },
    ]);
    expect(smartContent.find('SmartContent').prop('fieldLabel')).toEqual('Test');
    expect(smartContent.find('SmartContent').prop('disabled')).toEqual(true);
    expect(smartContent.find('SmartContent').prop('onItemClick')).toEqual(undefined);
});
test('Should not call the onChange and onFinish callbacks if SmartContentStore is still loading', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    changeSpy.mockReset();
    finishSpy.mockReset();
    smartContent.instance().smartContentStore.loading = true;
    smartContent.instance().smartContentStore.filterCriteria = {
        audienceTargeting: true,
    };
    expect(changeSpy).not.toBeCalled();
    expect(finishSpy).not.toBeCalled();
});
test('Should call the onChange and onFinish callbacks if SmartContentStore changes', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    smartContent.instance().smartContentStore.loading = false;
    smartContent.instance().smartContentStore.filterCriteria = {
        audienceTargeting: true,
    };
    smartContent.instance().handleFilterCriteriaChange();
    expect(changeSpy).toBeCalledWith({ audienceTargeting: true });
    expect(finishSpy).toBeCalledWith();
});
test('Should not call the onChange and onFinish callbacks if categories only differ in order', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const value = {
        audienceTargeting: undefined,
        categoryOperator: undefined,
        categories: [1, 2],
        dataSource: undefined,
        includeSubFolders: undefined,
        limitResult: undefined,
        presentAs: 'large',
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: undefined,
        types: undefined,
    };
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions} value={value}/>);
    changeSpy.mockReset();
    finishSpy.mockReset();
    smartContent.instance().smartContentStore.loading = false;
    smartContent.instance().smartContentStore.filterCriteria = Object.assign(Object.assign({}, value), { categories: [2, 1] });
    expect(changeSpy).not.toBeCalled();
    expect(finishSpy).not.toBeCalled();
});
test('Should not call the onChange and onFinish callbacks if tags only differ in order', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const value = {
        audienceTargeting: undefined,
        categoryOperator: undefined,
        categories: undefined,
        dataSource: undefined,
        includeSubFolders: undefined,
        limitResult: undefined,
        presentAs: 'large',
        sortBy: undefined,
        sortMethod: undefined,
        tagOperator: undefined,
        tags: ['Design', 'Programming'],
        types: undefined,
    };
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions} value={value}/>);
    changeSpy.mockReset();
    finishSpy.mockReset();
    smartContent.instance().smartContentStore.loading = false;
    smartContent.instance().smartContentStore.filterCriteria = Object.assign(Object.assign({}, value), { tags: ['Programming', 'Design'] });
    expect(changeSpy).not.toBeCalled();
    expect(finishSpy).not.toBeCalled();
});
test('Should navigate to view if item is clicked', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    smartContentConfigStore_1.default.getConfig.mockReturnValue({ sorting: [], view: 'sulu_media.form', resultToView: { id: 'id' } });
    const router = new Router_1.default();
    const smartContent = (0, enzyme_1.mount)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} router={router} schemaOptions={schemaOptions}/>);
    smartContent.instance().smartContentStore.items = [
        { id: 1 },
        { id: 3 },
        { id: 2 },
    ];
    smartContent.update();
    smartContent.find('MultiItemSelection .content').at(0).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_media.form', { id: 1 });
    smartContent.find('MultiItemSelection .content').at(1).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_media.form', { id: 3 });
});
test('Should call destroy on SmartContentStore when unmounted', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        provider: {
            name: 'provider',
            value: 'media',
        },
    };
    const smartContent = (0, enzyme_1.shallow)(<SmartContent_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    const smartContentStore = smartContent.instance().smartContentStore;
    smartContent.unmount();
    expect(smartContentStore.destroy).toBeCalledWith();
});
