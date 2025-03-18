"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const item_scss_1 = __importDefault(require("./item.scss"));
class Item extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { onClick, value } = this.props;
            if (!onClick) {
                return;
            }
            onClick(value);
        };
    }
    render() {
        const { title, children, expanded, icon } = this.props;
        let { active } = this.props;
        // check for active children
        if (children) {
            react_1.default.Children.forEach(children, (child) => {
                if (child.props.active) {
                    active = true;
                }
            });
        }
        const itemClass = (0, classnames_1.default)(item_scss_1.default.item, {
            [item_scss_1.default.active]: active,
        });
        return (<div className={itemClass}>
                <button className={item_scss_1.default.title} onClick={this.handleClick} type="button">
                    {icon && <Icon_1.default className={item_scss_1.default.icon} name={icon}/>}
                    <span className={item_scss_1.default.text}>{title}</span>
                    {children &&
                <Icon_1.default className={item_scss_1.default.childrenIndicator} name={expanded ? 'su-angle-down' : 'su-angle-right'}/>}
                </button>

                {expanded && children &&
                <div>{children}</div>}
            </div>);
    }
}
exports.default = Item;
