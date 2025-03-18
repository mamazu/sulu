"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idnEmailValidator_1 = __importDefault(require("./idnEmailValidator"));
const formats = {
    'idn-email': idnEmailValidator_1.default,
};
exports.default = formats;
