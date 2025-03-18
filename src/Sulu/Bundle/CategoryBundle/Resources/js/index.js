"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const CategoryKeywordsMultipleUsageTransformer_1 = __importDefault(require("./containers/List/fieldTransformers/CategoryKeywordsMultipleUsageTransformer"));
containers_1.listFieldTransformerRegistry.add('category_keywords_multiple_usage', new CategoryKeywordsMultipleUsageTransformer_1.default());
