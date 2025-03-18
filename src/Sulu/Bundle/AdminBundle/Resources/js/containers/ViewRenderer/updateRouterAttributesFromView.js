"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const viewRegistry_1 = __importDefault(require("./registries/viewRegistry"));
const updateRouterAttributesFromView = function (route, attributes) {
    const parentAttributes = route.parent ? updateRouterAttributesFromView(route.parent, attributes) : {};
    const View = viewRegistry_1.default.get(route.type);
    if (typeof View.getDerivedRouteAttributes === 'function') {
        const newAttributes = View.getDerivedRouteAttributes(route, Object.assign(Object.assign({}, parentAttributes), attributes));
        return Object.assign(Object.assign({}, parentAttributes), newAttributes);
    }
    return parentAttributes;
};
exports.default = updateRouterAttributesFromView;
