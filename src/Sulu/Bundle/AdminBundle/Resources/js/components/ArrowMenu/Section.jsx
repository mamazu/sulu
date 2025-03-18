"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const section_scss_1 = __importDefault(require("./section.scss"));
class Section extends react_1.default.PureComponent {
    render() {
        const { children, title, } = this.props;
        return (<div className={section_scss_1.default.section}>
                {title &&
                <div className={section_scss_1.default.title}>{title}</div>}
                <div className={section_scss_1.default.children}>
                    {children}
                </div>
            </div>);
    }
}
exports.default = Section;
