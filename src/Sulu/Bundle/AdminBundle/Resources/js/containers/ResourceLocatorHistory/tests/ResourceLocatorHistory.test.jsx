"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const ResourceLocatorHistory_1 = __importDefault(require("../ResourceLocatorHistory"));
const ResourceListStore_1 = __importDefault(require("../../../stores/ResourceListStore"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../stores/ResourceListStore', () => jest.fn(function () {
    this.deleteList = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        data: [],
        loading: true,
    });
}));
test('Pass props correctly to ResourceListStore', () => {
    const resourceLocatorHistory = (0, enzyme_1.shallow)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(ResourceListStore_1.default).not.toBeCalled();
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    expect(ResourceListStore_1.default).toBeCalledWith('history_routes', { id: 5, webspace: 'sulu' });
});
test('Pass correct props to Button', () => {
    const resourceLocatorHistory = (0, enzyme_1.shallow)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(resourceLocatorHistory.find('Button[icon="su-process"]').props()).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-process',
        skin: 'link',
    }));
});
test('Disable button if id is not set', () => {
    const resourceLocatorHistory = (0, enzyme_1.shallow)(<ResourceLocatorHistory_1.default id={undefined} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(resourceLocatorHistory.find('Button[icon="su-process"]').props()).toEqual(expect.objectContaining({
        disabled: true,
    }));
});
test('Show history routes in overlay', () => {
    const resourceLocatorHistory = (0, enzyme_1.mount)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(resourceLocatorHistory.find('Overlay Loader')).toHaveLength(0);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    expect(resourceLocatorHistory.find('Overlay Loader')).toHaveLength(1);
    const resourceListStore = ResourceListStore_1.default.mock.instances[0];
    resourceListStore.loading = false;
    resourceListStore.data = [
        {
            id: 3,
            resourcelocator: 'sulu.io/test',
            created: '2019-04-10T13:06:16',
        },
        {
            id: 6,
            resourcelocator: 'sulu.io/testing',
            created: '2019-04-10T16:01:12',
        },
    ];
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Overlay').render()).toMatchSnapshot();
});
test('Reload history routes each time overlay is opened', () => {
    const resourceLocatorHistory = (0, enzyme_1.mount)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(ResourceListStore_1.default).toBeCalledTimes(0);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    expect(ResourceListStore_1.default).toBeCalledTimes(1);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    expect(ResourceListStore_1.default).toBeCalledTimes(2);
});
test('Close overlay if button is clicked', () => {
    const resourceLocatorHistory = (0, enzyme_1.mount)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    expect(resourceLocatorHistory.find('Overlay').prop('open')).toEqual(false);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    expect(resourceLocatorHistory.find('Overlay').prop('open')).toEqual(true);
    resourceLocatorHistory.find('Overlay').prop('onConfirm')();
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Overlay').prop('open')).toEqual(false);
});
test('Do not delete if confirmation dialog is cancelled', () => {
    const resourceLocatorHistory = (0, enzyme_1.mount)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    const resourceListStore = ResourceListStore_1.default.mock.instances[0];
    resourceListStore.loading = false;
    resourceListStore.data = [
        {
            id: 3,
            resourcelocator: 'sulu.io/test',
            created: '2019-04-10T13:06:16',
        },
    ];
    resourceLocatorHistory.update();
    resourceLocatorHistory.find('ButtonCell[icon="su-trash-alt"] button').prop('onClick')();
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Dialog').prop('open')).toEqual(true);
    resourceLocatorHistory.find('Dialog Button[skin="secondary"]').prop('onClick')();
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Dialog').prop('open')).toEqual(false);
    expect(resourceListStore.deleteList).not.toBeCalled();
});
test('Delete if confirmation dialog is confirmed', () => {
    const resourceLocatorHistory = (0, enzyme_1.mount)(<ResourceLocatorHistory_1.default id={5} options={{ webspace: 'sulu' }} resourceKey="history_routes"/>);
    resourceLocatorHistory.find('Button[icon="su-process"]').simulate('click');
    const resourceListStore = ResourceListStore_1.default.mock.instances[0];
    resourceListStore.loading = false;
    resourceListStore.data = [
        {
            id: 3,
            resourcelocator: 'sulu.io/test',
            created: '2019-04-10T13:06:16',
        },
    ];
    const deleteListPromise = Promise.resolve();
    resourceListStore.deleteList.mockReturnValue(deleteListPromise);
    resourceLocatorHistory.update();
    resourceLocatorHistory.find('ButtonCell[icon="su-trash-alt"] button').prop('onClick')();
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Dialog').prop('open')).toEqual(true);
    resourceLocatorHistory.find('Dialog Button[skin="primary"]').prop('onClick')();
    resourceLocatorHistory.update();
    expect(resourceLocatorHistory.find('Dialog').prop('open')).toEqual(true);
    expect(resourceListStore.deleteList).toBeCalledWith([3]);
    return deleteListPromise.then(() => {
        resourceLocatorHistory.update();
        expect(resourceLocatorHistory.find('Dialog').prop('open')).toEqual(false);
    });
});
