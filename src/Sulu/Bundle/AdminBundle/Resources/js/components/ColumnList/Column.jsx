"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Loader_1 = __importDefault(require("../Loader"));
const column_scss_1 = __importDefault(require("./column.scss"));
class Column extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.cloneItems = (originalItems) => {
            if (!originalItems) {
                return null;
            }
            const { onItemClick, onItemDoubleClick } = this.props;
            return react_1.default.Children.map(originalItems, (column) => {
                return react_1.default.cloneElement(column, {
                    onClick: onItemClick,
                    onDoubleClick: onItemDoubleClick,
                });
            });
        };
        this.handleMouseEnter = () => {
            const { index, onActive } = this.props;
            if (!onActive) {
                return;
            }
            onActive(index);
        };
    }
    render() {
        const { children, loading, scrolling } = this.props;
        const columnClass = (0, classnames_1.default)(column_scss_1.default.column, {
            [column_scss_1.default.scrolling]: scrolling,
        });
        return (<div className={columnClass} onMouseEnter={this.handleMouseEnter} role="button">
                {loading ?
                <div className={column_scss_1.default.loader}>
                        <Loader_1.default />
                    </div>
                : this.cloneItems(children)}
            </div>);
    }
}
Column.defaultProps = {
    loading: false,
    scrolling: false,
};
exports.default = Column;
