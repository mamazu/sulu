"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/command"));
class LinkCommand extends command_1.default {
    constructor(editor, attributeMap, titleProperty) {
        super(editor);
        this.isEnabled = true;
        this.attributeMap = attributeMap;
        this.titleProperty = titleProperty;
        this.set('buttonEnabled', true);
    }
    execute(eventInfo) {
        this.editor.model.change((writer) => {
            const linkAttributes = Object.keys(this.attributeMap).reduce((attributes, key) => {
                const eventInfoValue = eventInfo[this.attributeMap[key]];
                if (!eventInfoValue) {
                    return attributes;
                }
                attributes[key] = eventInfoValue;
                return attributes;
            }, {});
            linkAttributes.provider = eventInfo.provider;
            const { selection } = eventInfo;
            const firstPosition = selection ? selection.getFirstPosition() : undefined;
            const textNode = firstPosition ? firstPosition.textNode || firstPosition.nodeBefore : undefined;
            if (selection && !selection.isCollapsed) {
                for (const range of selection.getRanges()) {
                    writer.setAttributes(linkAttributes, range);
                }
            }
            else if (this.hasLinkAttribute(textNode)) {
                writer.setAttributes(linkAttributes, textNode);
            }
            else {
                const externalLink = writer.createText(eventInfo[this.titleProperty], linkAttributes);
                this.editor.model.insertContent(externalLink);
            }
        });
    }
    refresh() {
        const selection = this.editor.model.document.selection;
        const firstPosition = selection.getFirstPosition();
        if (firstPosition && firstPosition.textNode && this.hasLinkAttribute(firstPosition.textNode)) {
            this.buttonEnabled = false;
            return;
        }
        const range = selection.getFirstRange();
        for (const item of range.getItems()) {
            const textNode = item.textNode;
            if (!textNode || !this.hasLinkAttribute(textNode)) {
                continue;
            }
            this.buttonEnabled = false;
            return;
        }
        this.buttonEnabled = true;
    }
    hasLinkAttribute(node) {
        if (!node || !node.hasAttribute) {
            return false;
        }
        return Object.keys(this.attributeMap).some((attribute) => node && node.hasAttribute(attribute));
    }
}
exports.default = LinkCommand;
