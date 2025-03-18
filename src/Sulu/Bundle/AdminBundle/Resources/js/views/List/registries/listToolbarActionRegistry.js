"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListToolbarActionRegistry {
    constructor() {
        this.toolbarActions = {};
        this.clear();
    }
    clear() {
        this.toolbarActions = {};
    }
    add(name, item) {
        if (name in this.toolbarActions) {
            throw new Error('The key "' + name + '" has already been used for another ToolbarAction!');
        }
        this.toolbarActions[name] = item;
    }
    get(name) {
        if (!(name in this.toolbarActions)) {
            throw new Error('There is no toolbar item with key "' + name + '" registered!' +
                '\n\nRegistered keys: ' + Object.keys(this.toolbarActions).sort().join(', '));
        }
        return this.toolbarActions[name];
    }
}
exports.default = new ListToolbarActionRegistry();
