"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Section_1 = __importDefault(require("./Section"));
class SingleItemSection extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleItemClick = (value) => {
            this.props.onChange(value);
        };
        this.cloneChildren = (items) => {
            const { value, icon } = this.props;
            return react_1.default.Children.map(items, (item) => {
                if (!item) {
                    return null;
                }
                return react_1.default.cloneElement(item, {
                    active: value === item.props.value,
                    onClick: this.handleItemClick,
                    icon,
                });
            });
        };
    }
    render() {
        const { title, children, } = this.props;
        return (<Section_1.default title={title}>
                {this.cloneChildren(children)}
            </Section_1.default>);
    }
}
SingleItemSection.defaultProps = {
    icon: 'su-check',
};
exports.default = SingleItemSection;
