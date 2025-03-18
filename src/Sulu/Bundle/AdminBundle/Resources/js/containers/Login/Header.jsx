"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const header_scss_1 = __importDefault(require("./header.scss"));
class Header extends react_1.default.Component {
    render() {
        const { children, small } = this.props;
        const className = (0, classnames_1.default)(header_scss_1.default.header, {
            [header_scss_1.default.small]: small,
        });
        return (<div className={className}>{children}</div>);
    }
}
Header.defaultProps = {
    small: false,
};
exports.default = Header;
