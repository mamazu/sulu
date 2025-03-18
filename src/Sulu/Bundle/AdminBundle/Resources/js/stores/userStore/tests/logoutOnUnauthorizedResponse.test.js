"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logoutOnUnauthorizedResponse_1 = __importDefault(require("../logoutOnUnauthorizedResponse"));
const userStore_1 = __importDefault(require("../userStore"));
jest.mock('../userStore', () => ({
    setLoggedIn: jest.fn(),
}));
test('Call setLoggedIn in userStore to false when response has status 401', () => {
    const response = { status: 401 };
    (0, logoutOnUnauthorizedResponse_1.default)(response);
    expect(userStore_1.default.setLoggedIn).toBeCalledWith(false);
});
test('Do not call setLoggedIn in userStore when response has not status 401', () => {
    const response = { status: 200 };
    (0, logoutOnUnauthorizedResponse_1.default)(response);
    expect(userStore_1.default.setLoggedIn).not.toBeCalled();
});
