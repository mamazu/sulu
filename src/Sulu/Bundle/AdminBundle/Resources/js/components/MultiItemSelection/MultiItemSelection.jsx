"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const classnames_1 = __importDefault(require("classnames"));
const Header_1 = __importDefault(require("./Header"));
const Item_1 = __importDefault(require("./Item"));
const multiItemSelection_scss_1 = __importDefault(require("./multiItemSelection.scss"));
// Cannot use `disabled`, because that doesn't get passed down by SortableElement hoc
const ItemWrapper = ({ children, isDisabled: disabled, }) => {
    const listElementClass = (0, classnames_1.default)(multiItemSelection_scss_1.default.listElement, {
        [multiItemSelection_scss_1.default.disabled]: disabled,
    });
    return (<li className={listElementClass}>
            {children}
        </li>);
};
const SortableItemWrapper = (0, react_sortable_hoc_1.SortableElement)(ItemWrapper);
const ListWrapper = ({ children, }) => (<ul className={multiItemSelection_scss_1.default.list}>
        {children}
    </ul>);
const SortableListWrapper = (0, react_sortable_hoc_1.SortableContainer)(ListWrapper);
class MultiItemSelection extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleItemEdit = (itemId) => {
            const { onItemEdit } = this.props;
            if (onItemEdit) {
                onItemEdit(itemId);
            }
        };
        this.handleItemRemove = (itemId) => {
            const { onItemRemove } = this.props;
            if (onItemRemove) {
                onItemRemove(itemId);
            }
        };
        this.handleItemsSorted = ({ newIndex, oldIndex, }) => {
            const { onItemsSorted } = this.props;
            if (onItemsSorted) {
                onItemsSorted(oldIndex, newIndex);
            }
        };
    }
    render() {
        const { disabled, children, label, leftButton, loading, rightButton, onItemClick, onItemEdit, onItemRemove, sortable, } = this.props;
        const emptyList = !react_1.default.Children.count(children);
        const ItemWrapperComponent = sortable ? SortableItemWrapper : ItemWrapper;
        const ListWrapperComponent = sortable ? SortableListWrapper : ListWrapper;
        const multiItemSelectionClass = (0, classnames_1.default)(multiItemSelection_scss_1.default.multiItemSelectionClass, {
            [multiItemSelection_scss_1.default.disabled]: disabled,
        });
        return (<div className={multiItemSelectionClass}>
                <Header_1.default disabled={disabled} emptyList={emptyList} label={label} leftButton={leftButton ? Object.assign({ disabled }, leftButton) : undefined} loading={loading} rightButton={rightButton ? Object.assign({ disabled }, rightButton) : undefined}/>
                <ListWrapperComponent axis="y" helperClass={multiItemSelection_scss_1.default.dragging} lockAxis="y" onSortEnd={this.handleItemsSorted} useDragHandle={true}>
                    {children && react_1.default.Children.map(children, (item, index) => (<ItemWrapperComponent index={index} isDisabled={disabled}>
                            {react_1.default.cloneElement(item, Object.assign(Object.assign({}, item.props), { onClick: onItemClick ? onItemClick : item.props.onClick, onEdit: onItemEdit ? this.handleItemEdit : item.props.onEdit, onRemove: onItemRemove ? this.handleItemRemove : item.props.onRemove, sortable }))}
                        </ItemWrapperComponent>))}
                </ListWrapperComponent>
            </div>);
    }
}
MultiItemSelection.defaultProps = {
    disabled: false,
    loading: false,
    sortable: true,
};
MultiItemSelection.Item = Item_1.default;
exports.default = MultiItemSelection;
