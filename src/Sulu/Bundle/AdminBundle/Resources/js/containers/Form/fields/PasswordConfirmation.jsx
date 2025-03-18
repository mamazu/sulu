"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PasswordConfirmation_1 = __importDefault(require("../../../components/PasswordConfirmation"));
class PasswordConfirmation extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onFinish, onChange } = this.props;
            onChange(value);
            onFinish();
        };
    }
    render() {
        const { disabled, error } = this.props;
        return <PasswordConfirmation_1.default disabled={!!disabled} onChange={this.handleChange} valid={!error}/>;
    }
}
exports.default = PasswordConfirmation;
