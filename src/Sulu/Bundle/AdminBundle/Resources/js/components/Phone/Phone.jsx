"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importDefault(require("../Input"));
class Phone extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleIconClick = () => {
            const { value } = this.props;
            if (!value) {
                return;
            }
            window.location.assign('tel:' + value);
        };
    }
    render() {
        const { id, valid, disabled, name, placeholder, onBlur, onChange, value, } = this.props;
        return (<Input_1.default disabled={disabled} icon="su-phone" id={id} name={name} onBlur={onBlur} onChange={onChange} onIconClick={(value && value.length > 1) ? this.handleIconClick : undefined} placeholder={placeholder} type="tel" valid={valid} value={value}/>);
    }
}
Phone.defaultProps = {
    disabled: false,
    valid: true,
};
exports.default = Phone;
