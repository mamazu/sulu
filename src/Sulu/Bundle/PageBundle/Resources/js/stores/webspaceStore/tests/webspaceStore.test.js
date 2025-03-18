"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const webspaceStore_1 = __importDefault(require("../webspaceStore"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
beforeEach(() => {
    webspaceStore_1.default.setWebspaces([]);
});
test('Has webspace', () => {
    const webspace1 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: true,
        }, name: 'sulu', key: 'sulu', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspace2 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: false,
        }, name: 'Sulu Blog', key: 'sulu_blog', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect(webspaceStore_1.default.hasWebspace('sulu')).toEqual(true);
    expect(webspaceStore_1.default.hasWebspace('sulu_blog')).toEqual(true);
    expect(webspaceStore_1.default.hasWebspace('not_existing')).toEqual(false);
});
test('Load granted webspaces', () => {
    const webspace1 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: true,
        }, name: 'sulu', key: 'sulu', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspace2 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: false,
        }, name: 'Sulu Blog', key: 'sulu_blog', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    const webspacePromise = webspaceStore_1.default.loadWebspaces();
    return webspacePromise.then((webspaces) => {
        expect(loglevel_1.default.warn).toBeCalled();
        expect(webspaces).toEqual([webspace1]);
    });
});
test('Load webspace with given key', () => {
    const webspace1 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: true,
        }, name: 'sulu', key: 'sulu', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspace2 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: false,
        }, name: 'Sulu Blog', key: 'sulu_blog', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    const webspacePromise = webspaceStore_1.default.loadWebspace('sulu');
    return webspacePromise.then((webspace) => {
        expect(loglevel_1.default.warn).toBeCalled();
        expect(webspace).toEqual(webspace1);
    });
});
test('Get granted webspaces', () => {
    const webspace1 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: true,
        }, name: 'sulu', key: 'sulu', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspace2 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: false,
        }, name: 'Sulu Blog', key: 'sulu_blog', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect(webspaceStore_1.default.grantedWebspaces).toEqual([webspace1]);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Get webspace with given key', () => {
    const webspace1 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: true,
        }, name: 'sulu', key: 'sulu', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspace2 = Object.assign(Object.assign({}, TestHelper_1.defaultWebspace), { _permissions: {
            view: false,
        }, name: 'Sulu Blog', key: 'sulu_blog', resourceLocatorStrategy: { inputType: 'leaf' } });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect(webspaceStore_1.default.getWebspace('sulu')).toEqual(webspace1);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
