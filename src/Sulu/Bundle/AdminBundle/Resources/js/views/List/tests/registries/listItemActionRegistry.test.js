"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listItemActionRegistry_1 = __importDefault(require("../../registries/listItemActionRegistry"));
const AbstractListItemAction_1 = __importDefault(require("../../itemActions/AbstractListItemAction"));
beforeEach(() => {
    listItemActionRegistry_1.default.clear();
});
test('Clear all item actions', () => {
    listItemActionRegistry_1.default.add('test1', AbstractListItemAction_1.default);
    expect(Object.keys(listItemActionRegistry_1.default.listItemActions)).toHaveLength(1);
    listItemActionRegistry_1.default.clear();
    expect(Object.keys(listItemActionRegistry_1.default.listItemActions)).toHaveLength(0);
});
test('Add item action', () => {
    listItemActionRegistry_1.default.add('test1', AbstractListItemAction_1.default);
    listItemActionRegistry_1.default.add('test2', AbstractListItemAction_1.default);
    expect(listItemActionRegistry_1.default.get('test1')).toBe(AbstractListItemAction_1.default);
    expect(listItemActionRegistry_1.default.get('test2')).toBe(AbstractListItemAction_1.default);
});
test('Add item action with existing key should throw', () => {
    listItemActionRegistry_1.default.add('test1', AbstractListItemAction_1.default);
    expect(() => listItemActionRegistry_1.default.add('test1', AbstractListItemAction_1.default)).toThrow(/test1/);
});
test('Get item action of not existing key', () => {
    expect(() => listItemActionRegistry_1.default.get('XXX')).toThrow();
});
