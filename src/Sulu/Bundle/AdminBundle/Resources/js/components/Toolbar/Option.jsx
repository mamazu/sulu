"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const option_scss_1 = __importDefault(require("./option.scss"));
const ICON_CHECKMARK = 'su-check';
class Option extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOnClick = () => {
            const { onClick } = this.props;
            onClick(this.props.value);
        };
    }
    render() {
        const { skin, size, label, selected, disabled, } = this.props;
        const optionClass = (0, classnames_1.default)(option_scss_1.default.option, option_scss_1.default[skin], {
            [option_scss_1.default[size]]: size,
            [option_scss_1.default.isSelected]: selected,
        });
        return (<li className={optionClass}>
                <button disabled={disabled} onClick={this.handleOnClick} type="button">
                    {selected &&
                <Icon_1.default className={option_scss_1.default.selectedIcon} name={ICON_CHECKMARK}/>}
                    {label}
                </button>
            </li>);
    }
}
exports.default = Option;
