"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const toolbar_scss_1 = __importDefault(require("./toolbar.scss"));
class ToolbarButton extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            this.props.onClick();
        };
        this.render = () => {
            const { icon, skin } = this.props;
            const className = (0, classnames_1.default)(toolbar_scss_1.default.item, toolbar_scss_1.default[skin]);
            return (<button className={className} onClick={this.handleClick} type="button">
                <Icon_1.default name={icon}/>
            </button>);
        };
    }
}
ToolbarButton.defaultProps = {
    skin: 'primary',
};
exports.default = ToolbarButton;
