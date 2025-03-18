"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginRegistry = exports.configRegistry = void 0;
const CKEditor5_1 = __importDefault(require("./CKEditor5"));
const configRegistry_1 = __importDefault(require("./registries/configRegistry"));
exports.configRegistry = configRegistry_1.default;
const pluginRegistry_1 = __importDefault(require("./registries/pluginRegistry"));
exports.pluginRegistry = pluginRegistry_1.default;
exports.default = CKEditor5_1.default;
