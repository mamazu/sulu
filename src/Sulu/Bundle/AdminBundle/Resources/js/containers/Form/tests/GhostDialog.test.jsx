"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const metadataStore_1 = __importDefault(require("../stores/metadataStore"));
const GhostDialog_1 = __importDefault(require("../GhostDialog"));
const SingleSelect_1 = __importDefault(require("../fields/SingleSelect"));
const Input_1 = __importDefault(require("../fields/Input"));
const fieldRegistry_1 = __importDefault(require("../registries/fieldRegistry"));
fieldRegistry_1.default.add('single_select', SingleSelect_1.default);
fieldRegistry_1.default.add('text_line', Input_1.default);
const FORM = {
    locale: {
        label: 'Sprache wählen',
        disabledCondition: null,
        visibleCondition: null,
        description: '',
        type: 'single_select',
        colSpan: 6,
        options: {
            default_value: {
                name: 'default_value',
                type: null,
                value: 'de',
                title: null,
                placeholder: null,
                infoText: null,
            },
            values: {
                name: 'values',
                type: 'collection',
                value: [
                    {
                        name: 'de',
                        type: null,
                        value: 'de',
                        title: 'de',
                        placeholder: null,
                        infoText: null,
                    },
                    {
                        name: 'en',
                        type: null,
                        value: 'en',
                        title: 'en',
                        placeholder: null,
                        infoText: null,
                    },
                ],
                title: null,
                placeholder: null,
                infoText: null,
            },
        },
        types: [],
        defaultType: null,
        required: true,
        spaceAfter: null,
        minOccurs: null,
        maxOccurs: null,
        onInvalid: null,
        tags: [],
    },
};
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../stores/metadataStore', () => ({
    getSchema: jest.fn().mockReturnValue(Promise.resolve(FORM)),
    getJsonSchema: jest.fn().mockReturnValue(Promise.resolve({})),
}));
afterEach(() => {
    if (document.body) {
        document.body.innerHTML = '';
    }
});
test('Should render a Dialog', (resolve) => {
    const ghostDialog = (0, enzyme_1.mount)(<GhostDialog_1.default locales={['en', 'de']} onCancel={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    setTimeout(() => {
        expect(ghostDialog.render()).toMatchSnapshot();
        resolve();
    }, 1);
});
test('Should call onCancel callback if user chooses not to copy content', () => {
    const cancelSpy = jest.fn();
    const ghostDialog = (0, enzyme_1.mount)(<GhostDialog_1.default locales={['en', 'de']} onCancel={cancelSpy} onConfirm={jest.fn()} open={true}/>);
    ghostDialog.find('Button[skin="secondary"]').simulate('click');
    expect(cancelSpy).toBeCalledWith();
});
test('Should call onConfirm callback with chosen locale if user chooses to copy content', (resolve) => {
    const confirmSpy = jest.fn();
    const ghostDialog = (0, enzyme_1.mount)(<GhostDialog_1.default locales={['en', 'de']} onCancel={jest.fn()} onConfirm={confirmSpy} open={true}/>);
    setTimeout(() => {
        ghostDialog.update();
        ghostDialog.find('SingleSelect').at(0).prop('onChange')('de');
        ghostDialog.find('Button[skin="primary"]').at(0).simulate('click');
        expect(confirmSpy).toBeCalledWith('de', {});
        resolve();
    }, 1);
});
test('Should call onConfirm callback with chosen locale if user chooses to copy content (with additional fields)', (resolve) => {
    const formMetadata = Object.assign(Object.assign({}, FORM), { title: {
            label: 'Test',
            disabledCondition: null,
            visibleCondition: null,
            description: '',
            type: 'text_line',
            colSpan: 6,
        } });
    metadataStore_1.default.getSchema.mockReturnValue(Promise.resolve(formMetadata));
    const confirmSpy = jest.fn();
    const ghostDialog = (0, enzyme_1.mount)(<GhostDialog_1.default locales={['en', 'de']} onCancel={jest.fn()} onConfirm={confirmSpy} open={true}/>);
    setTimeout(() => {
        ghostDialog.update();
        ghostDialog.find('Input').at(0).prop('onChange')('Test 123');
        ghostDialog.find('SingleSelect').at(0).prop('onChange')('de');
        ghostDialog.find('Button[skin="primary"]').at(0).simulate('click');
        expect(confirmSpy).toBeCalledWith('de', {
            title: 'Test 123',
        });
        resolve();
    }, 1);
});
