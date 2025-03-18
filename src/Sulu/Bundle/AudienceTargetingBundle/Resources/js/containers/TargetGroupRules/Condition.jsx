"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const ruleRegistry_1 = __importDefault(require("./registries/ruleRegistry"));
const ruleTypeRegistry_1 = __importDefault(require("./registries/ruleTypeRegistry"));
const condition_scss_1 = __importDefault(require("./condition.scss"));
class Condition extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleRuleTypeChange = (rule) => {
            const { index, onChange, value } = this.props;
            onChange(Object.assign(Object.assign({}, value), { type: rule }), index);
        };
        this.handleRuleChange = (condition) => {
            const { index, onChange, value } = this.props;
            onChange(Object.assign(Object.assign({}, value), { condition }), index);
        };
        this.handleRemove = () => {
            const { index, onRemove } = this.props;
            onRemove(index);
        };
    }
    render() {
        const { value } = this.props;
        const type = value.type ? ruleRegistry_1.default.get(value.type).type : undefined;
        const RuleType = type ? ruleTypeRegistry_1.default.get(type.name) : undefined;
        return (<div className={condition_scss_1.default.conditionContainer}>
                <div className={condition_scss_1.default.condition}>
                    <div className={condition_scss_1.default.select}>
                        <components_1.SingleSelect onChange={this.handleRuleTypeChange} value={value.type}>
                            {Object.keys(ruleRegistry_1.default.getAll()).map((ruleKey) => (<components_1.SingleSelect.Option key={ruleKey} value={ruleKey}>
                                    {ruleRegistry_1.default.get(ruleKey).name}
                                </components_1.SingleSelect.Option>))}
                        </components_1.SingleSelect>
                    </div>
                    <div className={condition_scss_1.default.type}>
                        {!!RuleType &&
                <RuleType onChange={this.handleRuleChange} options={type && type.options} value={value.condition}/>}
                    </div>
                </div>
                <components_1.Button className={condition_scss_1.default.icon} icon="su-trash-alt" onClick={this.handleRemove} skin="icon"/>
            </div>);
    }
}
exports.default = Condition;
