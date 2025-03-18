"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const services_1 = require("sulu-admin-bundle/services");
const CacheClearToolbarAction_1 = __importDefault(require("../CacheClearToolbarAction"));
jest.mock('sulu-admin-bundle/services/Requester', () => ({
    delete: jest.fn(),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Return item config with correct icon, type and label and return closed dialog', () => {
    const cacheClearToolbarAction = new CacheClearToolbarAction_1.default();
    expect(cacheClearToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        icon: 'su-paint',
        label: 'sulu_website.cache_clear',
        type: 'button',
    }));
    const element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        cancelText: 'sulu_admin.cancel',
        children: 'sulu_website.cache_clear_warning_text',
        confirmText: 'sulu_admin.ok',
        open: false,
        title: 'sulu_website.cache_clear_warning_title',
    }));
});
test('Open dialog on toolbar item click', () => {
    const cacheClearToolbarAction = new CacheClearToolbarAction_1.default('sulu-io');
    const toolbarItemConfig = cacheClearToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    const element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
});
test('Close dialog on cancel click', () => {
    const cacheClearToolbarAction = new CacheClearToolbarAction_1.default();
    const toolbarItemConfig = cacheClearToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    let element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.find('Button[skin="secondary"]').simulate('click');
    element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Call delete when dialog is confirmed', () => {
    const cacheClearToolbarAction = new CacheClearToolbarAction_1.default();
    CacheClearToolbarAction_1.default.clearCacheEndpoint = '/cache';
    const deletePromise = Promise.resolve();
    services_1.Requester.delete.mockReturnValue(deletePromise);
    const toolbarItemConfig = cacheClearToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    let element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    expect(element.instance().props.confirmLoading).toEqual(false);
    element.find('Button[skin="primary"]').simulate('click');
    expect(services_1.Requester.delete).toBeCalledWith('/cache');
    element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props.confirmLoading).toEqual(true);
    return deletePromise.then(() => {
        element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
        expect(element.instance().props.confirmLoading).toEqual(false);
        expect(element.instance().props).toEqual(expect.objectContaining({
            open: false,
        }));
    });
});
test('Call delete when dialog is confirmed with query parameter', () => {
    const cacheClearToolbarAction = new CacheClearToolbarAction_1.default('sulu-io');
    CacheClearToolbarAction_1.default.clearCacheEndpoint = '/cache';
    const deletePromise = Promise.resolve();
    services_1.Requester.delete.mockReturnValue(deletePromise);
    const toolbarItemConfig = cacheClearToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    let element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    expect(element.instance().props.confirmLoading).toEqual(false);
    element.find('Button[skin="primary"]').simulate('click');
    expect(services_1.Requester.delete).toBeCalledWith('/cache?webspaceKey=sulu-io');
    element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
    expect(element.instance().props.confirmLoading).toEqual(true);
    return deletePromise.then(() => {
        element = (0, enzyme_1.shallow)(cacheClearToolbarAction.getNode());
        expect(element.instance().props.confirmLoading).toEqual(false);
        expect(element.instance().props).toEqual(expect.objectContaining({
            open: false,
        }));
    });
});
