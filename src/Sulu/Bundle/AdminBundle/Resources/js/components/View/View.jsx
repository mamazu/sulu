"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_scss_1 = __importDefault(require("./view.scss"));
class View extends react_1.default.Component {
    render() {
        const { children, } = this.props;
        return (<div className={view_scss_1.default.view}>
                {children}
            </div>);
    }
}
exports.default = View;
