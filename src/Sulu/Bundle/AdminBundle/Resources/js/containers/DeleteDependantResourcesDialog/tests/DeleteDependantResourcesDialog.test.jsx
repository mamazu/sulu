"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const DeleteDependantResourcesDialog_1 = __importDefault(require("../DeleteDependantResourcesDialog"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
class RequestPromise extends Promise {
    constructor() {
        super(...arguments);
        this.abort = jest.fn();
    }
    static resolve(object) {
        const promise = Promise.resolve(object);
        promise.abort = jest.fn();
        return promise;
    }
    static reject(object) {
        const promise = Promise.reject(object);
        promise.abort = jest.fn();
        return promise;
    }
}
jest.mock('../../../services/ResourceRequester', () => ({
    delete: jest.fn(),
}));
test('The component should render', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourceBatches = [
        [
            { id: 4, resourceKey: 'media' },
        ],
        [
            { id: 3, resourceKey: 'collections' },
            { id: 2, resourceKey: 'media' },
            { id: 3, resourceKey: 'media' },
        ],
        [
            { id: 2, resourceKey: 'collections' },
            { id: 1, resourceKey: 'media' },
        ],
    ];
    const dependantResourcesCount = 6;
    const dependantResourcesData = {
        dependantResourceBatches,
        dependantResourcesCount,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    expect(view.find('Dialog > Portal').at(0).render()).toMatchSnapshot();
});
test('The component should call cancel callback', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourceBatches = [
        [
            { id: 4, resourceKey: 'media' },
        ],
        [
            { id: 3, resourceKey: 'collections' },
            { id: 2, resourceKey: 'media' },
            { id: 3, resourceKey: 'media' },
        ],
        [
            { id: 2, resourceKey: 'collections' },
            { id: 1, resourceKey: 'media' },
        ],
    ];
    const dependantResourcesCount = 6;
    const dependantResourcesData = {
        dependantResourceBatches,
        dependantResourcesCount,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    view.find('Button[skin="secondary"]').simulate('click');
    expect(onCancel).toHaveBeenCalled();
});
test('The component should delete dependant resources', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourceBatches = [
        [
            { id: 4, resourceKey: 'media' },
        ],
        [
            { id: 3, resourceKey: 'collections' },
            { id: 2, resourceKey: 'media' },
            { id: 3, resourceKey: 'media' },
        ],
        [
            { id: 2, resourceKey: 'collections' },
            { id: 1, resourceKey: 'media' },
        ],
    ];
    const dependantResourcesCount = 6;
    const dependantResourcesData = {
        dependantResourceBatches,
        dependantResourcesCount,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    const promise1 = RequestPromise.resolve({});
    const promise2 = RequestPromise.resolve({});
    const promise3 = RequestPromise.resolve({});
    const promise4 = RequestPromise.resolve({});
    const promise5 = RequestPromise.resolve({});
    const promise6 = RequestPromise.resolve({});
    ResourceRequester_1.default.delete
        .mockReturnValueOnce(promise1)
        .mockReturnValueOnce(promise2)
        .mockReturnValueOnce(promise3)
        .mockReturnValueOnce(promise4)
        .mockReturnValueOnce(promise5)
        .mockReturnValueOnce(promise6);
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    view.find('Button[skin="primary"]').simulate('click');
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(true);
    expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(1);
    expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(1, 'media', Object.assign(Object.assign({}, requestOptions), { id: 4 }));
    expect(view.instance().totalDeletedResources).toBe(0);
    expect(view.instance().promises).toHaveLength(1);
    return Promise.all(view.instance().promises).then(() => {
        expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(4);
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(2, 'collections', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(3, 'media', Object.assign(Object.assign({}, requestOptions), { id: 2 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(4, 'media', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(view.instance().totalDeletedResources).toBe(1);
        expect(view.instance().promises).toHaveLength(3);
        return Promise.all(view.instance().promises).then(() => {
            expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(6);
            expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(5, 'collections', Object.assign(Object.assign({}, requestOptions), { id: 2 }));
            expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(6, 'media', Object.assign(Object.assign({}, requestOptions), { id: 1 }));
            expect(view.instance().totalDeletedResources).toBe(4);
            expect(view.instance().promises).toHaveLength(2);
            return Promise.all(view.instance().promises).then(() => {
                expect(view.instance().totalDeletedResources).toBe(6);
                return new Promise((resolve) => setTimeout(resolve)).then(() => {
                    view.update();
                    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
                    expect(onFinish).toHaveBeenCalled();
                    expect(onError).not.toHaveBeenCalled();
                    expect(onCancel).not.toHaveBeenCalled();
                    const cancelButton = view.find('Button[skin="secondary"]');
                    expect(cancelButton.text()).toBe('sulu_admin.close');
                    cancelButton.simulate('click');
                    expect(onCancel).toHaveBeenCalled();
                });
            });
        });
    });
});
test('The component should reset itself when dependantResourcesData prop has changed', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourcesData = {
        dependantResourceBatches: [
            [
                { id: 1, resourceKey: 'media' },
            ],
        ],
        dependantResourcesCount: 1,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    ResourceRequester_1.default.delete
        .mockReturnValueOnce(RequestPromise.resolve({}));
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    view.find('Button[skin="primary"]').simulate('click');
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(true);
    const newDependantResourcesData = {
        dependantResourceBatches: [],
        dependantResourcesCount: 0,
    };
    const promise = new Promise((resolve) => {
        view.setProps(Object.assign(Object.assign({}, view.props()), { dependantResourcesData: newDependantResourcesData }), () => {
            resolve(true);
        });
    });
    return promise.then(() => {
        view.update();
        expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    });
});
test('The component should reset itself when requestOptions prop has changed', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourcesData = {
        dependantResourceBatches: [
            [
                { id: 1, resourceKey: 'media' },
            ],
        ],
        dependantResourcesCount: 1,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    ResourceRequester_1.default.delete
        .mockReturnValueOnce(RequestPromise.resolve({}));
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    view.find('Button[skin="primary"]').simulate('click');
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(true);
    const newRequestOptions = {
        locale: 'en',
    };
    const promise = new Promise((resolve) => {
        view.setProps(Object.assign(Object.assign({}, view.props()), { requestOptions: newRequestOptions }), () => {
            resolve(true);
        });
    });
    return promise.then(() => {
        view.update();
        expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    });
});
test('The component should call error callback', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourceBatches = [
        [
            { id: 4, resourceKey: 'media' },
        ],
        [
            { id: 3, resourceKey: 'collections' },
            { id: 2, resourceKey: 'media' },
            { id: 3, resourceKey: 'media' },
        ],
        [
            { id: 2, resourceKey: 'collections' },
            { id: 1, resourceKey: 'media' },
        ],
    ];
    const dependantResourcesCount = 6;
    const dependantResourcesData = {
        dependantResourceBatches,
        dependantResourcesCount,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    const promise1 = RequestPromise.resolve({});
    const promise2 = RequestPromise.resolve({});
    const promise3 = RequestPromise.reject({
        json: () => Promise.resolve({ message: 'Something really bad happened' }),
    });
    const promise4 = RequestPromise.resolve({});
    ResourceRequester_1.default.delete
        .mockReturnValueOnce(promise1)
        .mockReturnValueOnce(promise2)
        .mockReturnValueOnce(promise3)
        .mockReturnValueOnce(promise4);
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    view.find('Button[skin="primary"]').simulate('click');
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(true);
    expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(1);
    expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(1, 'media', Object.assign(Object.assign({}, requestOptions), { id: 4 }));
    expect(view.instance().totalDeletedResources).toBe(0);
    expect(view.instance().promises).toHaveLength(1);
    return Promise.all(view.instance().promises).then(() => {
        expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(4);
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(2, 'collections', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(3, 'media', Object.assign(Object.assign({}, requestOptions), { id: 2 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(4, 'media', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(view.instance().totalDeletedResources).toBe(1);
        expect(view.instance().promises).toHaveLength(3);
        return Promise.all(view.instance().promises).catch(() => {
            expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(4);
            expect(view.instance().totalDeletedResources).toBe(3);
            return new Promise((resolve) => setTimeout(resolve)).then(() => {
                view.update();
                expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
                expect(onError).toHaveBeenCalled();
                expect(onFinish).not.toHaveBeenCalled();
                expect(onCancel).not.toHaveBeenCalled();
                const cancelButton = view.find('Button[skin="secondary"]');
                expect(cancelButton.text()).toBe('sulu_admin.close');
                cancelButton.simulate('click');
                expect(onCancel).toHaveBeenCalled();
            });
        });
    });
});
test('The component should abort requests on cancel', () => {
    const onCancel = jest.fn();
    const onError = jest.fn();
    const onFinish = jest.fn();
    const dependantResourceBatches = [
        [
            { id: 4, resourceKey: 'media' },
        ],
        [
            { id: 3, resourceKey: 'collections' },
            { id: 2, resourceKey: 'media' },
            { id: 3, resourceKey: 'media' },
        ],
        [
            { id: 2, resourceKey: 'collections' },
            { id: 1, resourceKey: 'media' },
        ],
    ];
    const dependantResourcesCount = 6;
    const dependantResourcesData = {
        dependantResourceBatches,
        dependantResourcesCount,
        detail: 'Detail',
        title: 'Title',
    };
    const requestOptions = {
        foo: 'bar',
        locale: 'de',
    };
    const view = (0, enzyme_1.mount)(<DeleteDependantResourcesDialog_1.default dependantResourcesData={dependantResourcesData} onCancel={onCancel} onError={onError} onFinish={onFinish} requestOptions={requestOptions}/>);
    const promise1 = RequestPromise.resolve({});
    const promise2 = new RequestPromise((resolve) => setTimeout(resolve));
    const promise3 = RequestPromise.resolve({});
    const promise4 = RequestPromise.resolve({});
    const promise5 = RequestPromise.resolve({});
    const promise6 = RequestPromise.resolve({});
    promise1.abort = jest.fn();
    promise2.abort = jest.fn();
    promise3.abort = jest.fn();
    promise4.abort = jest.fn();
    promise5.abort = jest.fn();
    promise6.abort = jest.fn();
    ResourceRequester_1.default.delete
        .mockReturnValueOnce(promise1)
        .mockReturnValueOnce(promise2)
        .mockReturnValueOnce(promise3)
        .mockReturnValueOnce(promise4)
        .mockReturnValueOnce(promise5)
        .mockReturnValueOnce(promise6);
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(false);
    view.find('Button[skin="primary"]').simulate('click');
    expect(view.find('Button[skin="primary"]').prop('loading')).toBe(true);
    expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(1);
    expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(1, 'media', Object.assign(Object.assign({}, requestOptions), { id: 4 }));
    expect(view.instance().totalDeletedResources).toBe(0);
    expect(view.instance().promises).toHaveLength(1);
    return Promise.all(view.instance().promises).then(() => {
        expect(ResourceRequester_1.default.delete).toHaveBeenCalledTimes(4);
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(2, 'collections', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(3, 'media', Object.assign(Object.assign({}, requestOptions), { id: 2 }));
        expect(ResourceRequester_1.default.delete).toHaveBeenNthCalledWith(4, 'media', Object.assign(Object.assign({}, requestOptions), { id: 3 }));
        expect(view.instance().totalDeletedResources).toBe(1);
        expect(view.instance().promises).toHaveLength(3);
        const cancelButton = view.find('Button[skin="secondary"]');
        expect(cancelButton.text()).toBe('sulu_admin.cancel');
        cancelButton.simulate('click');
        expect(promise1.abort).not.toHaveBeenCalled();
        expect(promise2.abort).toHaveBeenCalled();
        expect(promise3.abort).toHaveBeenCalled();
        expect(promise4.abort).toHaveBeenCalled();
        expect(promise5.abort).not.toHaveBeenCalled();
        expect(promise6.abort).not.toHaveBeenCalled();
        expect(onCancel).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onFinish).not.toHaveBeenCalled();
    });
});
