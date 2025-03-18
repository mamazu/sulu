"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceViewRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.resourceViews = {};
    }
    addResourceViews(resourceViews) {
        Object.keys(resourceViews).forEach((resourceKey) => {
            if (this.resourceViews[resourceKey]) {
                throw new Error('The resource views for "' + resourceKey + '" has already be configured.');
            }
            this.resourceViews[resourceKey] = resourceViews[resourceKey];
        });
    }
    has(view, resourceKey) {
        var _a, _b, _c;
        if (!this.resourceViews[resourceKey]) {
            return false;
        }
        return ((_c = (_b = (_a = this.resourceViews) === null || _a === void 0 ? void 0 : _a[resourceKey]) === null || _b === void 0 ? void 0 : _b.views) === null || _c === void 0 ? void 0 : _c[view]) !== undefined;
    }
    get(view, resourceKey) {
        if (typeof this.resourceViews[resourceKey] !== 'object') {
            throw new Error('The resource "' + resourceKey + '" was not found.');
        }
        if (typeof this.resourceViews[resourceKey].views[view] !== 'string') {
            throw new Error('The resource view "' + view + '" for resource "' + resourceKey + '" was not found.');
        }
        return this.resourceViews[resourceKey].views[view];
    }
}
exports.default = new ResourceViewRegistry();
