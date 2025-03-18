"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Field_1 = __importDefault(require("./Field"));
class Website extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleUrlChange = (url) => {
            const { index, onWebsiteChange } = this.props;
            onWebsiteChange(index, url);
        };
    }
    render() {
        const { index, onBlur, onRemove, onTypeChange, type, website } = this.props;
        return (<Field_1.default index={index} label={(0, utils_1.translate)('sulu_contact.website')} onRemove={onRemove} onTypeChange={onTypeChange} type={type} types={Website.types}>
                <components_1.Url onBlur={onBlur} onChange={this.handleUrlChange} value={website}/>
            </Field_1.default>);
    }
}
exports.default = Website;
