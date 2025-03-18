"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const backdrop_scss_1 = __importDefault(require("./backdrop.scss"));
class Backdrop extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
    }
    render() {
        const { visible, fixed, } = this.props;
        const backdropClass = (0, classnames_1.default)(backdrop_scss_1.default.backdrop, {
            [backdrop_scss_1.default.visible]: visible,
            [backdrop_scss_1.default.fixed]: fixed,
        });
        return <div className={backdropClass} data-testid="backdrop" onClick={this.handleClick} role="button"/>;
    }
}
Backdrop.defaultProps = {
    fixed: true,
    visible: true,
};
exports.default = Backdrop;
