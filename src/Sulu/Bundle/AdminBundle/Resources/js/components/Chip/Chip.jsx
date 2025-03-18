"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../../components/Icon"));
const chip_scss_1 = __importDefault(require("./chip.scss"));
class Chip extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { onClick, value } = this.props;
            if (onClick) {
                onClick(value);
            }
        };
        this.handleDelete = () => {
            const { onDelete, value } = this.props;
            if (onDelete) {
                onDelete(value);
            }
        };
    }
    render() {
        const { children, disabled, onClick, onDelete, size, skin } = this.props;
        const chipClass = (0, classnames_1.default)(chip_scss_1.default.chip, chip_scss_1.default[skin], chip_scss_1.default[size], {
            [chip_scss_1.default.disabled]: disabled,
            [chip_scss_1.default.clickable]: !!onClick,
        });
        return (<button className={chipClass} onClick={this.handleClick} type="button">
                {children}
                {!disabled && onDelete &&
                <Icon_1.default className={chip_scss_1.default.icon} name="su-times" onClick={this.handleDelete}/>}
            </button>);
    }
}
Chip.defaultProps = {
    disabled: false,
    size: 'small',
    skin: 'secondary',
};
exports.default = Chip;
