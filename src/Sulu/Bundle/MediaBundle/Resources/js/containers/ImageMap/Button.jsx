"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const button_scss_1 = __importDefault(require("./button.scss"));
class Button extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            const { onClick } = this.props;
            event.preventDefault();
            onClick();
        };
    }
    render() {
        const { disabled, icon } = this.props;
        return (<button className={button_scss_1.default.button} disabled={disabled} onClick={this.handleClick} type="button">
                <components_1.Icon name={icon}/>
            </button>);
    }
}
Button.defaultProps = {
    disabled: false,
};
exports.default = Button;
