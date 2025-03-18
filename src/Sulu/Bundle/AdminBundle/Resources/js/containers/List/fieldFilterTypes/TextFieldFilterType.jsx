"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importDefault(require("../../../components/Input"));
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
class TextFieldFilterType extends AbstractFieldFilterType_1.default {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange } = this;
            onChange(value ? { eq: value } : undefined);
        };
    }
    setInputRef(ref) {
        if (ref) {
            ref.focus();
        }
    }
    getFormNode() {
        const { value } = this;
        return (<Input_1.default inputRef={this.setInputRef} onChange={this.handleChange} value={value ? value.eq : undefined}/>);
    }
    getValueNode(value) {
        return Promise.resolve(value ? value.eq : null);
    }
}
exports.default = TextFieldFilterType;
