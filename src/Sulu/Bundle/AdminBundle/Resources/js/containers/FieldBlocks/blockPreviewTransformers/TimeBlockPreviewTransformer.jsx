"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const loglevel_1 = __importDefault(require("loglevel"));
const format = 'HH:mm:ss';
class TimeBlockPreviewTransformer {
    transform(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const momentObject = (0, moment_1.default)(value, format);
        if (!momentObject.isValid()) {
            loglevel_1.default.error('Invalid time given: "' + value + '". Format needs to be "' + format + '"');
            return null;
        }
        return <p>{momentObject.format('LT')}</p>;
    }
}
exports.default = TimeBlockPreviewTransformer;
