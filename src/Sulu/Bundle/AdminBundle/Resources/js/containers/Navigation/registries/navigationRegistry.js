"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findById(navigationItems, id) {
    for (const navigationItem of navigationItems) {
        if (id === navigationItem.id) {
            return navigationItem;
        }
        if (navigationItem.items) {
            const foundNavigationItem = findById(navigationItem.items, id);
            if (foundNavigationItem) {
                return foundNavigationItem;
            }
        }
    }
}
class NavigationRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.navigationItems = [];
    }
    set(navigationItems) {
        this.navigationItems = navigationItems;
    }
    get(id) {
        const navigationItem = findById(this.navigationItems, id);
        if (!navigationItem) {
            throw new Error('Navigation item with id "' + id + '" not found.');
        }
        return navigationItem;
    }
    getAll() {
        return this.navigationItems;
    }
}
exports.default = new NavigationRegistry();
