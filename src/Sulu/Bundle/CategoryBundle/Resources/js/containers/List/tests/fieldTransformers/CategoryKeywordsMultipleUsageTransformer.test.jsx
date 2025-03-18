"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const CategoryKeywordsMultipleUsageTransformer_1 = __importDefault(require("../../fieldTransformers/CategoryKeywordsMultipleUsageTransformer"));
const categoryKeywordsMultipleUsageTransformer = new CategoryKeywordsMultipleUsageTransformer_1.default();
test.each([
    [undefined, false],
    [0, false],
    [1, false],
    [2, true],
    [100, true],
    ['0', false],
    ['1', false],
    ['2', true],
])('Transform %s', (value, checked) => {
    expect(categoryKeywordsMultipleUsageTransformer.transform(value))
        .toEqual(<components_1.Checkbox checked={checked} disabled={true}/>);
});
