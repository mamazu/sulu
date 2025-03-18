"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const stores_1 = require("sulu-admin-bundle/stores");
const CollectionFormOverlay_1 = __importDefault(require("../CollectionFormOverlay"));
jest.mock('sulu-admin-bundle/services/initializer', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn());
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn());
test('Render as overlay', () => {
    const resourceStore = new stores_1.ResourceStore('test');
    const collectionFormOverlay = (0, enzyme_1.shallow)(<CollectionFormOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} operationType={null} overlayType="overlay" resourceStore={resourceStore}/>);
    expect(collectionFormOverlay.find('Overlay')).toHaveLength(1);
    expect(collectionFormOverlay.find('Dialog')).toHaveLength(0);
});
test('Render as dialog', () => {
    const resourceStore = new stores_1.ResourceStore('test');
    const collectionFormOverlay = (0, enzyme_1.shallow)(<CollectionFormOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} operationType={null} overlayType="dialog" resourceStore={resourceStore}/>);
    expect(collectionFormOverlay.find('Overlay')).toHaveLength(0);
    expect(collectionFormOverlay.find('Dialog')).toHaveLength(1);
});
test('Keep title when closing overlay until new overlay opens', () => {
    const resourceStore = new stores_1.ResourceStore('test');
    const collectionFormOverlay = (0, enzyme_1.shallow)(<CollectionFormOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} operationType={null} overlayType="overlay" resourceStore={resourceStore}/>);
    collectionFormOverlay.setProps({ resourceStore, operationType: 'create' });
    expect(collectionFormOverlay.find('Overlay').props()).toEqual(expect.objectContaining({
        open: true,
        title: 'sulu_media.add_collection',
    }));
    collectionFormOverlay.setProps({ resourceStore, operationType: null });
    expect(collectionFormOverlay.find('Overlay').props()).toEqual(expect.objectContaining({
        open: false,
        title: 'sulu_media.add_collection',
    }));
    collectionFormOverlay.setProps({ resourceStore, operationType: 'update' });
    expect(collectionFormOverlay.find('Overlay').props()).toEqual(expect.objectContaining({
        open: true,
        title: 'sulu_media.edit_collection',
    }));
    collectionFormOverlay.setProps({ resourceStore, operationType: null });
    expect(collectionFormOverlay.find('Overlay').props()).toEqual(expect.objectContaining({
        open: false,
        title: 'sulu_media.edit_collection',
    }));
});
test('Call destroy of ResourceFormStore when unmounted', () => {
    const resourceStore = new stores_1.ResourceStore('test');
    const collectionFormOverlay = (0, enzyme_1.mount)(<CollectionFormOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} operationType={null} overlayType="overlay" resourceStore={resourceStore}/>);
    const resourceFormStore = collectionFormOverlay.instance().formStore;
    resourceFormStore.destroy = jest.fn();
    collectionFormOverlay.unmount();
    expect(resourceFormStore.destroy).toBeCalledWith();
});
