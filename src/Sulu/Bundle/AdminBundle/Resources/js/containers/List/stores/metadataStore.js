"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadataStore_1 = __importDefault(require("../../../stores/metadataStore"));
const LIST_TYPE = 'list';
class MetadataStore {
    getSchema(listKey, metadataOptions) {
        return metadataStore_1.default.loadMetadata(LIST_TYPE, listKey, metadataOptions);
    }
}
exports.default = new MetadataStore();
