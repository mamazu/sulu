"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const SnippetAreas_1 = __importDefault(require("./views/SnippetAreas"));
containers_1.viewRegistry.add('sulu_snippet.snippet_areas', SnippetAreas_1.default);
