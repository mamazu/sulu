"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViewRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.views = {};
        this.viewConfigs = {};
    }
    add(name, view, viewConfig) {
        if (name in this.views) {
            throw new Error('The key "' + name + '" has already been used for another view');
        }
        this.views[name] = view;
        this.viewConfigs[name] = viewConfig ? viewConfig : {};
    }
    get(name) {
        if (name in this.views) {
            return this.views[name];
        }
        throw new Error('There is not view for the key "' + name + '" registered');
    }
    getConfig(name) {
        if (name in this.viewConfigs) {
            return this.viewConfigs[name];
        }
        throw new Error('There is not view config for the key "' + name + '" registered');
    }
}
exports.default = new ViewRegistry();
