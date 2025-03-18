"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const fieldRegistry_1 = __importDefault(require("sulu-admin-bundle/containers/Form/registries/fieldRegistry"));
const SingleSelect_1 = __importDefault(require("sulu-admin-bundle/containers/Form/fields/SingleSelect"));
const Form_1 = require("sulu-admin-bundle/containers/Form");
const Field_1 = __importDefault(require("sulu-admin-bundle/containers/Form/Field"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const ImageMap_1 = __importDefault(require("../../fields/ImageMap"));
const ImageMap_2 = __importDefault(require("../../../ImageMap"));
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.locale = observableOptions.locale;
}));
jest.mock('sulu-admin-bundle/stores/SingleSelectionStore', () => jest.fn(function () {
    this.loadItem = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (formStore) {
    this.locale = formStore.locale;
    this.isFieldModified = jest.fn();
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    contentLocale: 'en',
}));
jest.mock('../../../SingleMediaSelectionOverlay', () => jest.fn(() => null));
jest.mock('sulu-admin-bundle/containers/Form/registries/fieldRegistry', () => ({
    get: jest.fn().mockReturnValue(() => <div>field type mock</div>),
    getOptions: jest.fn().mockReturnValue({}),
}));
window.ResizeObserver = jest.fn(function () {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});
test('Pass correct props to SingleMediaSelection component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                text: {
                    label: 'Text',
                    type: 'text_line',
                },
            },
        },
    };
    const imageMap = (0, enzyme_1.shallow)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} defaultType="default" disabled={true} error={{ keyword: 'mandatory', parameters: {} }} formInspector={formInspector} types={types} value={{ imageId: 33, hotspots: [] }}/>);
    expect(imageMap.find(ImageMap_2.default).props().disabled).toEqual(true);
    expect(imageMap.find(ImageMap_2.default).props().valid).toEqual(false);
    expect(imageMap.find(ImageMap_2.default).props().locale.get()).toEqual('en');
    expect(imageMap.find(ImageMap_2.default).props().types).toEqual({ 'default': 'Default' });
    expect(imageMap.find(ImageMap_2.default).props().value).toEqual({ imageId: 33, hotspots: [] });
});
test('Pass correct default value to ImageMapContainer', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, {}), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                text: {
                    label: 'Text',
                    type: 'text_line',
                },
            },
        },
    };
    const imageMap = (0, enzyme_1.shallow)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} defaultType="default" formInspector={formInspector} types={types} value={undefined}/>);
    expect(imageMap.find(ImageMap_2.default).props().value).toEqual({ imageId: undefined, hotspots: [] });
});
test('Pass content-locale of user to SingleMediaSelection if locale is not present in form-inspector', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, {}), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                text: {
                    label: 'Text',
                    type: 'text_line',
                },
            },
        },
    };
    const imageMap = (0, enzyme_1.shallow)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} defaultType="default" formInspector={formInspector} types={types} value={{ imageId: 44, hotspots: [] }}/>);
    expect(imageMap.find(ImageMap_2.default).props().locale.get()).toEqual('en');
});
test('Should call onChange and onFinish if the value changes', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                text: {
                    label: 'Text',
                    type: 'text_line',
                },
            },
        },
    };
    const value = {
        imageId: 55,
        hotspots: [
            { 'hotspot': { 'type': 'point' }, 'type': 'default', 'text': 'text-value-123' },
        ],
    };
    const data = {
        imageMapProperty: value,
        otherProperty: 'other-value',
    };
    const imageMap = (0, enzyme_1.mount)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} data={data} dataPath="imageMapProperty" defaultType="default" formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} types={types} value={value}/>);
    expect(imageMap.find(Field_1.default).props().data).toEqual(data);
    expect(imageMap.find(Field_1.default).props().value).toEqual('text-value-123');
    // check if data path that is passed to field leads to correct value for field
    const fieldData = imageMap.find(Form_1.Renderer).props().data;
    const fieldDataPath = imageMap.find(Form_1.Renderer).props().dataPath;
    const fieldValue = imageMap.find(Form_1.Renderer).props().value;
    expect(json_pointer_1.default.get(fieldData, '/' + fieldDataPath)).toEqual(fieldValue);
});
test('Should pass correct data to Renderer component', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                text: {
                    label: 'Text',
                    type: 'text_line',
                },
            },
        },
    };
    const imageMap = (0, enzyme_1.shallow)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} defaultType="default" formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} types={types} value={{ imageId: 55, hotspots: [] }}/>);
    imageMap.find(ImageMap_2.default).props().onChange({ imageId: 44, hotspots: [] });
    imageMap.find(ImageMap_2.default).props().onFinish();
    expect(changeSpy).toBeCalledWith({ imageId: 44, hotspots: [] });
    expect(finishSpy).toBeCalled();
});
test('Should set correct default values for multiple single_select in form', () => {
    const changeSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const types = {
        default: {
            title: 'Default',
            form: {
                position_center: {
                    label: 'Position Center',
                    type: 'single_select',
                    options: {
                        values: {
                            name: 'values',
                            type: 'collection',
                            value: [
                                {
                                    name: 'left',
                                    title: 'Left',
                                },
                                {
                                    name: 'center',
                                    title: 'Center',
                                },
                                {
                                    name: 'right',
                                    title: 'Right',
                                },
                            ],
                        },
                    },
                },
                position_left: {
                    label: 'Position Left',
                    type: 'single_select',
                    options: {
                        default_value: {
                            name: 'default_value',
                            type: 'string',
                            value: 'left',
                        },
                        values: {
                            name: 'values',
                            type: 'collection',
                            value: [
                                {
                                    name: 'left',
                                    title: 'Left',
                                },
                                {
                                    name: 'center',
                                    title: 'Center',
                                },
                                {
                                    name: 'right',
                                    title: 'Right',
                                },
                            ],
                        },
                    },
                },
                position_right: {
                    label: 'Position Right',
                    type: 'single_select',
                    options: {
                        default_value: {
                            name: 'default_value',
                            type: 'string',
                            value: 'right',
                        },
                        values: {
                            name: 'values',
                            type: 'collection',
                            value: [
                                {
                                    name: 'left',
                                    title: 'Left',
                                },
                                {
                                    name: 'center',
                                    title: 'Center',
                                },
                                {
                                    name: 'right',
                                    title: 'Right',
                                },
                            ],
                        },
                    },
                },
            },
        },
    };
    fieldRegistry_1.default.get.mockReturnValue(SingleSelect_1.default);
    const imageMap = (0, enzyme_1.mount)(<ImageMap_1.default {...TestHelper_1.fieldTypeDefaultProps} defaultType="default" formInspector={formInspector} onChange={changeSpy} types={types} value={{ imageId: 55, hotspots: [] }}/>);
    imageMap.find('Button').at(1).simulate('click');
    expect(changeSpy).toBeCalledWith({
        'hotspots': [{
                'hotspot': { 'type': 'point' },
                'position_left': 'left',
                'position_right': 'right',
                'type': 'default',
            }], 'imageId': 55,
    });
});
