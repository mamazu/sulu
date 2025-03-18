"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formToolbarActionRegistry_1 = __importDefault(require("../../registries/formToolbarActionRegistry"));
const AbstractFormToolbarAction_1 = __importDefault(require("../../toolbarActions/AbstractFormToolbarAction"));
jest.mock('../../../../services/initializer', () => jest.fn());
jest.mock('../../toolbarActions/DeleteToolbarAction', () => jest.fn());
jest.mock('../../toolbarActions/SaveWithPublishingToolbarAction', () => jest.fn());
jest.mock('../../toolbarActions/SaveToolbarAction', () => jest.fn());
jest.mock('../../toolbarActions/TypeToolbarAction', () => jest.fn());
beforeEach(() => {
    formToolbarActionRegistry_1.default.clear();
});
test('Clear all toolbar actions', () => {
    formToolbarActionRegistry_1.default.add('test1', AbstractFormToolbarAction_1.default);
    expect(Object.keys(formToolbarActionRegistry_1.default.toolbarActions)).toHaveLength(1);
    formToolbarActionRegistry_1.default.clear();
    expect(Object.keys(formToolbarActionRegistry_1.default.toolbarActions)).toHaveLength(0);
});
test('Add toolbar action', () => {
    formToolbarActionRegistry_1.default.add('test1', AbstractFormToolbarAction_1.default);
    formToolbarActionRegistry_1.default.add('test2', AbstractFormToolbarAction_1.default);
    expect(formToolbarActionRegistry_1.default.get('test1')).toBe(AbstractFormToolbarAction_1.default);
    expect(formToolbarActionRegistry_1.default.get('test2')).toBe(AbstractFormToolbarAction_1.default);
});
test('Add toolbar action with existing key should throw', () => {
    formToolbarActionRegistry_1.default.add('test1', AbstractFormToolbarAction_1.default);
    expect(() => formToolbarActionRegistry_1.default.add('test1', AbstractFormToolbarAction_1.default)).toThrow(/test1/);
});
test('Get toolbar action of not existing key', () => {
    expect(() => formToolbarActionRegistry_1.default.get('XXX')).toThrow();
});
