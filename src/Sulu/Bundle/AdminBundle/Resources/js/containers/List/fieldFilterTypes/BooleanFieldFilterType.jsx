"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Toggler_1 = __importDefault(require("../../../components/Toggler"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
class BooleanFieldFilterType extends AbstractFieldFilterType_1.default {
    constructor(onChange, parameters, value) {
        super(onChange, parameters, value);
        if (value === undefined) {
            onChange(false);
        }
    }
    getFormNode() {
        const { onChange } = this;
        return (<Toggler_1.default checked={this.value || false} onChange={onChange}/>);
    }
    getValueNode(value) {
        if (value === undefined) {
            return Promise.resolve(null);
        }
        return Promise.resolve((0, Translator_1.translate)(value ? 'sulu_admin.yes' : 'sulu_admin.no'));
    }
}
exports.default = BooleanFieldFilterType;
