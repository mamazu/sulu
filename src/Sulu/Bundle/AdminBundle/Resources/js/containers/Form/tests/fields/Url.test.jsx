"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const Url_1 = __importDefault(require("../../fields/Url"));
const Url_2 = __importDefault(require("../../../../components/Url"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error prop correctly to Url component', () => {
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
    };
    const error = { keyword: 'minLength', parameters: {} };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(url.find(Url_2.default).prop('valid')).toEqual(false);
});
test('Pass props correctly to Url component', () => {
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} schemaOptions={schemaOptions} value="http://www.sulu.io"/>);
    expect(url.find(Url_2.default).prop('protocols')).toEqual(['http://', 'https://']);
    expect(url.find(Url_2.default).prop('value')).toEqual('http://www.sulu.io');
    expect(url.find(Url_2.default).prop('disabled')).toEqual(true);
});
test('Pass no schemaOptions to Url component and render correct defaults', () => {
    const schemaOptions = {};
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} schemaOptions={schemaOptions} value="http://www.sulu.io"/>);
    expect(url.find(Url_2.default).prop('protocols')).toEqual(['http://', 'https://', 'ftp://', 'ftps://', 'mailto:', 'tel:']);
    expect(url.find(Url_2.default).prop('value')).toEqual('http://www.sulu.io');
    expect(url.find(Url_2.default).prop('disabled')).toEqual(true);
});
test('Not call changed when only protocol is given', () => {
    const schemaOptions = {
        defaults: {
            name: 'defaults',
            value: [
                { name: 'scheme', value: 'http://' },
            ],
        },
    };
    const changeSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(url.find(Url_2.default).prop('protocols')).toEqual(['http://', 'https://', 'ftp://', 'ftps://', 'mailto:', 'tel:']);
    expect(url.find(Url_2.default).prop('defaultProtocol')).toEqual('http://');
    expect(changeSpy).not.toBeCalled();
});
test('Pass correct default props to Url component', () => {
    const schemaOptions = {
        defaults: {
            name: 'defaults',
            value: [
                { name: 'scheme', value: 'http://' },
                { name: 'specific_part', value: 'github.com' },
            ],
        },
    };
    const changeSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(url.find(Url_2.default).prop('protocols')).toEqual(['http://', 'https://', 'ftp://', 'ftps://', 'mailto:', 'tel:']);
    expect(changeSpy).toBeCalledWith('http://github.com', { 'isDefaultValue': true });
});
test('Throw error if only specific_part default is set', () => {
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
        defaults: {
            name: 'defaults',
            value: [
                { name: 'specific_part', value: 'sulu.io' },
            ],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    expect(() => (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow(/without a scheme/);
});
test('Do not build URL from defaults if value is already given', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
        defaults: {
            name: 'defaults',
            value: [
                { name: 'scheme', value: 'https://' },
                { name: 'specific_part', value: 'sulu.io' },
            ],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions} value="http://www.sulu.io"/>);
    expect(changeSpy).not.toBeCalled();
});
test('Build URL from defaults to pass as value to URL component', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
        defaults: {
            name: 'defaults',
            value: [
                { name: 'scheme', value: 'https://' },
                { name: 'specific_part', value: 'sulu.io' },
            ],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith('https://sulu.io', { 'isDefaultValue': true });
});
test('Should not pass any arguments to onFinish callback', () => {
    const schemaOptions = {
        schemes: {
            name: 'schemes',
            value: [
                { name: 'http://' },
                { name: 'https://' },
            ],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const finishSpy = jest.fn();
    const url = (0, enzyme_1.shallow)(<Url_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    url.find('Url').prop('onBlur')('Test');
    expect(finishSpy).toBeCalledWith();
});
