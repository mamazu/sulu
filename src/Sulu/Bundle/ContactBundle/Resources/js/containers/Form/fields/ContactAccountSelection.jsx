"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ContactAccountSelection_1 = __importDefault(require("../../ContactAccountSelection"));
class ContactAccountSelection extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
        this.handleItemClick = (itemId) => {
            const { router } = this.props;
            if (!router || !itemId) {
                return;
            }
            router.navigate(itemId.startsWith('c') ? 'sulu_contact.contact_edit_form' : 'sulu_contact.account_edit_form', { id: itemId.substr(1) });
        };
    }
    render() {
        const { disabled, value } = this.props;
        return (<ContactAccountSelection_1.default disabled={disabled === null ? undefined : disabled} onChange={this.handleChange} onItemClick={this.handleItemClick} value={value === null ? undefined : value}/>);
    }
}
exports.default = ContactAccountSelection;
