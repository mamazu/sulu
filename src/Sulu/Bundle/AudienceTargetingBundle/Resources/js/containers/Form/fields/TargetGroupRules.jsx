"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TargetGroupRules_1 = __importDefault(require("../../../containers/TargetGroupRules"));
class TargetGroupRules extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
    }
    render() {
        const { value } = this.props;
        return <TargetGroupRules_1.default onChange={this.handleChange} value={value || []}/>;
    }
}
exports.default = TargetGroupRules;
