"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Switch_1 = __importDefault(require("../Switch"));
const checkbox_scss_1 = __importDefault(require("./checkbox.scss"));
const CHECKED_ICON = 'su-check';
class Checkbox extends react_1.default.PureComponent {
    render() {
        const { size, skin, name, value, checked, onChange, children, className, disabled, tabIndex, } = this.props;
        const checkboxClass = (0, classnames_1.default)(checkbox_scss_1.default.checkbox, checkbox_scss_1.default[skin], className);
        return (<Switch_1.default checked={checked} className={checkboxClass} disabled={disabled} icon={checked ? CHECKED_ICON : undefined} name={name} onChange={onChange} size={size} tabIndex={tabIndex} value={value}>
                {children}
            </Switch_1.default>);
    }
}
Checkbox.defaultProps = {
    checked: false,
    disabled: false,
    size: 'default',
    skin: 'dark',
};
exports.default = Checkbox;
