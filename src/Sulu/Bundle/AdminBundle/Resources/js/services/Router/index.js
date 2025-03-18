"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceViewRegistry = exports.routeRegistry = exports.Route = exports.getViewKeyFromRoute = void 0;
const Router_1 = __importDefault(require("./Router"));
const Route_1 = __importDefault(require("./Route"));
exports.Route = Route_1.default;
const getViewKeyFromRoute_1 = __importDefault(require("./getViewKeyFromRoute"));
exports.getViewKeyFromRoute = getViewKeyFromRoute_1.default;
const routeRegistry_1 = __importDefault(require("./registries/routeRegistry"));
exports.routeRegistry = routeRegistry_1.default;
const resourceViewRegistry_1 = __importDefault(require("./registries/resourceViewRegistry"));
exports.resourceViewRegistry = resourceViewRegistry_1.default;
exports.default = Router_1.default;
