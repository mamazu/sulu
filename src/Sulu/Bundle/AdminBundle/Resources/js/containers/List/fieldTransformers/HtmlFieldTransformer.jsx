"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
class HtmlFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        const sanitizedHtml = (0, sanitize_html_1.default)(value.toString(), {
            allowedTags: ['b', 'em', 'i', 's', 'small', 'strong', 'sub', 'sup', 'time', 'u'],
            allowedAttributes: {},
            disallowedTagsMode: 'recursiveEscape',
        });
        return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}/>;
    }
}
exports.default = HtmlFieldTransformer;
