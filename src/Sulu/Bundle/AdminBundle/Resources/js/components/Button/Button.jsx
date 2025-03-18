"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Loader_1 = __importDefault(require("../Loader"));
const button_scss_1 = __importDefault(require("./button.scss"));
const LOADER_SIZE = 25;
class Button extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            event.preventDefault();
            const onClick = this.props.onClick;
            if (onClick) {
                onClick(this.props.value);
            }
        };
    }
    render() {
        const { active, activeClassName, buttonRef, children, className, disabled, icon, iconClassName, loading, onClick, showDropdownIcon, skin, type, } = this.props;
        const buttonClass = (0, classnames_1.default)(button_scss_1.default.button, button_scss_1.default[skin], {
            [button_scss_1.default.loading]: loading,
            [button_scss_1.default.active]: active,
            [button_scss_1.default.hasText]: !!children,
            [activeClassName || '']: active && activeClassName,
        }, className);
        const iconClass = (0, classnames_1.default)(button_scss_1.default.buttonIcon, iconClassName);
        return (<button className={buttonClass} disabled={loading || disabled} onClick={onClick ? this.handleClick : undefined} ref={buttonRef} 
        /* eslint-disable-next-line react/button-has-type */
        type={type}>
                {icon &&
                <Icon_1.default className={iconClass} name={icon}/>}
                {children &&
                <span className={button_scss_1.default.buttonText}>{children}</span>}
                {showDropdownIcon &&
                <Icon_1.default className={button_scss_1.default.dropdownIcon} name="su-angle-down"/>}
                {loading &&
                <div className={button_scss_1.default.loader}>
                        <Loader_1.default size={LOADER_SIZE}/>
                    </div>}
            </button>);
    }
}
Button.defaultProps = {
    active: false,
    disabled: false,
    loading: false,
    showDropdownIcon: false,
    size: 'large',
    skin: 'secondary',
    type: 'button',
    value: undefined,
};
exports.default = Button;
