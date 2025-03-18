"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const MultiMediaSelectionOverlay_1 = __importDefault(require("../MultiMediaSelectionOverlay"));
const MediaSelectionOverlay_1 = __importDefault(require("../../MediaSelectionOverlay"));
jest.mock('../../MediaSelectionOverlay', () => {
    const MediaSelectionOverlay = function () {
        return <div>single media selection overlay</div>;
    };
    MediaSelectionOverlay.createCollectionListStore = jest.fn().mockReturnValue({
        destroy: jest.fn(),
    });
    MediaSelectionOverlay.createMediaListStore = jest.fn().mockReturnValue({
        destroy: jest.fn(),
        clear: jest.fn(),
    });
    return MediaSelectionOverlay;
});
test('Should create list-stores with correct locale and excluded-ids', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default excludedIds={[44, 22]} locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, []);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual([44, 22]);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should create list-stores without excluded-ids', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, []);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual(undefined);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should create list-stores with correct media type', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true} types={['image']}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, ['image']);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual(undefined);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should pass correct props to media-selection-overlay', () => {
    const mediaListStoreMock = { clear: jest.fn() };
    MediaSelectionOverlay_1.default.createMediaListStore.mockReturnValueOnce(mediaListStoreMock);
    const collectionListStoreMock = jest.fn();
    MediaSelectionOverlay_1.default.createCollectionListStore.mockReturnValueOnce(collectionListStoreMock);
    const locale = mobx_1.observable.box('en');
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const multiMediaSelectionOverlay = (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default confirmLoading={true} excludedIds={[22, 44]} locale={locale} onClose={onClose} onConfirm={onConfirm} open={true}/>);
    const mediaSelectionOverlay = multiMediaSelectionOverlay.find(MediaSelectionOverlay_1.default);
    expect(mediaSelectionOverlay.prop('confirmLoading')).toEqual(true);
    expect(mediaSelectionOverlay.prop('mediaListStore')).toEqual(mediaListStoreMock);
    expect(mediaSelectionOverlay.prop('collectionListStore')).toEqual(collectionListStoreMock);
    expect(mediaSelectionOverlay.prop('locale')).toEqual(locale);
    expect(mediaSelectionOverlay.prop('open')).toEqual(true);
    expect(mediaSelectionOverlay.prop('onClose')).toEqual(onClose);
    expect(mediaSelectionOverlay.prop('onConfirm')).toEqual(onConfirm);
});
test('Should clear media ListStore if the excludedIds prop is changed', () => {
    const multiMediaSelectionOverlay = (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default excludedIds={[11, 22]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    expect(multiMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
    multiMediaSelectionOverlay.setProps({
        excludedIds: [33],
    });
    expect(multiMediaSelectionOverlay.instance().mediaListStore.clear).toBeCalled();
});
test('Should not clear media ListStore if new value of excludedIds prop is equal to old value', () => {
    const multiMediaSelectionOverlay = (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default excludedIds={[11, 22]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    expect(multiMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
    multiMediaSelectionOverlay.setProps({
        excludedIds: [11, 22],
    });
    expect(multiMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
});
test('Should destroy list-stores on unmount', () => {
    const multiMediaSelectionOverlay = (0, enzyme_1.shallow)(<MultiMediaSelectionOverlay_1.default excludedIds={[]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    const mediaListStoreMock = multiMediaSelectionOverlay.instance().mediaListStore;
    const collectionListStoreMock = multiMediaSelectionOverlay.instance().collectionListStore;
    expect(mediaListStoreMock.destroy).not.toHaveBeenCalled();
    expect(collectionListStoreMock.destroy).not.toHaveBeenCalled();
    multiMediaSelectionOverlay.unmount();
    expect(mediaListStoreMock.destroy).toHaveBeenCalled();
    expect(collectionListStoreMock.destroy).toHaveBeenCalled();
});
