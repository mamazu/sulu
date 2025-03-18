"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Router_1 = __importStar(require("../../../services/Router"));
const Application_1 = __importDefault(require("../Application"));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
jest.mock('../../../services/Router/Router', () => jest.fn(function () {
    this.attributes = {};
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/MemoryFormStore', () => jest.fn((memoryStore) => ({ memoryStore })));
const mockInitializerInitialized = jest.fn();
const mockInitializerLoading = jest.fn();
const mockInitializedTranslationsLocale = jest.fn();
jest.mock('../../../services/initializer', () => {
    return new (class {
        get loading() {
            return mockInitializerLoading();
        }
        get initialized() {
            return mockInitializerInitialized();
        }
        get initializedTranslationsLocale() {
            return mockInitializedTranslationsLocale();
        }
    });
});
const mockUserStoreLoggedIn = jest.fn();
const mockUserStoreContact = jest.fn();
const mockUserStoreUser = jest.fn();
const mockUserStoreGetPersistentSetting = jest.fn().mockReturnValue(0);
const mockUserStoreSetPersistentSetting = jest.fn();
const mockUserStoreHasSingleSignOn = jest.fn().mockReturnValue(false);
jest.mock('../../../stores/userStore', () => {
    return new (class {
        get loggedIn() {
            return mockUserStoreLoggedIn();
        }
        get user() {
            return mockUserStoreUser();
        }
        get contact() {
            return mockUserStoreContact();
        }
        hasSingleSignOn() {
            return mockUserStoreHasSingleSignOn();
        }
        getPersistentSetting(value) {
            return mockUserStoreGetPersistentSetting(value);
        }
        setPersistentSetting(name, value) {
            return mockUserStoreSetPersistentSetting(name, value);
        }
    });
});
jest.mock('../../ViewRenderer', () => (function Test(props) {
    return (<div>
            <h1>Test</h1>
            <h2>{props.router.route.type}</h2>
        </div>);
}));
jest.mock('../../ProfileFormOverlay', () => (function Test() {
    return (<div>ProfileFormOverlay Mock</div>);
}));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
beforeEach(() => {
    mockInitializerInitialized.mockReturnValue(true);
    mockInitializerLoading.mockReturnValue(false);
    mockInitializedTranslationsLocale.mockReturnValue('en');
    mockUserStoreLoggedIn.mockReturnValue(true);
    mockUserStoreContact.mockReturnValue({
        fullName: 'Hikaru Sulu',
    });
    mockUserStoreUser.mockReturnValue({
        id: 99,
        username: 'test',
    });
});
test('Render login with loader', () => {
    mockInitializerInitialized.mockReturnValue(false);
    mockInitializerLoading.mockReturnValue(true);
    mockInitializedTranslationsLocale.mockReturnValue(null);
    mockUserStoreLoggedIn.mockReturnValue(false);
    const router = new Router_1.default({});
    const application = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(application.render()).toMatchSnapshot();
});
test('Render login screen to reset password', () => {
    mockInitializerInitialized.mockReturnValue(false);
    mockInitializerLoading.mockReturnValue(false);
    mockInitializedTranslationsLocale.mockReturnValue('en');
    mockUserStoreLoggedIn.mockReturnValue(false);
    const router = new Router_1.default({});
    router.attributes.forgotPasswordToken = 'some-uuid';
    const application = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(application.render()).toMatchSnapshot();
});
test('Render login when user is not logged in', () => {
    mockInitializerInitialized.mockReturnValue(false);
    mockInitializerLoading.mockReturnValue(false);
    mockInitializedTranslationsLocale.mockReturnValue('en');
    mockUserStoreLoggedIn.mockReturnValue(false);
    const router = new Router_1.default({});
    const application = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(application.render()).toMatchSnapshot();
});
test('Should not fail if current route does not exist', () => {
    const router = new Router_1.default({});
    const view = (0, enzyme_1.render)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(view).toMatchSnapshot();
});
test('Render based on current route', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    const view = (0, enzyme_1.render)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(view).toMatchSnapshot();
});
test('Render based on current route with app version', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    const view = (0, enzyme_1.render)(<Application_1.default appVersion="666" router={router} suluVersion="2.0.0-RC1"/>);
    expect(view).toMatchSnapshot();
});
test('Render opened navigation', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    const view = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    view.find('Button[icon="su-bars"]').simulate('click');
    expect(view.render()).toMatchSnapshot();
});
test('Pin navigation', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    const view = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    view.find('Button[icon="su-bars"]').simulate('click');
    view.find('.pin').simulate('click');
    expect(view.find('Navigation').at(0).prop('pinned')).toEqual(true);
    expect(mockUserStoreSetPersistentSetting).toBeCalledWith('sulu_admin.application.navigation_pinned', true);
});
test('Pin navigation from beginning', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    mockUserStoreGetPersistentSetting.mockReturnValueOnce(true);
    const view = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(view.find('Button[icon="su-bars"]')).toHaveLength(0);
    expect(view.find('Button[icon="su-sulu-logo"]')).toHaveLength(0);
    expect(view.find('.pin')).toHaveLength(1);
    expect(mockUserStoreGetPersistentSetting).toBeCalledWith('sulu_admin.application.navigation_pinned');
    expect(view.find('Navigation').at(0).prop('pinned')).toEqual(true);
});
test('Do not pin navigation from beginning', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'test',
        path: '/webspaces',
        type: 'test',
    });
    mockUserStoreGetPersistentSetting.mockReturnValueOnce(false);
    const view = (0, enzyme_1.mount)(<Application_1.default appVersion={null} router={router} suluVersion="2.0.0-RC1"/>);
    expect(view.find('Button[icon="su-bars"]')).toHaveLength(1);
    expect(view.find('Button[icon="su-sulu-logo"]')).toHaveLength(0);
    expect(view.find('.pin')).toHaveLength(1);
    expect(mockUserStoreGetPersistentSetting).toBeCalledWith('sulu_admin.application.navigation_pinned');
    expect(view.find('Navigation').at(0).prop('pinned')).toEqual(false);
});
