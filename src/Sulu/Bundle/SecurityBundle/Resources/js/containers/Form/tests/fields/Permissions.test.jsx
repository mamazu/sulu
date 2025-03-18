"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("sulu-admin-bundle/utils/TestHelper/fieldTypeDefaultProps"));
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const Permissions_1 = __importDefault(require("../../fields/Permissions"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (formStore) {
        this.getValueByPath = jest.fn();
        this.locale = formStore.locale;
    }),
    ResourceFormStore: jest.fn(function (resourceStore) {
        this.locale = resourceStore.locale;
    }),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(function (resourceKey, id, observableOptions = {}) {
        this.locale = observableOptions.locale;
    }),
}));
test('Pass props correctly to Permissions', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/system':
                return 'Sulu';
        }
    });
    const permissions = (0, enzyme_1.shallow)(<Permissions_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector}/>);
    expect(permissions.prop('system')).toEqual('Sulu');
    expect(permissions.prop('value')).toEqual([]);
    expect(permissions.prop('disabled')).toEqual(true);
});
test('Pass props with value correctly to Permissions', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/system':
                return 'Sulu';
        }
    });
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
    const permissions = (0, enzyme_1.shallow)(<Permissions_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} value={value}/>);
    expect(permissions.prop('system')).toEqual('Sulu');
    expect(permissions.prop('value')).toEqual(value);
});
