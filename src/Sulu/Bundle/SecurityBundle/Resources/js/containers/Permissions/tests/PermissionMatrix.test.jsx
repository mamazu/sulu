"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const PermissionMatrix_1 = __importDefault(require("../PermissionMatrix"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render with minimal', () => {
    const contextPermissions = [
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
    const securityContexts = {
        'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
        'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
    };
    expect((0, enzyme_1.render)(<PermissionMatrix_1.default contextPermissions={contextPermissions} onChange={jest.fn()} securityContexts={securityContexts}/>)).toMatchSnapshot();
});
test('Render in disabled state', () => {
    const contextPermissions = [
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
    const securityContexts = {
        'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
        'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
    };
    expect((0, enzyme_1.render)(<PermissionMatrix_1.default contextPermissions={contextPermissions} disabled={true} onChange={jest.fn()} securityContexts={securityContexts}/>)).toMatchSnapshot();
});
test('Render with title', () => {
    const contextPermissions = [
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
    const securityContexts = {
        'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
        'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
    };
    expect((0, enzyme_1.render)(<PermissionMatrix_1.default contextPermissions={contextPermissions} onChange={jest.fn()} securityContexts={securityContexts} title="Contact"/>)).toMatchSnapshot();
});
test('Render with subTitle', () => {
    const contextPermissions = [
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
    const securityContexts = {
        'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
        'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
    };
    expect((0, enzyme_1.render)(<PermissionMatrix_1.default contextPermissions={contextPermissions} onChange={jest.fn()} securityContexts={securityContexts} subTitle="Contact"/>)).toMatchSnapshot();
});
test('Should trigger onChange correctly', () => {
    const onChange = jest.fn();
    const contextPermissions = [
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
    const securityContexts = {
        'sulu.contact.people': ['view', 'add', 'edit', 'delete'],
        'sulu.contact.organizations': ['view', 'add', 'edit', 'delete'],
    };
    const permissionMatrix = (0, enzyme_1.mount)(<PermissionMatrix_1.default contextPermissions={contextPermissions} onChange={onChange} securityContexts={securityContexts}/>);
    const matrixValues = {
        'sulu.contact.people': {
            'view': true,
            'delete': true,
            'add': true,
            'edit': false,
        },
    };
    permissionMatrix.find('Matrix').instance().props.onChange(matrixValues);
    const expectedContextPermissions = [
        {
            id: 1,
            context: 'sulu.contact.people',
            permissions: {
                'view': true,
                'delete': true,
                'add': true,
                'edit': false,
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
    expect(onChange).toBeCalledWith(expectedContextPermissions);
});
