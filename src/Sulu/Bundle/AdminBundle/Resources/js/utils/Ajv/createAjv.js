"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const formats_1 = __importDefault(require("./formats"));
const createAjv = (options = { allErrors: true, allowUnionTypes: true }) => {
    const ajv = new ajv_1.default(options);
    (0, ajv_formats_1.default)(ajv);
    Object.entries(formats_1.default).forEach(([name, format]) => {
        ajv.addFormat(name, format);
    });
    return ajv;
};
exports.default = createAjv;
