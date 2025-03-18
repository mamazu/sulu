"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const stores_1 = require("sulu-admin-bundle/stores");
const FocusPointOverlay_1 = __importDefault(require("../FocusPointOverlay"));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(function () {
        this.clone = jest.fn().mockReturnValue(this);
        this.change = jest.fn();
        this.save = jest.fn();
        this.set = jest.fn();
    }),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Should not create a ResourceStore before overlay was opened', () => {
    const resourceStore = new stores_1.ResourceStore('media');
    resourceStore.data = {
        url: '/image.jpeg',
        focusPointX: undefined,
        focusPointY: undefined,
    };
    (0, enzyme_1.shallow)(<FocusPointOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} open={false} resourceStore={resourceStore}/>);
    expect(resourceStore.clone).not.toBeCalled();
});
test('Should select the middle by default', () => {
    const resourceStore = new stores_1.ResourceStore('media');
    resourceStore.data = {
        url: '/image.jpeg',
        focusPointX: undefined,
        focusPointY: undefined,
    };
    const focusPointOverlay = (0, enzyme_1.shallow)(<FocusPointOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} open={false} resourceStore={resourceStore}/>);
    focusPointOverlay.setProps({ open: true });
    expect(focusPointOverlay.find('ImageFocusPoint').prop('value')).toEqual({ x: 1, y: 1 });
});
test('Initialize with data from resourceStore when overlay opens', () => {
    const resourceStore = new stores_1.ResourceStore('media');
    resourceStore.data = {
        url: '/image.jpeg',
        focusPointX: 2,
        focusPointY: 1,
    };
    const focusPointOverlay = (0, enzyme_1.shallow)(<FocusPointOverlay_1.default onClose={jest.fn()} onConfirm={jest.fn()} open={false} resourceStore={resourceStore}/>);
    focusPointOverlay.instance().focusPointX = 0;
    focusPointOverlay.instance().focusPointY = 0;
    focusPointOverlay.setProps({ open: true });
    focusPointOverlay.update();
    expect(focusPointOverlay.find('ImageFocusPoint').prop('value')).toEqual({ x: 2, y: 1 });
});
test('Closing the overlay should call the onClose callback', () => {
    const closeSpy = jest.fn();
    const resourceStore = new stores_1.ResourceStore('media');
    resourceStore.data = {
        focusPointX: 2,
        focusPointY: 1,
    };
    const focusPointOverlay = (0, enzyme_1.shallow)(<FocusPointOverlay_1.default onClose={closeSpy} onConfirm={jest.fn()} open={false} resourceStore={resourceStore}/>);
    focusPointOverlay.find('Overlay').prop('onClose')();
    expect(closeSpy).toBeCalledWith();
});
test('Should save the focus point when confirm button is clicked', () => {
    const confirmSpy = jest.fn();
    const resourceStore = new stores_1.ResourceStore('media');
    resourceStore.data = {
        focusPointX: 2,
        focusPointY: 1,
    };
    const savePromise = Promise.resolve({});
    resourceStore.save.mockReturnValue(savePromise);
    const focusPointOverlay = (0, enzyme_1.shallow)(<FocusPointOverlay_1.default onClose={jest.fn()} onConfirm={confirmSpy} open={false} resourceStore={resourceStore}/>);
    focusPointOverlay.setProps({ open: true });
    expect(focusPointOverlay.find('Overlay').prop('confirmDisabled')).toEqual(true);
    focusPointOverlay.find('ImageFocusPoint').prop('onChange')({ x: 0, y: 2 });
    expect(focusPointOverlay.find('Overlay').prop('confirmDisabled')).toEqual(false);
    focusPointOverlay.find('Overlay').prop('onConfirm')();
    const clonedResourceStore = focusPointOverlay.instance().resourceStore;
    expect(clonedResourceStore.change).toBeCalledWith('focusPointX', 0);
    expect(clonedResourceStore.change).toBeCalledWith('focusPointY', 2);
    expect(clonedResourceStore.save).toBeCalledWith();
    return savePromise.then(() => {
        expect(resourceStore.set).toBeCalledWith('focusPointX', 0);
        expect(resourceStore.set).toBeCalledWith('focusPointY', 2);
        expect(confirmSpy).toBeCalled();
    });
});
