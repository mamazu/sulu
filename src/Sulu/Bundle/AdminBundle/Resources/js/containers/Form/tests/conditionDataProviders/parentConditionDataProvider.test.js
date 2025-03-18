"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parentConditionDataProvider_1 = __importDefault(require("../../conditionDataProviders/parentConditionDataProvider"));
test('Return parent for root level', () => {
    const data = { title: 'Test' };
    expect((0, parentConditionDataProvider_1.default)(data, '/title')).toEqual({ __parent: { title: 'Test' } });
});
test('Return parent for first block', () => {
    const data = {
        title: 'Title',
        blocks: [
            { title: 'Block title 1' },
            { title: 'Block title 2' },
        ],
    };
    expect((0, parentConditionDataProvider_1.default)(data, '/blocks/0/title')).toEqual({ __parent: { title: 'Block title 1' } });
});
test('Return null for not existing path', () => {
    const data = {
        title: 'Title',
        blocks: [
            { title: 'Block title 1' },
            { title: 'Block title 2' },
        ],
    };
    expect((0, parentConditionDataProvider_1.default)(data, '/not/existing/path')).toEqual({ __parent: null });
});
test('Return parent for second block', () => {
    const data = {
        title: 'Title',
        blocks: [
            { title: 'Block title 1' },
            { title: 'Block title 2' },
        ],
    };
    expect((0, parentConditionDataProvider_1.default)(data, '/blocks/1/title')).toEqual({ __parent: { title: 'Block title 2' } });
});
test('Return parent for nested second block', () => {
    const data = {
        title: 'Title',
        blocks: [
            {
                title: 'Block title',
                blocks: [
                    { title: 'Block title 1' },
                    { title: 'Block title 2' },
                ],
            },
        ],
    };
    expect((0, parentConditionDataProvider_1.default)(data, '/blocks/0/blocks/1/title')).toEqual({
        __parent: {
            __parent: {
                title: 'Block title',
                blocks: [
                    { title: 'Block title 1' },
                    { title: 'Block title 2' },
                ],
            },
            title: 'Block title 2',
        },
    });
});
