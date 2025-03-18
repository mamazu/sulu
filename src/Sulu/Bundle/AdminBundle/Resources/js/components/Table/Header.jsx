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
const Checkbox_1 = __importDefault(require("../Checkbox"));
const Icon_1 = __importDefault(require("../Icon"));
const HeaderCell_1 = __importDefault(require("./HeaderCell"));
const table_scss_1 = __importDefault(require("./table.scss"));
class Header extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.isMultipleSelect = () => {
            return this.props.selectMode === 'multiple';
        };
        this.isSingleSelect = () => {
            return this.props.selectMode === 'single';
        };
        this.createHeader = (originalCells) => {
            const { buttons, selectInFirstCell } = this.props;
            const prependCells = [];
            const cells = this.createHeaderCells(originalCells);
            if (buttons && buttons.length > 0) {
                const buttonCells = this.createHeaderButtonCells();
                if (buttonCells) {
                    prependCells.push(...buttonCells);
                }
            }
            if (!selectInFirstCell) {
                if (this.isMultipleSelect()) {
                    prependCells.push(this.createCheckboxCell());
                }
                else if (this.isSingleSelect()) {
                    prependCells.push(this.createEmptyCell());
                }
            }
            cells.unshift(...prependCells);
            return cells;
        };
        this.createHeaderCells = (headerCells) => {
            return react_1.default.Children.map(headerCells, (headerCell, index) => {
                const key = `header-${index}`;
                const { props } = headerCell;
                let { children } = props;
                if (index === 0) {
                    children = this.createFirstCell(children);
                }
                return react_1.default.cloneElement(headerCell, Object.assign(Object.assign({}, props), { key,
                    children }));
            });
        };
        this.createFirstCell = (children) => {
            const { allSelected, selectInFirstCell, onAllSelectionChange, skin } = this.props;
            if (!selectInFirstCell || !this.isMultipleSelect() || !onAllSelectionChange) {
                return children;
            }
            return (<react_1.Fragment>
                <span className={table_scss_1.default.cellSelect}>
                    <Checkbox_1.default checked={allSelected} onChange={this.handleAllSelectionChange} skin={skin === 'dark' ? 'light' : 'dark'}/>
                </span>
                {children}
            </react_1.Fragment>);
        };
        this.createHeaderButtonCells = () => {
            const { buttons } = this.props;
            if (!buttons) {
                return null;
            }
            return buttons.map((button, index) => {
                const key = `header-button-${index}`;
                return (<HeaderCell_1.default className={table_scss_1.default.headerButtonCell} key={key}>
                    <Icon_1.default name={button.icon}/>
                </HeaderCell_1.default>);
            });
        };
        this.createCheckboxCell = () => {
            const { skin } = this.props;
            return (<HeaderCell_1.default key="header-checkbox">
                <Checkbox_1.default checked={this.props.allSelected} onChange={this.handleAllSelectionChange} skin={skin === 'dark' ? 'light' : 'dark'}/>
            </HeaderCell_1.default>);
        };
        this.createEmptyCell = () => {
            const key = 'header-empty';
            return (<HeaderCell_1.default key={key}/>);
        };
        this.handleAllSelectionChange = (checked) => {
            const { onAllSelectionChange } = this.props;
            if (onAllSelectionChange) {
                onAllSelectionChange(checked);
            }
        };
    }
    render() {
        const { children, } = this.props;
        const cells = this.createHeader(children);
        return (<thead className={table_scss_1.default.header}>
                <tr>
                    {cells}
                </tr>
            </thead>);
    }
}
Header.defaultProps = {
    allSelected: false,
    selectInFirstCell: false,
    selectMode: 'none',
    skin: 'dark',
};
exports.default = Header;
