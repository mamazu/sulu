"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const afterElementsRendered_1 = __importDefault(require("../afterElementsRendered"));
test('The function should call its passed callback', (done) => {
    (0, afterElementsRendered_1.default)(done);
});
