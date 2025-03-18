"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const services_1 = require("sulu-admin-bundle/services");
const stores_1 = require("sulu-admin-bundle/stores");
const WebspaceTabs_1 = __importDefault(require("../WebspaceTabs"));
const webspaceStore_1 = __importDefault(require("../../../stores/webspaceStore"));
jest.mock('debounce', () => jest.fn((callback) => callback));
window.ResizeObserver = jest.fn(function () {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn(function () {
    this.addUpdateRouteHook = jest.fn();
    this.bind = jest.fn();
}));
jest.mock('../../../stores/webspaceStore', () => ({
    grantedWebspaces: [],
    getWebspace: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    setPersistentSetting: jest.fn(),
    getPersistentSetting: jest.fn(),
}));
test('Render webspace select with children when webspaces are not loaded yet', () => {
    const router = new services_1.Router({});
    const route = new services_1.Route({
        name: 'webspace_tabs',
        path: '/webspace_tabs',
        type: 'webspace_tabs',
    });
    const webspace = { key: 'sulu_blog', localizations: [{ locale: 'en', default: false }, { locale: 'de', default: true }] };
    webspaceStore_1.default.getWebspace.mockImplementation((key) => {
        if (key === 'sulu_blog') {
            return webspace;
        }
    });
    const webspaceTabs = (0, enzyme_1.mount)(<WebspaceTabs_1.default isRootView={true} route={route} router={router}>
            {(props) => <h1>{props && props.webspace && props.webspace.key}</h1>}
        </WebspaceTabs_1.default>);
    webspaceTabs.instance().webspaceKey.set('sulu_blog');
    expect(webspaceTabs.children().render()).toMatchSnapshot();
});
test('Load webspace userStore if no route attribute is given', () => {
    stores_1.userStore.getPersistentSetting.mockImplementation((key) => {
        if (key === 'sulu_page.webspace_tabs.webspace') {
            return 'sulu';
        }
    });
    expect(WebspaceTabs_1.default.getDerivedRouteAttributes(undefined, {})).toEqual({ webspace: 'sulu' });
});
test('Load webspace from route attributes', () => {
    stores_1.userStore.getPersistentSetting.mockImplementation((key) => {
        if (key === 'sulu_page.webspace_overview.webspace') {
            return 'sulu';
        }
    });
    expect(WebspaceTabs_1.default.getDerivedRouteAttributes(undefined, { webspace: 'abc' })).toEqual({ webspace: 'abc' });
});
test('Should bind and unbind router attributes and updateRouteHook', () => {
    const router = new services_1.Router({});
    const route = new services_1.Route({
        name: 'webspace_tabs',
        path: '/webspace_tabs',
        type: 'webspace_tabs',
    });
    const bindWebspaceToRouterDisposerSpy = jest.fn();
    router.addUpdateRouteHook.mockImplementationOnce(() => bindWebspaceToRouterDisposerSpy);
    const webspaceTabs = (0, enzyme_1.mount)(<WebspaceTabs_1.default route={route} router={router}>{() => null}</WebspaceTabs_1.default>);
    expect(router.bind).toBeCalledWith('webspace', webspaceTabs.instance().webspaceKey);
    expect(router.addUpdateRouteHook).toBeCalledWith(webspaceTabs.instance().bindWebspaceToRouter);
    const webspaceDisposer = jest.fn();
    webspaceTabs.instance().webspaceDisposer = webspaceDisposer;
    webspaceTabs.unmount();
    expect(bindWebspaceToRouterDisposerSpy).toBeCalledWith();
    expect(webspaceDisposer).toBeCalledWith();
});
test('Save and update webspace when select value is changed', () => {
    const router = new services_1.Router({});
    const route = new services_1.Route({
        name: 'webspace_tabs',
        path: '/webspace_tabs',
        type: 'webspace_tabs',
    });
    const webspace1 = { key: 'sulu', localizations: [{ locale: 'en', default: true }] };
    const webspace2 = {
        key: 'sulu_blog',
        localizations: [{ locale: 'en', default: false }, { locale: 'de', default: true }],
    };
    webspaceStore_1.default.getWebspace.mockImplementation((key) => {
        if (key === 'sulu') {
            return webspace1;
        }
        if (key === 'sulu_blog') {
            return webspace2;
        }
    });
    const webspaceTabs = (0, enzyme_1.mount)(<WebspaceTabs_1.default route={route} router={router}>{() => null}</WebspaceTabs_1.default>);
    webspaceTabs.instance().webspaceKey.set('sulu_blog');
    webspaceTabs.update();
    expect(webspaceTabs.find('WebspaceSelect').prop('value')).toEqual('sulu_blog');
    expect(webspaceTabs.find('Tabs').at(0).prop('childrenProps'))
        .toEqual(expect.objectContaining({ webspace: webspace2 }));
    webspaceTabs.find('WebspaceSelect').prop('onChange')('sulu');
    webspaceTabs.update();
    expect(stores_1.userStore.setPersistentSetting).toBeCalledWith('sulu_page.webspace_tabs.webspace', 'sulu');
    expect(webspaceTabs.find('Tabs').at(0).prop('childrenProps'))
        .toEqual(expect.objectContaining({ webspace: webspace1 }));
    expect(webspaceTabs.find('WebspaceSelect').prop('value')).toEqual('sulu');
});
