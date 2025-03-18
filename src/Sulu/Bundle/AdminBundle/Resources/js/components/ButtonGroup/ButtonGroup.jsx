"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const buttonGroup_scss_1 = __importDefault(require("./buttonGroup.scss"));
class ButtonGroup extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.cloneChildren = () => {
            const { children } = this.props;
            return react_1.default.Children.map(children, (child) => {
                if (!child) {
                    return null;
                }
                const buttonClass = (0, classnames_1.default)(buttonGroup_scss_1.default.button, child.props.className);
                return react_1.default.cloneElement(child, {
                    className: buttonClass,
                    skin: 'icon',
                });
            });
        };
    }
    render() {
        return (<div className={buttonGroup_scss_1.default.buttonGroup}>
                {this.cloneChildren()}
            </div>);
    }
}
exports.default = ButtonGroup;
