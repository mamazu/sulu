"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const CKEditor5_1 = __importDefault(require("../../CKEditor5"));
class CKEditor5 extends react_1.default.Component {
    render() {
        const { disabled, locale, onBlur, onChange, onFocus, options, value, } = this.props;
        const unvalidatedFormatOptionValues = options && options.formats ? options.formats.value : [];
        if (!(0, mobx_1.isArrayLike)(unvalidatedFormatOptionValues)) {
            throw new Error('The passed "formats" must be an array of strings');
        }
        const formatOptionValues = unvalidatedFormatOptionValues;
        const formats = formatOptionValues.length
            ? formatOptionValues.map((format) => {
                if (typeof format.name !== 'string') {
                    throw new Error('The name property of the passed "formats" must be strings!');
                }
                return format.name;
            })
            : undefined;
        return (<CKEditor5_1.default disabled={disabled} formats={formats} locale={locale} onBlur={onBlur} onChange={onChange} onFocus={onFocus} value={value}/>);
    }
}
exports.default = CKEditor5;
