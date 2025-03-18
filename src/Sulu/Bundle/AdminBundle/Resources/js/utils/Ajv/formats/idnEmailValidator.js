"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateEmail_1 = __importDefault(require("../../Email/validateEmail"));
const idnEmailValidator = (data) => {
    return (0, validateEmail_1.default)(data);
};
exports.default = idnEmailValidator;
