"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const DatePicker_1 = __importDefault(require("../../fields/DatePicker"));
const DatePicker_2 = __importDefault(require("../../../../components/DatePicker"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
test('Pass error correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = {};
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} error={error} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector}/>);
    expect(datePicker.find(DatePicker_2.default).prop('valid')).toBe(false);
});
test('Pass options for date picker to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector}/>);
    expect(datePicker.find(DatePicker_2.default).prop('options')).toEqual({});
});
test('Pass options for time picker to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: false,
        timeFormat: true,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector}/>);
    expect(datePicker.find(DatePicker_2.default).prop('options')).toEqual({ dateFormat: false, timeFormat: true });
});
test('Pass options for date time picker to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: true,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector}/>);
    expect(datePicker.find(DatePicker_2.default).prop('options')).toEqual({ timeFormat: true });
});
test('Pass invalid value correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value="test"/>);
    expect(datePicker.find(DatePicker_2.default).prop('value')).toBe(undefined);
});
test('Pass disabled correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} disabled={true} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value="test"/>);
    expect(datePicker.find(DatePicker_2.default).prop('disabled')).toBe(true);
});
test('Convert value and pass it correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value="2018-12-03"/>);
    expect(datePicker.find(DatePicker_2.default).prop('value')).toBeInstanceOf(Date);
});
test('Should call onFinish callback on every onChange with correctly converted date value', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: false,
    };
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    datePicker.find(DatePicker_2.default).simulate('change', new Date(Date.UTC(2018, 4, 15)));
    expect(finishSpy).toBeCalled();
    expect(changeSpy).toBeCalledWith('2018-05-15');
});
test('Should call onFinish callback on every onChange with correctly converted time value', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: false,
        timeFormat: true,
    };
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    datePicker.find(DatePicker_2.default).simulate('change', new Date(Date.UTC(2018, 4, 15)));
    expect(finishSpy).toBeCalled();
    expect(changeSpy).toBeCalledWith('02:00:00');
});
test('Should call onFinish callback on every onChange with correctly converted date time value', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        dateFormat: true,
        timeFormat: true,
    };
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const datePicker = (0, enzyme_1.shallow)(<DatePicker_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    datePicker.find(DatePicker_2.default).simulate('change', new Date(Date.UTC(2018, 4, 15, 6, 30, 0)));
    expect(finishSpy).toBeCalled();
    expect(changeSpy).toBeCalledWith('2018-05-15T08:30:00');
});
