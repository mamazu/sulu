"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
const mobx_1 = require("mobx");
const withSidebar_1 = __importDefault(require("../../containers/Sidebar/withSidebar"));
const Form_1 = __importDefault(require("../Form"));
exports.default = (0, withSidebar_1.default)(Form_1.default, function () {
    const { router: { route: { options: { previewCondition, }, }, }, } = this.props;
    const previewData = Object.assign({ __routeAttributes: this.props.router.attributes }, (0, mobx_1.toJS)(this.resourceFormStore.data));
    const enablePreview = !previewCondition || jexl_1.default.evalSync(previewCondition, previewData);
    const { resourceFormStore: { resourceKey, }, } = this;
    return enablePreview ? {
        view: 'sulu_preview.preview',
        sizes: ['medium', 'large'],
        props: {
            router: this.props.router,
            formStore: this.resourceFormStore,
            key: resourceKey,
        },
    } : null;
});
