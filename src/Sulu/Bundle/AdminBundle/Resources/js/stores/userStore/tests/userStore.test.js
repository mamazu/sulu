"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = __importDefault(require("../userStore"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
const initializer_1 = __importDefault(require("../../../services/initializer"));
const localizationStore_1 = __importDefault(require("../../../stores/localizationStore"));
jest.mock('debounce', () => jest.fn((callback) => callback));
jest.mock('../../../services/Requester', () => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
}));
jest.mock('../../../services/initializer', () => ({
    initialize: jest.fn(),
}));
jest.mock('../../../stores/localizationStore', () => ({
    localizations: [],
}));
jest.mock('../../../services/Config', () => ({
    fallbackLocale: 'en',
    endpoints: {
        loginCheck: 'login_check_url',
        forgotPasswordReset: 'forgot_password_reset_url',
        resetPassword: 'reset_password_url',
        logout: 'logout_url',
        profileSettings: 'profile_settings_url',
        twoFactorLoginCheck: 'two_factor_login_check',
    },
    passwordPattern: '.{6,}',
}));
beforeEach(() => {
    userStore_1.default.clear();
});
test('Should clear the user store', () => {
    const user = { id: 1, locale: 'cool_locale', settings: {}, username: 'test', roles: [] };
    const contact = { id: 12, avatar: undefined, firstName: 'Firsti', lastName: 'Lasti', fullName: 'Firsti Lasti' };
    userStore_1.default.setLoggedIn(true);
    userStore_1.default.setLoading(true);
    userStore_1.default.setLoginError(true);
    userStore_1.default.setForgotPasswordSuccess(true);
    userStore_1.default.setUser(user);
    userStore_1.default.setContact(contact);
    userStore_1.default.setPersistentSetting('something', 'somevalue');
    userStore_1.default.setFullName(contact.firstName + ' ' + contact.lastName);
    expect(userStore_1.default.loggedIn).toBe(true);
    expect(userStore_1.default.loading).toBe(true);
    expect(userStore_1.default.loginError).toBe(true);
    expect(userStore_1.default.forgotPasswordSuccess).toBe(true);
    expect(userStore_1.default.user).toEqual(user);
    expect(userStore_1.default.contact).toEqual(contact);
    if (userStore_1.default.contact) {
        expect(userStore_1.default.contact.fullName).toEqual(contact.firstName + ' ' + contact.lastName);
    }
    expect(userStore_1.default.persistentSettings.size).toBe(1);
    userStore_1.default.clear();
    expect(userStore_1.default.persistentSettings.size).toBe(0);
});
test('Should return the locale of the user as system-locale', () => {
    userStore_1.default.setUser({
        id: 5,
        locale: 'de',
        settings: {},
        username: 'test',
        roles: [],
    });
    expect(userStore_1.default.systemLocale).toEqual('de');
});
test('Should return the fallback locale as system-locale if the user has none set', () => {
    expect(userStore_1.default.systemLocale).toEqual('en');
});
test('Should return the fallback-locale as content-locale if the user is not set', () => {
    expect(userStore_1.default.contentLocale).toEqual('en');
});
test('Should load and set first default-localization as content-locale when user is set', () => {
    localizationStore_1.default.localizations = [
        { locale: 'cz', country: '', language: 'cz', default: '', shadow: '' },
        { locale: 'ru', country: '', language: 'ru', default: 'true', shadow: '' },
        { locale: 'de', country: '', language: 'de', default: '', shadow: '' },
    ];
    userStore_1.default.setUser({
        id: 5,
        locale: 'de',
        settings: {},
        username: 'test',
        roles: [],
    });
    expect(userStore_1.default.contentLocale).toEqual('ru');
});
test('Should load and set first localization as content-locale if there is no default-localiztion', () => {
    localizationStore_1.default.localizations = [
        { locale: 'cz', country: '', language: 'cz', default: '', shadow: '' },
        { locale: 'ru', country: '', language: 'ru', default: '', shadow: '' },
        { locale: 'de', country: '', language: 'de', default: '', shadow: '' },
    ];
    userStore_1.default.setUser({
        id: 5,
        locale: 'de',
        settings: {},
        username: 'test',
        roles: [],
    });
    expect(userStore_1.default.contentLocale).toEqual('cz');
});
test('Should return initial persistent settings', () => {
    userStore_1.default.setUser({
        id: 5,
        locale: 'de',
        settings: {
            test1: 'value1',
        },
        username: 'test',
        roles: [],
    });
    expect(userStore_1.default.getPersistentSetting('test1')).toEqual('value1');
});
test('Should set persistent setting', () => {
    userStore_1.default.setPersistentSetting('categories.sortColumn', 'name');
    expect(userStore_1.default.getPersistentSetting('categories.sortColumn')).toEqual('name');
    userStore_1.default.setPersistentSetting('test.object', { abc: 'DEF', abc2: 'DEF2' });
    expect(userStore_1.default.getPersistentSetting('test.object')).toEqual({ abc: 'DEF', abc2: 'DEF2' });
});
test('Should update persistent settings of server with a debounce delay of 5 seconds', () => {
    userStore_1.default.setPersistentSetting('test1', 'value1');
    expect(Requester_1.default.patch).toBeCalledWith('profile_settings_url', { test1: 'value1' });
    userStore_1.default.setPersistentSetting('test2', 'value2');
    expect(Requester_1.default.patch).toBeCalledWith('profile_settings_url', { test2: 'value2' });
});
test('Should not update persistent setting if the value did not change', () => {
    userStore_1.default.setPersistentSetting('test1', 'test');
    expect(Requester_1.default.patch).toBeCalledWith('profile_settings_url', { test1: 'test' });
    Requester_1.default.patch.mockReset();
    userStore_1.default.setPersistentSetting('test1', 'test');
    expect(Requester_1.default.patch).not.toBeCalled();
});
test('Should also update persistent setting with the value of false on the server', () => {
    userStore_1.default.setPersistentSetting('test1', false);
    expect(Requester_1.default.patch).toBeCalledWith('profile_settings_url', { test1: false });
});
test('Should login', () => {
    const loginPromise = Promise.resolve({});
    const initializePromise = Promise.resolve({});
    Requester_1.default.post.mockReturnValue(loginPromise);
    initializer_1.default.initialize.mockReturnValue(initializePromise);
    userStore_1.default.login({ username: 'test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'test', password: 'password' });
        expect(initializer_1.default.initialize).toBeCalledWith(true);
        return initializePromise.then(() => {
            expect(userStore_1.default.loading).toBe(false);
        });
    });
});
test('Should login after the password was reset', () => {
    const resetPromise = Promise.resolve({});
    const initializePromise = Promise.resolve({});
    Requester_1.default.post.mockReturnValue(resetPromise);
    initializer_1.default.initialize.mockReturnValue(initializePromise);
    userStore_1.default.resetPassword({ password: 'test', token: 'some-uuid' });
    expect(userStore_1.default.loading).toBe(true);
    return resetPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('reset_password_url', { password: 'test', token: 'some-uuid' });
        expect(initializer_1.default.initialize).toBeCalledWith(true);
        return initializePromise.then(() => {
            expect(userStore_1.default.loading).toBe(false);
        });
    });
});
test('Should login without initializing when it`s the same user', () => {
    const user = { id: 1, locale: 'cool_locale', settings: {}, username: 'test', roles: [] };
    const loginPromise = Promise.resolve({
        username: 'test',
        completed: true,
    });
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.setUser(user);
    userStore_1.default.login({ username: 'test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'test', password: 'password' });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.loading).toBe(false);
        expect(userStore_1.default.loggedIn).toBe(true);
    });
});
test('Should set two factor methods after login when completed false', () => {
    const loginPromise = Promise.resolve({
        username: 'test',
        completed: false,
        twoFactorMethods: ['email', 'trusted_devices'],
    });
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.login({ username: 'test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'test', password: 'password' });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.loading).toBe(false);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.twoFactorMethods).toEqual(['email', 'trusted_devices']);
    });
});
test('Should do nothing when not completed but no two factor methods provided', () => {
    const loginPromise = Promise.resolve({
        username: 'test',
        completed: false,
    });
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.login({ username: 'test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'test', password: 'password' });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.loading).toBe(false);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.twoFactorMethods).toEqual([]);
    });
});
test('Should login with initializing when it`s not the same user', () => {
    const user = { id: 1, locale: 'cool_locale', settings: {}, username: 'test', roles: [] };
    const loginPromise = Promise.resolve({});
    const initializePromise = Promise.resolve({});
    userStore_1.default.setUser(user);
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.login({ username: 'other-user-than-test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'other-user-than-test', password: 'password' });
        expect(initializer_1.default.initialize).toBeCalledWith(true);
        expect(userStore_1.default.loading).toBe(true);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.loginError).toBe(false);
        expect(userStore_1.default.forgotPasswordSuccess).toBe(false);
        expect(userStore_1.default.user).toBeUndefined();
        expect(userStore_1.default.contact).toBeUndefined();
        return initializePromise.then(() => {
            expect(userStore_1.default.loading).toBe(false);
        });
    });
});
test('Should show error when login is not working and error status is 401', () => {
    Requester_1.default.post.mockReturnValue(Promise.reject({ status: 401 }));
    const loginPromise = userStore_1.default.login({ username: 'test', password: 'password' });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise
        .then(() => {
        expect(Requester_1.default.post).toBeCalledWith('login_check_url', { username: 'test', password: 'password' });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.loginError).toBe(true);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.loading).toBe(false);
    });
});
test('Should two factor login', () => {
    const loginPromise = Promise.resolve({
        username: 'test',
        completed: true,
    });
    const initializePromise = Promise.resolve({});
    Requester_1.default.post.mockReturnValue(loginPromise);
    initializer_1.default.initialize.mockReturnValue(initializePromise);
    userStore_1.default.twoFactorLogin({ _auth_code: 'test', _trusted: false });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('two_factor_login_check', { _auth_code: 'test', _trusted: false });
        expect(initializer_1.default.initialize).toBeCalledWith(true);
        return initializePromise.then(() => {
            expect(userStore_1.default.loading).toBe(false);
        });
    });
});
test('Should two factor login without initializing when it`s the same user', () => {
    const user = { id: 1, locale: 'en', settings: {}, username: 'test', roles: [] };
    const loginPromise = Promise.resolve({
        username: 'test',
        completed: true,
    });
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.setUser(user);
    userStore_1.default.twoFactorLogin({ _auth_code: 'test', _trusted: false });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('two_factor_login_check', { _auth_code: 'test', _trusted: false });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.loading).toBe(false);
        expect(userStore_1.default.loggedIn).toBe(true);
    });
});
test('Should two factor login with initializing when it`s not the same user', () => {
    const user = { id: 1, locale: 'en', settings: {}, username: 'test', roles: [] };
    const loginPromise = Promise.resolve({
        username: 'other-user-than-test',
        completed: true,
    });
    const initializePromise = Promise.resolve({});
    userStore_1.default.setUser(user);
    Requester_1.default.post.mockReturnValue(loginPromise);
    userStore_1.default.twoFactorLogin({ _auth_code: 'test', _trusted: false });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('two_factor_login_check', { _auth_code: 'test', _trusted: false });
        expect(initializer_1.default.initialize).toBeCalledWith(true);
        expect(userStore_1.default.loading).toBe(true);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.loginError).toBe(false);
        expect(userStore_1.default.forgotPasswordSuccess).toBe(false);
        expect(userStore_1.default.user).toBeUndefined();
        expect(userStore_1.default.contact).toBeUndefined();
        return initializePromise.then(() => {
            expect(userStore_1.default.loading).toBe(false);
        });
    });
});
test('Should show error when two factor login is not working and error status is 401', () => {
    Requester_1.default.post.mockReturnValue(Promise.reject({ status: 401 }));
    const loginPromise = userStore_1.default.twoFactorLogin({ _auth_code: 'test', _trusted: false });
    expect(userStore_1.default.loading).toBe(true);
    return loginPromise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('two_factor_login_check', { _auth_code: 'test', _trusted: false });
        expect(initializer_1.default.initialize).not.toBeCalled();
        expect(userStore_1.default.twoFactorError).toBe(true);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.loading).toBe(false);
    });
});
test('Should send an email when the password is forgotten', () => {
    Requester_1.default.post.mockReturnValue(Promise.resolve({}));
    const promise = userStore_1.default.forgotPassword({ user: 'test' });
    expect(userStore_1.default.loading).toBe(true);
    return promise.then(() => {
        expect(Requester_1.default.post).toBeCalledWith('forgot_password_reset_url', { user: 'test' });
        expect(userStore_1.default.forgotPasswordSuccess).toBe(true);
        expect(userStore_1.default.loggedIn).toBe(false);
        expect(userStore_1.default.loading).toBe(false);
    });
});
test('Should logout', () => {
    userStore_1.default.setLoggedIn(true);
    Requester_1.default.get.mockReturnValue(Promise.resolve({}));
    const promise = userStore_1.default.logout();
    return promise.then(() => {
        expect(Requester_1.default.get).toBeCalledWith('logout_url');
        expect(userStore_1.default.loggedIn).toBe(false);
    });
});
test('Should update persistent settings on updateContentLocale', () => {
    userStore_1.default.updateContentLocale('fr');
    expect(Requester_1.default.patch).toBeCalledWith('profile_settings_url', { 'sulu_admin.content_locale': 'fr' });
    expect(userStore_1.default.contentLocale).toBe('fr');
});
test('Should validate password', () => {
    expect(userStore_1.default.validatePassword('12345')).toBeFalsy();
    expect(userStore_1.default.validatePassword('123456')).toBeTruthy();
});
