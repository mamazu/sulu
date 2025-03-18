"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const item_scss_1 = __importDefault(require("./item.scss"));
class Item extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleButtonClick = () => {
            const { disabled, onClick, value } = this.props;
            if (disabled || !onClick) {
                return;
            }
            onClick(value);
        };
    }
    render() {
        const { children, active, icon, disabled, } = this.props;
        const itemClass = (0, classnames_1.default)(item_scss_1.default.item, {
            [item_scss_1.default.active]: active,
        });
        return (<button className={itemClass} disabled={disabled} onClick={this.handleButtonClick} type="button">
                <span className={item_scss_1.default.icon}>
                    {icon && active && <Icon_1.default className={item_scss_1.default.icon} name={icon}/>}
                </span>
                <span>
                    {children}
                </span>
            </button>);
    }
}
Item.defaultProps = {
    active: false,
    disabled: false,
};
exports.default = Item;
