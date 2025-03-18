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
const RoleAssignments_1 = __importDefault(require("../../fields/RoleAssignments"));
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
test('Pass props correctly to RoleAssignments', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const roleAssignments = (0, enzyme_1.shallow)(<RoleAssignments_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>);
    expect(roleAssignments.prop('value')).toEqual([]);
});
test('Pass props with value correctly to RoleAssignments', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const value = [
        {
            id: 1,
            role: {
                id: 99,
                name: 'Test 1',
                system: 'Sulu 1',
            },
            locales: ['de', 'en'],
        },
        {
            id: 2,
            role: {
                id: 232,
                name: 'Test 2',
                system: 'Sulu 2',
            },
            locales: ['de'],
        },
    ];
    const roleAssignments = (0, enzyme_1.shallow)(<RoleAssignments_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} value={value}/>);
    expect(roleAssignments.prop('disabled')).toEqual(true);
    expect(roleAssignments.prop('value')).toEqual(value);
});
