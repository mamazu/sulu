"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const MultiSelectionStore_1 = __importDefault(require("sulu-admin-bundle/stores/MultiSelectionStore"));
const MultiMediaSelection_1 = __importDefault(require("../MultiMediaSelection"));
const MultiMediaSelectionOverlay_1 = __importDefault(require("../../MultiMediaSelectionOverlay"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../MultiMediaSelectionOverlay', () => jest.fn(function () {
    return <div>single media selection overlay</div>;
}));
jest.mock('sulu-admin-bundle/stores/MultiSelectionStore', () => jest.fn(function () {
    this.items = [];
    this.loadItems = jest.fn();
}));
test('Render a MultiMediaSelection field', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1,
                title: 'Media 1',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
            {
                id: 2,
                title: 'Media 2',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
            {
                id: 3,
                title: 'Media 3',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
        ];
    });
    expect((0, enzyme_1.render)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>)).toMatchSnapshot();
});
test('Render a MultiMediaSelection field with display options', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1,
                title: 'Media 1',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
        ];
    });
    expect((0, enzyme_1.render)(<MultiMediaSelection_1.default displayOptions={['top', 'left', 'right', 'bottom']} locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>)).toMatchSnapshot();
});
test('Render a MultiMediaSelection field with display options and selected icon', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1,
                title: 'Media 1',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
        ];
    });
    expect((0, enzyme_1.render)(<MultiMediaSelection_1.default displayOptions={['top', 'left', 'right', 'bottom']} locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={{ displayOption: 'left', ids: [] }}/>)).toMatchSnapshot();
});
test('Render a MultiMediaSelection field without thumbnails with MimeTypeIndicator', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1,
                title: 'Media 1',
                mimeType: 'application/json',
            },
            {
                id: 2,
                title: 'Media 2',
                mimeType: 'application/pdf',
            },
            {
                id: 3,
                title: 'Media 3',
                mimeType: 'application/vnd.ms-excel',
            },
        ];
    });
    expect((0, enzyme_1.render)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>)).toMatchSnapshot();
});
test('The MultiMediaSelection should have 3 child-items', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [
            {
                id: 1,
                title: 'Media 1',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
            {
                id: 2,
                title: 'Media 2',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
            {
                id: 3,
                title: 'Media 3',
                thumbnails: {
                    'sulu-25x25': 'http://lorempixel.com/25/25',
                },
            },
        ];
    });
    const mediaSelection = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>);
    expect(mediaSelection.find('Item').length).toBe(3);
});
test('Clicking on the "add media" button should open up an overlay', () => {
    const mediaSelection = (0, enzyme_1.mount)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>);
    expect(mediaSelection.find(MultiMediaSelectionOverlay_1.default).prop('open')).toEqual(false);
    mediaSelection.find('.button.left').simulate('click');
    expect(mediaSelection.find(MultiMediaSelectionOverlay_1.default).prop('open')).toEqual(true);
});
test('Should remove media from the selection store', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [];
        this.removeById = jest.fn();
    });
    const mediaSelectionInstance = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>).instance();
    mediaSelectionInstance.handleRemove(1);
    expect(mediaSelectionInstance.mediaSelectionStore.removeById).toBeCalledWith(1);
});
test('Should move media inside the selection store', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [];
        this.move = jest.fn();
    });
    const mediaSelectionInstance = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>).instance();
    mediaSelectionInstance.handleSorted(1, 3);
    expect(mediaSelectionInstance.mediaSelectionStore.move).toBeCalledWith(1, 3);
});
test('Should add the selected medias to the selection store on confirm', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function () {
        this.items = [];
        this.set = jest.fn();
    });
    const thumbnails = {
        'sulu-240x': 'http://lorempixel.com/240/100',
        'sulu-25x25': 'http://lorempixel.com/25/25',
    };
    const medias = [
        {
            id: 1,
            title: 'Title 1',
            mimeType: 'image/png',
            size: 12345,
            url: 'http://lorempixel.com/500/500',
            thumbnails,
        },
        {
            id: 2,
            title: 'Title 2',
            mimeType: 'image/jpeg',
            size: 54321,
            url: 'http://lorempixel.com/500/500',
            thumbnails,
        },
    ];
    const mediaSelectionInstance = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>).instance();
    mediaSelectionInstance.openMediaOverlay();
    mediaSelectionInstance.handleOverlayConfirm(medias);
    expect(mediaSelectionInstance.mediaSelectionStore.set).toBeCalledWith(medias);
    expect(mediaSelectionInstance.overlayOpen).toBe(false);
});
test('Should call the onChange handler if selection store changes', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function (resourceKey, selectedIds) {
        (0, mobx_1.extendObservable)(this, {
            items: selectedIds.map((id) => {
                return { id, thumbnails: {} };
            }),
        });
    });
    const changeSpy = jest.fn();
    const mediaSelectionInstance = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, ids: [55] }}/>).instance();
    mediaSelectionInstance.mediaSelectionStore.items.push({ id: 99, thumbnails: {} });
    expect(changeSpy).toBeCalledWith({ ids: [55, 99] });
    mediaSelectionInstance.mediaSelectionStore.items.splice(0, 1);
    expect(changeSpy).toBeCalledWith({ ids: [99] });
});
test('Should call the onChange handler if the displayOption changes', () => {
    const changeSpy = jest.fn();
    const mediaSelection = (0, enzyme_1.mount)(<MultiMediaSelection_1.default displayOptions={['left']} locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, ids: [55] }}/>);
    mediaSelection.find('Button[icon="su-display-default"]').simulate('click');
    mediaSelection.find('Action[value="left"]').simulate('click');
    expect(changeSpy).toBeCalledWith({ displayOption: 'left', ids: [55] });
});
test('Should not call the onChange callback if the component props change', () => {
    const changeSpy = jest.fn();
    const mediaSelection = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, ids: [55] }}/>);
    mediaSelection.setProps({ disabled: true });
    expect(changeSpy).not.toBeCalled();
});
test('Should not call onChange callback if an unrelated observable that is accessed in the callback changes', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function (resourceKey, selectedIds) {
        (0, mobx_1.extendObservable)(this, {
            items: selectedIds.map((id) => {
                return { id, thumbnails: {} };
            }),
        });
    });
    const unrelatedObservable = mobx_1.observable.box(22);
    const changeSpy = jest.fn(() => {
        jest.fn()(unrelatedObservable.get());
    });
    const mediaSelectionInstance = (0, enzyme_1.shallow)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, ids: [55] }}/>).instance();
    // change callback should be called when item of the store mock changes
    mediaSelectionInstance.mediaSelectionStore.items.push({ id: 99, thumbnails: {} });
    expect(changeSpy).toBeCalledWith({ ids: [55, 99] });
    expect(changeSpy).toHaveBeenCalledTimes(1);
    // change callback should not be called when the unrelated observable changes
    unrelatedObservable.set(55);
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
test('Should call the onItemClick handler if an item is clicked', () => {
    MultiSelectionStore_1.default.mockImplementationOnce(function (resourceKey, selectedIds) {
        (0, mobx_1.extendObservable)(this, {
            items: selectedIds.map((id) => {
                return { id, mimeType: 'image/jpeg', thumbnails: {} };
            }),
        });
    });
    const itemClickSpy = jest.fn();
    const mediaSelection = (0, enzyme_1.mount)(<MultiMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} onItemClick={itemClickSpy} value={{ displayOption: undefined, ids: [55, 99] }}/>);
    mediaSelection.find('MultiItemSelection .content').at(0).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith(55, { id: 55, mimeType: 'image/jpeg', thumbnails: {} });
    mediaSelection.find('MultiItemSelection .content').at(1).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith(99, { id: 99, mimeType: 'image/jpeg', thumbnails: {} });
});
test('Pass correct props to MultiItemSelection component', () => {
    const mediaSelection = (0, enzyme_1.mount)(<MultiMediaSelection_1.default disabled={true} locale={mobx_1.observable.box('en')} onChange={jest.fn()} sortable={false}/>);
    expect(mediaSelection.find('MultiItemSelection').prop('disabled')).toEqual(true);
    expect(mediaSelection.find('MultiItemSelection').prop('sortable')).toEqual(false);
});
