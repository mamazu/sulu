"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initializer_1 = __importDefault(require("../initializer"));
const Requester_1 = __importDefault(require("../../Requester"));
const Translator_1 = require("../../../utils/Translator");
const resourceRouteRegistry_1 = __importDefault(require("../../ResourceRequester/registries/resourceRouteRegistry"));
jest.mock('../../ResourceRequester/registries/resourceRouteRegistry', () => ({
    setRoutingData: jest.fn(),
}));
jest.mock('../../Requester', () => ({
    get: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    setTranslations: jest.fn(),
}));
beforeEach(() => {
    initializer_1.default.clear();
});
test('Should initialize when everything works', () => {
    const configData = {
        sulu_admin: {
            fieldTypeOptions: {
                selection: {
                    contact_selection: {
                        resourceKey: 'contacts',
                    },
                },
                single_selection: {
                    single_account_selection: {
                        resourceKey: 'accounts',
                    },
                },
            },
            routes: 'crazy_routes',
            navigation: 'nice_navigation',
            resourceMetadataEndpoints: 'top_endpoints',
            user: 'the_logged_in_user',
            contact: 'contact_of_the_user',
            smartContent: {
                content: {
                    datasourceResourceKey: 'pages',
                },
            },
        },
    };
    const translationData = {
        'sulu_admin.test1': 'Test1',
    };
    const routeData = {};
    const translationPromise = Promise.resolve(translationData);
    const configPromise = Promise.resolve(configData);
    const routePromise = Promise.resolve(routeData);
    Requester_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'translations_url?locale=en':
                return translationPromise;
            case 'config_url':
                return configPromise;
            case 'routing':
                return routePromise;
        }
    });
    const hook = jest.fn();
    initializer_1.default.addUpdateConfigHook('sulu_admin', hook);
    const initPromise = initializer_1.default.initialize(true);
    expect(initializer_1.default.loading).toBe(true);
    return initPromise
        .then(() => {
        expect(resourceRouteRegistry_1.default.setRoutingData).toBeCalledWith(routeData);
        expect(Translator_1.setTranslations).toBeCalledWith(translationData, 'en');
        expect(initializer_1.default.initializedTranslationsLocale).toBe('en');
        expect(initializer_1.default.initialized).toBe(true);
        expect(initializer_1.default.loading).toBe(false);
        expect(hook).toBeCalledWith(configData['sulu_admin'], false);
    });
});
test('Should initialize and return bundle names', () => {
    const configData = {
        sulu_admin: {},
        sulu_audience_targeting: {},
    };
    const translationData = {
        'sulu_admin.test1': 'Test1',
    };
    const routeData = {};
    const translationPromise = Promise.resolve(translationData);
    const configPromise = Promise.resolve(configData);
    const routePromise = Promise.resolve(routeData);
    Requester_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'translations_url?locale=en':
                return translationPromise;
            case 'config_url':
                return configPromise;
            case 'routing':
                return routePromise;
        }
    });
    const initPromise = initializer_1.default.initialize(true);
    expect(initializer_1.default.loading).toBe(true);
    expect(initializer_1.default.bundles).toEqual([]);
    return initPromise
        .then(() => {
        expect(initializer_1.default.loading).toBe(false);
        expect(initializer_1.default.bundles).toEqual(['sulu_admin', 'sulu_audience_targeting']);
    });
});
test('Should only initialize translations if no user is logged in', () => {
    const translationData = {
        'sulu_admin.test1': 'Test1',
    };
    const translationPromise = Promise.resolve(translationData);
    Requester_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'translations_url?locale=en':
                return translationPromise;
        }
    });
    const hook = jest.fn();
    initializer_1.default.addUpdateConfigHook('sulu_admin', hook);
    const initPromise = initializer_1.default.initialize(false);
    expect(initializer_1.default.loading).toBe(true);
    return initPromise
        .then(() => {
        expect(resourceRouteRegistry_1.default.setRoutingData).not.toBeCalled();
        expect(Translator_1.setTranslations).toBeCalledWith(translationData, 'en');
        expect(initializer_1.default.initializedTranslationsLocale).toBe('en');
        expect(initializer_1.default.initialized).toBe(false);
        expect(initializer_1.default.loading).toBe(false);
        expect(hook).not.toBeCalled();
    });
});
test('Should not reinitialize everything when it was already initialized', () => {
    const configData = {
        'sulu_admin': {
            routes: 'crazy_routes',
            navigation: 'nice_navigation',
            resourceMetadataEndpoints: 'top_endpoints',
            user: 'the_logged_in_user',
            contact: 'contact_of_the_user',
        },
    };
    const translationData = {
        'sulu_admin.test1': 'Test1',
    };
    const routeData = {};
    const translationPromise = Promise.resolve(translationData);
    const configPromise = Promise.resolve(configData);
    const routePromise = Promise.resolve(routeData);
    Requester_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'translations_url?locale=en':
                return translationPromise;
            case 'config_url':
                return configPromise;
            case 'routing':
                return routePromise;
        }
    });
    initializer_1.default.setInitialized();
    initializer_1.default.setInitializedTranslationsLocale('en');
    const initPromise = initializer_1.default.initialize(true);
    expect(initializer_1.default.loading).toBe(true);
    return initPromise
        .then(() => {
        expect(resourceRouteRegistry_1.default.setRoutingData).toBeCalledWith(routeData);
        expect(Translator_1.setTranslations).not.toBeCalled();
        expect(initializer_1.default.initialized).toBe(true);
        expect(initializer_1.default.loading).toBe(false);
    });
});
test('Should not crash when the config request throws an 401 error', () => {
    const translationData = {
        'sulu_admin.test1': 'Test1',
    };
    const translationPromise = Promise.resolve(translationData);
    const configPromise = Promise.reject({ status: 401 });
    const routePromise = Promise.resolve();
    Requester_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'translations_url?locale=en':
                return translationPromise;
            case 'config_url':
                return configPromise;
            case 'routing':
                return routePromise;
        }
    });
    const initPromise = initializer_1.default.initialize(true);
    expect(initializer_1.default.loading).toBe(true);
    return initPromise
        .catch(() => {
        expect(Translator_1.setTranslations).toBeCalledWith(translationData);
        expect(initializer_1.default.initializedTranslationsLocale).toBe('en');
        expect(initializer_1.default.initialized).toBe(false);
        expect(initializer_1.default.loading).toBe(false);
    });
});
test('Should clear the initializer', () => {
    initializer_1.default.setLoading(true);
    initializer_1.default.setInitializedTranslationsLocale('en');
    initializer_1.default.setInitialized();
    expect(initializer_1.default.loading).toBe(true);
    expect(initializer_1.default.initializedTranslationsLocale).toBe('en');
    expect(initializer_1.default.initialized).toBe(true);
    initializer_1.default.clear();
    expect(initializer_1.default.loading).toBe(false);
    expect(initializer_1.default.initializedTranslationsLocale).toBeUndefined();
    expect(initializer_1.default.initialized).toBe(false);
});
