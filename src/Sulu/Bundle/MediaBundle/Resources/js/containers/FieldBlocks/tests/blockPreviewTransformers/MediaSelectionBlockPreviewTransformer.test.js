"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MediaSelectionBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/MediaSelectionBlockPreviewTransformer"));
const MEDIA_URL = '/admin/media/redirect/media/:id';
test('Render a single image if an id is given', () => {
    const mediaSelectionBlockPreviewTransformer = new MediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(mediaSelectionBlockPreviewTransformer.transform({ ids: [3, 7] })).toMatchSnapshot();
});
test('Render only eight images if more are given if an id is given', () => {
    const mediaSelectionBlockPreviewTransformer = new MediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(mediaSelectionBlockPreviewTransformer.transform({ ids: [3, 7, 9, 11, 13, 2, 1, 4, 5] })).toMatchSnapshot();
});
test('Render nothing if no id is given', () => {
    const mediaSelectionBlockPreviewTransformer = new MediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(mediaSelectionBlockPreviewTransformer.transform({ ids: [] })).toMatchSnapshot();
});
test('Render nothing if a wrong type of value is given', () => {
    const mediaSelectionBlockPreviewTransformer = new MediaSelectionBlockPreviewTransformer_1.default(MEDIA_URL);
    expect(mediaSelectionBlockPreviewTransformer.transform('')).toMatchSnapshot();
});
