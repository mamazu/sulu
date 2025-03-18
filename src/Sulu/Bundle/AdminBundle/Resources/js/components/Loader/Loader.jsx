"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const loader_scss_1 = __importDefault(require("./loader.scss"));
class Loader extends react_1.default.Component {
    render() {
        const { size, className, } = this.props;
        const dimensionStyle = {
            width: size,
            height: size,
        };
        const loaderClass = (0, classnames_1.default)(loader_scss_1.default.spinner, className);
        return (<div className={loaderClass} style={dimensionStyle}>
                <div className={loader_scss_1.default.doubleBounce1}/>
                <div className={loader_scss_1.default.doubleBounce2}/>
            </div>);
    }
}
Loader.defaultProps = {
    size: 40,
};
exports.default = Loader;
