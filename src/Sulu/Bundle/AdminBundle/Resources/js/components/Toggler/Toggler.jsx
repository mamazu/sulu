"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Switch_1 = __importDefault(require("../Switch"));
const toggler_scss_1 = __importDefault(require("./toggler.scss"));
class Toggler extends react_1.default.PureComponent {
    render() {
        const { disabled, name, value, checked, children, onChange, } = this.props;
        return (<Switch_1.default checked={checked} className={toggler_scss_1.default.toggler} disabled={disabled} name={name} onChange={onChange} value={value}>
                {children}
            </Switch_1.default>);
    }
}
Toggler.defaultProps = {
    checked: false,
    disabled: false,
};
exports.default = Toggler;
