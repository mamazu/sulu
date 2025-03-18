"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-media-bundle/containers");
const containers_2 = require("sulu-admin-bundle/containers");
const Item_1 = __importDefault(require("../Item"));
jest.mock('sulu-media-bundle/containers/SingleMediaSelectionOverlay', () => jest.fn(() => null));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/TextEditor', () => jest.fn(({ value, }) => (<textarea value={value}/>)));
jest.mock('../registries/teaserProviderRegistry', () => ({
    keys: ['pages', 'articles'],
    get: jest.fn((key) => {
        switch (key) {
            case 'page':
                return { title: 'Page' };
        }
    }),
}));
test('Render Item with data but without image', () => {
    Item_1.default.mediaUrl = '/admin/media/:id';
    const item = (0, enzyme_1.mount)(<Item_1.default description="<p>Description</p>" edited={false} editing={false} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title="Title" type="page"/>);
    expect(item.render()).toMatchSnapshot();
});
test('Render Item with data and image', () => {
    Item_1.default.mediaUrl = '/admin/image/:id';
    const item = (0, enzyme_1.mount)(<Item_1.default description="<p>Description</p>" edited={true} editing={false} id={5} locale={mobx_1.observable.box('en')} mediaId={2} onApply={jest.fn()} onCancel={jest.fn()} title="Title" type="page"/>);
    expect(item.render()).toMatchSnapshot();
});
test('Render Item without data', () => {
    const item = (0, enzyme_1.mount)(<Item_1.default description={undefined} edited={false} editing={false} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title={undefined} type="page"/>);
    expect(item.render()).toMatchSnapshot();
});
test('Render Item with data as form', () => {
    const item = (0, enzyme_1.mount)(<Item_1.default description="Description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title="Title" type="page"/>);
    expect(item.render()).toMatchSnapshot();
});
test('Pass correct props to text editor', () => {
    const item = (0, enzyme_1.mount)(<Item_1.default description="Description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title="Title" type="page"/>);
    expect(item.find(containers_2.TextEditor).prop('adapter')).toEqual('ckeditor5');
    expect(item.find(containers_2.TextEditor).prop('locale').get()).toEqual('en');
});
test('Cancelling the item while editing should call the onClose callback', () => {
    const cancelSpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default description="Description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={cancelSpy} title="Title" type="page"/>);
    expect(cancelSpy).not.toBeCalled();
    item.find('Button[children="sulu_admin.cancel"]').simulate('click');
    expect(cancelSpy).toBeCalledWith('page', 5);
});
test('Reset the current field when the edit form is closed', () => {
    const item = (0, enzyme_1.shallow)(<Item_1.default description="Edited description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title="Edited title" type="page"/>);
    item.find(containers_2.TextEditor).prop('onChange')('Edited description');
    item.find('Input').prop('onChange')('Edited title');
    item.setProps({ description: 'Description', editing: false, title: 'Title' });
    item.setProps({ editing: true });
    expect(item.find(containers_2.TextEditor).prop('value')).toEqual('Description');
    expect(item.find('Input').prop('value')).toEqual('Title');
});
test('Reset the current field when the title or description props change', () => {
    const item = (0, enzyme_1.shallow)(<Item_1.default description="Edited description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={undefined} onApply={jest.fn()} onCancel={jest.fn()} title="Edited title" type="page"/>);
    item.find(containers_2.TextEditor).prop('onChange')('Edited description');
    item.find('Input').prop('onChange')('Edited title');
    item.setProps({ description: 'Description', title: 'Title' });
    expect(item.find(containers_2.TextEditor).prop('value')).toEqual('Description');
    expect(item.find('Input').prop('value')).toEqual('Title');
});
test('Applying the item while editing should call the onApply callback with the current data', () => {
    const applySpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default description="Description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={5} onApply={applySpy} onCancel={jest.fn()} title="Title" type="page"/>);
    item.find(containers_2.TextEditor).prop('onChange')('Edited description');
    item.find('Input').prop('onChange')('Edited title');
    expect(item.find(containers_1.SingleMediaSelectionOverlay).prop('open')).toEqual(false);
    item.find('button[className="mediaButton"]').simulate('click');
    expect(item.find(containers_1.SingleMediaSelectionOverlay).prop('open')).toEqual(true);
    item.find(containers_1.SingleMediaSelectionOverlay).prop('onConfirm')({ id: 8 });
    expect(item.find(containers_1.SingleMediaSelectionOverlay).prop('open')).toEqual(false);
    expect(applySpy).not.toBeCalled();
    item.find('Button[children="sulu_admin.apply"]').simulate('click');
    expect(applySpy).toBeCalledWith({
        description: 'Edited description',
        id: 5,
        mediaId: 8,
        title: 'Edited title',
        type: 'page',
    });
});
test('Applying the item while editing should call the onApply callback with the current data', () => {
    const applySpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default description="Description" edited={false} editing={true} id={5} locale={mobx_1.observable.box('en')} mediaId={5} onApply={applySpy} onCancel={jest.fn()} title="Title" type="page"/>);
    item.find('Button[children="sulu_admin.reset"]').simulate('click');
    expect(applySpy).toBeCalledWith({
        id: 5,
        type: 'page',
    });
});
