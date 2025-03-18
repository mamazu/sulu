"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const SingleItemSelection_1 = __importDefault(require("sulu-admin-bundle/components/SingleItemSelection"));
const SingleSelectionStore_1 = __importDefault(require("sulu-admin-bundle/stores/SingleSelectionStore"));
const SingleMediaSelection_1 = __importDefault(require("../SingleMediaSelection"));
const SingleMediaSelectionOverlay_1 = __importDefault(require("../../SingleMediaSelectionOverlay"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../SingleMediaSelectionOverlay', () => jest.fn(function () {
    return <div>single media selection overlay</div>;
}));
jest.mock('sulu-admin-bundle/stores/SingleSelectionStore', () => jest.fn());
test('Component should render without selected media', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(SingleSelectionStore_1.default).toBeCalledWith('media', undefined, expect.anything());
    expect(singleMediaSelection.render()).toMatchSnapshot();
});
test('Component should render with display options', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default displayOptions={['top', 'bottom']} locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(singleMediaSelection.render()).toMatchSnapshot();
});
test('Component should render with display options and correctly selected icon', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default displayOptions={['top', 'bottom']} locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={{ displayOption: 'left', id: undefined }}/>);
    expect(singleMediaSelection.render()).toMatchSnapshot();
});
test('Component should render with selected media', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.item = {
            id: 33,
            title: 'test media',
            mimeType: 'image/jpeg',
            thumbnails: {
                'sulu-25x25': 'http://lorempixel.com/25/25',
            },
        };
    });
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={{ displayOption: undefined, id: 33 }}/>);
    expect(SingleSelectionStore_1.default).toBeCalledWith('media', 33, expect.anything());
    expect(singleMediaSelection.render()).toMatchSnapshot();
});
test('Component should render with selected media without thumbnails with MimeTypeIndicator', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.item = {
            id: 33,
            title: 'test media',
            mimeType: 'application/pdf',
        };
    });
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={{ displayOption: undefined, id: 33 }}/>);
    expect(SingleSelectionStore_1.default).toBeCalledWith('media', 33, expect.anything());
    expect(singleMediaSelection.render()).toMatchSnapshot();
});
test('Component should pass className to SingleItemSelection', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default className="test" locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(singleMediaSelection.find(SingleItemSelection_1.default).prop('className')).toEqual('test');
});
test('Component should pass types to SingleMediaSelectionOverlay', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} types={['image', 'video']} value={undefined}/>);
    expect(singleMediaSelection.find(SingleMediaSelectionOverlay_1.default).prop('types')).toEqual(['image', 'video']);
});
test('Click on media-button should open an overlay', () => {
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(singleMediaSelection.find(SingleMediaSelectionOverlay_1.default).prop('open')).toEqual(false);
    singleMediaSelection.find('.button').simulate('click');
    expect(singleMediaSelection.find(SingleMediaSelectionOverlay_1.default).prop('open')).toEqual(true);
});
test('Click on remove-button should clear the selection store', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.item = {
            id: 33,
            title: 'test media',
            mimeType: 'image/jpeg',
            thumbnails: {
                'sulu-25x25': 'http://lorempixel.com/25/25',
            },
        };
        this.clear = jest.fn();
    });
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={{ displayOption: undefined, id: 33 }}/>);
    singleMediaSelection.find('.removeButton').simulate('click');
    expect(singleMediaSelection.instance().singleMediaSelectionStore.clear).toBeCalled();
});
test('Media that is selected in the overlay should be set to the selection store on confirm', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.set = jest.fn();
    });
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    singleMediaSelection.instance().handleOverlayConfirm({
        id: 22,
        title: 'test media',
        mimeType: 'image/jpeg',
        thumbnails: {
            'sulu-25x25': '/images/25x25/awesome.png',
        },
    });
    expect(singleMediaSelection.instance().singleMediaSelectionStore.set).toBeCalledWith(expect.objectContaining({
        id: 22,
        title: 'test media',
        mimeType: 'image/jpeg',
        thumbnails: {
            'sulu-25x25': '/images/25x25/awesome.png',
        },
    }));
});
test('Should call the onChange handler if the displayOption changes', () => {
    const changeSpy = jest.fn();
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default displayOptions={['left']} locale={mobx_1.observable.box('en')} onChange={changeSpy} value={undefined}/>);
    singleMediaSelection.find('Button[icon="su-display-default"]').simulate('click');
    singleMediaSelection.find('Action[value="left"]').simulate('click');
    expect(changeSpy).toBeCalledWith({ displayOption: 'left', id: undefined });
});
test('Should call given onChange handler if value of selection store changes', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.loadItem = jest.fn();
        (0, mobx_1.extendObservable)(this, {
            item: undefined,
        });
    });
    const changeSpy = jest.fn();
    const singleMediaSelectionInstance = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={undefined}/>).instance();
    expect(changeSpy).not.toBeCalled();
    singleMediaSelectionInstance.singleMediaSelectionStore.item = {
        id: 77,
        title: 'test media',
        mimeType: 'image/jpeg',
        thumbnails: {},
    };
    expect(changeSpy).toBeCalledWith({ id: 77 }, singleMediaSelectionInstance.singleMediaSelectionStore.item);
});
test('Should not call onChange callback if an unrelated observable that is accessed in the callback changes', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.loadItem = jest.fn();
        (0, mobx_1.extendObservable)(this, {
            item: undefined,
        });
    });
    const unrelatedObservable = mobx_1.observable.box(22);
    const changeSpy = jest.fn(() => {
        jest.fn()(unrelatedObservable.get());
    });
    const singleMediaSelectionInstance = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={undefined}/>).instance();
    // change callback should be called when item of the store mock changes
    singleMediaSelectionInstance.singleMediaSelectionStore.item = { id: 77, thumbnails: {} };
    expect(changeSpy).toBeCalledWith({ id: 77 }, singleMediaSelectionInstance.singleMediaSelectionStore.item);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    // change callback should not be called when the unrelated observable changes
    unrelatedObservable.set(55);
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
test('Should not call the onChange callback if the component props change', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.loadItem = jest.fn();
    });
    const changeSpy = jest.fn();
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, id: 5 }}/>);
    singleMediaSelection.setProps({ disabled: true });
    expect(changeSpy).not.toBeCalled();
});
test('Should not call the onItemClick callback if no item is available', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.item = undefined;
    });
    const itemClickSpy = jest.fn();
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} onItemClick={itemClickSpy} value={{ displayOption: undefined, id: 5 }}/>);
    singleMediaSelection.find('SingleItemSelection .item').simulate('click');
    expect(itemClickSpy).not.toBeCalled();
});
test('Should call the onItemClick callback if the item is clicked', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.item = { id: 6, mimeType: 'image/jpeg' };
    });
    const itemClickSpy = jest.fn();
    const singleMediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} onItemClick={itemClickSpy} value={{ displayOption: undefined, id: 5 }}/>);
    singleMediaSelection.find('SingleItemSelection .item').simulate('click');
    expect(itemClickSpy).toBeCalledWith(6, { id: 6, mimeType: 'image/jpeg' });
});
test('Should not call the loadItem callback if the component props id change to same value', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        this.loadItem = jest.fn();
    });
    const changeSpy = jest.fn();
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={{ displayOption: undefined, id: 5 }}/>);
    singleMediaSelection.setProps({ value: { id: 5 } });
    expect(singleMediaSelection.instance().singleMediaSelectionStore.loadItem).not.toBeCalled();
});
test('Correct props should be passed to SingleItemSelection component', () => {
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default disabled={true} locale={mobx_1.observable.box('en')} onChange={jest.fn()} valid={false} value={undefined}/>);
    expect(singleMediaSelection.find(SingleItemSelection_1.default).prop('disabled')).toEqual(true);
    expect(singleMediaSelection.find(SingleItemSelection_1.default).prop('valid')).toEqual(false);
});
test('Set loading prop of SingleItemSelection component if SingleSelectionStore is loading', () => {
    SingleSelectionStore_1.default.mockImplementationOnce(function () {
        (0, mobx_1.extendObservable)(this, {
            loading: false,
        });
    });
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_1.default disabled={true} locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(singleMediaSelection.find(SingleItemSelection_1.default).prop('loading')).toEqual(false);
    singleMediaSelection.instance().singleMediaSelectionStore.loading = true;
    expect(singleMediaSelection.find(SingleItemSelection_1.default).prop('loading')).toEqual(true);
});
