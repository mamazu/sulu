"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const ContactAccountSelection_1 = __importDefault(require("../../fields/ContactAccountSelection"));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.clearSelection = jest.fn();
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../ContactAccountSelection/stores/ContactAccountSelectionStore', () => jest.fn(function () {
    this.loadItems = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        items: [],
    });
}));
test('Pass props correctly to ContactAccountSelection component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const contactAccountSelection = (0, enzyme_1.shallow)(<ContactAccountSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector}/>);
    expect(contactAccountSelection.props()).toEqual(expect.objectContaining({
        disabled: false,
        value: [],
    }));
});
test('Pass disabled prop to ContactAccountSelection component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const contactAccountSelection = (0, enzyme_1.shallow)(<ContactAccountSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(contactAccountSelection.prop('disabled')).toEqual(true);
});
test('Pass value prop to ContactAccountSelection component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const contactAccountSelection = (0, enzyme_1.shallow)(<ContactAccountSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={['a1', 'c2']}/>);
    expect(contactAccountSelection.prop('value')).toEqual(['a1', 'c2']);
});
test('Call onChange and onFinish calbacks', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const contactAccountSelection = (0, enzyme_1.shallow)(<ContactAccountSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={['a1', 'c2']}/>);
    contactAccountSelection.prop('onChange')(['a1', 'c6']);
    expect(changeSpy).toBeCalledWith(['a1', 'c6']);
    expect(finishSpy).toBeCalledWith();
});
test('Call onItemClick callback', () => {
    const router = new Router_1.default();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const contactAccountSelection = (0, enzyme_1.mount)(<ContactAccountSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} router={router} value={['a1', 'c2']}/>);
    contactAccountSelection.find('ContactAccountSelection').at(1).instance().store.items = [
        { id: 'a1' },
        { id: 'c2' },
    ];
    contactAccountSelection.update();
    contactAccountSelection.find('MultiItemSelection .content').at(0).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_contact.account_edit_form', { id: '1' });
    contactAccountSelection.find('MultiItemSelection .content').at(1).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_contact.contact_edit_form', { id: '2' });
});
