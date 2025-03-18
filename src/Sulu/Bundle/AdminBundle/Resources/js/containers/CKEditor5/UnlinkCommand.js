"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/command"));
class ExternalUnlinkCommand extends command_1.default {
    constructor(editor, attributeToRemove) {
        super(editor);
        this.attributesToRemove = attributeToRemove;
    }
    execute() {
        this.editor.model.change((writer) => {
            const selection = this.editor.model.document.selection;
            const firstPosition = selection.getFirstPosition();
            const textNode = firstPosition.textNode || firstPosition.nodeBefore;
            this.attributesToRemove.forEach((attributeToRemove) => {
                writer.removeAttribute(attributeToRemove, textNode);
            });
        });
    }
}
exports.default = ExternalUnlinkCommand;
