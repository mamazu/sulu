"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const CroppedText_1 = __importDefault(require("../CroppedText"));
const Icon_1 = __importDefault(require("../Icon"));
const displayValue_scss_1 = __importDefault(require("./displayValue.scss"));
class DisplayValue extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            const { onClick } = this.props;
            event.preventDefault();
            onClick();
        };
        this.setButtonRef = (button) => {
            const { displayValueRef } = this.props;
            if (displayValueRef && button) {
                displayValueRef(button);
            }
        };
    }
    render() {
        const { children, disabled, icon, skin } = this.props;
        const displayValueClass = (0, classnames_1.default)(displayValue_scss_1.default.displayValue, displayValue_scss_1.default[skin], {
            [displayValue_scss_1.default.hasIcon]: !!icon,
        });
        return (<button className={displayValueClass} disabled={disabled} onClick={!disabled ? this.handleClick : undefined} ref={this.setButtonRef} type="button">
                {!!icon &&
                <Icon_1.default className={displayValue_scss_1.default.frontIcon} name={icon}/>}
                {typeof children === 'string' || typeof children === 'number'
                ? <CroppedText_1.default>{String(children)}</CroppedText_1.default>
                : children}
                <Icon_1.default className={displayValue_scss_1.default.toggle} name="su-angle-down"/>
            </button>);
    }
}
DisplayValue.defaultProps = {
    disabled: false,
    skin: 'default',
};
exports.default = DisplayValue;
