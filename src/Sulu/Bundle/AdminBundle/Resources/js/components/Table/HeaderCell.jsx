"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const table_scss_1 = __importDefault(require("./table.scss"));
const ASCENDING_ICON = 'su-angle-up';
const DESCENDING_ICON = 'su-angle-down';
class HeaderCell extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getSortOrderIcon = () => {
            const { sortOrder } = this.props;
            switch (sortOrder) {
                case 'asc':
                    return (<Icon_1.default className={table_scss_1.default.headerCellSortIcon} name={ASCENDING_ICON}/>);
                case 'desc':
                    return (<Icon_1.default className={table_scss_1.default.headerCellSortIcon} name={DESCENDING_ICON}/>);
                default:
                    return null;
            }
        };
        this.handleOnClick = () => {
            const { name, onClick, sortOrder } = this.props;
            if (onClick && name) {
                onClick(name, sortOrder === 'asc' ? 'desc' : 'asc');
            }
        };
    }
    render() {
        const { onClick, children, className, width, } = this.props;
        const headerCellClass = (0, classnames_1.default)(className, table_scss_1.default.headerCell, {
            [table_scss_1.default.clickable]: !!onClick,
        }, {
            [table_scss_1.default[width]]: width !== 'auto',
        });
        return (<th className={headerCellClass}>
                {!onClick &&
                <span>{children}</span>}
                {onClick &&
                <button onClick={this.handleOnClick} type="button">
                        {children}
                        {this.getSortOrderIcon()}
                    </button>}
            </th>);
    }
}
HeaderCell.defaultProps = {
    width: 'auto',
};
exports.default = HeaderCell;
