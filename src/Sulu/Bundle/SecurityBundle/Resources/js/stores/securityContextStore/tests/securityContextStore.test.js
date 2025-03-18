"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const securityContextStore_1 = __importDefault(require("../securityContextStore"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('sulu-admin-bundle/services/Requester', () => ({
    get: jest.fn(),
}));
beforeEach(() => {
    securityContextStore_1.default.suluSecuritySystem = 'Sulu';
    securityContextStore_1.default.setSecurityContexts({});
});
test('Load available actions for permissions with given keys', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    securityContextStore_1.default.setSecurityContexts({
        'Sulu': {
            'Global': {
                'sulu.snippets': ['view', 'add'],
            },
            'Test': {
                'sulu.test': ['view', 'add', 'edit'],
            },
        },
    });
    return securityContextStore_1.default.loadAvailableActions('test').then((actions) => {
        expect(loglevel_1.default.warn).toBeCalled();
        expect(actions).toEqual(['view', 'add', 'edit']);
    });
});
test('Load security contexts for entire system', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    const suluSecurityContexts = {
        'Global': {
            'sulu.snippets': ['view', 'add'],
        },
        'Test': {
            'sulu.test': ['view', 'add', 'edit'],
        },
    };
    securityContextStore_1.default.setSecurityContexts({ Sulu: suluSecurityContexts });
    return securityContextStore_1.default.loadSecurityContextGroups('Sulu').then((securityContexts) => {
        expect(loglevel_1.default.warn).toBeCalled();
        expect(securityContexts).toEqual(suluSecurityContexts);
    });
});
test('Get available actions for permissions with given keys', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    securityContextStore_1.default.setSecurityContexts({
        'Sulu': {
            'Global': {
                'sulu.snippets': ['view', 'add'],
            },
            'Test': {
                'sulu.test': ['view', 'add', 'edit'],
            },
        },
    });
    expect(securityContextStore_1.default.getAvailableActions('test')).toEqual(['view', 'add', 'edit']);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Get available actions for permissions with given keys and system', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    securityContextStore_1.default.setSecurityContexts({
        'Sulu': {
            'Global': {
                'sulu.snippets': ['view', 'add'],
            },
            'Test': {
                'sulu.test': ['view', 'add', 'edit'],
            },
        },
        'Website': {
            'Global': {
                'sulu.snippets': ['view'],
            },
            'Test': {
                'sulu.test': ['view'],
            },
        },
    });
    expect(securityContextStore_1.default.getAvailableActions('test')).toEqual(['view', 'add', 'edit']);
    expect(securityContextStore_1.default.getAvailableActions('test', 'Sulu')).toEqual(['view', 'add', 'edit']);
    expect(securityContextStore_1.default.getAvailableActions('test', 'Website')).toEqual(['view']);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Get security contexts for entire system', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    const suluSecurityContexts = {
        'Global': {
            'sulu.snippets': ['view', 'add'],
        },
        'Test': {
            'sulu.test': ['view', 'add', 'edit'],
        },
    };
    securityContextStore_1.default.setSecurityContexts({ Sulu: suluSecurityContexts });
    expect(securityContextStore_1.default.getSecurityContextGroups('Sulu')).toEqual(suluSecurityContexts);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Get systems from entire system', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
    };
    securityContextStore_1.default.setSecurityContexts({
        'Sulu': {
            'Global': {
                'sulu.snippets': ['view', 'add'],
            },
        },
        'Website': {
            'Global': {
                'sulu.snippets': ['view'],
            },
        },
    });
    expect(securityContextStore_1.default.getSystems()).toEqual(['Sulu', 'Website']);
});
test('Get security context from resourceKey', () => {
    securityContextStore_1.default.resourceKeyMapping = {
        'test': 'sulu.test',
        'foo': 'sulu.foo',
    };
    expect(securityContextStore_1.default.getSecurityContextByResourceKey('test')).toEqual('sulu.test');
    expect(securityContextStore_1.default.getSecurityContextByResourceKey('foo')).toEqual('sulu.foo');
});
