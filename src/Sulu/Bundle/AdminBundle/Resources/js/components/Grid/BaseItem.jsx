"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const baseItem_scss_1 = __importDefault(require("./baseItem.scss"));
class BaseItem extends react_1.default.PureComponent {
    render() {
        const { colSpan, children, className, spaceAfter, spaceBefore, } = this.props;
        const baseItemClass = (0, classnames_1.default)(className, baseItem_scss_1.default.colSpan, baseItem_scss_1.default['colSpan-' + colSpan], baseItem_scss_1.default['space-before-' + spaceBefore], baseItem_scss_1.default['space-after-' + spaceAfter]);
        return (<div className={baseItemClass}>
                {children}
            </div>);
    }
}
exports.default = BaseItem;
