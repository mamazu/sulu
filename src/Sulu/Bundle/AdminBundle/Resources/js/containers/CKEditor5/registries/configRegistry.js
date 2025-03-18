"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.configs = [];
    }
    add(config) {
        this.configs.push(config);
    }
}
exports.default = new ConfigRegistry();
