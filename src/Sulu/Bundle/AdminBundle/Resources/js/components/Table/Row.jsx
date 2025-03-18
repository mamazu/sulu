"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
const Radio_1 = require("../Radio");
const Icon_1 = __importDefault(require("../Icon/Icon"));
const Loader_1 = __importDefault(require("../Loader/Loader"));
const ButtonCell_1 = __importDefault(require("./ButtonCell"));
const Cell_1 = __importDefault(require("./Cell"));
const table_scss_1 = __importDefault(require("./table.scss"));
class Row extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getIdentifier = () => {
            const { id, rowIndex } = this.props;
            return id || rowIndex;
        };
        this.isMultipleSelect = () => {
            return this.props.selectMode === 'multiple';
        };
        this.isSingleSelect = () => {
            return this.props.selectMode === 'single';
        };
        this.createCells = (cells) => {
            const { buttons, selectInFirstCell } = this.props;
            const prependedCells = [];
            if (buttons && buttons.length > 0) {
                const createdItems = this.createButtonCells();
                if (createdItems) {
                    prependedCells.push(...createdItems);
                }
            }
            if (!selectInFirstCell) {
                const select = this.createSelect();
                if (select) {
                    prependedCells.push(<Cell_1.default key="choice" width="shrink">
                        {select}
                    </Cell_1.default>);
                }
            }
            const clonedCells = this.cloneCells(cells);
            clonedCells.unshift(prependedCells);
            return clonedCells;
        };
        this.cloneCells = (originalCells) => {
            return react_1.default.Children.map(originalCells, (cell, index) => {
                const key = `cell-${index}`;
                const { props } = cell;
                const firstCell = index === 0;
                const { depth } = this.props;
                let { children } = props;
                if (firstCell) {
                    children = this.createFirstCell(children);
                }
                return react_1.default.cloneElement(cell, Object.assign(Object.assign({}, props), { key,
                    children, depth: firstCell && depth ? depth : undefined }));
            });
        };
        this.createFirstCell = (children) => {
            const { hasChildren, selectInFirstCell, onSelectionChange } = this.props;
            return (<react_1.Fragment>
                {selectInFirstCell && onSelectionChange &&
                    <div className={table_scss_1.default.cellSelect}>
                        {this.createSelect()}
                    </div>}
                {hasChildren &&
                    this.createToggler()}
                {children}
            </react_1.Fragment>);
        };
        this.createSelect = () => {
            if (!this.props.onSelectionChange) {
                return null;
            }
            if (this.isSingleSelect()) {
                return this.createRadioCell();
            }
            else if (this.isMultipleSelect()) {
                return this.createCheckboxCell();
            }
        };
        this.createToggler = () => {
            const { isLoading, expanded } = this.props;
            return (<span className={table_scss_1.default.toggleIcon}>
                {isLoading
                    ? <Loader_1.default size={10}/>
                    : <Icon_1.default name={expanded === true ? 'su-angle-down' : 'su-angle-right'} onClick={expanded === false ? this.handleExpand : this.handleCollapse}/>}
            </span>);
        };
        this.createRadioCell = () => {
            const { selected } = this.props;
            return (<Radio_1.Radio checked={selected} onChange={this.handleSingleSelectionChange} skin="dark" value={this.getIdentifier()}/>);
        };
        this.createCheckboxCell = () => {
            const { selected } = this.props;
            return (<Checkbox_1.default checked={selected} onChange={this.handleMultipleSelectionChange} skin="dark" value={this.getIdentifier()}/>);
        };
        this.createButtonCells = () => {
            const { buttons, rowIndex } = this.props;
            if (!buttons) {
                return null;
            }
            return buttons.map((button, index) => {
                const key = `control-${rowIndex}-${index}`;
                const { disabled, icon, onClick } = button;
                return (<ButtonCell_1.default disabled={disabled} icon={icon} key={key} onClick={onClick} rowId={this.getIdentifier()} rowIndex={rowIndex}/>);
            });
        };
        this.handleCollapse = () => {
            const { onCollapse } = this.props;
            if (onCollapse) {
                onCollapse(this.getIdentifier());
            }
        };
        this.handleExpand = () => {
            const { onExpand } = this.props;
            if (onExpand) {
                onExpand(this.getIdentifier());
            }
        };
        this.handleSingleSelectionChange = (rowId) => {
            const { onSelectionChange } = this.props;
            if (onSelectionChange && rowId) {
                onSelectionChange(rowId);
            }
        };
        this.handleMultipleSelectionChange = (checked, rowId) => {
            const { onSelectionChange } = this.props;
            if (onSelectionChange && rowId !== null && rowId !== undefined) {
                onSelectionChange(rowId, checked);
            }
        };
    }
    render() {
        const { children, disabled, } = this.props;
        const listClass = (0, classnames_1.default)(table_scss_1.default.row, {
            [table_scss_1.default.disabled]: disabled,
        });
        const cells = this.createCells(children);
        return (<tr className={listClass}>
                {cells}
            </tr>);
    }
}
Row.defaultProps = {
    depth: 0,
    disabled: false,
    expanded: false,
    hasChildren: false,
    isLoading: false,
    rowIndex: 0,
    selected: false,
    selectInFirstCell: false,
};
exports.default = Row;
