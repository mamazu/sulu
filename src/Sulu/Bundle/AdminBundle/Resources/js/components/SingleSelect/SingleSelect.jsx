"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("../Select"));
const Translator_1 = require("../../utils/Translator");
class SingleSelect extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.isOptionSelected = (option) => {
            return option.props.value === this.props.value && !option.props.disabled;
        };
        this.handleSelect = (value) => {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
    }
    get displayValue() {
        let displayValue = (0, Translator_1.translate)('sulu_admin.please_choose');
        react_1.default.Children.forEach(this.props.children, (child) => {
            if (!child || child.type !== SingleSelect.Option) {
                return;
            }
            if (this.props.value == child.props.value) {
                displayValue = child.props.children;
            }
        });
        return displayValue;
    }
    render() {
        const { children, disabled, icon, skin } = this.props;
        return (<Select_1.default disabled={disabled} displayValue={this.displayValue} icon={icon} isOptionSelected={this.isOptionSelected} onSelect={this.handleSelect} skin={skin}>
                {children}
            </Select_1.default>);
    }
}
SingleSelect.defaultProps = {
    disabled: false,
    skin: 'default',
};
SingleSelect.Action = Select_1.default.Action;
SingleSelect.Option = Select_1.default.Option;
SingleSelect.Divider = Select_1.default.Divider;
exports.default = SingleSelect;
