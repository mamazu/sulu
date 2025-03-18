"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const hint_scss_1 = __importDefault(require("./hint.scss"));
class Hint extends react_1.default.Component {
    render() {
        const { icon, title, } = this.props;
        return (<div className={hint_scss_1.default.hint}>
                <div className={hint_scss_1.default.hintIcon}>
                    <Icon_1.default name={icon}/>
                </div>
                {title}
            </div>);
    }
}
exports.default = Hint;
