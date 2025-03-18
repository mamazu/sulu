"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_scss_1 = __importDefault(require("./item.scss"));
class Item extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { value, onClick, } = this.props;
            if (onClick) {
                onClick(value);
            }
        };
    }
    render() {
        const { onClick, children, } = this.props;
        return (<button className={item_scss_1.default.item} disabled={!onClick} onClick={this.handleClick} type="button">
                {children}
            </button>);
    }
}
exports.default = Item;
