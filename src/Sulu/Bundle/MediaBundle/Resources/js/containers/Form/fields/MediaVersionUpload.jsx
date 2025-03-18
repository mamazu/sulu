"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const containers_1 = require("sulu-admin-bundle/containers");
const MediaVersionUpload_1 = __importDefault(require("../../MediaVersionUpload"));
class MediaVersionUpload extends react_1.default.Component {
    constructor(props) {
        super(props);
        const { formInspector } = this.props;
        const formStore = formInspector.formStore;
        if (!(formStore instanceof containers_1.ResourceFormStore)) {
            throw new Error('The MediaVersionUpload field needs a ResourceFormStore instance!');
        }
        this.resourceStore = formStore.resourceStore;
        const locale = this.resourceStore.locale;
        if (!locale) {
            throw new Error('The resourceStore for the MediaVersionUpload must have a locale');
        }
    }
    render() {
        return (<MediaVersionUpload_1.default onSuccess={this.props.onSuccess} resourceStore={this.resourceStore}/>);
    }
}
exports.default = MediaVersionUpload;
