"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RoleAssignments_1 = __importDefault(require("../../RoleAssignments"));
class RoleAssignments extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
    }
    render() {
        const { disabled, value } = this.props;
        return (<RoleAssignments_1.default disabled={!!disabled} onChange={this.handleChange} value={value ? value : []}/>);
    }
}
exports.default = RoleAssignments;
