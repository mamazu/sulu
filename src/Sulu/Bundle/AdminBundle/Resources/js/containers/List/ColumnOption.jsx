"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const Icon_1 = __importDefault(require("../../components/Icon"));
const columnOptions_scss_1 = __importDefault(require("./columnOptions.scss"));
const DRAG_ICON = 'su-more';
const DragHandle = (0, react_sortable_hoc_1.SortableHandle)(() => {
    return (<span className={columnOptions_scss_1.default.dragHandle}>
            <Icon_1.default name={DRAG_ICON}/>
        </span>);
});
class ColumnOption extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleIconClick = () => {
            const { onChange, schemaKey, visibility, } = this.props;
            onChange(visibility === 'yes' ? 'no' : 'yes', schemaKey);
        };
    }
    render() {
        const { label, visibility, } = this.props;
        const className = (0, classnames_1.default)(columnOptions_scss_1.default.columnOption, {
            [columnOptions_scss_1.default.columnOptionDisabled]: visibility === 'no',
        });
        return (<div className={className}>
                <DragHandle />
                <span className={columnOptions_scss_1.default.label}>{label}</span>
                {visibility !== 'always' &&
                <Icon_1.default className={columnOptions_scss_1.default.icon} name="su-eye" onClick={this.handleIconClick}/>}
            </div>);
    }
}
exports.default = ColumnOption;
