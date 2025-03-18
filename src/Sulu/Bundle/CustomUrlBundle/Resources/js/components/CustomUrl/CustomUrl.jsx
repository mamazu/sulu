"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EditableCustomUrlPart_1 = __importDefault(require("./EditableCustomUrlPart"));
const customUrl_scss_1 = __importDefault(require("./customUrl.scss"));
const PLACEHOLDER = '*';
class CustomUrl extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value, index) => {
            const { onChange } = this.props;
            const newValue = [...this.props.value];
            newValue[index] = value;
            onChange(newValue);
        };
    }
    render() {
        const { baseDomain, onBlur, value } = this.props;
        return (<div className={customUrl_scss_1.default.customUrl}>
                {baseDomain.split(PLACEHOLDER).map((baseDomainPart, index) => (<react_1.Fragment key={index}>
                        {index !== 0 &&
                    <EditableCustomUrlPart_1.default index={index - 1} onBlur={onBlur} onChange={this.handleChange} value={index <= value.length ? value[index - 1] : undefined}/>}
                        {baseDomainPart && <span>{baseDomainPart}</span>}
                    </react_1.Fragment>))}
            </div>);
    }
}
exports.default = CustomUrl;
