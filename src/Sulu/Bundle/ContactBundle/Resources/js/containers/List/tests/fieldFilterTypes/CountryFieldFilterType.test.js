"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const CountryFieldFilterType_1 = __importDefault(require("../../fieldFilterTypes/CountryFieldFilterType"));
test('Render with value', () => {
    CountryFieldFilterType_1.default.countries = {
        AT: 'Austria',
        DE: 'Germany',
        NL: 'Netherlands',
    };
    const countryFieldFilterType = new CountryFieldFilterType_1.default(jest.fn(), {}, undefined);
    expect((0, enzyme_1.render)(countryFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Filter countries using input field', () => {
    CountryFieldFilterType_1.default.countries = {
        AT: 'Austria',
        DE: 'Germany',
        NL: 'Netherlands',
    };
    const countryFieldFilterType = new CountryFieldFilterType_1.default(jest.fn(), {}, undefined);
    const countryFieldFilterTypeForm1 = (0, enzyme_1.mount)(countryFieldFilterType.getFormNode());
    countryFieldFilterTypeForm1.find('Input').prop('onChange')('Aus');
    const countryFieldFilterTypeForm2 = (0, enzyme_1.mount)(countryFieldFilterType.getFormNode());
    expect(countryFieldFilterTypeForm2.find('Checkbox')).toHaveLength(1);
    expect(countryFieldFilterTypeForm2.find('Checkbox').at(0).prop('value')).toEqual('AT');
});
test('Filter countries using input field with lowercase start', () => {
    CountryFieldFilterType_1.default.countries = {
        AT: 'Austria',
        DE: 'Germany',
        NL: 'Netherlands',
    };
    const countryFieldFilterType = new CountryFieldFilterType_1.default(jest.fn(), {}, undefined);
    const countryFieldFilterTypeForm1 = (0, enzyme_1.mount)(countryFieldFilterType.getFormNode());
    countryFieldFilterTypeForm1.find('Input').prop('onChange')('aus');
    const countryFieldFilterTypeForm2 = (0, enzyme_1.mount)(countryFieldFilterType.getFormNode());
    expect(countryFieldFilterTypeForm2.find('Checkbox')).toHaveLength(1);
    expect(countryFieldFilterTypeForm2.find('Checkbox').at(0).prop('value')).toEqual('AT');
});
test.each([
    [['AT'], 'Austria'],
    [['DE', 'NL'], 'Germany, Netherlands'],
    [undefined, null],
    [null, null],
])('Return value node for %s', (value, expectedValueNode) => {
    CountryFieldFilterType_1.default.countries = {
        AT: 'Austria',
        DE: 'Germany',
        NL: 'Netherlands',
    };
    const countryFieldFilterType = new CountryFieldFilterType_1.default(jest.fn(), {}, null);
    const valueNodePromise = countryFieldFilterType.getValueNode(value);
    return valueNodePromise.then((valueNode) => {
        expect(valueNode).toEqual(expectedValueNode);
    });
});
