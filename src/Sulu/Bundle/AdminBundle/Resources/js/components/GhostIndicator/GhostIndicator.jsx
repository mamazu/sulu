"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const ghostIndicator_scss_1 = __importDefault(require("./ghostIndicator.scss"));
class GhostIndicator extends react_1.default.Component {
    render() {
        const { className } = this.props;
        const ghostIndicatorClass = (0, classnames_1.default)(ghostIndicator_scss_1.default.ghostIndicator, className);
        return <span className={ghostIndicatorClass}>{this.props.locale}</span>;
    }
}
exports.default = GhostIndicator;
