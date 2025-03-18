"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuleRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.rules = {};
    }
    setRules(rules) {
        this.rules = rules;
    }
    get(name) {
        if (!(name in this.rules)) {
            throw new Error('There is no rule with key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.rules).sort().join(', '));
        }
        return this.rules[name];
    }
    getAll() {
        return this.rules;
    }
}
exports.default = new RuleRegistry();
