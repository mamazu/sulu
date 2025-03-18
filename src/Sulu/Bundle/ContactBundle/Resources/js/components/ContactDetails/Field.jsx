"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const field_scss_1 = __importDefault(require("./field.scss"));
class Field extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleRemove = () => {
            const { index, onRemove } = this.props;
            onRemove(index);
        };
        this.handleTypeChange = (type) => {
            const { index, onTypeChange } = this.props;
            onTypeChange(index, type);
        };
    }
    render() {
        const { children, label, type, types } = this.props;
        return (<components_1.Form.Field colSpan={6} label={label} onTypeChange={this.handleTypeChange} type={type} types={types}>
                <div className={field_scss_1.default.field}>
                    {children}
                    <components_1.Icon className={field_scss_1.default.removeIcon} name="su-trash-alt" onClick={this.handleRemove}/>
                </div>
            </components_1.Form.Field>);
    }
}
exports.default = Field;
