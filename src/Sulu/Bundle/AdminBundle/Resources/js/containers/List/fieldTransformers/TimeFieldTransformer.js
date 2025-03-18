"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const loglevel_1 = __importDefault(require("loglevel"));
const format = 'HH:mm:ss';
class TimeFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        const momentObject = (0, moment_1.default)(value, format);
        if (!momentObject.isValid()) {
            loglevel_1.default.error('Invalid time given: "' + value + '". Format needs to be "' + format + '"');
            return null;
        }
        return momentObject.format('LT');
    }
}
exports.default = TimeFieldTransformer;
