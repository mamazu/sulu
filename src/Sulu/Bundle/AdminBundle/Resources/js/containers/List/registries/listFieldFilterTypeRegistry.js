"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListFieldFilterTypeRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.fieldFilterTypes = {};
        this.options = {};
    }
    has(name) {
        return !!this.fieldFilterTypes[name];
    }
    add(name, FieldFilterType, options = {}) {
        if (name in this.fieldFilterTypes) {
            throw new Error('The key "' + name + '" has already been used for another field filter type');
        }
        this.fieldFilterTypes[name] = FieldFilterType;
        this.options[name] = options;
    }
    get(name) {
        if (!(name in this.fieldFilterTypes)) {
            throw new Error('The list field filter type with the key "' + name + '" is not defined. ' +
                'You probably forgot to add it to the registry using the "add" method.' +
                '\n\nRegistered keys: ' + Object.keys(this.fieldFilterTypes).sort().join(', '));
        }
        return this.fieldFilterTypes[name];
    }
    getOptions(name) {
        if (!(name in this.options)) {
            throw new Error('There are no options for a field with the key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.options).sort().join(', '));
        }
        return this.options[name];
    }
}
exports.default = new ListFieldFilterTypeRegistry();
