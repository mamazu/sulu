"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("../Select"));
const Translator_1 = require("../../utils/Translator");
class MultiSelect extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.isOptionSelected = (option) => {
            return this.props.values.includes(option.props.value);
        };
        this.handleSelect = (value) => {
            const newValues = [...this.props.values];
            const index = newValues.indexOf(value);
            if (index === -1) {
                newValues.push(value);
            }
            else {
                newValues.splice(index, 1);
            }
            this.props.onChange(newValues);
        };
    }
    get displayValue() {
        const selectedValues = [];
        let countOptions = 0;
        react_1.default.Children.forEach(this.props.children, (child) => {
            if (child.type !== MultiSelect.Option) {
                return;
            }
            countOptions += 1;
            if (this.isOptionSelected(child)) {
                let selectedValue = child.props.children;
                if (typeof selectedValue !== 'string') {
                    selectedValue = selectedValue.toString();
                }
                selectedValues.push(selectedValue);
            }
        });
        if (selectedValues.length === 0) {
            const { noneSelectedText } = this.props;
            return noneSelectedText ? noneSelectedText : (0, Translator_1.translate)('sulu_admin.none_selected');
        }
        if (selectedValues.length === countOptions) {
            const { allSelectedText } = this.props;
            return allSelectedText ? allSelectedText : (0, Translator_1.translate)('sulu_admin.all_selected');
        }
        return selectedValues.join(', ');
    }
    render() {
        const { children, disabled, icon, onClose, skin } = this.props;
        return (<Select_1.default closeOnSelect={false} disabled={disabled} displayValue={this.displayValue} icon={icon} isOptionSelected={this.isOptionSelected} onClose={onClose} onSelect={this.handleSelect} selectedVisualization="checkbox" skin={skin}>
                {children}
            </Select_1.default>);
    }
}
MultiSelect.defaultProps = {
    disabled: false,
    skin: 'default',
    values: [],
};
MultiSelect.Action = Select_1.default.Action;
MultiSelect.Option = Select_1.default.Option;
MultiSelect.Divider = Select_1.default.Divider;
exports.default = MultiSelect;
