"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const services_1 = require("../../../services");
const Link_1 = __importDefault(require("../Link"));
const linkTypeRegistry_1 = __importDefault(require("../registries/linkTypeRegistry"));
const LinkTypeOverlay_1 = __importDefault(require("../overlays/LinkTypeOverlay"));
const ExternalLinkTypeOverlay_1 = __importDefault(require("../overlays/ExternalLinkTypeOverlay"));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    get: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../registries/linkTypeRegistry', () => ({
    getKeys: jest.fn(),
    getOverlay: jest.fn(),
    getOptions: jest.fn(),
    getTitle: jest.fn((key) => key.charAt(0).toUpperCase() + (key.slice(1))),
}));
test('Render Link container incl. loading a selected value', (resolve) => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page']);
    const getPromise = Promise.resolve({ title: 'Page 1' });
    services_1.ResourceRequester.get.mockReturnValue(getPromise);
    const value = {
        title: 'TestLink',
        href: '123-asdf-123',
        provider: 'page',
        locale: 'en',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    getPromise.finally(() => {
        setTimeout(() => {
            expect(link).toMatchSnapshot();
            resolve();
        }, 0);
    });
}));
test('Open overlay on input click', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page']);
    const value = {
        title: 'TestLink',
        href: '123-asdf-123',
        provider: 'page',
        locale: 'en',
        anchor: 'TestAnchor',
        target: 'TestTarget',
        rel: 'TestRel',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    const button = link.find('.item.clickable');
    expect(link.find('LinkTypeOverlay').props().open).toEqual(false);
    button.simulate('click');
    expect(link.find('LinkTypeOverlay').props().open).toEqual(true);
});
test('Open overlay on provider change', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media']);
    const value = {
        title: 'TestLink',
        href: '123-asdf-123',
        provider: 'page',
        locale: 'en',
        anchor: 'TestAnchor',
        target: 'TestTarget',
        rel: 'TestRel',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    expect(link.find('LinkTypeOverlay').at(1).props().open).toEqual(false);
    link.find('SingleSelect').props().onChange('media');
    expect(link.find('LinkTypeOverlay').at(1).props().open).toEqual(true);
});
test('Update values on overlay confirm', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media']);
    const value = {
        title: 'TestLink',
        href: '123-asdf-123',
        provider: 'page',
        locale: 'en',
        query: 'TestQuery',
        anchor: 'TestAnchor',
        target: 'TestTarget',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableQuery={true} enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    link.find('SingleSelect').props().onChange('media');
    const overlayProps = link.find('LinkTypeOverlay').at(1).props();
    overlayProps.onHrefChange('10');
    overlayProps.onQueryChange('newQuery');
    overlayProps.onAnchorChange('newAnchor');
    overlayProps.onTargetChange('newTarget');
    overlayProps.onTitleChange('newTitle');
    overlayProps.onConfirm();
    expect(changeSpy).toBeCalledWith({
        title: 'newTitle',
        href: '10',
        provider: 'media',
        locale: 'en',
        query: 'newQuery',
        anchor: 'newAnchor',
        target: 'newTarget',
    });
});
test('Update values on overlay confirm with ExternalLinkTypeOverlay', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(ExternalLinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue(undefined);
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['media', 'external']);
    const value = {
        title: 'TestLink',
        href: '10',
        provider: 'media',
        locale: 'en',
        target: 'TestTarget',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    link.find('SingleSelect').props().onChange('external');
    const overlayProps = link.find('ExternalLinkTypeOverlay').at(1).props();
    overlayProps.onHrefChange('https://example.org');
    overlayProps.onTargetChange('newTarget');
    overlayProps.onTitleChange('newTitle');
    overlayProps.onRelChange('newRel');
    overlayProps.onConfirm();
    expect(changeSpy).toBeCalledWith({
        title: 'newTitle',
        href: 'https://example.org',
        provider: 'external',
        locale: 'en',
        target: 'newTarget',
        rel: 'newRel',
    });
});
test('Invalidate values on RemoveButton click', (resolve) => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media']);
    const getPromise = Promise.resolve({ title: 'Page 1' });
    services_1.ResourceRequester.get.mockReturnValue(getPromise);
    const value = {
        title: 'TestLink',
        href: '123-asdf-123',
        provider: 'page',
        locale: 'en',
        anchor: 'TestAnchor',
        target: 'TestTarget',
        rel: 'TestRel',
    };
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    getPromise.finally(() => {
        setTimeout(() => {
            const removeButton = link.find('.removeButton');
            removeButton.simulate('click');
            expect(changeSpy).toBeCalledWith({
                title: undefined,
                href: undefined,
                provider: undefined,
                locale: 'en',
                query: undefined,
                anchor: undefined,
                target: undefined,
                rel: undefined,
            });
            resolve();
        }, 0);
    });
}));
test('Display providers with "types" property', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media', 'article']);
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} types={['page', 'article']} value={undefined}/>);
    const removeButton = link.find('.removeButton');
    removeButton.simulate('click');
    expect(link.find('Option').length).toEqual(2);
});
test('Display providers with "excluded_types" property', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media', 'article']);
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} excludedTypes={['page', 'article']} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} value={undefined}/>);
    expect(link.find('Option').length).toEqual(1);
});
test('Display providers with "excluded_types" and "types" property', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    linkTypeRegistry_1.default.getOverlay.mockReturnValue(LinkTypeOverlay_1.default);
    linkTypeRegistry_1.default.getOptions.mockReturnValue({
        title: 'Pages',
        overlayTitle: 'Test Overlay',
        resourceKey: 'pages',
        displayProperties: ['title'],
    });
    linkTypeRegistry_1.default.getKeys.mockReturnValue(['page', 'media', 'article', 'account']);
    const link = (0, enzyme_1.shallow)(<Link_1.default enableAnchor={true} enableRel={true} enableTarget={true} enableTitle={true} excludedTypes={['page', 'article']} locale={mobx_1.observable.box('en')} onChange={changeSpy} onFinish={finishSpy} types={['media', 'account']} value={undefined}/>);
    expect(link.find('Option').length).toEqual(2);
});
