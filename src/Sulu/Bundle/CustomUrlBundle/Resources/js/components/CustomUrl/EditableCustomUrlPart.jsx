"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
class EditableCustomUrlPart extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { index, onChange } = this.props;
            onChange(value, index);
        };
    }
    render() {
        const { onBlur, value } = this.props;
        return <components_1.Input onBlur={onBlur} onChange={this.handleChange} value={value}/>;
    }
}
exports.default = EditableCustomUrlPart;
