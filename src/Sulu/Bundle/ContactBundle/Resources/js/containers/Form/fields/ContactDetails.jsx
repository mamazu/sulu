"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ContactDetails_1 = __importDefault(require("../../../components/ContactDetails"));
class ContactDetails extends react_1.default.Component {
    render() {
        const { onChange, onFinish, value } = this.props;
        return (<ContactDetails_1.default onBlur={onFinish} onChange={onChange} value={value !== null ? value : undefined}/>);
    }
}
exports.default = ContactDetails;
