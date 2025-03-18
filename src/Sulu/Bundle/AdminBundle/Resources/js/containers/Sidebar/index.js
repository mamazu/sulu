"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSidebar = exports.sidebarRegistry = exports.sidebarStore = void 0;
const Sidebar_1 = __importDefault(require("./Sidebar"));
const sidebarStore_1 = __importDefault(require("./stores/sidebarStore"));
exports.sidebarStore = sidebarStore_1.default;
const sidebarRegistry_1 = __importDefault(require("./registries/sidebarRegistry"));
exports.sidebarRegistry = sidebarRegistry_1.default;
const withSidebar_1 = __importDefault(require("./withSidebar"));
exports.withSidebar = withSidebar_1.default;
exports.default = Sidebar_1.default;
