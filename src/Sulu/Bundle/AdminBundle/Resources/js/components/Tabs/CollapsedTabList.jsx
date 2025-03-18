"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const collapsedTabList_scss_1 = __importDefault(require("./collapsedTabList.scss"));
class CollapsedTabList extends react_1.default.PureComponent {
    render() {
        const { children, type, } = this.props;
        const collapsedTabListClass = (0, classnames_1.default)(collapsedTabList_scss_1.default.collapsedTabList, collapsedTabList_scss_1.default[type]);
        return (<ul className={collapsedTabListClass}>
                {children}
            </ul>);
    }
}
exports.default = CollapsedTabList;
