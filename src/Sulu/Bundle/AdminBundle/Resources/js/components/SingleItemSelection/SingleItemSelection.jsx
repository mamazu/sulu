"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Loader_1 = __importDefault(require("../Loader/Loader"));
const singleItemSelection_scss_1 = __importDefault(require("./singleItemSelection.scss"));
const Button_1 = __importDefault(require("./Button"));
class SingleItemSelection extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleItemClick = () => {
            const { id, onItemClick, value } = this.props;
            if (onItemClick && id) {
                onItemClick(id, value);
            }
        };
    }
    render() {
        const { allowRemoveWhileItemDisabled, children, className, disabled, itemDisabled, emptyText, leftButton, loading, onItemClick, onRemove, rightButton, valid, } = this.props;
        const singleItemSelectionClass = (0, classnames_1.default)(singleItemSelection_scss_1.default.singleItemSelection, className, {
            [singleItemSelection_scss_1.default.error]: !valid,
            [singleItemSelection_scss_1.default.disabled]: disabled || itemDisabled,
        });
        const itemClass = (0, classnames_1.default)(singleItemSelection_scss_1.default.item, {
            [singleItemSelection_scss_1.default.clickable]: !!onItemClick,
        });
        return (<div className={singleItemSelectionClass}>
                <Button_1.default {...leftButton} disabled={disabled || itemDisabled} location="left"/>
                <div className={singleItemSelection_scss_1.default.itemContainer}>
                    <div className={itemClass} onClick={this.handleItemClick} role="button">
                        {children
                ? children
                : <div className={singleItemSelection_scss_1.default.empty}>
                                {loading ? '…' : emptyText}
                            </div>}
                    </div>
                    {onRemove && !loading && !disabled && (!itemDisabled || allowRemoveWhileItemDisabled) &&
                <button className={singleItemSelection_scss_1.default.removeButton} onClick={onRemove} type="button">
                            <Icon_1.default name="su-trash-alt"/>
                        </button>}
                    {loading &&
                <Loader_1.default className={singleItemSelection_scss_1.default.loader} size={14}/>}
                </div>
                {rightButton &&
                <Button_1.default {...rightButton} disabled={disabled || itemDisabled} location="right"/>}
            </div>);
    }
}
SingleItemSelection.defaultProps = {
    allowRemoveWhileItemDisabled: false,
    disabled: false,
    itemDisabled: false,
    loading: false,
    valid: true,
};
exports.default = SingleItemSelection;
