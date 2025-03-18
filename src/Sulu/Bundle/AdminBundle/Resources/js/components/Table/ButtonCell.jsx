"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const Cell_1 = __importDefault(require("./Cell"));
const table_scss_1 = __importDefault(require("./table.scss"));
class ButtonCell extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { rowIndex, onClick, rowId } = this.props;
            if (onClick) {
                onClick(rowId, rowIndex);
            }
        };
    }
    render() {
        const { disabled, icon, } = this.props;
        return (<Cell_1.default className={table_scss_1.default.buttonCell}>
                <button disabled={disabled} onClick={this.handleClick} type="button">
                    <Icon_1.default name={icon}/>
                </button>
            </Cell_1.default>);
    }
}
ButtonCell.defaultProps = {
    disabled: false,
};
exports.default = ButtonCell;
