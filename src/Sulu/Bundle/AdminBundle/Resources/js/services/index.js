"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.Route = exports.ResourceRequester = exports.resourceRouteRegistry = exports.Requester = exports.initializer = exports.Config = void 0;
const Config_1 = __importDefault(require("./Config"));
exports.Config = Config_1.default;
const initializer_1 = __importDefault(require("./initializer"));
exports.initializer = initializer_1.default;
const ResourceRequester_1 = __importStar(require("./ResourceRequester"));
exports.ResourceRequester = ResourceRequester_1.default;
Object.defineProperty(exports, "resourceRouteRegistry", { enumerable: true, get: function () { return ResourceRequester_1.resourceRouteRegistry; } });
const Requester_1 = __importDefault(require("./Requester"));
exports.Requester = Requester_1.default;
const Router_1 = __importStar(require("./Router"));
exports.Router = Router_1.default;
Object.defineProperty(exports, "Route", { enumerable: true, get: function () { return Router_1.Route; } });
