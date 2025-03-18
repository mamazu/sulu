"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SegmentSelect_1 = __importDefault(require("../../SegmentSelect"));
class SegmentSelect extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
    }
    render() {
        var _a;
        const { disabled, formInspector, value } = this.props;
        return (<SegmentSelect_1.default disabled={disabled} onChange={this.handleChange} value={value} webspace={(_a = formInspector.metadataOptions) === null || _a === void 0 ? void 0 : _a.webspace}/>);
    }
}
exports.default = SegmentSelect;
