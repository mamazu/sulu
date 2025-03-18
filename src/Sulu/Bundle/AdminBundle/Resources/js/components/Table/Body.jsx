"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Body extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.cloneRows = (originalRows) => {
            if (!originalRows) {
                return undefined;
            }
            const { buttons, selectMode } = this.props;
            return react_1.default.Children.map(originalRows, (row, index) => react_1.default.cloneElement(row, Object.assign(Object.assign({ buttons }, row.props), { key: `body-row-${index}`, rowIndex: index, selectMode, selectInFirstCell: this.props.selectInFirstCell, onSelectionChange: this.props.onRowSelectionChange ? this.handleRowSelectionChange : undefined, onExpand: this.handleRowExpand, onCollapse: this.handleRowCollapse })));
        };
        this.handleRowSelectionChange = (rowId, selected) => {
            const { onRowSelectionChange } = this.props;
            if (onRowSelectionChange) {
                onRowSelectionChange(rowId, selected);
            }
        };
        this.handleRowExpand = (rowId) => {
            const { onRowExpand } = this.props;
            if (onRowExpand) {
                onRowExpand(rowId);
            }
        };
        this.handleRowCollapse = (rowId) => {
            const { onRowCollapse } = this.props;
            if (onRowCollapse) {
                onRowCollapse(rowId);
            }
        };
    }
    render() {
        const { children } = this.props;
        const rows = this.cloneRows(children);
        return (<tbody>
                {rows}
            </tbody>);
    }
}
Body.defaultProps = {
    selectInFirstCell: false,
    selectMode: 'none',
};
exports.default = Body;
