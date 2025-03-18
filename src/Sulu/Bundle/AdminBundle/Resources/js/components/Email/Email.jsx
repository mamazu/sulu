"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importDefault(require("../Input"));
class Email extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleIconClick = () => {
            const { value } = this.props;
            if (!value) {
                return;
            }
            window.location.assign('mailto:' + value);
        };
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
        return (<Input_1.default disabled={disabled} icon="su-envelope" id={id} name={name} onBlur={this.handleBlur} onChange={this.handleChange} onIconClick={(value && value.length > 1 && valid) ? this.handleIconClick : undefined} placeholder={placeholder} type="email" valid={valid} value={value}/>);
    }
}
Email.defaultProps = {
    disabled: false,
    valid: true,
};
exports.default = Email;
