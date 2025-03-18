"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
class Input extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, options: { name, }, } = this.props;
            onChange({ [name]: value });
        };
    }
    render() {
        const { options: { name, }, value, } = this.props;
        return (<components_1.Input onChange={this.handleChange} value={value[name]}/>);
    }
}
exports.default = Input;
