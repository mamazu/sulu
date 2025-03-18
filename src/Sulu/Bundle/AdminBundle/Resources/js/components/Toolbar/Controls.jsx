"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const controls_scss_1 = __importDefault(require("./controls.scss"));
class Controls extends react_1.default.PureComponent {
    static createChildren(children, skin) {
        return react_1.default.Children.map(children, (child) => {
            if (!child) {
                return;
            }
            return react_1.default.cloneElement(child, Object.assign(Object.assign({}, child.props), { skin }));
        });
    }
    render() {
        const { children, grow, skin, } = this.props;
        const controlsClass = (0, classnames_1.default)(controls_scss_1.default.controls, controls_scss_1.default[skin], {
            [controls_scss_1.default.grow]: grow,
        });
        return (<div className={controlsClass}>
                {Controls.createChildren(children, skin)}
            </div>);
    }
}
Controls.defaultProps = {
    grow: false,
    skin: 'light',
};
exports.default = Controls;
