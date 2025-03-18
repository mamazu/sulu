"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const alignment_1 = __importDefault(require("@ckeditor/ckeditor5-alignment/src/alignment"));
const bold_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/bold"));
const classiceditor_1 = __importDefault(require("@ckeditor/ckeditor5-editor-classic/src/classiceditor"));
const essentials_1 = __importDefault(require("@ckeditor/ckeditor5-essentials/src/essentials"));
const heading_1 = __importDefault(require("@ckeditor/ckeditor5-heading/src/heading"));
const italic_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/italic"));
const list_1 = __importDefault(require("@ckeditor/ckeditor5-list/src/list"));
const paragraph_1 = __importDefault(require("@ckeditor/ckeditor5-paragraph/src/paragraph"));
const strikethrough_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/strikethrough"));
const underline_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/underline"));
const subscript_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/subscript"));
const superscript_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/superscript"));
const code_1 = __importDefault(require("@ckeditor/ckeditor5-basic-styles/src/code"));
const table_1 = __importDefault(require("@ckeditor/ckeditor5-table/src/table"));
const tabletoolbar_1 = __importDefault(require("@ckeditor/ckeditor5-table/src/tabletoolbar"));
const Translator_1 = require("../../utils/Translator");
const ExternalLinkPlugin_1 = __importDefault(require("./plugins/ExternalLinkPlugin"));
const InternalLinkPlugin_1 = __importDefault(require("./plugins/InternalLinkPlugin"));
const configRegistry_1 = __importDefault(require("./registries/configRegistry"));
const pluginRegistry_1 = __importDefault(require("./registries/pluginRegistry"));
require("./ckeditor5.scss");
/**
 * React component that renders a classic ck-editor.
 *
 * Implementation is based upon the official ck-editor component:
 * https://github.com/ckeditor/ckeditor5-react/blob/089e28eafa64baf273c5e3690b08c1f8ee5ebbe5/src/ckeditor.jsx
 */
class CKEditor5 extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.setContainerRef = (containerRef) => {
            this.containerRef = containerRef;
        };
        this.editorInstance = null;
    }
    componentDidUpdate() {
        if (this.editorInstance) {
            const { value, disabled } = this.props;
            if (disabled) {
                this.editorInstance.ui.element.classList.add('disabled');
                this.editorInstance.enableReadOnlyMode('disabled');
            }
            else {
                this.editorInstance.ui.element.classList.remove('disabled');
                this.editorInstance.disableReadOnlyMode('disabled');
            }
            const editorData = this.getEditorData();
            if (editorData !== value && !(value === '' && editorData === undefined)) {
                this.editorInstance.setData(value);
            }
        }
    }
    componentDidMount() {
        const { formats, locale } = this.props;
        const defaultConfig = {
            toolbar: [
                'heading',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'subscript',
                'superscript',
                'bulletedlist',
                'numberedlist',
                'externalLink',
                'internalLink',
                'alignment',
                'insertTable',
                'code',
            ],
            heading: {
                options: [
                    {
                        model: 'paragraph',
                        title: (0, Translator_1.translate)('sulu_admin.paragraph'),
                        class: 'ck-heading_paragraph',
                    },
                    formats.includes('h1') ? {
                        model: 'heading1',
                        view: 'h1',
                        title: (0, Translator_1.translate)('sulu_admin.heading1'),
                        class: 'ck-heading_heading1',
                    } : undefined,
                    formats.includes('h2') ? {
                        model: 'heading2',
                        view: 'h2',
                        title: (0, Translator_1.translate)('sulu_admin.heading2'),
                        class: 'ck-heading_heading2',
                    } : undefined,
                    formats.includes('h3') ? {
                        model: 'heading3',
                        view: 'h3',
                        title: (0, Translator_1.translate)('sulu_admin.heading3'),
                        class: 'ck-heading_heading3',
                    } : undefined,
                    formats.includes('h4') ? {
                        model: 'heading4',
                        view: 'h4',
                        title: (0, Translator_1.translate)('sulu_admin.heading4'),
                        class: 'ck-heading_heading4',
                    } : undefined,
                    formats.includes('h5') ? {
                        model: 'heading5',
                        view: 'h5',
                        title: (0, Translator_1.translate)('sulu_admin.heading5'),
                        class: 'ck-heading_heading5',
                    } : undefined,
                    formats.includes('h6') ? {
                        model: 'heading6',
                        view: 'h6',
                        title: (0, Translator_1.translate)('sulu_admin.heading6'),
                        class: 'ck-heading_heading6',
                    } : undefined,
                ].filter((entry) => entry !== undefined),
            },
            sulu: {
                locale: locale && locale.get(),
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                ],
            },
            ui: {
                poweredBy: {
                    position: 'inside',
                    side: 'right',
                    label: '',
                    verticalOffset: 2,
                    horizontalOffset: 3,
                },
            },
        };
        classiceditor_1.default
            .create(this.containerRef, Object.assign({ plugins: [
                alignment_1.default,
                bold_1.default,
                essentials_1.default,
                ExternalLinkPlugin_1.default,
                heading_1.default,
                InternalLinkPlugin_1.default,
                italic_1.default,
                list_1.default,
                paragraph_1.default,
                strikethrough_1.default,
                underline_1.default,
                subscript_1.default,
                superscript_1.default,
                code_1.default,
                table_1.default,
                tabletoolbar_1.default,
                ...pluginRegistry_1.default.plugins,
            ] }, configRegistry_1.default.configs.reduce((previousConfig, config) => {
            return Object.assign(Object.assign({}, previousConfig), config(previousConfig));
        }, defaultConfig)))
            .then((editor) => {
            this.editorInstance = editor;
            this.editorInstance.setData(this.props.value);
            const { disabled, onBlur, onChange, onFocus } = this.props;
            const { model: { document: modelDocument, }, editing: { view: { document: viewDocument, }, }, } = this.editorInstance;
            if (disabled) {
                this.editorInstance.enableReadOnlyMode('disabled');
                this.editorInstance.ui.element.classList.add('disabled');
            }
            if (onBlur) {
                viewDocument.on('blur', () => {
                    onBlur();
                });
            }
            if (onFocus) {
                viewDocument.on('focus', () => {
                    onFocus({
                        target: this.editorInstance.ui.element.querySelector('div[contenteditable="true"]'),
                    });
                });
            }
            if (onChange) {
                modelDocument.on('change', () => {
                    if (modelDocument.differ.getChanges().length > 0) {
                        onChange(this.getEditorData());
                    }
                });
            }
        })
            .catch((error) => {
            loglevel_1.default.error(error);
        });
    }
    componentWillUnmount() {
        if (this.editorInstance) {
            this.editorInstance.destroy().then(() => this.editorInstance = null);
        }
    }
    getEditorData() {
        const editorData = this.editorInstance.getData();
        return editorData === '' ? undefined : editorData;
    }
    render() {
        return <div ref={this.setContainerRef}></div>;
    }
}
CKEditor5.defaultProps = {
    disabled: false,
    formats: ['h2', 'h3', 'h4', 'h5', 'h6'],
    value: '',
};
exports.default = CKEditor5;
