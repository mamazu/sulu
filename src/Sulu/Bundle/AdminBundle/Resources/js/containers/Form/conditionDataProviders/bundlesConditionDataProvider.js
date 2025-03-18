"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const initializer_1 = __importDefault(require("../../../services/initializer"));
function default_1() {
    return { __bundles: initializer_1.default.bundles };
}
