"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const jexl_1 = __importDefault(require("jexl"));
const userConditionDataProvider_1 = __importDefault(require("../../conditionDataProviders/userConditionDataProvider"));
const userStore_1 = __importDefault(require("../../../../stores/userStore"));
jest.mock('../../../../stores/userStore', () => ({}));
test('Return user from userStore', () => {
    userStore_1.default.user = undefined;
    expect((0, userConditionDataProvider_1.default)()).toEqual({ __user: undefined });
    userStore_1.default.user = {
        id: 1,
        username: 'admin',
        locale: 'en',
        fullName: 'Adam Ministrator',
        roles: ['ROLE_USER'],
        settings: {},
    };
    expect((0, userConditionDataProvider_1.default)()).toEqual({
        __user: {
            id: 1,
            username: 'admin',
            locale: 'en',
            fullName: 'Adam Ministrator',
            roles: ['ROLE_USER'],
            settings: {},
        },
    });
});
test('Roles of user can be used in jexl expression', () => {
    userStore_1.default.user = (0, mobx_1.observable)({
        id: 1,
        username: 'admin',
        locale: 'en',
        fullName: 'Adam Ministrator',
        roles: ['ROLE_USER', 'ROLE_SULU_DESIGNER'],
        settings: {},
    });
    const conditionData = (0, userConditionDataProvider_1.default)();
    expect(jexl_1.default.evalSync('"ROLE_SULU_DESIGNER" in __user.roles', conditionData)).toBeTruthy();
    expect(jexl_1.default.evalSync('"ROLE_SULU_TESTER" in __user.roles', conditionData)).toBeFalsy();
});
