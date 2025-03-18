"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const stores_1 = require("sulu-admin-bundle/stores");
const containers_1 = require("sulu-admin-bundle/containers");
const RoleAssignments_1 = __importDefault(require("../RoleAssignments"));
const RoleAssignment_1 = __importDefault(require("../RoleAssignment"));
jest.mock('sulu-admin-bundle/stores/ResourceListStore', () => jest.fn().mockImplementation(function () {
    this.loading = false;
    this.data = [
        {
            id: 2,
            name: 'Role Name 2',
            system: 'Sulu',
        },
        {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        {
            id: 23,
            name: 'Role Name 23',
            system: 'Sulu',
        },
    ];
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    localizationStore: {
        localizations: undefined,
    },
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render component without data', () => {
    stores_1.localizationStore.localizations = [
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
    const roleAssignments = (0, enzyme_1.mount)(<RoleAssignments_1.default onChange={jest.fn()} value={[]}/>);
    expect(roleAssignments.render()).toMatchSnapshot();
});
test('Render component', () => {
    const value = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
    ];
    stores_1.localizationStore.localizations = [
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
    const roleAssignments = (0, enzyme_1.mount)(<RoleAssignments_1.default onChange={jest.fn()} value={value}/>);
    expect(roleAssignments.render()).toMatchSnapshot();
});
test('Render component in disabled state', () => {
    const value = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
    ];
    stores_1.localizationStore.localizations = [
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
    const roleAssignments = (0, enzyme_1.mount)(<RoleAssignments_1.default disabled={true} onChange={jest.fn()} value={value}/>);
    expect(roleAssignments.render()).toMatchSnapshot();
});
test('Should trigger onChange correctly when MultiSelect for roles changes', () => {
    const value = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
    ];
    stores_1.localizationStore.localizations = [
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
    const roleAssignments = (0, enzyme_1.mount)(<RoleAssignments_1.default onChange={onChangeSpy} value={value}/>);
    roleAssignments.find(containers_1.ResourceMultiSelect).at(0).instance().props.onChange([2, 5, 23], [
        {
            id: 2,
            name: 'Role Name 2',
            system: 'Sulu',
        },
        {
            id: 5,
            name: 'Role Name 5',
            system: 'Sulu',
        },
        {
            id: 23,
            name: 'Role Name 23',
            system: 'Sulu',
        },
    ]);
    const newValue = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
        {
            role: {
                id: 2,
                name: 'Role Name 2',
                system: 'Sulu',
            },
            locales: [],
        },
    ];
    expect(onChangeSpy).toBeCalledWith(newValue);
});
test('Should trigger onChange correctly when RoleAssignment changes', () => {
    const value = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
    ];
    stores_1.localizationStore.localizations = [
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
    const roleAssignments = (0, enzyme_1.mount)(<RoleAssignments_1.default onChange={onChangeSpy} value={value}/>);
    const newValue = [
        {
            id: 1,
            role: {
                id: 5,
                name: 'Role Name 5',
                system: 'Sulu',
            },
            locales: ['de'],
        },
        {
            id: 2,
            role: {
                id: 23,
                name: 'Role Name 23',
                system: 'Sulu',
            },
            locales: ['de'],
        },
    ];
    roleAssignments.find(RoleAssignment_1.default).at(1).instance().props.onChange(newValue[0]);
    expect(onChangeSpy).toBeCalledWith(newValue);
});
