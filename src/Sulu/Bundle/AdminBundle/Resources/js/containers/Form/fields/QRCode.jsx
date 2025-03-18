"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const QRCode_1 = __importDefault(require("../../../components/QRCode"));
class Input extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleBlur = () => {
            this.props.onFinish();
        };
    }
    render() {
        const { dataPath, error, disabled, onChange, value, } = this.props;
        return (<QRCode_1.default disabled={!!disabled} id={dataPath} onBlur={this.handleBlur} onChange={onChange} valid={!error} value={value}/>);
    }
}
exports.default = Input;
