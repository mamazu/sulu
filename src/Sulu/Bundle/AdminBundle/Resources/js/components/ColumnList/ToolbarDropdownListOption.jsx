"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const toolbarDropdownOption_scss_1 = __importDefault(require("./toolbarDropdownOption.scss"));
class ToolbarDropdownListOption extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { onClick } = this.props;
            onClick();
        };
    }
    render() {
        const { children, disabled } = this.props;
        return (<li>
                <button className={toolbarDropdownOption_scss_1.default.option} disabled={disabled} onClick={this.handleClick} type="button">
                    {children}
                </button>
            </li>);
    }
}
exports.default = ToolbarDropdownListOption;
