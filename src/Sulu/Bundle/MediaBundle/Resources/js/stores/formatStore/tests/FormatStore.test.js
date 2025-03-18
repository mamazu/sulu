"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore"));
const formatStore_1 = __importDefault(require("../formatStore"));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    user: undefined,
}));
jest.mock('sulu-admin-bundle/services', () => ({
    ResourceRequester: {
        getList: jest.fn().mockReturnValue({
            then: jest.fn(),
        }),
    },
}));
test('Should fail if no user is logged in', () => {
    expect(() => formatStore_1.default.loadFormats()).toThrow(/user must be logged in /);
});
test('Load localizations', () => {
    userStore_1.default.user = {
        id: 1,
        locale: 'de',
        settings: {},
        username: 'test',
        roles: [],
    };
    const response = {
        _embedded: {
            formats: [
                {
                    internal: false,
                    key: '400x400',
                    options: null,
                    scale: {
                        x: 400,
                        y: 400,
                        mode: 'outbound',
                        retina: false,
                        forceRatio: true,
                    },
                    title: 'Test EN',
                },
                {
                    internal: false,
                    key: '800x800',
                    options: null,
                    scale: {
                        x: 800,
                        y: 800,
                        mode: 'outbound',
                        retina: false,
                        forceRatio: true,
                    },
                    title: 'Test1 EN',
                },
            ],
        },
    };
    const promise = Promise.resolve(response);
    services_1.ResourceRequester.getList.mockReturnValue(promise);
    const formatPromise = formatStore_1.default.loadFormats();
    return formatPromise.then((formats) => {
        // check if promise has been cached
        expect(formatStore_1.default.formatPromise).toEqual(formatPromise);
        expect(formats).toBe(response._embedded.formats);
    });
});
