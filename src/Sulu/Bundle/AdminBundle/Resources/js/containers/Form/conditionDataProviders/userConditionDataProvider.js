"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const mobx_1 = require("mobx");
const userStore_1 = __importDefault(require("../../../stores/userStore"));
function default_1() {
    return { __user: (0, mobx_1.toJS)(userStore_1.default.user) };
}
