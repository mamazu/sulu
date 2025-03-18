"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const Url_1 = __importDefault(require("../../../components/Url"));
class Url extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleBlur = () => {
            this.props.onFinish();
        };
        const { onChange, schemaOptions: { defaults: { value: unvalidatedDefaults, } = {}, } = {}, value, } = this.props;
        if (unvalidatedDefaults !== undefined && !(0, mobx_1.isArrayLike)(unvalidatedDefaults)) {
            throw new Error('The "defaults" schema option must be an array!');
        }
        const defaults = unvalidatedDefaults;
        const defaultSchemeOption = defaults && defaults.find((defaultOption) => defaultOption.name === 'scheme');
        const defaultSpecificPartOption = defaults && defaults.find((defaultOption) => defaultOption.name === 'specific_part');
        if (value || !defaultSpecificPartOption) {
            return;
        }
        if (!defaultSchemeOption) {
            throw new Error('It is not allowed to set a default URL without a scheme!');
        }
        if (typeof defaultSchemeOption.value !== 'string') {
            throw new Error('The "scheme" default must be a string if set!');
        }
        if (typeof defaultSpecificPartOption.value !== 'string') {
            throw new Error('The "specific_part" default must be a string if set!');
        }
        onChange(defaultSchemeOption.value + defaultSpecificPartOption.value, { isDefaultValue: true });
    }
    render() {
        const { dataPath, disabled, error, onChange, schemaOptions: { defaults: { value: defaults = [], } = {}, schemes: { value: unvalidatedSchemes = undefined, } = {}, } = {}, value, } = this.props;
        let protocols = undefined;
        if (unvalidatedSchemes) {
            if (!(0, mobx_1.isArrayLike)(unvalidatedSchemes)) {
                throw new Error('The "schemes" schema option must be an array!');
            }
            const schemes = unvalidatedSchemes;
            if (schemes.length === 0) {
                throw new Error('The "schemes" schema option must contain some values!');
            }
            protocols = schemes.map((scheme) => {
                if (typeof scheme.name !== 'string') {
                    throw new Error('Every schema in the "schemes" schemaOption must contain a string string name');
                }
                return scheme.name;
            });
        }
        if (!(0, mobx_1.isArrayLike)(defaults)) {
            throw new Error('The "defaults" schema option must be an array!');
        }
        let defaultProtocol = protocols ? protocols[0] : undefined;
        const defaultScheme = defaults.find((defaultOption) => defaultOption.name === 'scheme');
        if (defaultScheme && defaultScheme.value) {
            if (typeof defaultScheme.value !== 'string') {
                throw new Error('The "scheme" value of the "defaults" schema option must be a string!');
            }
            defaultProtocol = defaultScheme.value;
        }
        return (<Url_1.default defaultProtocol={defaultProtocol} disabled={!!disabled} id={dataPath} onBlur={this.handleBlur} onChange={onChange} protocols={protocols} valid={!error} value={value}/>);
    }
}
exports.default = Url;
