"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const SingleSelect_1 = __importDefault(require("../../../components/SingleSelect"));
class SingleSelect extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
        const { onChange, schemaOptions, value } = this.props;
        const { default_value: { value: defaultValue, } = {}, } = schemaOptions;
        if (defaultValue === undefined || defaultValue === null || defaultValue === '') {
            return;
        }
        if (typeof defaultValue !== 'number' && typeof defaultValue !== 'string') {
            throw new Error('The "default_value" schema option must be a string or a number!');
        }
        if (value === undefined) {
            onChange(defaultValue, { isDefaultValue: true });
        }
    }
    render() {
        const { schemaOptions, disabled, value } = this.props;
        const values = (0, mobx_1.toJS)(schemaOptions.values);
        if (!values || !(0, mobx_1.isArrayLike)(values.value)) {
            throw new Error('The "values" schema option of the SingleSelect field-type must be an array!');
        }
        return (<SingleSelect_1.default disabled={!!disabled} onChange={this.handleChange} value={value}>
                {/*$FlowFixMe: flow does not recognize that isArrayLike(value) means that value is an array*/}
                {values.value.map(({ name: value, title }, index) => {
                if (typeof value !== 'string' && typeof value !== 'number' && value !== undefined) {
                    throw new Error('The children of "values" must only contain values of type string, number or undefined!');
                }
                // it is not possible to define a param without a name in a form xml. to allow for creating an
                // empty option, we use undefined as value if the name of a param is an empty string in the xml
                const normalizedValue = value === '' ? undefined : value;
                return (<SingleSelect_1.default.Option key={index} value={normalizedValue}>
                            {title || value}
                        </SingleSelect_1.default.Option>);
            })}
            </SingleSelect_1.default>);
    }
}
exports.default = SingleSelect;
