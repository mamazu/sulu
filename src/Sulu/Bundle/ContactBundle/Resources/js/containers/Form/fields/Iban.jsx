"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Iban_1 = __importDefault(require("../../../components/Iban"));
class Iban extends react_1.default.Component {
    render() {
        const { dataPath, disabled, error, onChange, onFinish, value } = this.props;
        return (<Iban_1.default disabled={!!disabled} id={dataPath} onBlur={onFinish} onChange={onChange} valid={!error} value={value}/>);
    }
}
exports.default = Iban;
