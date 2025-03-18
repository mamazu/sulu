"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const icons_scss_1 = __importDefault(require("./icons.scss"));
class Icons extends react_1.default.PureComponent {
    render() {
        const { skin, children, } = this.props;
        const iconsClass = (0, classnames_1.default)(icons_scss_1.default.icons, icons_scss_1.default[skin]);
        return (<div className={iconsClass}>
                {react_1.default.Children.map(children, (child) => (<div className={icons_scss_1.default.icon}>
                        {child}
                    </div>))}
            </div>);
    }
}
Icons.defaultProps = {
    skin: 'light',
};
exports.default = Icons;
