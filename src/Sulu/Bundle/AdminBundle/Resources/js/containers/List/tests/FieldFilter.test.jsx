"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const FieldFilter_1 = __importDefault(require("../FieldFilter"));
const listFieldFilterTypeRegistry_1 = __importDefault(require("../registries/listFieldFilterTypeRegistry"));
jest.mock('../registries/listFieldFilterTypeRegistry', () => ({
    get: jest.fn(),
    getOptions: jest.fn().mockReturnValue({}),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render empty FieldFilter', () => {
    const schema = {};
    const value = {};
    expect((0, enzyme_1.render)(<FieldFilter_1.default fields={schema} onChange={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('Render FieldFilter with schema and value', () => {
    const schema = {
        firstName: {
            filterType: 'text',
            filterTypeParameters: { test: 'value' },
            transformerTypeParameters: {},
            label: 'First name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
        lastName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'Last name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const value = {
        firstName: undefined,
        lastName: undefined,
    };
    const fieldFilter = (0, enzyme_1.shallow)(<FieldFilter_1.default fields={schema} onChange={jest.fn()} value={value}/>);
    expect(fieldFilter.find('FieldFilterItem')).toHaveLength(2);
    expect(fieldFilter.find('FieldFilterItem').at(0).props()).toEqual(expect.objectContaining({
        column: 'firstName',
        filterType: 'text',
        filterTypeParameters: { test: 'value' },
        label: 'First name',
        value: undefined,
    }));
    expect(fieldFilter.find('FieldFilterItem').at(1).props()).toEqual(expect.objectContaining({
        column: 'lastName',
        filterType: 'text',
        filterTypeParameters: null,
        label: 'Last name',
        value: undefined,
    }));
});
test('Show filter options in disabled state if a filter for them was already added', () => {
    listFieldFilterTypeRegistry_1.default.get.mockReturnValue(class {
        constructor() {
            this.getFormNode = jest.fn();
            this.getValueNode = jest.fn();
            this.setValue = jest.fn();
        }
    });
    const changeSpy = jest.fn();
    const schema = {
        firstName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'First name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
        lastName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'Last name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const value = {
        firstName: undefined,
    };
    const fieldFilter = (0, enzyme_1.mount)(<FieldFilter_1.default fields={schema} onChange={changeSpy} value={value}/>);
    fieldFilter.find('Button[icon="su-filter"]').simulate('click');
    expect(fieldFilter.find('ArrowMenu Action[value="firstName"]').prop('disabled')).toEqual(true);
    expect(fieldFilter.find('ArrowMenu Action[value="lastName"]').prop('disabled')).toEqual(false);
});
test('Call onChange with new filter chip when Action in ArrowMenu was clicked', () => {
    listFieldFilterTypeRegistry_1.default.get.mockReturnValue(class {
        constructor() {
            this.getFormNode = jest.fn();
            this.getValueNode = jest.fn();
            this.setValue = jest.fn();
        }
    });
    const changeSpy = jest.fn();
    const schema = {
        firstName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'First name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
        lastName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'Last name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const value = {
        firstName: undefined,
    };
    const fieldFilter = (0, enzyme_1.mount)(<FieldFilter_1.default fields={schema} onChange={changeSpy} value={value}/>);
    fieldFilter.find('Button[icon="su-filter"]').simulate('click');
    fieldFilter.find('ArrowMenu Action[value="lastName"]').simulate('click');
    expect(changeSpy).toBeCalledWith({ firstName: undefined, lastName: undefined });
});
test('Call onChange with new filter value when onChange from FieldFilterItem is called', () => {
    listFieldFilterTypeRegistry_1.default.get.mockReturnValue(class {
        constructor() {
            this.getFormNode = jest.fn();
            this.getValueNode = jest.fn();
            this.setValue = jest.fn();
        }
    });
    const changeSpy = jest.fn();
    const schema = {
        firstName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'First name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
        lastName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'Last name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const value = {
        firstName: undefined,
    };
    const fieldFilter = (0, enzyme_1.mount)(<FieldFilter_1.default fields={schema} onChange={changeSpy} value={value}/>);
    expect(fieldFilter.find('FieldFilterItem[column="firstName"]').prop('open')).toEqual(false);
    fieldFilter.find('FieldFilterItem[column="firstName"]').prop('onClick')('firstName');
    fieldFilter.update();
    expect(fieldFilter.find('FieldFilterItem[column="firstName"]').prop('open')).toEqual(true);
    fieldFilter.find('FieldFilterItem[column="firstName"]').prop('onChange')('firstName', 'Max');
    fieldFilter.update();
    expect(changeSpy).toBeCalledWith({ firstName: 'Max' });
    expect(fieldFilter.find('FieldFilterItem[column="firstName"]').prop('open')).toEqual(false);
});
test('Call onChange without filter chip for which delete icon was clicked', () => {
    listFieldFilterTypeRegistry_1.default.get.mockReturnValue(class {
        constructor() {
            this.getFormNode = jest.fn();
            this.getValueNode = jest.fn();
            this.setValue = jest.fn();
        }
    });
    const changeSpy = jest.fn();
    const schema = {
        firstName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'First name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
        lastName: {
            filterType: 'text',
            filterTypeParameters: null,
            transformerTypeParameters: {},
            label: 'Last name',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const value = {
        firstName: 'First Name',
        lastName: 'Last Name',
    };
    const fieldFilter = (0, enzyme_1.mount)(<FieldFilter_1.default fields={schema} onChange={changeSpy} value={value}/>);
    fieldFilter.find('Chip[value="lastName"] Icon[name="su-times"]').simulate('click');
    expect(changeSpy).toBeCalledWith({ firstName: 'First Name' });
});
