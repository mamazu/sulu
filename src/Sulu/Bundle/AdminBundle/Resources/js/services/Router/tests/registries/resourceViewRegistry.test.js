"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resourceViewRegistry_1 = __importDefault(require("../../registries/resourceViewRegistry"));
beforeEach(() => {
    resourceViewRegistry_1.default.clear();
});
test('Clear routes from ResourceViewRegistry should empty list', () => {
    resourceViewRegistry_1.default.addResourceViews({
        resource: {
            views: {
                list: 'sulu_page.pages_list',
                detail: 'sulu_page.page_edit_form',
            },
        },
    });
    expect(Object.keys(resourceViewRegistry_1.default.resourceViews)).toHaveLength(1);
    resourceViewRegistry_1.default.clear();
    expect(Object.keys(resourceViewRegistry_1.default.resourceViews)).toHaveLength(0);
});
test('Get view from RouteRegistry', () => {
    resourceViewRegistry_1.default.addResourceViews({
        pages: {
            views: {
                list: 'sulu_page.pages_list',
                detail: 'sulu_page.page_edit_form',
            },
        },
    });
    const listView = resourceViewRegistry_1.default.get('list', 'pages');
    const detailView = resourceViewRegistry_1.default.get('detail', 'pages');
    expect(listView).toBe('sulu_page.pages_list');
    expect(detailView).toBe('sulu_page.page_edit_form');
});
test('Get a non-existing resource should throw an exception', () => {
    expect(() => resourceViewRegistry_1.default.get('detail', 'not-exist'))
        .toThrow('The resource "not-exist" was not found.');
});
test('Get a non-existing view should throw an exception', () => {
    resourceViewRegistry_1.default.addResourceViews({
        pages: {
            views: {
                list: 'sulu_page.pages_list',
                detail: 'sulu_page.page_edit_form',
            },
        },
    });
    expect(() => resourceViewRegistry_1.default.get('non-exist', 'pages'))
        .toThrow('The resource view "non-exist" for resource "pages" was not found.');
});
test('Has view from RouteRegistry should return true if exists', () => {
    resourceViewRegistry_1.default.addResourceViews({
        pages: {
            views: {
                detail: 'sulu_page.page_edit_form',
            },
        },
    });
    expect(resourceViewRegistry_1.default.has('detail', 'pages')).toBe(true);
});
test('Has view from RouteRegistry should return false if not exists', () => {
    expect(resourceViewRegistry_1.default.has('detail', 'pages')).toBe(false);
});
