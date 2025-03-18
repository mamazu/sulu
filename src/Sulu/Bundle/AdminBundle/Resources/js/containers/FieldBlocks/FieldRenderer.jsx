"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Form_1 = require("../Form");
class FieldRenderer extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (name, value) => {
            const { index, onChange } = this.props;
            onChange(index, name, value);
        };
    }
    render() {
        const { data, dataPath, errors, formInspector, onFieldFinish, onSuccess, router, schema, schemaPath, showAllErrors, value, } = this.props;
        return (<Form_1.Renderer data={data} dataPath={dataPath} errors={errors} formInspector={formInspector} onChange={this.handleChange} onFieldFinish={onFieldFinish} onSuccess={onSuccess} router={router} schema={schema} schemaPath={schemaPath} showAllErrors={showAllErrors} value={value}/>);
    }
}
FieldRenderer.defaultProps = {
    showAllErrors: false,
};
exports.default = FieldRenderer;
