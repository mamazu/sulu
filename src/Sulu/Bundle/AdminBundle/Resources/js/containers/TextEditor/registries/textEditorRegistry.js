"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextEditorRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.textEditors = {};
    }
    has(name) {
        return name in this.textEditors;
    }
    add(name, textEditor) {
        if (this.has(name)) {
            throw new Error('The key "' + name + '" has already been used for another TextEditor');
        }
        this.textEditors[name] = textEditor;
    }
    get(name) {
        if (!this.has(name)) {
            throw new Error('There is no TextEditor with key "' + name + '" registered');
        }
        return this.textEditors[name];
    }
}
exports.default = new TextEditorRegistry();
