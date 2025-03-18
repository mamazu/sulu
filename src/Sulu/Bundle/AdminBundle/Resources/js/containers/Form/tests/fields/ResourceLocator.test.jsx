"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const Requester_1 = __importDefault(require("../../../../services/Requester"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const ResourceLocator_1 = __importDefault(require("../../fields/ResourceLocator"));
const ResourceLocator_2 = __importDefault(require("../../../../components/ResourceLocator"));
const userStore_1 = __importDefault(require("../../../../stores/userStore"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../stores/userStore', () => ({}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions = {}) {
    this.resourceKey = resourceKey;
    this.id = id;
    this.locale = observableOptions.locale;
    (0, mobx_1.extendObservable)(this, {
        data: {},
    });
}));
jest.mock('../../stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options) {
    this.resourceKey = resourceStore.resourceKey;
    this.id = resourceStore.id;
    this.locale = resourceStore.locale;
    this.options = options || {};
    this.resourceStore = resourceStore;
}));
jest.mock('../../FormInspector', () => jest.fn(function (formStore) {
    this.id = formStore.id;
    this.locale = formStore.locale;
    this.options = formStore.options;
    this.resourceKey = formStore.resourceKey;
    this.errors = {};
    this.addFinishFieldHandler = jest.fn();
    this.getPathsByTag = jest.fn().mockReturnValue([]);
    this.getValueByPath = jest.fn((path) => formStore.resourceStore.data[path]);
    this.getSchemaEntryByPath = jest.fn().mockReturnValue({});
    this.isFieldModified = jest.fn().mockReturnValue(false);
}));
jest.mock('../../../../services/Requester', () => ({
    post: jest.fn(),
}));
test('Pass props correctly to ResourceLocator', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { 'locale': mobx_1.observable.box('en') }), 'test'));
    const modePromise = Promise.resolve('full');
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} disabled={true} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} value="/url"/>);
    return modePromise.then(() => {
        expect(resourceLocator.find(ResourceLocator_2.default).prop('value')).toBe('/url');
        expect(resourceLocator.find(ResourceLocator_2.default).prop('mode')).toBe('full');
        expect(resourceLocator.find(ResourceLocator_2.default).prop('disabled')).toBe(true);
        expect(resourceLocator.find(ResourceLocator_2.default).prop('locale').get()).toBe('en');
        // should not throw any error on unmount
        resourceLocator.unmount();
    });
});
test('Render just slash instead of ResourceLocatorComponent if used on the homepage', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const modePromise = Promise.resolve('leaf');
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} disabled={true} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} value="/"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find(ResourceLocator_2.default)).toHaveLength(0);
        expect(resourceLocator.text()).toEqual('/');
        // should not throw any error on unmount
        resourceLocator.unmount();
    });
});
test('Pass correct options to ResourceLocatorHistory if entity already existed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 1), 'test', { webspace: 'sulu' }));
    const modePromise = Promise.resolve('leaf');
    const resourceLocator = (0, enzyme_1.mount)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
            options: { history: true },
        }} formInspector={formInspector} schemaOptions={{
            entity_class: { name: 'entity_class', value: 'entity-class-value' },
        }}/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('ResourceLocatorHistory')).toHaveLength(1);
        expect(resourceLocator.find('ResourceLocatorHistory').prop('options'))
            .toEqual({ entityClass: 'entity-class-value', history: true, webspace: 'sulu', resourceKey: 'test' });
        expect(resourceLocator.find('ResourceLocatorHistory').prop('resourceKey')).toEqual('page_resourcelocators');
        expect(resourceLocator.find('ResourceLocatorHistory').prop('id')).toEqual(1);
    });
});
test('Pass locale from userStore to ResourceLocator and ResourceLocatorHistory if form has no locale', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 1, { 'locale': undefined }), 'test', { webspace: 'sulu' }));
    const modePromise = Promise.resolve('full');
    userStore_1.default.contentLocale = 'cz';
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} disabled={true} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
            options: { history: true },
        }} formInspector={formInspector}/>);
    return modePromise.then(() => {
        expect(resourceLocator.find(ResourceLocator_2.default).prop('locale').get()).toBe('cz');
        expect(resourceLocator.find('ResourceLocatorHistory').prop('options').locale).toBe('cz');
    });
});
test('Do not add an addFinishFieldHandler for URL generation if used on the homepage', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} value="/"/>);
    expect(formInspector.addFinishFieldHandler).not.toBeCalled();
});
test('Do not add an addFinishFieldHandler for URL generation if no generationUrl was passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={{
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector}/>);
    expect(formInspector.addFinishFieldHandler).not.toBeCalled();
});
test.each(['leaf', 'full'])('Set mode correctly', (mode) => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const modePromise = Promise.resolve(mode);
    const resourceLocator = (0, enzyme_1.mount)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} value="/test/xxx"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find(ResourceLocator_2.default).prop('mode')).toBe(mode);
    });
});
test('Should fire onFinish callback without argument when ResourceLocatorComponent is blurred', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const finishSpy = jest.fn();
    const modePromise = Promise.resolve('leaf');
    const resourceLocator = (0, enzyme_1.mount)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} onFinish={finishSpy}/>);
    return modePromise.then(() => {
        resourceLocator.update();
        resourceLocator.find(ResourceLocator_2.default).prop('onBlur')('Test');
        expect(finishSpy).toBeCalledWith();
    });
});
test('Should automatically request new URL when part field is finished on add form', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const changeSpy = jest.fn();
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} onChange={changeSpy} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'sulu.rlp.part' },
        ],
    });
    const resourceLocatorPromise = Promise.resolve({
        resourcelocator: '/test',
    });
    Requester_1.default.post.mockReturnValue(resourceLocatorPromise);
    finishFieldHandler('/block/0/title', '/title');
    expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
    expect(formInspector.getPathsByTag).toBeCalledWith('sulu.rlp.part');
    expect(Requester_1.default.post).toBeCalledWith('/admin/api/resourcelocators?action=generate', {
        locale: 'en',
        resourceKey: 'tests',
        parts: { title: 'title-value', subtitle: 'subtitle-value' },
    });
    return resourceLocatorPromise.then(() => {
        expect(changeSpy).toBeCalledWith('/test');
    });
});
test('Should request URL with parameters from FormInspector options, fieldTypeOptions and schemaOptions', () => {
    const resourceStore = new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test', { webspace: 'example' }));
    const changeSpy = jest.fn();
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
        '/propertyName': 'property-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
            resourceStorePropertiesToRequest: {
                propertyName: 'requestParamKey',
            },
        }} formInspector={formInspector} onChange={changeSpy} schemaOptions={{
            entity_class: { name: 'entity_class', value: 'entity-class-value' },
            route_schema: { name: 'entity_class', value: '/events/{implode("-", object)}' },
        }} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'sulu.rlp.part' },
        ],
    });
    const resourceLocatorPromise = Promise.resolve({
        resourcelocator: '/test',
    });
    Requester_1.default.post.mockReturnValue(resourceLocatorPromise);
    finishFieldHandler('/block/0/title', '/title');
    expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
    expect(formInspector.getPathsByTag).toBeCalledWith('sulu.rlp.part');
    expect(Requester_1.default.post).toBeCalledWith('/admin/api/resourcelocators?action=generate', {
        locale: 'en',
        parts: { title: 'title-value', subtitle: 'subtitle-value' },
        resourceKey: 'test',
        entityClass: 'entity-class-value',
        routeSchema: '/events/{implode("-", object)}',
        webspace: 'example',
        requestParamKey: 'property-value',
    });
    return resourceLocatorPromise.then(() => {
        expect(changeSpy).toBeCalledWith('/test');
    });
});
test('Should not request new URL when part field is finished on edit form', () => {
    const resourceStore = new ResourceStore_1.default('test', 5, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} schemaPath="/url" value="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'sulu.rlp.part' },
        ],
    });
    finishFieldHandler('/block/0/title', '/title');
    expect(Requester_1.default.post).not.toBeCalled();
});
test('Should not request new URL when part field is finished if all parts are empty', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'sulu.rlp.part' },
        ],
    });
    resourceStore.data = {
        '/title': '',
        '/subtitle': undefined,
    };
    finishFieldHandler('/block/0/title', '/title');
    expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
    expect(formInspector.getPathsByTag).toBeCalledWith('sulu.rlp.part');
    expect(Requester_1.default.post).not.toBeCalled();
});
test('Should not request new URL when part field is finished if input was already changed manually', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'sulu.rlp.part' },
        ],
    });
    return modePromise.then(() => {
        resourceLocator.find(ResourceLocator_2.default).props().onChange('manual-change');
        finishFieldHandler('/block/0/title', '/title');
        expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
        expect(formInspector.getPathsByTag).toBeCalledWith('sulu.rlp.part');
        expect(Requester_1.default.post).not.toBeCalled();
    });
});
test('Should not request new URL when field without the "sulu.rlp.part" tag is finished', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({
        tags: [
            { name: 'other-tag' },
        ],
    });
    finishFieldHandler('/block/0/title', '/title');
    expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
    expect(Requester_1.default.post).not.toBeCalled();
});
test('Should not request new URL when field without any tags has finished editing', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => Promise.resolve('leaf'),
        }} formInspector={formInspector} schemaPath="/url"/>);
    const finishFieldHandler = formInspector.addFinishFieldHandler.mock.calls[0][0];
    formInspector.getSchemaEntryByPath.mockReturnValue({});
    finishFieldHandler('/block/0/title', '/title');
    expect(formInspector.getSchemaEntryByPath).toBeCalledWith('/title');
    expect(Requester_1.default.post).not.toBeCalled();
});
test('Should enable refresh button when value of part field changes on edit form', () => {
    const resourceStore = new ResourceStore_1.default('tests', 5);
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceStore.data['/title'] = 'new-title-value';
        expect(resourceLocator.find('Button').props().disabled).toBeFalsy();
    });
});
test('Should enable refresh button when input is changed manually on edit form', () => {
    const resourceStore = new ResourceStore_1.default('tests', 5);
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceLocator.find(ResourceLocator_2.default).props().onChange('manual-change');
        expect(resourceLocator.find('Button').props().disabled).toBeFalsy();
    });
});
test('Should not enable refresh button when value of part field changes on add form', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined);
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceStore.data['/title'] = 'new-title-value';
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
    });
});
test('Should enable refresh button when input is changed manually on add form', () => {
    const resourceStore = new ResourceStore_1.default('tests', undefined);
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceLocator.find(ResourceLocator_2.default).props().onChange('manual-change');
        expect(resourceLocator.find('Button').props().disabled).toBeFalsy();
    });
});
test('Should not enable refresh button when value of part field changes if all parts are empty', () => {
    const resourceStore = new ResourceStore_1.default('tests', 5);
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test'));
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
        }} formInspector={formInspector} schemaPath="/url"/>);
    return modePromise.then(() => {
        resourceLocator.update();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceStore.data['/title'] = '';
        resourceStore.data['/subtitle'] = undefined;
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        resourceLocator.find(ResourceLocator_2.default).props().onChange('manual-change');
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
    });
});
test('Should request new URL with correct options and disable button when refresh button is clicked', () => {
    const resourceStore = new ResourceStore_1.default('test', 5, { locale: mobx_1.observable.box('en') });
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(resourceStore, 'test', { webspace: 'example' }));
    const changeSpy = jest.fn();
    const modePromise = Promise.resolve('leaf');
    formInspector.getPathsByTag.mockReturnValue(['/title', '/subtitle']);
    resourceStore.data = {
        '/title': 'title-value',
        '/subtitle': 'subtitle-value',
        '/propertyName': 'property-value',
    };
    const resourceLocator = (0, enzyme_1.shallow)(<ResourceLocator_1.default {...fieldTypeDefaultProps_1.default} dataPath="/block/0/url" fieldTypeOptions={{
            generationUrl: '/admin/api/resourcelocators?action=generate',
            historyResourceKey: 'page_resourcelocators',
            modeResolver: () => modePromise,
            resourceStorePropertiesToRequest: {
                propertyName: 'requestParamKey',
            },
        }} formInspector={formInspector} onChange={changeSpy} schemaPath="/url"/>);
    const resourceLocatorPromise = Promise.resolve({
        resourcelocator: '/test',
    });
    Requester_1.default.post.mockReturnValue(resourceLocatorPromise);
    return modePromise.then(() => {
        resourceLocator.update();
        resourceLocator.find(ResourceLocator_2.default).props().onChange('manual-change');
        expect(resourceLocator.find('Button').props().disabled).toBeFalsy();
        resourceLocator.find('Button').props().onClick();
        expect(resourceLocator.find('Button').props().disabled).toBeTruthy();
        expect(formInspector.getPathsByTag).toBeCalledWith('sulu.rlp.part');
        expect(Requester_1.default.post).toBeCalledWith('/admin/api/resourcelocators?action=generate', {
            id: 5,
            locale: 'en',
            parts: { title: 'title-value', subtitle: 'subtitle-value' },
            resourceKey: 'test',
            webspace: 'example',
            requestParamKey: 'property-value',
        });
        return resourceLocatorPromise.then(() => {
            expect(changeSpy).toBeCalledWith('/test');
        });
    });
});
