"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importDefault(require("../Input"));
class Number extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (value, event) => {
            let number = undefined;
            if (value) {
                number = parseFloat(value);
                if (isNaN(number)) {
                    number = undefined;
                }
            }
            this.props.onChange(number, event);
        };
    }
    render() {
        const inputProps = {
            alignment: this.props.alignment,
            collapsed: this.props.collapsed,
            name: this.props.name,
            icon: this.props.icon,
            id: this.props.id,
            loading: this.props.loading,
            placeholder: this.props.placeholder,
            inputContainerRef: this.props.inputContainerRef,
            inputRef: this.props.inputRef,
            valid: this.props.valid,
            disabled: this.props.disabled,
            value: this.props.value,
            onBlur: this.props.onBlur,
            onIconClick: this.props.onIconClick,
            iconStyle: this.props.iconStyle,
            iconClassName: this.props.iconClassName,
            onChange: this.handleChange,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            skin: this.props.skin,
            type: 'number',
        };
        return <Input_1.default {...inputProps}/>;
    }
}
Number.defaultProps = {
    alignment: 'left',
    disabled: false,
    valid: true,
};
exports.default = Number;
