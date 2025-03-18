"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
class SingleSelect extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, options: { name, }, } = this.props;
            onChange({ [name]: value });
        };
    }
    render() {
        const { options: { name, options, }, value, } = this.props;
        return (<components_1.SingleSelect onChange={this.handleChange} value={value[name]}>
                {options.map((option) => (<components_1.SingleSelect.Option key={option.id} value={option.id}>
                        {option.name}
                    </components_1.SingleSelect.Option>))}
            </components_1.SingleSelect>);
    }
}
exports.default = SingleSelect;
