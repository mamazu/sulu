"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const stores_1 = require("sulu-page-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const Permissions_1 = __importDefault(require("../Permissions"));
const securityContextStore_1 = __importDefault(require("../../../stores/securityContextStore/securityContextStore"));
const PermissionMatrix_1 = __importDefault(require("../PermissionMatrix"));
jest.mock('sulu-page-bundle/stores/webspaceStore', () => ({
    allWebspaces: [],
}));
jest.mock('../../../stores/securityContextStore/securityContextStore', () => ({
    getSecurityContextGroups: jest.fn(() => Promise.resolve()),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render with minimal', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={jest.fn()} system="Sulu" value={value}/>);
    expect(securityContextStore_1.default.getSecurityContextGroups).toBeCalledWith('Sulu');
    permissions.update();
    expect(permissions.render()).toMatchSnapshot();
});
test('Render in disabled state', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default disabled={true} onChange={jest.fn()} system="Sulu" value={value}/>);
    expect(securityContextStore_1.default.getSecurityContextGroups).toBeCalledWith('Sulu');
    permissions.update();
    expect(permissions.render()).toMatchSnapshot();
});
test('Should trigger onChange correctly', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const onChange = jest.fn();
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={onChange} system="Sulu" value={value}/>);
    const newContextPermissions = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': false,
            },
        },
    ];
    permissions.find(PermissionMatrix_1.default).at(0).instance().props.onChange(newContextPermissions);
    expect(onChange).toBeCalledWith(newContextPermissions);
});
test('Render with empty webspace section', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view', 'add', 'edit', 'delete', 'live', 'security'],
            'sulu.webspaces.#webspace#.analytics': ['view', 'add', 'edit', 'delete'],
            'sulu.webspaces.#webspace#.default-snippets': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    stores_1.webspaceStore.allWebspaces = [
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example', 'name': 'Example' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example2', 'name': 'Example 2' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example3', 'name': 'Example 3!' }),
    ];
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={jest.fn()} system="Sulu" value={value}/>);
    expect(securityContextStore_1.default.getSecurityContextGroups).toBeCalledWith('Sulu');
    // Currently we have to load each child separately, because of a bug in enzyme.
    // TODO: https://github.com/airbnb/enzyme/issues/1213
    const permissionChildren = permissions.children();
    expect(permissionChildren.at(0).render()).toMatchSnapshot();
    expect(permissionChildren.at(1).render()).toMatchSnapshot();
    expect(permissionChildren.at(2).render()).toMatchSnapshot();
    expect(permissionChildren.at(3).render()).toMatchSnapshot();
});
test('Render with webspace section', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view', 'add', 'edit', 'delete', 'live', 'security'],
            'sulu.webspaces.#webspace#.analytics': ['view', 'add', 'edit', 'delete'],
            'sulu.webspaces.#webspace#.default-snippets': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    stores_1.webspaceStore.allWebspaces = [
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example', 'name': 'Example' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example2', 'name': 'Example 2' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example3', 'name': 'Example 3!' }),
    ];
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={jest.fn()} system="Sulu" value={value}/>);
    expect(securityContextStore_1.default.getSecurityContextGroups).toBeCalledWith('Sulu');
    permissions.update();
    // Currently we have to load each child separately, because of a bug in enzyme.
    // TODO: https://github.com/airbnb/enzyme/issues/1213
    const permissionChildren = permissions.children();
    expect(permissionChildren.at(0).render()).toMatchSnapshot();
    expect(permissionChildren.at(1).render()).toMatchSnapshot();
    expect(permissionChildren.at(2).render()).toMatchSnapshot();
    expect(permissionChildren.at(3).render()).toMatchSnapshot();
});
test('Should trigger onChange correctly when changing something in the webspace section', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view', 'add', 'edit', 'delete', 'live', 'security'],
            'sulu.webspaces.#webspace#.analytics': ['view', 'add', 'edit', 'delete'],
            'sulu.webspaces.#webspace#.default-snippets': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    stores_1.webspaceStore.allWebspaces = [
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example', 'name': 'Example' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example2', 'name': 'Example 2' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example3', 'name': 'Example 3!' }),
    ];
    const onChange = jest.fn();
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={onChange} system="Sulu" value={value}/>);
    const newContextPermissions = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': false,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
    ];
    permissions.find(PermissionMatrix_1.default).at(0).instance().props.onChange(newContextPermissions);
    expect(onChange).toBeCalledWith(newContextPermissions);
});
test('Should trigger onChange correctly when a webspace is added', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view', 'add', 'edit', 'delete', 'live', 'security'],
            'sulu.webspaces.#webspace#.analytics': ['view', 'add', 'edit', 'delete'],
            'sulu.webspaces.#webspace#.default-snippets': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    stores_1.webspaceStore.allWebspaces = [
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example', 'name': 'Example' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example2', 'name': 'Example 2' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example3', 'name': 'Example 3!' }),
    ];
    const onChange = jest.fn();
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={onChange} system="Sulu" value={value}/>);
    permissions.find('MultiSelect').prop('onChange')(['example', 'example3']);
    const expectedNewValue = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
        {
            id: undefined,
            context: 'sulu.webspaces.example3',
            permissions: {
                'view': false,
                'delete': false,
                'add': false,
                'edit': false,
                'live': false,
                'security': false,
            },
        },
        {
            id: undefined,
            context: 'sulu.webspaces.example3.analytics',
            permissions: {
                'view': false,
                'delete': false,
                'add': false,
                'edit': false,
            },
        },
        {
            id: undefined,
            context: 'sulu.webspaces.example3.default-snippets',
            permissions: {
                'view': false,
                'delete': false,
                'add': false,
                'edit': false,
            },
        },
    ];
    expect(onChange).toBeCalledWith(expectedNewValue);
});
test('Should trigger onChange correctly when a webspace is removed', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 3,
            context: 'sulu.webspaces.example',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': false,
            },
        },
        {
            id: 4,
            context: 'sulu.webspaces.example3',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view', 'add', 'edit', 'delete', 'live', 'security'],
            'sulu.webspaces.#webspace#.analytics': ['view', 'add', 'edit', 'delete'],
            'sulu.webspaces.#webspace#.default-snippets': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    stores_1.webspaceStore.allWebspaces = [
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example', 'name': 'Example' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example2', 'name': 'Example 2' }),
        Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { 'key': 'example3', 'name': 'Example 3!' }),
    ];
    const onChange = jest.fn();
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={onChange} system="Sulu" value={value}/>);
    permissions.find('MultiSelect').prop('onChange')(['example3']);
    const expectedNewValue = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 4,
            context: 'sulu.webspaces.example3',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
                'live': false,
                'security': true,
            },
        },
    ];
    expect(onChange).toBeCalledWith(expectedNewValue);
});
test('Should trigger a mobx autorun if the prop system changes', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={jest.fn()} system="Sulu" value={value}/>);
    // update with the same system, nothing should happen
    // update it with a other system it should trigger a reload
    permissions.setProps({ system: 'Sulu' });
    permissions.setProps({ system: 'Other-System' });
    expect(securityContextStore_1.default.getSecurityContextGroups).toHaveBeenCalledWith('Sulu');
    expect(securityContextStore_1.default.getSecurityContextGroups).toHaveBeenCalledWith('Other-System');
    expect(securityContextStore_1.default.getSecurityContextGroups).toHaveBeenCalledTimes(2);
});
test('Pass disabled state to MultiSelect', () => {
    const securityContextGroups = {
        'Webspaces': {
            'sulu.webspaces.#webspace#': ['view'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default disabled={true} onChange={jest.fn()} system="Sulu" value={[]}/>);
    expect(permissions.find('MultiSelect').prop('disabled')).toEqual(true);
});
test('Dispose autorun on unmount', () => {
    const value = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
        {
            id: 2,
            context: 'sulu.contact.organizations',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': true,
            },
        },
    ];
    const securityContextGroups = {
        'Contacts': {
            'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
            'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
        },
    };
    securityContextStore_1.default.getSecurityContextGroups.mockReturnValue(securityContextGroups);
    const permissions = (0, enzyme_1.mount)(<Permissions_1.default onChange={jest.fn()} system="Sulu" value={value}/>);
    permissions.update();
    const systemDisposerSpy = jest.fn();
    permissions.instance().systemDisposer = systemDisposerSpy;
    permissions.unmount();
    expect(systemDisposerSpy).toBeCalledWith();
});
