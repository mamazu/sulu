"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const switch_scss_1 = __importDefault(require("./switch.scss"));
class Switch extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (event) => {
            const { onChange, value } = this.props;
            if (onChange) {
                onChange(event.currentTarget.checked, value);
            }
        };
        this.handleClick = (event) => {
            event.stopPropagation();
        };
    }
    render() {
        const { icon, type, name, value, checked, children, className, disabled, size, tabIndex, } = this.props;
        const labelClass = (0, classnames_1.default)(switch_scss_1.default.label, {
            [switch_scss_1.default.disabled]: disabled,
        }, size !== 'default' ? switch_scss_1.default[size] : null);
        const switchClass = (0, classnames_1.default)(switch_scss_1.default.switch, {
            [switch_scss_1.default.disabled]: disabled,
        }, className);
        return (<label className={labelClass} onClick={this.handleClick} tabIndex={-1}>
                <span className={switchClass}>
                    <input checked={checked} disabled={disabled} name={name} onChange={this.handleChange} tabIndex={tabIndex} type={type} value={value}/>
                    <span>
                        {icon &&
                <Icon_1.default name={icon}/>}
                    </span>
                </span>
                {children &&
                <div>{children}</div>}
            </label>);
    }
}
Switch.defaultProps = {
    checked: false,
    disabled: false,
    size: 'default',
    type: 'checkbox',
};
exports.default = Switch;
