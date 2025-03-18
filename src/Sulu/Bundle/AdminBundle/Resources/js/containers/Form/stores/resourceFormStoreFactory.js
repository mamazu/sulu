"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceFormStore_1 = __importDefault(require("./ResourceFormStore"));
class ResourceFormStoreFactory {
    createFromResourceStore(resourceStore, formKey, options = {}, metadataOptions) {
        return new ResourceFormStore_1.default(resourceStore, formKey, options, metadataOptions);
    }
}
exports.default = new ResourceFormStoreFactory();
