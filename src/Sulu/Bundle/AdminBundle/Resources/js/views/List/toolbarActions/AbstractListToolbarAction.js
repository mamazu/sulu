"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractListToolbarAction {
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
    getToolbarItemConfig() {
        throw new Error('The getToolbarItemConfig method must be implemented by the sub class!');
    }
    destroy() {
    }
}
exports.default = AbstractListToolbarAction;
