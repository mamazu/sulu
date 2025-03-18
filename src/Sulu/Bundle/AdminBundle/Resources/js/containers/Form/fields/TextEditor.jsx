"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const TextEditor_1 = __importDefault(require("../../../containers/TextEditor"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
class TextEditor extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleFocus = (event) => {
            const { onFocus, } = this.props;
            if (onFocus) {
                onFocus(event.target);
            }
        };
    }
    render() {
        const { disabled, formInspector, onChange, onFinish, schemaOptions, value } = this.props;
        const locale = formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
        return (<TextEditor_1.default adapter="ckeditor5" disabled={!!disabled} locale={locale} onBlur={onFinish} onChange={onChange} onFocus={this.handleFocus} options={schemaOptions} value={value}/>);
    }
}
exports.default = TextEditor;
