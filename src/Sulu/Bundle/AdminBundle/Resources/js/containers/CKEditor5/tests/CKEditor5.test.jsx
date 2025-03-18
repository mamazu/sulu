"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const classiceditor_1 = __importDefault(require("@ckeditor/ckeditor5-editor-classic/src/classiceditor"));
const CKEditor5_1 = __importDefault(require("../CKEditor5"));
const configRegistry_1 = __importDefault(require("../registries/configRegistry"));
const pluginRegistry_1 = __importDefault(require("../registries/pluginRegistry"));
jest.mock('../registries/pluginRegistry', () => ({
    plugins: [],
}));
jest.mock('../registries/configRegistry', () => ({
    configs: [],
}));
jest.mock('@ckeditor/ckeditor5-editor-classic/src/classiceditor', () => ({
    create: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
const defaultEditor = {
    editing: {
        view: {
            document: {
                on: jest.fn(),
            },
        },
    },
    model: {
        document: {
            on: jest.fn(),
        },
    },
    ui: {
        element: {
            classList: {
                add: jest.fn(),
                remove: jest.fn(),
            },
        },
    },
    getData: jest.fn(),
    setData: jest.fn(),
    isReadOnly: false,
    enableReadOnlyMode: () => {
    },
    disableReadOnlyMode: () => {
    },
};
test('Create a CKEditor5 instance', () => {
    const editor = Object.assign({}, defaultEditor);
    classiceditor_1.default.create.mockReturnValue(Promise.resolve(editor));
    const locale = mobx_1.observable.box('en');
    (0, enzyme_1.mount)(<CKEditor5_1.default locale={locale} onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    expect(classiceditor_1.default.create).toBeCalledWith(expect.anything(), expect.objectContaining({
        heading: {
            options: [
                {
                    class: 'ck-heading_paragraph',
                    model: 'paragraph',
                    title: 'sulu_admin.paragraph',
                },
                {
                    class: 'ck-heading_heading2',
                    model: 'heading2',
                    title: 'sulu_admin.heading2',
                    view: 'h2',
                },
                {
                    class: 'ck-heading_heading3',
                    model: 'heading3',
                    title: 'sulu_admin.heading3',
                    view: 'h3',
                },
                {
                    class: 'ck-heading_heading4',
                    model: 'heading4',
                    title: 'sulu_admin.heading4',
                    view: 'h4',
                },
                {
                    class: 'ck-heading_heading5',
                    model: 'heading5',
                    title: 'sulu_admin.heading5',
                    view: 'h5',
                },
                {
                    class: 'ck-heading_heading6',
                    model: 'heading6',
                    title: 'sulu_admin.heading6',
                    view: 'h6',
                },
            ],
        },
        sulu: {
            locale: 'en',
        },
    }));
});
test('Create a CKEditor5 instance with an additional plugin', () => {
    const Plugin = class {
    };
    pluginRegistry_1.default.plugins = [Plugin];
    const config = jest.fn((config) => ({
        toolbar: [...config.toolbar, 'plugin1', 'plugin2'],
    }));
    configRegistry_1.default.configs = [config];
    const editor = Object.assign({}, defaultEditor);
    classiceditor_1.default.create.mockReturnValue(Promise.resolve(editor));
    (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    expect(classiceditor_1.default.create).toBeCalledWith(expect.anything(), expect.objectContaining({
        plugins: expect.arrayContaining([Plugin]),
        toolbar: expect.arrayContaining(['bold', 'italic', 'underline', 'plugin1', 'plugin2']),
    }));
});
test('Create a CKEditor5 instance with given formats', () => {
    const editor = Object.assign({}, defaultEditor);
    classiceditor_1.default.create.mockReturnValue(Promise.resolve(editor));
    (0, enzyme_1.mount)(<CKEditor5_1.default formats={['h1', 'h2', 'h3']} onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    expect(classiceditor_1.default.create).toBeCalledWith(expect.anything(), expect.objectContaining({
        heading: {
            options: [
                {
                    class: 'ck-heading_paragraph',
                    model: 'paragraph',
                    title: 'sulu_admin.paragraph',
                },
                {
                    class: 'ck-heading_heading1',
                    model: 'heading1',
                    title: 'sulu_admin.heading1',
                    view: 'h1',
                },
                {
                    class: 'ck-heading_heading2',
                    model: 'heading2',
                    title: 'sulu_admin.heading2',
                    view: 'h2',
                },
                {
                    class: 'ck-heading_heading3',
                    model: 'heading3',
                    title: 'sulu_admin.heading3',
                    view: 'h3',
                },
            ],
        },
        sulu: {
            locale: undefined,
        },
    }));
});
test('Set data on editor when value is updated', () => {
    const editor = Object.assign({}, defaultEditor);
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    const ckeditor = (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    return editorPromise.then(() => {
        ckeditor.setProps({ value: '<p>Test</p>' });
        expect(editor.setData).toBeCalledWith('<p>Test</p>');
    });
});
test('Do not set data on editor when value is not changed when props change', () => {
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue('<p>Test</p>') });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    const ckeditor = (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={jest.fn()} value="<p>Test</p>"/>);
    return editorPromise.then(() => {
        editor.setData.mockClear();
        ckeditor.setProps({ value: '<p>Test</p>' });
        expect(editor.setData).not.toBeCalled();
    });
});
test('Do not set data on editor when value and editorData is undefined', () => {
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue() });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    const ckeditor = (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    return editorPromise.then(() => {
        editor.setData.mockClear();
        ckeditor.setProps({});
        expect(editor.setData).not.toBeCalled();
    });
});
test('Set disabled class and isReadOnly property to CKEditor5', () => {
    const editor = Object.assign(Object.assign({}, defaultEditor), { isReadOnly: false, enableReadOnlyMode: () => {
            editor.isReadOnly = true;
        }, disableReadOnlyMode: () => {
            editor.isReadOnly = false;
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default disabled={true} onBlur={jest.fn()} onChange={jest.fn()} value={undefined}/>);
    return editorPromise.then(() => {
        expect(classiceditor_1.default.create).toBeCalled();
        expect(editor.ui.element.classList.add).toBeCalledWith('disabled');
        expect(editor.isReadOnly).toEqual(true);
    });
});
test('Call onChange prop when something changed', () => {
    const changeSpy = jest.fn();
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue('test'), model: {
            document: {
                on: jest.fn(),
                differ: {
                    getChanges: jest.fn().mockReturnValue([{}]),
                },
            },
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={changeSpy} value={undefined}/>);
    return editorPromise.then(() => {
        editor.model.document.on.mock.calls[0][1]();
        expect(changeSpy).toBeCalledWith('test');
    });
});
test('Call onChange prop with undefined if editor is empty', () => {
    const changeSpy = jest.fn();
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue(''), model: {
            document: {
                on: jest.fn(),
                differ: {
                    getChanges: jest.fn().mockReturnValue([{}]),
                },
            },
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={changeSpy} value={undefined}/>);
    return editorPromise.then(() => {
        editor.model.document.on.mock.calls[0][1]();
        expect(changeSpy).toBeCalledWith(undefined);
    });
});
test('Do not call onChange prop when nothing changed', () => {
    const changeSpy = jest.fn();
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue('test'), model: {
            document: {
                on: jest.fn(),
                differ: {
                    getChanges: jest.fn().mockReturnValue([]),
                },
            },
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={jest.fn()} onChange={changeSpy} value={undefined}/>);
    return editorPromise.then(() => {
        editor.model.document.on.mock.calls[0][1]();
        expect(changeSpy).not.toBeCalled();
    });
});
test('Call onBlur prop when CKEditor5 fires its blur event', () => {
    const blurSpy = jest.fn();
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue('test'), model: {
            document: {
                on: jest.fn(),
                differ: {
                    getChanges: jest.fn().mockReturnValue([]),
                },
            },
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default onBlur={blurSpy} onChange={jest.fn()} value={undefined}/>);
    return editorPromise.then(() => {
        editor.editing.view.document.on.mock.calls[0][1]();
        expect(blurSpy).toBeCalled();
    });
});
test('Call onFocus prop when CKEditor5 fires its focus event', () => {
    const focusSpy = jest.fn();
    const target = new EventTarget();
    const querySelectorSpy = jest.fn().mockReturnValue(target);
    const editor = Object.assign(Object.assign({}, defaultEditor), { getData: jest.fn().mockReturnValue('test'), model: {
            document: {
                on: jest.fn(),
                differ: {
                    getChanges: jest.fn().mockReturnValue([]),
                },
            },
        }, ui: {
            element: {
                querySelector: querySelectorSpy,
            },
        } });
    const editorPromise = Promise.resolve(editor);
    classiceditor_1.default.create.mockReturnValue(editorPromise);
    (0, enzyme_1.mount)(<CKEditor5_1.default onChange={jest.fn()} onFocus={focusSpy} value={undefined}/>);
    return editorPromise.then(() => {
        editor.editing.view.document.on.mock.calls[0][1]();
        expect(focusSpy).toBeCalledWith({ target });
        expect(querySelectorSpy).toBeCalledWith('div[contenteditable="true"]');
    });
});
