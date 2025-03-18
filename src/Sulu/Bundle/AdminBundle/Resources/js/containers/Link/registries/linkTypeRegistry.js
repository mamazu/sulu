"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class linkTypeRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.overlays = {};
        this.titles = {};
        this.options = {};
    }
    add(name, overlay, title, options) {
        if (name in this.titles) {
            throw new Error('The key "' + name + '" has already been used for another link type');
        }
        this.overlays[name] = overlay;
        this.titles[name] = title;
        this.options[name] = options;
    }
    getKeys() {
        return Object.keys(this.titles);
    }
    getOverlay(name) {
        if (!(name in this.overlays)) {
            throw new Error('There is no overlay for an link type with the key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.overlays).sort().join(', '));
        }
        return this.overlays[name];
    }
    getTitle(name) {
        if (!(name in this.titles)) {
            throw new Error('There is no title for an link type with the key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.titles).sort().join(', '));
        }
        return this.titles[name];
    }
    getOptions(name) {
        if (!(name in this.options)) {
            throw new Error('There are no options for an link type with the key "' + name + '" registered.' +
                '\n\nRegistered keys: ' + Object.keys(this.options).sort().join(', '));
        }
        return this.options[name];
    }
}
exports.default = new linkTypeRegistry();
