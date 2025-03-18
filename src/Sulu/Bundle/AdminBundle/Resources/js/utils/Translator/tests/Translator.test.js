"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const Translator_1 = require("../Translator");
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
beforeEach(() => {
    (0, Translator_1.clearTranslations)();
});
test('Translator should translate translations', () => {
    (0, Translator_1.setTranslations)({ 'save': 'Save', 'delete': 'Delete' }, 'en');
    expect((0, Translator_1.translate)('save')).toBe('Save');
    expect((0, Translator_1.translate)('delete')).toBe('Delete');
});
test('Translator should use the IntlMessageFormat for translation', () => {
    (0, Translator_1.setTranslations)({
        'apple_count': 'You have {numApples, plural, =0 {no apples} =1 {one apple} other {# apples}}.',
    }, 'en');
    expect((0, Translator_1.translate)('apple_count', { numApples: 0 })).toEqual('You have no apples.');
    expect((0, Translator_1.translate)('apple_count', { numApples: 1 })).toEqual('You have one apple.');
    expect((0, Translator_1.translate)('apple_count', { numApples: 4 })).toEqual('You have 4 apples.');
});
test('Translator should use the english language for translating dates', () => {
    (0, Translator_1.setTranslations)({
        'date': '{date, date}',
    }, 'en');
    expect((0, Translator_1.translate)('date', { date: new Date('1995-12-17') })).toEqual('12/17/1995');
});
test('Translator should return key when translating non-existing keys and log a warning', () => {
    expect((0, Translator_1.translate)('not-existing')).toBe('not-existing');
    expect(loglevel_1.default.warn).toBeCalled();
});
