"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigationRegistry_1 = __importDefault(require("../../registries/navigationRegistry"));
beforeEach(() => {
    navigationRegistry_1.default.clear();
});
test('Set and clear all from NavigationRegistry', () => {
    navigationRegistry_1.default.set([
        {
            id: '111',
            label: 'Test 1',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '222',
            label: 'Test 2',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '333',
            label: 'Test 3',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
    ]);
    expect(navigationRegistry_1.default.navigationItems).toHaveLength(3);
    navigationRegistry_1.default.clear();
    expect(navigationRegistry_1.default.navigationItems).toHaveLength(0);
});
test('Set and get all from NavigationRegistry', () => {
    const items = [
        {
            id: '111',
            label: 'Test 1',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '222',
            label: 'Test 2',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '333',
            label: 'Test 3',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
    ];
    navigationRegistry_1.default.set(items);
    expect(navigationRegistry_1.default.getAll()).toBe(items);
});
test('Get should return the correct item', () => {
    const items = [
        {
            id: '111',
            label: 'Test 1',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '222',
            label: 'Test 2',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
        },
        {
            id: '333',
            label: 'Test 3',
            icon: 'su-webspace',
            view: 'sulu_page.webspaces',
            visible: true,
            items: [
                {
                    id: '444',
                    label: 'Test 4',
                    icon: 'su-webspace',
                    view: 'sulu_page.webspaces',
                    visible: true,
                },
                {
                    id: '555',
                    label: 'Test 5',
                    icon: 'su-webspace',
                    view: 'sulu_page.webspaces',
                    visible: true,
                },
            ],
        },
    ];
    navigationRegistry_1.default.set(items);
    expect(navigationRegistry_1.default.get('111')).toBe(items[0]);
    expect(navigationRegistry_1.default.get('555')).toBe(items[2].items[1]);
});
