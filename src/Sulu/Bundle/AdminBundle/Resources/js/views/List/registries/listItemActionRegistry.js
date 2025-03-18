"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListItemActionRegistry {
    constructor() {
        this.listItemActions = {};
        this.clear();
    }
    clear() {
        this.listItemActions = {};
    }
    add(name, item) {
        if (name in this.listItemActions) {
            throw new Error('The key "' + name + '" has already been used for another ItemAction!');
        }
        this.listItemActions[name] = item;
    }
    get(name) {
        if (!(name in this.listItemActions)) {
            throw new Error('There is no ItemAction with key "' + name + '" registered!' +
                '\n\nRegistered keys: ' + Object.keys(this.listItemActions).sort().join(', '));
        }
        return this.listItemActions[name];
    }
}
exports.default = new ListItemActionRegistry();
