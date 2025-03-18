"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listToolbarActionRegistry_1 = __importDefault(require("../../registries/listToolbarActionRegistry"));
const AbstractListToolbarAction_1 = __importDefault(require("../../toolbarActions/AbstractListToolbarAction"));
jest.mock('../../../../services/initializer', () => jest.fn());
jest.mock('../../toolbarActions/DeleteToolbarAction', () => jest.fn());
beforeEach(() => {
    listToolbarActionRegistry_1.default.clear();
});
test('Clear all toolbar actions', () => {
    listToolbarActionRegistry_1.default.add('test1', AbstractListToolbarAction_1.default);
    expect(Object.keys(listToolbarActionRegistry_1.default.toolbarActions)).toHaveLength(1);
    listToolbarActionRegistry_1.default.clear();
    expect(Object.keys(listToolbarActionRegistry_1.default.toolbarActions)).toHaveLength(0);
});
test('Add toolbar action', () => {
    listToolbarActionRegistry_1.default.add('test1', AbstractListToolbarAction_1.default);
    listToolbarActionRegistry_1.default.add('test2', AbstractListToolbarAction_1.default);
    expect(listToolbarActionRegistry_1.default.get('test1')).toBe(AbstractListToolbarAction_1.default);
    expect(listToolbarActionRegistry_1.default.get('test2')).toBe(AbstractListToolbarAction_1.default);
});
test('Add toolbar action with existing key should throw', () => {
    listToolbarActionRegistry_1.default.add('test1', AbstractListToolbarAction_1.default);
    expect(() => listToolbarActionRegistry_1.default.add('test1', AbstractListToolbarAction_1.default)).toThrow(/test1/);
});
test('Get toolbar action of not existing key', () => {
    expect(() => listToolbarActionRegistry_1.default.get('XXX')).toThrow();
});
