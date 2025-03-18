"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TranslationFieldTransformer_1 = __importDefault(require("../../fieldTransformers/TranslationFieldTransformer"));
const translationFieldTransformer = new TranslationFieldTransformer_1.default();
jest.mock('../../../../utils/Translator/Translator', () => ({
    translate: (value) => {
        return value;
    },
}));
test('Test undefined', () => {
    expect(translationFieldTransformer.transform(undefined, {}))
        .toBe(null);
});
test('Test transform with prefix', () => {
    expect(translationFieldTransformer.transform('<value>', { prefix: 'sulu_admin.test.' }))
        .toBe('sulu_admin.test.<value>');
});
