"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractListItemAction_1 = __importDefault(require("./AbstractListItemAction"));
class LinkItemAction extends AbstractListItemAction_1.default {
    constructor() {
        super(...arguments);
        this.handleDownloadClick = (linkUrl) => {
            window.location.href = linkUrl;
        };
    }
    getItemActionConfig(item) {
        const { icon = 'su-link', link_property: linkProperty, } = this.options;
        if (typeof icon !== 'string') {
            throw new Error('The "icon" option cannot be null and must contain a string value!');
        }
        if (typeof linkProperty !== 'string') {
            throw new Error('The "link_property" option cannot be null and must contain a string value!');
        }
        const linkValue = item ? item[linkProperty] : null;
        if (linkValue && typeof linkValue !== 'string') {
            throw new Error('The value of the property given via "link_property" must have a string value!');
        }
        return {
            icon,
            onClick: linkValue ? () => this.handleDownloadClick(linkValue) : null,
            disabled: !linkValue,
        };
    }
}
exports.default = LinkItemAction;
