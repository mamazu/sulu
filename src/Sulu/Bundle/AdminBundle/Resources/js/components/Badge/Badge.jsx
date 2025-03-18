"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const badge_scss_1 = __importDefault(require("./badge.scss"));
class Badge extends react_1.default.PureComponent {
    render() {
        const { children } = this.props;
        return (<div className={badge_scss_1.default.badge}>
                {children}
            </div>);
    }
}
exports.default = Badge;
