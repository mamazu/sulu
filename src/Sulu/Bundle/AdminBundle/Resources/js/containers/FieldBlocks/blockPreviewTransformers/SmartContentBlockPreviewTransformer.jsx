"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Translator_1 = require("../../../utils/Translator");
class SmartContentBlockPreviewTransformer {
    transform(value) {
        return (<p>
                <em>
                    {(0, Translator_1.translate)('sulu_admin.smart_content_block_preview', { limit: value.limitResult ? value.limitResult : 'undefined' })}
                </em>
            </p>);
    }
}
exports.default = SmartContentBlockPreviewTransformer;
