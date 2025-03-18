"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const item_scss_1 = __importDefault(require("./item.scss"));
class ItemButton extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { id, onClick } = this.props;
            if (!onClick) {
                return;
            }
            onClick(id);
        };
    }
    render() {
        const { icon, visible, } = this.props;
        const iconClass = (0, classnames_1.default)({
            [item_scss_1.default.button]: true,
            [item_scss_1.default.visible]: visible,
        });
        return (<Icon_1.default className={iconClass} name={icon} onClick={this.handleClick}/>);
    }
}
ItemButton.defaultProps = {
    visible: true,
};
exports.default = ItemButton;
