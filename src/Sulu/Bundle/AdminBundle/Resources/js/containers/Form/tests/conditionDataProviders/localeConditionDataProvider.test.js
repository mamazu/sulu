"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const localeConditionDataProvider_1 = __importDefault(require("../../conditionDataProviders/localeConditionDataProvider"));
jest.mock('../../stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceStore, id, observableOptions) {
    this.locale = observableOptions === null || observableOptions === void 0 ? void 0 : observableOptions.locale;
}));
test('Return undefined if FormInspector has no locale', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test', { webspace: 'test' }));
    expect((0, localeConditionDataProvider_1.default)({}, '/test', formInspector)).toEqual({ __locale: undefined });
});
test('Return locale from FormInspector', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', 5, { locale: mobx_1.observable.box('en') }), 'test', { webspace: 'test' }));
    expect((0, localeConditionDataProvider_1.default)({}, '/test', formInspector)).toEqual({ __locale: 'en' });
});
