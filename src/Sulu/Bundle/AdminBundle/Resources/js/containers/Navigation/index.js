"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationRegistry = void 0;
const Navigation_1 = __importDefault(require("./Navigation"));
const navigationRegistry_1 = __importDefault(require("./registries/navigationRegistry"));
exports.navigationRegistry = navigationRegistry_1.default;
exports.default = Navigation_1.default;
