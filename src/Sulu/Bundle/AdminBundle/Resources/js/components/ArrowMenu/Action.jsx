"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const action_scss_1 = __importDefault(require("./action.scss"));
class Action extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleButtonClick = () => {
            const { onClick, onAfterAction, value, } = this.props;
            onClick(value);
            if (onAfterAction) {
                onAfterAction();
            }
        };
    }
    render() {
        const { disabled, icon } = this.props;
        return (<button className={action_scss_1.default.action} disabled={disabled} onClick={this.handleButtonClick} type="button">
                {icon && <Icon_1.default className={action_scss_1.default.icon} name={icon}/>}
                {this.props.children}
            </button>);
    }
}
Action.defaultProps = {
    disabled: false,
    value: undefined,
};
exports.default = Action;
