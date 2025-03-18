"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const divider_scss_1 = __importDefault(require("./divider.scss"));
class Divider extends react_1.default.PureComponent {
    render() {
        return <li className={divider_scss_1.default.divider}/>;
    }
}
exports.default = Divider;
