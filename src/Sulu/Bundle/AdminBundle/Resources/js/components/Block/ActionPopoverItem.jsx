"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const actionPopoverItem_scss_1 = __importDefault(require("./actionPopoverItem.scss"));
class ActionPopoverItem extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { index, onClick } = this.props;
            onClick(index);
        };
    }
    render() {
        const { icon, index, label, } = this.props;
        return (<li key={index}>
                <button className={actionPopoverItem_scss_1.default.action} onClick={this.handleClick} type="button">
                    <Icon_1.default className={actionPopoverItem_scss_1.default.icon} name={icon}/>
                    {label}
                </button>
            </li>);
    }
}
exports.default = ActionPopoverItem;
