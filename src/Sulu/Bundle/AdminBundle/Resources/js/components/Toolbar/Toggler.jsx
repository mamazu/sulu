"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Toggler_1 = __importDefault(require("../Toggler"));
const Button_1 = __importDefault(require("./Button"));
class Toggler extends react_1.default.Component {
    render() {
        const { disabled, label, loading, onClick, skin, value } = this.props;
        return (<Button_1.default disabled={disabled} loading={loading} onClick={onClick} skin={skin}>
                <Toggler_1.default checked={value} onChange={onClick}>
                    {label}
                </Toggler_1.default>
            </Button_1.default>);
    }
}
exports.default = Toggler;
