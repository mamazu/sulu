"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const LinkTypeOverlay_1 = __importDefault(require("../../overlays/LinkTypeOverlay"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../SingleListOverlay', () => jest.fn(function () {
    return <div>single list overlay</div>;
}));
test('Render overlay with minimal config', () => {
    const linkOverlay = (0, enzyme_1.mount)(<LinkTypeOverlay_1.default href={undefined} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} open={true} options={{
            displayProperties: ['title'],
            emptyText: 'No page selected',
            icon: 'su-document',
            listAdapter: 'column_list',
            overlayTitle: 'Choose page',
            resourceKey: 'pages',
        }}/>);
    expect(linkOverlay.find('Form').render()).toMatchSnapshot();
});
test('Render overlay without options', () => {
    expect(() => (0, enzyme_1.shallow)(<LinkTypeOverlay_1.default href={undefined} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} open={true} options={undefined}/>)).toThrow('The LinkTypeOverlay needs some options in order to work!');
});
test('Render overlay with query enabled', () => {
    const linkOverlay = (0, enzyme_1.mount)(<LinkTypeOverlay_1.default href={undefined} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} onQueryChange={jest.fn()} open={true} options={{
            displayProperties: ['title'],
            emptyText: 'No page selected',
            icon: 'su-document',
            listAdapter: 'column_list',
            overlayTitle: 'Choose page',
            resourceKey: 'pages',
        }}/>);
    expect(linkOverlay.find('Form').render()).toMatchSnapshot();
});
test('Render overlay with anchor enabled', () => {
    const linkOverlay = (0, enzyme_1.mount)(<LinkTypeOverlay_1.default href={undefined} onAnchorChange={jest.fn()} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} open={true} options={{
            displayProperties: ['title'],
            emptyText: 'No page selected',
            icon: 'su-document',
            listAdapter: 'column_list',
            overlayTitle: 'Choose page',
            resourceKey: 'pages',
        }}/>);
    expect(linkOverlay.find('Form').render()).toMatchSnapshot();
});
test('Render overlay with target enabled', () => {
    const linkOverlay = (0, enzyme_1.mount)(<LinkTypeOverlay_1.default href={undefined} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} onTargetChange={jest.fn()} open={true} options={{
            displayProperties: ['title'],
            emptyText: 'No page selected',
            icon: 'su-document',
            listAdapter: 'column_list',
            overlayTitle: 'Choose page',
            resourceKey: 'pages',
        }}/>);
    expect(linkOverlay.find('Form').render()).toMatchSnapshot();
});
test('Render overlay with title enabled', () => {
    const linkOverlay = (0, enzyme_1.mount)(<LinkTypeOverlay_1.default href={undefined} onCancel={jest.fn()} onConfirm={jest.fn()} onHrefChange={jest.fn()} onTitleChange={jest.fn()} open={true} options={{
            displayProperties: ['title'],
            emptyText: 'No page selected',
            icon: 'su-document',
            listAdapter: 'column_list',
            overlayTitle: 'Choose page',
            resourceKey: 'pages',
        }}/>);
    expect(linkOverlay.find('Form').render()).toMatchSnapshot();
});
