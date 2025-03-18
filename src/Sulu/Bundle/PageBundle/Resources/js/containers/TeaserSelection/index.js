"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teaserProviderRegistry = void 0;
const TeaserSelection_1 = __importDefault(require("./TeaserSelection"));
const teaserProviderRegistry_1 = __importDefault(require("./registries/teaserProviderRegistry"));
exports.teaserProviderRegistry = teaserProviderRegistry_1.default;
exports.default = TeaserSelection_1.default;
