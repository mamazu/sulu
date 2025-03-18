"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ruleRegistry_1 = __importDefault(require("../../registries/ruleRegistry"));
beforeEach(() => {
    ruleRegistry_1.default.clear();
});
test('Clear all rules from RuleRegistry', () => {
    ruleRegistry_1.default.setRules({
        browser: {
            name: 'Browser',
            type: {
                name: 'select',
                options: {},
            },
        },
    });
    expect(Object.keys(ruleRegistry_1.default.rules)).toHaveLength(1);
    ruleRegistry_1.default.clear();
    expect(Object.keys(ruleRegistry_1.default.rules)).toHaveLength(0);
});
test('Add rules to RuleRegistry', () => {
    const browser = {
        name: 'Browser',
        type: {
            name: 'select',
            options: {},
        },
    };
    const locale = {
        name: 'Locale',
        type: {
            name: 'input',
            options: {},
        },
    };
    ruleRegistry_1.default.setRules({
        browser,
        locale,
    });
    expect(ruleRegistry_1.default.get('browser')).toBe(browser);
    expect(ruleRegistry_1.default.get('locale')).toBe(locale);
});
test('Get rule with existing key', () => {
    const browser = {
        name: 'Browser',
        type: {
            name: 'select',
            options: {},
        },
    };
    ruleRegistry_1.default.setRules({
        browser,
    });
    expect(ruleRegistry_1.default.get('browser')).toBe(browser);
});
test('Get rule of not existing key', () => {
    expect(() => ruleRegistry_1.default.get('XXX')).toThrow();
});
