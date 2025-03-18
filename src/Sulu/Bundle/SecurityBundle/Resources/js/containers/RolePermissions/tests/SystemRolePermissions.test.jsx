"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const securityContextStore_1 = __importDefault(require("../../../stores/securityContextStore"));
const SystemRolePermissions_1 = __importDefault(require("../SystemRolePermissions"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../stores/securityContextStore', () => ({
    getAvailableActions: jest.fn(),
    getSecurityContextByResourceKey: jest.fn(),
}));
test('Render permissions for a single system', () => {
    const roles = [
        { id: 2, identifier: '', name: 'User', permissions: [], system: 'Sulu' },
        { id: 3, identifier: '', name: 'Contact Manager', permissions: [], system: 'Sulu' },
    ];
    const systemRolePermissions = (0, enzyme_1.mount)(<SystemRolePermissions_1.default actions={['view', 'add', 'edit']} disabled={false} onChange={jest.fn()} resourceKey="test" roles={roles} system="Sulu" values={{ '2': { view: true, add: false, edit: true }, '3': { view: false, add: true, edit: false } }}/>);
    expect(systemRolePermissions.render()).toMatchSnapshot();
});
test('Do not show Matrix if no values are given', () => {
    const roles = [
        { id: 2, identifier: '', name: 'User', permissions: [], system: 'Sulu' },
        { id: 3, identifier: '', name: 'Contact Manager', permissions: [], system: 'Sulu' },
    ];
    const systemRolePermissions = (0, enzyme_1.mount)(<SystemRolePermissions_1.default actions={['view', 'add', 'edit']} disabled={false} onChange={jest.fn()} resourceKey="test" roles={roles} system="Sulu" values={{}}/>);
    expect(systemRolePermissions.find('Matrix')).toHaveLength(0);
    expect(systemRolePermissions.find('Toggler').prop('checked')).toEqual(false);
});
test('Render permissions for a single system in disabled state', () => {
    const systemRolePermissions = (0, enzyme_1.shallow)(<SystemRolePermissions_1.default actions={[]} disabled={true} onChange={jest.fn()} resourceKey="test" roles={[]} system="Sulu" values={{ '2': { view: true, add: false, edit: true } }}/>);
    expect(systemRolePermissions.find('Matrix').prop('disabled')).toEqual(true);
});
test('Call onChange callback when matrix changes', () => {
    const changeSpy = jest.fn();
    const systemRolePermissions = (0, enzyme_1.shallow)(<SystemRolePermissions_1.default actions={['view']} disabled={false} onChange={changeSpy} resourceKey="test" roles={[]} system="Sulu" values={{}}/>);
    systemRolePermissions.find('Toggler').simulate('change', true);
    const newValue = { '1': { view: true } };
    systemRolePermissions.find('Matrix').simulate('change', newValue);
    expect(changeSpy).toBeCalledWith(newValue, 'Sulu');
});
test('Call onChange callback with empty values if toggler is deactivated', () => {
    const changeSpy = jest.fn();
    const systemRolePermissions = (0, enzyme_1.shallow)(<SystemRolePermissions_1.default actions={['view']} disabled={false} onChange={changeSpy} resourceKey="test" roles={[]} system="Sulu" values={{ '1': { view: true } }}/>);
    systemRolePermissions.find('Toggler').simulate('change', false);
    expect(changeSpy).toBeCalledWith({}, 'Sulu');
});
test('Show default values after activating toggler', () => {
    const changeSpy = jest.fn();
    const roles = [
        {
            id: 2,
            identifier: '',
            name: 'User',
            permissions: [
                { context: 'sulu.test', permissions: { view: true, add: true, edit: true } },
            ],
            system: 'Sulu',
        },
        {
            id: 3,
            identifier: '',
            name: 'Contact Manager',
            permissions: [
                { context: 'sulu.test', permissions: { view: true, add: false, edit: true } },
            ],
            system: 'Sulu',
        },
    ];
    securityContextStore_1.default.getSecurityContextByResourceKey.mockImplementation((resourceKey) => {
        switch (resourceKey) {
            case 'test':
                return 'sulu.test';
        }
    });
    securityContextStore_1.default.getAvailableActions.mockReturnValue(['view', 'add', 'edit']);
    const systemRolePermissions = (0, enzyme_1.shallow)(<SystemRolePermissions_1.default actions={['view']} disabled={false} onChange={changeSpy} resourceKey="test" roles={roles} system="Sulu" values={{}}/>);
    expect(systemRolePermissions.find('Matrix')).toHaveLength(0);
    systemRolePermissions.find('Toggler').simulate('change', true);
    expect(systemRolePermissions.find('Matrix')).toHaveLength(1);
    expect(systemRolePermissions.find('Matrix').prop('values')).toEqual({
        '2': { view: true, add: true, edit: true },
        '3': { view: true, add: false, edit: true },
    });
});
