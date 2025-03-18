"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SingleMediaSelectionBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/SingleMediaSelectionBlockPreviewTransformer"));
const MEDIA_URL = '/admin/media/redirect/media/:id';
test('Render a single image if an id is given', () => {
    const singleMediaSelectionBlockPreviewTransformer = new SingleMediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(singleMediaSelectionBlockPreviewTransformer.transform({ id: 5 })).toMatchSnapshot();
});
test('Render nothing if no id is given', () => {
    const singleMediaSelectionBlockPreviewTransformer = new SingleMediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(singleMediaSelectionBlockPreviewTransformer.transform({})).toMatchSnapshot();
});
test('Render nothing if a wrong type of value is given', () => {
    const singleMediaSelectionBlockPreviewTransformer = new SingleMediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(singleMediaSelectionBlockPreviewTransformer.transform('')).toMatchSnapshot();
});
