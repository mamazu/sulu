"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractListItemAction {
    constructor(listStore, list, router, locales, resourceStore, options) {
        this.listStore = listStore;
        this.list = list;
        this.router = router;
        this.locales = locales;
        this.resourceStore = resourceStore;
        this.options = options;
    }
    setLocales(locales) {
        this.locales = locales;
    }
    getNode() {
        return null;
    }
    // eslint-disable-next-line no-unused-vars
    getItemActionConfig(item) {
        throw new Error('The getItemActionConfig method must be implemented by the sub class!');
    }
}
exports.default = AbstractListItemAction;
