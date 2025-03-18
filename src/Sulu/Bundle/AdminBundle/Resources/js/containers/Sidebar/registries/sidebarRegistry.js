"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SidebarRegistry {
    constructor() {
        this.disabledSidebars = [];
        this.clear();
    }
    clear() {
        this.sidebars = {};
    }
    has(name) {
        return !!this.sidebars[name];
    }
    add(name, sidebar) {
        if (name in this.sidebars) {
            throw new Error('The key "' + name + '" has already been used for another sidebar component');
        }
        this.sidebars[name] = sidebar;
    }
    get(name) {
        if (!(name in this.sidebars)) {
            throw new Error('The sidebar component with the key "' + name + '" is not defined. ' +
                'You probably forgot to add it to the store using the "add" method.');
        }
        return this.sidebars[name];
    }
    disable(name) {
        this.disabledSidebars.push(name);
    }
    isDisabled(name) {
        return this.disabledSidebars.indexOf(name) > -1;
    }
}
exports.default = new SidebarRegistry();
