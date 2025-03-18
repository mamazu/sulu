"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const stores_2 = require("sulu-page-bundle/stores");
const RolePermissions_1 = __importDefault(require("../../fields/RolePermissions"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options) {
    this.options = options;
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (formStore) {
    this.options = formStore.options;
}));
jest.mock('sulu-page-bundle/stores/webspaceStore/webspaceStore', () => ({
    getWebspace: jest.fn(),
    hasWebspace: jest.fn(),
}));
test('Pass props correctly to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets', { resourceKey: 'snippets' }));
    const value = {};
    const rolePermissions = (0, enzyme_1.shallow)(<RolePermissions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={value}/>);
    expect(stores_2.webspaceStore.getWebspace).not.toBeCalled();
    expect(rolePermissions.find('RolePermissions').prop('disabled')).toEqual(false);
    expect(rolePermissions.find('RolePermissions').prop('permissionCheck')).toBe(undefined);
    expect(rolePermissions.find('RolePermissions').prop('resourceKey')).toEqual('snippets');
    expect(rolePermissions.find('RolePermissions').prop('system')).toBe(undefined);
    expect(rolePermissions.find('RolePermissions').prop('value')).toBe(value);
});
test('Pass disabled prop correctly to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets', { resourceKey: 'snippets' }));
    const rolePermissions = (0, enzyme_1.shallow)(<RolePermissions_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(rolePermissions.find('RolePermissions').prop('disabled')).toEqual(true);
    expect(rolePermissions.find('RolePermissions').prop('value')).toEqual({});
});
test('Pass system prop correctly to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets', { resourceKey: 'snippets', webspace: 'test' }));
    stores_2.webspaceStore.getWebspace.mockImplementation((webspaceKey) => {
        if (webspaceKey === 'test') {
            return {
                key: 'test',
                security: {
                    system: 'test_security',
                    permissionCheck: true,
                },
            };
        }
    });
    stores_2.webspaceStore.hasWebspace.mockImplementation((webspaceKey) => {
        if (webspaceKey === 'test') {
            return true;
        }
    });
    const rolePermissions = (0, enzyme_1.shallow)(<RolePermissions_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(rolePermissions.find('RolePermissions').prop('permissionCheck')).toEqual(true);
    expect(rolePermissions.find('RolePermissions').prop('system')).toEqual('test_security');
    expect(rolePermissions.find('RolePermissions').prop('webspaceKey')).toEqual('test');
});
test('Pass disabled prop correctly to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets', { resourceKey: 'snippets' }));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const rolePermissions = (0, enzyme_1.shallow)(<RolePermissions_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    rolePermissions.find('RolePermissions').prop('onChange')({});
    expect(changeSpy).toBeCalledWith({});
    expect(finishSpy).toBeCalledWith();
});
