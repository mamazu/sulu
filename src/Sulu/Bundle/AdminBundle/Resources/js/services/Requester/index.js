"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPromise = void 0;
const Requester_1 = __importDefault(require("./Requester"));
const RequestPromise_1 = __importDefault(require("./RequestPromise"));
exports.RequestPromise = RequestPromise_1.default;
exports.default = Requester_1.default;
