"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractListItemAction_1 = __importDefault(require("./AbstractListItemAction"));
class DetailLinkItemAction extends AbstractListItemAction_1.default {
    constructor() {
        super(...arguments);
        this.handleClick = (resourceKey, resourceId, viewAttributes = {}) => {
            const attributes = Object.assign(Object.assign({ id: resourceId }, viewAttributes), viewAttributes);
            this.router.navigateToResourceView('detail', resourceKey, attributes);
        };
    }
    getItemActionConfig(item) {
        const { icon = 'su-eye', resource_key_property: resourceKeyProperty = 'resourceKey', resource_id_property: resourceIdProperty = 'resourceId', resource_view_attributes_property: resourceViewAttributesProperty = 'resourceViewAttributes', } = this.options;
        if (typeof icon !== 'string') {
            throw new Error('The "icon" option cannot be null and must contain a string value!');
        }
        if (typeof resourceKeyProperty !== 'string') {
            throw new Error('The "resource_key_property" option cannot be null and must contain a string value!');
        }
        if (typeof resourceIdProperty !== 'string') {
            throw new Error('The "resource_id_property" option cannot be null and must contain a string value!');
        }
        if (typeof resourceViewAttributesProperty !== 'string') {
            throw new Error('The "resource_view_attributes_property" option cannot be null and must contain a string value!');
        }
        const resourceKey = item ? item[resourceKeyProperty] : null;
        const resourceId = item ? item[resourceIdProperty] : null;
        const resourceViewAttributes = item && item[resourceViewAttributesProperty]
            ? item[resourceViewAttributesProperty]
            : {};
        if (resourceKey && typeof resourceKey !== 'string') {
            throw new Error('The value of the property given via "resource_key_property" must have a string value!');
        }
        if (resourceId && (typeof resourceId !== 'string' && typeof resourceId !== 'number')) {
            throw new Error('The value of the property given via "resource_id_property" must have a string or number value!');
        }
        if (typeof resourceViewAttributes !== 'object') {
            throw new Error('The value of the property given via "resource_view_attributes_property" must have a object value!');
        }
        return {
            icon,
            onClick: (resourceKey && resourceId) ? () => this.handleClick(resourceKey, resourceId.toString(), resourceViewAttributes) : null,
            disabled: !(resourceKey && resourceId && this.router.hasResourceView('detail', resourceKey)),
        };
    }
}
exports.default = DetailLinkItemAction;
