"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textEditorRegistry = void 0;
const TextEditor_1 = __importDefault(require("./TextEditor"));
const textEditorRegistry_1 = __importDefault(require("./registries/textEditorRegistry"));
exports.textEditorRegistry = textEditorRegistry_1.default;
exports.default = TextEditor_1.default;
