"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPromise = exports.resourceRouteRegistry = void 0;
const Requester_1 = require("../Requester");
Object.defineProperty(exports, "RequestPromise", { enumerable: true, get: function () { return Requester_1.RequestPromise; } });
const ResourceRequester_1 = __importDefault(require("./ResourceRequester"));
const resourceRouteRegistry_1 = __importDefault(require("./registries/resourceRouteRegistry"));
exports.resourceRouteRegistry = resourceRouteRegistry_1.default;
exports.default = ResourceRequester_1.default;
