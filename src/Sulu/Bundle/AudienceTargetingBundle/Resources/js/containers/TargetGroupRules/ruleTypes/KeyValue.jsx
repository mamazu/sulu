"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const keyValue_scss_1 = __importDefault(require("./keyValue.scss"));
class KeyValue extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleParameterChange = (parameter) => {
            const { onChange, options } = this.props;
            onChange(Object.assign(Object.assign({}, this.props.value), { [options.keyName]: parameter }));
        };
        this.handleValueChange = (value) => {
            const { onChange, options } = this.props;
            onChange(Object.assign(Object.assign({}, this.props.value), { [options.valueName]: value }));
        };
    }
    render() {
        const { options, value } = this.props;
        const { keyName, keyPlaceholder, valueName, valuePlaceholder } = options;
        return (<div className={keyValue_scss_1.default.inputs}>
                <components_1.Input onChange={this.handleParameterChange} placeholder={keyPlaceholder} value={value[keyName]}/>
                <components_1.Input onChange={this.handleValueChange} placeholder={valuePlaceholder} value={value[valueName]}/>
            </div>);
    }
}
exports.default = KeyValue;
