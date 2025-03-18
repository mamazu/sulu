"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const table_scss_1 = __importDefault(require("./table.scss"));
const DEPTH_PADDING = 25;
class Cell extends react_1.default.PureComponent {
    render() {
        const { colSpan, children, className, depth, width, } = this.props;
        const cellClass = (0, classnames_1.default)(className, table_scss_1.default.cell, {
            [table_scss_1.default[width]]: width !== 'auto',
        });
        const style = {};
        if (depth) {
            style.paddingLeft = (depth * DEPTH_PADDING) + 'px';
        }
        return (<td className={cellClass} colSpan={colSpan}>
                <div className={table_scss_1.default.cellContent} style={style}>
                    {children}
                </div>
            </td>);
    }
}
Cell.defaultProps = {
    width: 'auto',
};
exports.default = Cell;
