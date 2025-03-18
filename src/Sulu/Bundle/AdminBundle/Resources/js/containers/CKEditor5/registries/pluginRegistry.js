"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.plugins = [];
    }
    add(plugin) {
        this.plugins.push(plugin);
    }
}
exports.default = new PluginRegistry();
