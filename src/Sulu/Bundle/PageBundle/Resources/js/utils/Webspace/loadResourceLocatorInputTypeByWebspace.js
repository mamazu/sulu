"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadResourceLocatorInputTypeByWebspace;
const webspaceStore_1 = __importDefault(require("../../stores/webspaceStore"));
function loadResourceLocatorInputTypeByWebspace(webspaceKey) {
    return Promise.resolve(webspaceStore_1.default.getWebspace(webspaceKey).resourceLocatorStrategy.inputType);
}
