"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmartContentBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/SmartContentBlockPreviewTransformer"));
const Translator_1 = require("../../../../utils/Translator");
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Return JSX for configuration with a limit of 5', () => {
    const smartContentBlockPreviewTransformer = new SmartContentBlockPreviewTransformer_1.default();
    expect(smartContentBlockPreviewTransformer.transform({ limitResult: 5 })).toMatchSnapshot();
    expect(Translator_1.translate).toBeCalledWith('sulu_admin.smart_content_block_preview', { limit: 5 });
});
test('Return null for everything expect a string', () => {
    const smartContentBlockPreviewTransformer = new SmartContentBlockPreviewTransformer_1.default();
    expect(smartContentBlockPreviewTransformer.transform({})).toMatchSnapshot();
    expect(Translator_1.translate).toBeCalledWith('sulu_admin.smart_content_block_preview', { limit: 'undefined' });
});
