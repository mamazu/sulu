"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const loglevel_1 = __importDefault(require("loglevel"));
const format = 'YYYY-MM-DD';
class DateTimeBlockPreviewTransformer {
    transform(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const momentObject = (0, moment_1.default)(value, format);
        if (!momentObject.isValid()) {
            loglevel_1.default.error('Invalid date given: "' + value + '". Format needs to be "' + format + '"');
            return null;
        }
        return <p>{momentObject.format('L')}</p>;
    }
}
exports.default = DateTimeBlockPreviewTransformer;
