"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const Form_1 = require("sulu-admin-bundle/containers/Form");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const MediaVersionUpload_1 = __importDefault(require("../../../MediaVersionUpload/MediaVersionUpload"));
const MediaVersionUpload_2 = __importDefault(require("../../fields/MediaVersionUpload"));
jest.mock('sulu-admin-bundle/containers/Form/stores/metadataStore', () => ({
    getSchema: jest.fn().mockReturnValue(Promise.resolve({})),
    getJsonSchema: jest.fn().mockReturnValue(Promise.resolve({})),
    getSchemaTypes: jest.fn().mockReturnValue(Promise.resolve(null)),
}));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve({})),
}));
test('Pass ResourceStore from FormInspector to MediaVersionUpload component', () => {
    const resourceStore = new stores_1.ResourceStore('media', 4, { locale: mobx_1.observable.box('de') });
    const successSpy = jest.fn();
    const formInspector = new Form_1.FormInspector(new Form_1.ResourceFormStore(resourceStore, 'test'));
    const mediaVersionUpload = (0, enzyme_1.shallow)(<MediaVersionUpload_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onSuccess={successSpy}/>);
    expect(mediaVersionUpload.find(MediaVersionUpload_1.default).prop('resourceStore')).toEqual(resourceStore);
    expect(mediaVersionUpload.find(MediaVersionUpload_1.default).prop('onSuccess')).toEqual(successSpy);
});
