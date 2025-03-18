"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const item_scss_1 = __importDefault(require("./item.scss"));
const DRAG_ICON = 'su-more';
class Item extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleEdit = () => {
            const { id, onEdit } = this.props;
            if (onEdit) {
                onEdit(id);
            }
        };
        this.handleRemove = () => {
            const { id, onRemove } = this.props;
            if (onRemove) {
                onRemove(id);
            }
        };
        this.handleClick = () => {
            const { id, onClick, value } = this.props;
            if (onClick) {
                onClick(id, value);
            }
        };
    }
    createDragHandle() {
        const { sortable } = this.props;
        const handle = ({ className, children, }) => (<span className={className}>{children}</span>);
        if (!sortable) {
            return handle;
        }
        return (0, react_sortable_hoc_1.SortableHandle)(handle);
    }
    render() {
        const { allowRemoveWhileDisabled, children, disabled, index, onClick, onEdit, onRemove, sortable, } = this.props;
        const DragHandle = this.createDragHandle();
        const itemClass = (0, classnames_1.default)(item_scss_1.default.item, {
            [item_scss_1.default.disabled]: disabled,
        });
        const itemContentClass = (0, classnames_1.default)(item_scss_1.default.content, {
            [item_scss_1.default.clickable]: onClick,
        });
        const dragHandleClass = (0, classnames_1.default)(item_scss_1.default.dragHandle, {
            [item_scss_1.default.sortable]: sortable,
        });
        return (<div className={itemClass}>
                <DragHandle className={dragHandleClass}>
                    {sortable && <Icon_1.default name={DRAG_ICON}/>}
                    <span className={item_scss_1.default.index}>{index}</span>
                </DragHandle>
                {onClick ?
                <div className={itemContentClass} onClick={this.handleClick} role="button">
                            {children}
                        </div>
                : <div className={itemContentClass}>
                            {children}
                        </div>}
                <div className={item_scss_1.default.buttons}>
                    {onEdit && !disabled &&
                <button className={item_scss_1.default.button} onClick={this.handleEdit} type="button">
                            <Icon_1.default name="su-pen"/>
                        </button>}
                    {onRemove && (!disabled || allowRemoveWhileDisabled) &&
                <button className={item_scss_1.default.button} onClick={this.handleRemove} type="button">
                            <Icon_1.default name="su-trash-alt"/>
                        </button>}
                </div>
            </div>);
    }
}
Item.defaultProps = {
    allowRemoveWhileDisabled: false,
    disabled: false,
    sortable: true,
};
exports.default = Item;
