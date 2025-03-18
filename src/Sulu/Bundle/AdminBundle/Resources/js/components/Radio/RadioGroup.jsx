"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class RadioGroup extends react_1.default.PureComponent {
    render() {
        return (<div className={this.props.className}>
                {react_1.default.Children.map(this.props.children, (child) => {
                return react_1.default.cloneElement(child, {
                    checked: !!this.props.value && child.props.value === this.props.value,
                    disabled: this.props.disabled,
                    onChange: this.props.onChange,
                });
            })}
            </div>);
    }
}
RadioGroup.defaultProps = {
    disabled: false,
};
exports.default = RadioGroup;
