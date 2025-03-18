"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryFormStore_1 = __importDefault(require("./MemoryFormStore"));
const SchemaFormStoreDecorator_1 = __importDefault(require("./SchemaFormStoreDecorator"));
class MemoryFormStoreFactory {
    createFromFormKey(formKey, data = {}, locale, type, metadataOptions) {
        return new SchemaFormStoreDecorator_1.default((schema, jsonSchema) => new MemoryFormStore_1.default(data, schema, jsonSchema, locale, metadataOptions), formKey, type, metadataOptions);
    }
    createFromSchema(schema, jsonSchema, data = {}) {
        return new MemoryFormStore_1.default(data, schema, jsonSchema);
    }
}
exports.default = new MemoryFormStoreFactory();
