"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const DeleteReferencedResourceDialog_1 = __importDefault(require("../DeleteReferencedResourceDialog"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const referencingResourcesData = {
        referencingResources: [
            { id: 2, resourceKey: 'pages', title: 'Foo' },
            { id: 3, resourceKey: 'pages', title: 'Bar' },
        ],
        referencingResourcesCount: 2,
        resource: {
            id: 1,
            resourceKey: 'pages',
        },
    };
    const view = (0, enzyme_1.mount)(<DeleteReferencedResourceDialog_1.default allowDeletion={true} confirmLoading={false} onCancel={onCancel} onConfirm={onConfirm} referencingResourcesData={referencingResourcesData}/>);
    expect(view.find('Dialog > Portal').at(0).render()).toMatchSnapshot();
});
test('The component should render with loading state and deletion not allowed', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const referencingResourcesData = {
        referencingResources: [
            { id: 2, resourceKey: 'pages', title: 'Foo' },
            { id: 3, resourceKey: 'pages', title: 'Bar' },
        ],
        referencingResourcesCount: 2,
        resource: {
            id: 1,
            resourceKey: 'pages',
        },
    };
    const view = (0, enzyme_1.mount)(<DeleteReferencedResourceDialog_1.default allowDeletion={false} confirmLoading={true} onCancel={onCancel} onConfirm={onConfirm} referencingResourcesData={referencingResourcesData}/>);
    expect(view.find('Dialog > Portal').at(0).render()).toMatchSnapshot();
});
test('The component should call the confirm callback when the confirm button is clicked', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const referencingResourcesData = {
        referencingResources: [
            { id: 2, resourceKey: 'pages', title: 'Foo' },
            { id: 3, resourceKey: 'pages', title: 'Bar' },
        ],
        referencingResourcesCount: 2,
        resource: {
            id: 1,
            resourceKey: 'pages',
        },
    };
    const view = (0, enzyme_1.mount)(<DeleteReferencedResourceDialog_1.default allowDeletion={true} confirmLoading={false} onCancel={onCancel} onConfirm={onConfirm} referencingResourcesData={referencingResourcesData}/>);
    expect(onConfirm).not.toBeCalled();
    view.find('Button[skin="primary"]').simulate('click');
    expect(onConfirm).toBeCalled();
});
test('The component should call the cancel callback when the cancel button is clicked', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const referencingResourcesData = {
        referencingResources: [
            { id: 2, resourceKey: 'pages', title: 'Foo' },
            { id: 3, resourceKey: 'pages', title: 'Bar' },
        ],
        referencingResourcesCount: 2,
        resource: {
            id: 1,
            resourceKey: 'pages',
        },
    };
    const view = (0, enzyme_1.mount)(<DeleteReferencedResourceDialog_1.default allowDeletion={true} confirmLoading={false} onCancel={onCancel} onConfirm={onConfirm} referencingResourcesData={referencingResourcesData}/>);
    expect(onCancel).not.toBeCalled();
    view.find('Button[skin="secondary"]').simulate('click');
    expect(onCancel).toBeCalled();
});
test('The component should call the cancel callback when the confirm button is clicked while deletion is not allowed', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const referencingResourcesData = {
        referencingResources: [
            { id: 2, resourceKey: 'pages', title: 'Foo' },
            { id: 3, resourceKey: 'pages', title: 'Bar' },
        ],
        referencingResourcesCount: 2,
        resource: {
            id: 1,
            resourceKey: 'pages',
        },
    };
    const view = (0, enzyme_1.mount)(<DeleteReferencedResourceDialog_1.default allowDeletion={false} confirmLoading={false} onCancel={onCancel} onConfirm={onConfirm} referencingResourcesData={referencingResourcesData}/>);
    expect(onCancel).not.toBeCalled();
    view.find('Button[skin="primary"]').simulate('click');
    expect(onCancel).toBeCalled();
});
