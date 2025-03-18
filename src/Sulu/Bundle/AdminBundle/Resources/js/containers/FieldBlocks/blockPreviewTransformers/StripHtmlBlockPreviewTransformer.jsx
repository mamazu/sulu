"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const textversionjs_1 = __importDefault(require("textversionjs"));
const MAX_LENGTH = 50;
class StripHtmlBlockPreviewTransformer {
    transform(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const text = (0, textversionjs_1.default)(value, { headingStyle: 'linebreak', listStyle: 'linebreak' });
        return (<p>
                {text.length > MAX_LENGTH ? text.substring(0, MAX_LENGTH) + '...' : text}
            </p>);
    }
}
exports.default = StripHtmlBlockPreviewTransformer;
