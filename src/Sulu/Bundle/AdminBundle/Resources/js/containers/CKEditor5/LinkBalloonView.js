"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buttonview_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/button/buttonview"));
const view_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/view"));
const edit_svg_1 = __importDefault(require("!!raw-loader!./edit.svg")); // eslint-disable-line import/no-webpack-loader-syntax
const unlink_svg_1 = __importDefault(require("!!raw-loader!./unlink.svg")); // eslint-disable-line import/no-webpack-loader-syntax
class LinkBalloonView extends view_1.default {
    constructor(locale, hasPreview = false) {
        super(locale);
        const children = [];
        if (hasPreview) {
            const previewButtonView = new buttonview_1.default(this.locale);
            previewButtonView.set({
                class: 'ck-preview-button',
                withText: true,
            });
            previewButtonView.extendTemplate({
                attributes: {
                    href: this.bindTemplate.to('href'),
                    target: '_blank',
                },
            });
            previewButtonView.bind('label').to(this, 'href');
            previewButtonView.template.tag = 'a';
            previewButtonView.template.eventListeners = {};
            children.push(previewButtonView);
        }
        const editButtonView = new buttonview_1.default(this.locale);
        editButtonView.set({ icon: edit_svg_1.default });
        editButtonView.delegate('execute').to(this, 'link');
        children.push(editButtonView);
        const unlinkButtonView = new buttonview_1.default(this.locale);
        unlinkButtonView.set({ icon: unlink_svg_1.default });
        unlinkButtonView.delegate('execute').to(this, 'unlink');
        children.push(unlinkButtonView);
        this.setTemplate({
            tag: 'div',
            children,
        });
    }
}
exports.default = LinkBalloonView;
