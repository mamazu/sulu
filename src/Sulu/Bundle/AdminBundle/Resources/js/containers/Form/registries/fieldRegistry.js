"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.fields = {};
        this.options = {};
    }
    add(name, field, options = {}) {
        if (name in this.fields) {
            throw new Error('The key "' + name + '" has already been used for another field');
        }
        this.fields[name] = field;
        this.options[name] = options;
    }
    get(name) {
        if (!(name in this.fields)) {
            throw new Error('There is no field with key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.fields).sort().join(', '));
        }
        return this.fields[name];
    }
    getOptions(name) {
        if (!(name in this.options)) {
            throw new Error('There are no options for a field with the key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.options).sort().join(', '));
        }
        return this.options[name];
    }
    has(name) {
        return name in this.fields;
    }
}
exports.default = new FieldRegistry();
