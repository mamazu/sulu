"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore"));
const mobx_1 = require("mobx");
const MediaUploadStore_1 = __importDefault(require("../../../stores/MediaUploadStore"));
const SingleMediaUpload_1 = __importDefault(require("../../SingleMediaUpload"));
class SingleMediaUpload extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleUploadComplete = (media) => {
            const { onChange, onFinish } = this.props;
            onChange(media);
            onFinish();
        };
        const { formInspector, value } = this.props;
        const locale = formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
        this.mediaUploadStore = new MediaUploadStore_1.default(value, locale);
    }
    render() {
        const { disabled, schemaOptions: { collection_id: { value: collectionId, } = {}, empty_icon: { value: emptyIcon, } = {}, image_size: { value: imageSize, } = {}, skin: { value: skin, } = { value: 'default' }, upload_text: uploadText, } = {}, } = this.props;
        if (typeof collectionId !== 'number') {
            throw new Error('The "collection_id" schema option is mandatory and must a number!');
        }
        if (typeof emptyIcon !== 'undefined' && typeof emptyIcon !== 'string') {
            throw new Error('The "empty_icon" schema option must be a string!');
        }
        if (typeof imageSize !== 'undefined' && typeof imageSize !== 'string') {
            throw new Error('The "image_size" schema option must be a string!');
        }
        if (skin !== 'default' && skin !== 'round') {
            throw new Error('The "skin" schema option must either be "default" or "round"!');
        }
        return (<SingleMediaUpload_1.default collectionId={collectionId} disabled={!!disabled} emptyIcon={emptyIcon} imageSize={imageSize} mediaUploadStore={this.mediaUploadStore} onUploadComplete={this.handleUploadComplete} skin={skin} uploadText={uploadText && uploadText.infoText}/>);
    }
}
exports.default = SingleMediaUpload;
