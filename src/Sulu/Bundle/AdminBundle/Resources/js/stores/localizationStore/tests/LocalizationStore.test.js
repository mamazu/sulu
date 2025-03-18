"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const localizationStore_1 = __importDefault(require("../localizationStore"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
test('Load localizations', () => {
    const localizations = [
        {
            country: '',
            default: '1',
            language: 'en',
            locale: 'en',
            localization: 'en',
            shadow: '',
        },
        {
            country: '',
            default: '0',
            language: 'de',
            locale: 'de',
            localization: 'de',
            shadow: '',
        },
    ];
    localizationStore_1.default.setLocalizations(localizations);
    return localizationStore_1.default.loadLocalizations().then((localizations) => {
        expect(loglevel_1.default.warn).toBeCalled();
        expect(localizations).toBe(localizations);
    });
});
