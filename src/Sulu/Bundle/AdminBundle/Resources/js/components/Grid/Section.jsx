"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const BaseItem_1 = __importDefault(require("./BaseItem"));
const section_scss_1 = __importDefault(require("./section.scss"));
class Section extends react_1.default.PureComponent {
    render() {
        const _a = this.props, { children, className } = _a, others = __rest(_a, ["children", "className"]);
        const sectionClass = (0, classnames_1.default)([
            section_scss_1.default.section,
            className,
        ]);
        return (<BaseItem_1.default {...others} className={sectionClass}>
                {children}
            </BaseItem_1.default>);
    }
}
Section.defaultProps = {
    colSpan: 12,
    spaceAfter: 0,
    spaceBefore: 0,
};
exports.default = Section;
