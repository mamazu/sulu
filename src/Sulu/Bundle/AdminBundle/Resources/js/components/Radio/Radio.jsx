"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Switch_1 = __importDefault(require("../Switch"));
const radio_scss_1 = __importDefault(require("./radio.scss"));
class Radio extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (checked, value) => {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
    }
    render() {
        const { disabled, name, value, checked, children, } = this.props;
        const radioClass = (0, classnames_1.default)(radio_scss_1.default.radio, radio_scss_1.default[this.props.skin], {
            [radio_scss_1.default.disabled]: disabled,
        });
        return (<Switch_1.default checked={checked} className={radioClass} disabled={disabled} name={name} onChange={this.handleChange} type="radio" value={value}>
                {children}
            </Switch_1.default>);
    }
}
Radio.defaultProps = {
    checked: false,
    disabled: false,
    skin: 'dark',
};
exports.default = Radio;
