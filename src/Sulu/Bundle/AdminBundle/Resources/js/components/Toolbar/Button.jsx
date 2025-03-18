"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const Loader_1 = __importDefault(require("../Loader"));
const button_scss_1 = __importDefault(require("./button.scss"));
const LOADER_SIZE = 20;
const ICON_ANGLE_DOWN = 'su-angle-down';
class Button extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOnClick = () => {
            this.props.onClick();
        };
        this.setButtonRef = (ref) => {
            const { buttonRef } = this.props;
            if (buttonRef && ref) {
                buttonRef(ref);
            }
        };
    }
    render() {
        const { active, disabled, label, loading, hasOptions, icon, primary, size, showText, skin, success, } = this.props;
        const buttonClass = (0, classnames_1.default)(button_scss_1.default.button, {
            [button_scss_1.default.active]: active,
            [button_scss_1.default[size]]: size,
            [button_scss_1.default[skin]]: skin,
            [button_scss_1.default.primary]: primary,
            [button_scss_1.default.success]: success,
        });
        const buttonContent = this.props.children || label;
        return (<button className={buttonClass} disabled={disabled} onClick={this.handleOnClick} ref={this.setButtonRef} type="button">
                {loading &&
                <Loader_1.default className={button_scss_1.default.loader} size={LOADER_SIZE}/>}
                {icon &&
                <Icon_1.default className={button_scss_1.default.icon} name={icon}/>}
                {(buttonContent && showText) &&
                <span className={button_scss_1.default.label}>{buttonContent}</span>}
                {hasOptions &&
                <Icon_1.default className={button_scss_1.default.dropdownIcon} name={ICON_ANGLE_DOWN}/>}
            </button>);
    }
}
Button.defaultProps = {
    active: false,
    disabled: false,
    hasOptions: false,
    primary: false,
    showText: true,
    success: false,
};
exports.default = Button;
