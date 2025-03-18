"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = __importDefault(require("./userStore"));
const logoutOnUnauthorizedResponse = function (response) {
    if (response.status === 401) {
        userStore_1.default.setLoggedIn(false);
    }
};
exports.default = logoutOnUnauthorizedResponse;
