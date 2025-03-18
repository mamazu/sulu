"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class CheckboxGroup extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (checked, changedValue) => {
            const { onChange, values } = this.props;
            if (checked && changedValue) {
                onChange([...values, changedValue]);
            }
            else {
                onChange(values.filter((value) => value !== changedValue));
            }
        };
    }
    render() {
        const { className, disabled, values } = this.props;
        return (<div className={className}>
                {react_1.default.Children.map(this.props.children, (child) => {
                return react_1.default.cloneElement(child, {
                    checked: values.includes(child.props.value),
                    disabled,
                    onChange: this.handleChange,
                });
            })}
            </div>);
    }
}
CheckboxGroup.defaultProps = {
    disabled: false,
};
exports.default = CheckboxGroup;
