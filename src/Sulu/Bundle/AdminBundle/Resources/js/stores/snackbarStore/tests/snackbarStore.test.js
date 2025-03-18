"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snackbarStore_1 = __importDefault(require("../snackbarStore"));
beforeEach(() => {
    snackbarStore_1.default.clear();
});
test('Add should increase the messages', () => {
    expect(snackbarStore_1.default.messages.length).toBe(0);
    snackbarStore_1.default.add({
        text: 'Test message',
        type: 'success',
    });
    expect(snackbarStore_1.default.messages.length).toBe(1);
});
test('Remove should decrease the messages', () => {
    const message = {
        text: 'Test message',
        type: 'success',
    };
    snackbarStore_1.default.add(message);
    snackbarStore_1.default.remove(message);
    expect(snackbarStore_1.default.messages.length).toBe(0);
});
test('Clear should remove all messages', () => {
    const message = {
        text: 'Test message',
        type: 'success',
    };
    snackbarStore_1.default.add(message);
    snackbarStore_1.default.clear();
    expect(snackbarStore_1.default.messages.length).toBe(0);
});
test('Add with message should create a setTimeout', () => {
    // eslint-disable-next-line no-undef
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const message = {
        text: 'Test message',
        type: 'success',
    };
    snackbarStore_1.default.add(message, 10);
    expect(timeoutSpy).toBeCalled();
});
