"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const containers_1 = require("../../containers");
const translator_scss_1 = __importDefault(require("./translator.scss"));
/**
 * @internal
 */
class Input extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, } = this.props;
            if (onChange) {
                onChange(value || '');
            }
        };
        this.handleTextAreChange = (event) => {
            this.handleChange(event.currentTarget.value);
        };
    }
    render() {
        const { type, } = this.props;
        if (type === 'text_editor') {
            return this.renderEditor();
        }
        return this.renderTextarea();
    }
    renderEditor() {
        const { text, onChange, } = this.props;
        return (<div className={translator_scss_1.default.input + ' ' + translator_scss_1.default.texteditor}>
                <containers_1.TextEditor adapter="ckeditor5" disabled={onChange === undefined} locale={undefined} onChange={this.handleChange} value={text}/>
            </div>);
    }
    renderTextarea() {
        const { text, } = this.props;
        return (<textarea className={translator_scss_1.default.input + ' ' + translator_scss_1.default.textarea} onChange={this.handleTextAreChange} value={text}/>);
    }
}
exports.default = Input;
