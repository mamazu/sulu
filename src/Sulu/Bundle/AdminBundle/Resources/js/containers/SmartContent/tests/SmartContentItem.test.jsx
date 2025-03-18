"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SmartContentItem_1 = __importDefault(require("../SmartContentItem"));
test('Render item with only title', () => {
    const item = { title: 'Only title' };
    expect((0, enzyme_1.render)(<SmartContentItem_1.default item={item}/>)).toMatchSnapshot();
});
test('Render item with title and draft with published state', () => {
    const item = { title: 'Draft and published', publishedState: false, published: new Date() };
    expect((0, enzyme_1.render)(<SmartContentItem_1.default item={item}/>)).toMatchSnapshot();
});
test('Render item with title and published state', () => {
    const item = { title: 'Published', publishedState: true, published: new Date() };
    expect((0, enzyme_1.render)(<SmartContentItem_1.default item={item}/>)).toMatchSnapshot();
});
test('Render item with title and image', () => {
    const item = { image: 'image.jpg', title: 'Image' };
    expect((0, enzyme_1.render)(<SmartContentItem_1.default item={item}/>)).toMatchSnapshot();
});
test('Render item with additional columns except for id', () => {
    const item = { id: 4, title: 'Title with URL', url: '/url', value: 'Test' };
    expect((0, enzyme_1.render)(<SmartContentItem_1.default item={item}/>)).toMatchSnapshot();
});
