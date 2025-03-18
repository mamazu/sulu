"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StripHtmlBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/StripHtmlBlockPreviewTransformer"));
test('Return JSX for simple string', () => {
    const stripHtmlBlockPreviewTransformer = new StripHtmlBlockPreviewTransformer_1.default();
    expect(stripHtmlBlockPreviewTransformer.transform('<strong>Test</strong>')).toMatchSnapshot();
});
test('Return JSX for simple string', () => {
    const stripHtmlBlockPreviewTransformer = new StripHtmlBlockPreviewTransformer_1.default();
    expect(stripHtmlBlockPreviewTransformer.transform('<strong>' + 'c'.repeat(1000) + '</strong>')).toMatchSnapshot();
});
test('Return null for everything expect a string', () => {
    const stripHtmlBlockPreviewTransformer = new StripHtmlBlockPreviewTransformer_1.default();
    expect(stripHtmlBlockPreviewTransformer.transform({})).toMatchSnapshot();
});
