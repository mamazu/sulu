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
        this.handleClick = () => {
            const { name, onChange, value, } = this.props;
            if (!onChange) {
                return;
            }
            onChange(name, !value);
        };
    }
    render() {
        const { disabled, icon, name, title, value, } = this.props;
        const itemClass = (0, classnames_1.default)(item_scss_1.default.item, {
            [item_scss_1.default.selected]: value,
            [item_scss_1.default.disabled]: disabled,
        });
        const itemTitle = title ? title : name.charAt(0).toUpperCase() + name.slice(1);
        return (<button className={itemClass} onClick={!disabled ? this.handleClick : undefined} title={itemTitle} type="button">
                <Icon_1.default name={icon}/>
            </button>);
    }
}
Item.defaultProps = {
    disabled: false,
    value: false,
};
exports.default = Item;
