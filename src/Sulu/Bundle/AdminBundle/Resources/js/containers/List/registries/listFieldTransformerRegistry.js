"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListFieldTransformerRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.fieldTransformers = {};
    }
    has(name) {
        return !!this.fieldTransformers[name];
    }
    add(name, Type) {
        if (name in this.fieldTransformers) {
            throw new Error('The key "' + name + '" has already been used for another field transformer');
        }
        this.fieldTransformers[name] = Type;
    }
    get(name) {
        if (!(name in this.fieldTransformers)) {
            throw new Error('The list field transformer with the key "' + name + '" is not defined. ' +
                'You probably forgot to add it to the registry using the "add" method.' +
                '\n\nRegistered keys: ' + Object.keys(this.fieldTransformers).sort().join(', '));
        }
        return this.fieldTransformers[name];
    }
}
exports.default = new ListFieldTransformerRegistry();
