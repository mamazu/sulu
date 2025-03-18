"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
class Bic extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleBlur = () => {
            const { onBlur } = this.props;
            if (onBlur) {
                onBlur();
            }
        };
        this.handleChange = (value) => {
            const { onChange } = this.props;
            onChange(value);
        };
    }
    render() {
        const { id, valid, disabled, name, placeholder, value, } = this.props;
        return (<components_1.Input disabled={disabled} icon="su-earth" id={id} name={name} onBlur={this.handleBlur} onChange={this.handleChange} placeholder={placeholder} type="text" valid={valid} value={value}/>);
    }
}
Bic.defaultProps = {
    disabled: false,
    valid: true,
};
exports.default = Bic;
