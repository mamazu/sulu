"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const components_1 = require("sulu-admin-bundle/components");
const RoleAssignment_1 = __importDefault(require("../RoleAssignment"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render component', () => {
    const value = {
        id: 1,
        role: {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        locales: ['de'],
    };
    const localizations = [
        {
            country: '',
            default: '1',
            language: 'en',
            locale: 'en',
            localization: 'en',
            shadow: '',
        },
        {
            country: '',
            default: '0',
            language: 'de',
            locale: 'de',
            localization: 'de',
            shadow: '',
        },
    ];
    expect((0, enzyme_1.render)(<RoleAssignment_1.default localizations={localizations} onChange={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('Render component in disabled state', () => {
    const value = {
        id: 1,
        role: {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        locales: ['de'],
    };
    const localizations = [
        {
            country: '',
            default: '1',
            language: 'en',
            locale: 'en',
            localization: 'en',
            shadow: '',
        },
        {
            country: '',
            default: '0',
            language: 'de',
            locale: 'de',
            localization: 'de',
            shadow: '',
        },
    ];
    expect((0, enzyme_1.render)(<RoleAssignment_1.default disabled={true} localizations={localizations} onChange={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('The component should trigger the change callback', () => {
    const value = {
        id: 1,
        role: {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        locales: ['de'],
    };
    const localizations = [
        {
            country: '',
            default: '1',
            language: 'en',
            locale: 'en',
            localization: 'en',
            shadow: '',
        },
        {
            country: '',
            default: '0',
            language: 'de',
            locale: 'de',
            localization: 'de',
            shadow: '',
        },
    ];
    const onChangeSpy = jest.fn();
    const roleAssignment = (0, enzyme_1.shallow)(<RoleAssignment_1.default localizations={localizations} onChange={onChangeSpy} value={value}/>);
    roleAssignment.find(components_1.MultiSelect).props().onChange(['de', 'en']);
    const expectedValue = {
        id: 1,
        role: {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        locales: ['de', 'en'],
    };
    expect(onChangeSpy).toHaveBeenCalledWith(expectedValue);
});
