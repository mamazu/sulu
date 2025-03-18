"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const MediaSelectionOverlay_1 = __importDefault(require("../../MediaSelectionOverlay"));
const SingleMediaSelectionOverlay_1 = __importDefault(require("../SingleMediaSelectionOverlay"));
jest.mock('../../MediaSelectionOverlay', () => {
    const MediaSelectionOverlay = function () {
        return <div>single media selection overlay</div>;
    };
    MediaSelectionOverlay.createCollectionListStore = jest.fn().mockReturnValue({
        destroy: jest.fn(),
    });
    MediaSelectionOverlay.createMediaListStore = jest.fn().mockReturnValue({
        selections: (0, mobx_1.observable)([]),
        select: jest.fn(),
        clearSelection: jest.fn(),
        destroy: jest.fn(),
        clear: jest.fn(),
    });
    return MediaSelectionOverlay;
});
test('Should create list-stores with correct locale and excluded-ids', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[66, 55]} locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, []);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual([66, 55]);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should create list-stores without excluded-ids', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, []);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual(undefined);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should create list-stores with types', () => {
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default locale={locale} onClose={jest.fn()} onConfirm={jest.fn()} open={true} types={['image', 'video']}/>).render();
    expect(MediaSelectionOverlay_1.default.createMediaListStore).toHaveBeenCalledWith(expect.anything(), expect.anything(), locale, ['image', 'video']);
    expect(MediaSelectionOverlay_1.default.createMediaListStore.mock.calls[0][1].get()).toEqual(undefined);
    expect(MediaSelectionOverlay_1.default.createCollectionListStore).toHaveBeenCalledWith(expect.anything(), locale);
});
test('Should update selections of media-list-store to only contain a single item', () => {
    const singleMediaSelectionOverlay = (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[22, 44]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    singleMediaSelectionOverlay.instance().mediaListStore.selections.push({ id: 3 });
    expect(singleMediaSelectionOverlay.instance().mediaListStore.selections).toEqual([{ id: 3 }]);
    singleMediaSelectionOverlay.instance().mediaListStore.selections.push({ id: 5 });
    expect(singleMediaSelectionOverlay.instance().mediaListStore.clearSelection).toBeCalledWith();
    expect(singleMediaSelectionOverlay.instance().mediaListStore.select).toBeCalledWith({ id: 5 });
});
test('Should pass correct props to media-selection-overlay', () => {
    const mediaListStoreMock = { selections: (0, mobx_1.observable)([]), clear: jest.fn() };
    MediaSelectionOverlay_1.default.createMediaListStore.mockReturnValueOnce(mediaListStoreMock);
    const collectionListStoreMock = jest.fn();
    MediaSelectionOverlay_1.default.createCollectionListStore.mockReturnValueOnce(collectionListStoreMock);
    const locale = mobx_1.observable.box('en');
    const onClose = jest.fn();
    const singleMediaSelectionOverlay = (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[22, 44]} locale={locale} onClose={onClose} onConfirm={jest.fn()} open={true}/>);
    const mediaSelectionOverlay = singleMediaSelectionOverlay.find(MediaSelectionOverlay_1.default);
    expect(mediaSelectionOverlay.prop('mediaListStore')).toEqual(mediaListStoreMock);
    expect(mediaSelectionOverlay.prop('collectionListStore')).toEqual(collectionListStoreMock);
    expect(mediaSelectionOverlay.prop('locale')).toEqual(locale);
    expect(mediaSelectionOverlay.prop('open')).toEqual(true);
    expect(mediaSelectionOverlay.prop('onClose')).toEqual(onClose);
});
test('Should clear media ListStore if the excludedIds prop is changed', () => {
    const singleMediaSelectionOverlay = (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[11, 22]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    expect(singleMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
    singleMediaSelectionOverlay.setProps({
        excludedIds: [33],
    });
    expect(singleMediaSelectionOverlay.instance().mediaListStore.clear).toBeCalled();
});
test('Should not clear media ListStore if new value of excludedIds prop is equal to old value', () => {
    const singleMediaSelectionOverlay = (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[11, 22]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    expect(singleMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
    singleMediaSelectionOverlay.setProps({
        excludedIds: [11, 22],
    });
    expect(singleMediaSelectionOverlay.instance().mediaListStore.clear).not.toBeCalled();
});
test('Should destroy list-stores on unmount', () => {
    const singleMediaSelectionOverlay = (0, enzyme_1.shallow)(<SingleMediaSelectionOverlay_1.default excludedIds={[]} locale={mobx_1.observable.box('en')} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    const mediaListStoreMock = singleMediaSelectionOverlay.instance().mediaListStore;
    const collectionListStoreMock = singleMediaSelectionOverlay.instance().collectionListStore;
    expect(mediaListStoreMock.destroy).not.toHaveBeenCalled();
    expect(collectionListStoreMock.destroy).not.toHaveBeenCalled();
    singleMediaSelectionOverlay.unmount();
    expect(mediaListStoreMock.destroy).toHaveBeenCalled();
    expect(collectionListStoreMock.destroy).toHaveBeenCalled();
});
