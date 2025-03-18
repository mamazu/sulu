"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("sulu-admin-bundle/utils/TestHelper/fieldTypeDefaultProps"));
const stores_1 = require("sulu-admin-bundle/stores");
const ResourceFormStore_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/ResourceFormStore"));
const Form_1 = require("sulu-admin-bundle/containers/Form");
const Form_2 = require("../../../../containers/Form");
const Location_1 = __importDefault(require("../../../../containers/Location/Location"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn());
test('Pass props correctly to Location component', () => {
    const locationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'town-123',
        zoom: 5,
    };
    const formInspector = new Form_1.FormInspector(new ResourceFormStore_1.default(new stores_1.ResourceStore('test'), 'test'));
    const location = (0, enzyme_1.shallow)(<Form_2.Location {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} value={locationData}/>);
    expect(location.find(Location_1.default).props().disabled).toBe(true);
    expect(location.find(Location_1.default).props().value).toBe(locationData);
});
test('Call onChange and onFinish when onChange callback of Location component is fired', () => {
    const newLocation = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'town-123',
        zoom: 5,
    };
    const formInspector = new Form_1.FormInspector(new ResourceFormStore_1.default(new stores_1.ResourceStore('test'), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const location = (0, enzyme_1.shallow)(<Form_2.Location {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    location.find(Location_1.default).props().onChange(newLocation);
    expect(changeSpy).toBeCalledWith(newLocation);
    expect(finishSpy).toBeCalledWith();
});
