"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuleTypeRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.ruleTypes = {};
    }
    add(name, rule) {
        if (name in this.ruleTypes) {
            throw new Error('The key "' + name + '" has already been used for another rule type');
        }
        this.ruleTypes[name] = rule;
    }
    get(name) {
        if (!(name in this.ruleTypes)) {
            throw new Error('There is no rule type with key "' + name + '" registered');
        }
        return this.ruleTypes[name];
    }
    has(name) {
        return name in this.ruleTypes;
    }
}
exports.default = new RuleTypeRegistry();
