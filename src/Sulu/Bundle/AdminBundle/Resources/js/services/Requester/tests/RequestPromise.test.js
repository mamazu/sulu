"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestPromise_1 = __importDefault(require("../RequestPromise"));
test('Cancel request when abort is called', () => {
    const requestPromise = new RequestPromise_1.default(function () { });
    const abortController = {
        abort: jest.fn(),
    };
    requestPromise.setAbortController(abortController);
    requestPromise.abort();
    expect(abortController.abort).toBeCalledWith();
});
test('Passing promises via then should also have the AbortController set', () => {
    const requestPromise = new RequestPromise_1.default(function (resolve) {
        resolve();
    });
    const abortController = {
        abort: jest.fn(),
    };
    requestPromise.setAbortController(abortController);
    requestPromise.abort();
    const thenPromise = requestPromise.then(function () { });
    expect(thenPromise.abortController).toEqual(abortController);
});
test('Passing promises via catch should also have the AbortController set', () => {
    const requestPromise = new RequestPromise_1.default(function (resolve, reject) {
        reject();
    });
    const abortController = {
        abort: jest.fn(),
    };
    requestPromise.setAbortController(abortController);
    requestPromise.abort();
    const catchPromise = requestPromise.catch(function () { });
    expect(catchPromise.abortController).toEqual(abortController);
});
test('Throw error if abort is called without AbortController', () => {
    const requestPromise = new RequestPromise_1.default(function () { });
    expect(() => requestPromise.abort()).toThrow('setAbortController');
});
