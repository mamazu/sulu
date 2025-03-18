"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const action_scss_1 = __importDefault(require("./action.scss"));
class Action extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.triggerButton = () => {
            const { onClick, afterAction, value, } = this.props;
            onClick(value);
            if (afterAction) {
                afterAction();
            }
        };
        this.handleButtonClick = () => {
            this.triggerButton();
        };
        this.handleButtonKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                this.triggerButton();
            }
        };
        this.setButtonRef = (ref) => {
            const { buttonRef } = this.props;
            if (buttonRef) {
                buttonRef(ref);
            }
        };
        this.handleMouseMove = () => {
            if (this.props.requestFocus) {
                this.props.requestFocus();
            }
        };
    }
    render() {
        return (<li onMouseMove={this.handleMouseMove}>
                <button className={action_scss_1.default.action} onClick={this.handleButtonClick} onKeyDown={this.handleButtonKeyDown} ref={this.setButtonRef} type="button">
                    {this.props.children}
                </button>
            </li>);
    }
}
exports.default = Action;
