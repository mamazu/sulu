"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Field_1 = __importDefault(require("./Field"));
class Email extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleEmailChange = (email) => {
            const { index, onEmailChange } = this.props;
            onEmailChange(index, email);
        };
    }
    render() {
        const { email, index, onBlur, onRemove, onTypeChange, type } = this.props;
        return (<Field_1.default index={index} label={(0, utils_1.translate)('sulu_contact.email')} onRemove={onRemove} onTypeChange={onTypeChange} type={type} types={Email.types}>
                <components_1.Email onBlur={onBlur} onChange={this.handleEmailChange} value={email}/>
            </Field_1.default>);
    }
}
exports.default = Email;
