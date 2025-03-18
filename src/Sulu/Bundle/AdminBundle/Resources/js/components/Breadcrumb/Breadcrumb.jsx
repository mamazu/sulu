"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const Item_1 = __importDefault(require("./Item"));
const breadcrumb_scss_1 = __importDefault(require("./breadcrumb.scss"));
const ICON_ANGLE_RIGHT = 'su-angle-right';
class Breadcrumb extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleItemClick = (value) => {
            const { onItemClick } = this.props;
            if (onItemClick) {
                onItemClick(value);
            }
        };
    }
    createItems(originalItems) {
        const childrenCount = react_1.default.Children.count(originalItems);
        return react_1.default.Children.map(originalItems, (item, index) => {
            const lastItem = (index === childrenCount - 1);
            return (<li>
                    {react_1.default.cloneElement(item, {
                    value: item.props.value,
                    onClick: (!lastItem) ? this.handleItemClick : undefined,
                })}
                    {!lastItem &&
                    <Icon_1.default className={breadcrumb_scss_1.default.arrow} name={ICON_ANGLE_RIGHT}/>}
                </li>);
        });
    }
    render() {
        const { children, } = this.props;
        const items = this.createItems(children);
        return (<ul className={breadcrumb_scss_1.default.breadcrumb}>
                {items}
            </ul>);
    }
}
Breadcrumb.Item = Item_1.default;
exports.default = Breadcrumb;
