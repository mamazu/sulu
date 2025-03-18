"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Field_1 = __importDefault(require("./Field"));
class SocialMedia extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleInputChange = (username) => {
            const { index, onUsernameChange } = this.props;
            onUsernameChange(index, username);
        };
    }
    render() {
        const { index, onBlur, onRemove, onTypeChange, type, username } = this.props;
        return (<Field_1.default index={index} label={(0, utils_1.translate)('sulu_contact.social_media')} onRemove={onRemove} onTypeChange={onTypeChange} type={type} types={SocialMedia.types}>
                <components_1.Input icon="su-user" onBlur={onBlur} onChange={this.handleInputChange} value={username}/>
            </Field_1.default>);
    }
}
exports.default = SocialMedia;
