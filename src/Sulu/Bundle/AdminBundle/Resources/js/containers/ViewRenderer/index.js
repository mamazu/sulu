"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewRegistry = exports.updateRouterAttributesFromView = void 0;
const updateRouterAttributesFromView_1 = __importDefault(require("./updateRouterAttributesFromView"));
exports.updateRouterAttributesFromView = updateRouterAttributesFromView_1.default;
const ViewRenderer_1 = __importDefault(require("./ViewRenderer"));
const viewRegistry_1 = __importDefault(require("./registries/viewRegistry"));
exports.viewRegistry = viewRegistry_1.default;
exports.default = ViewRenderer_1.default;
