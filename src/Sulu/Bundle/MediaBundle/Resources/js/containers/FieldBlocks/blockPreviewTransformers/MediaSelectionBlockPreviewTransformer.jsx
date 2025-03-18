"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mediaSelectionBlockPreviewTransformer_scss_1 = __importDefault(require("./mediaSelectionBlockPreviewTransformer.scss"));
const MAX_LENGTH = 8;
class MediaSelectionBlockPreviewTransformer {
    constructor(imageFormatUrl) {
        this.imageFormatUrl = imageFormatUrl;
    }
    transform(value) {
        const { ids } = value;
        if ((!(0, mobx_1.isArrayLike)(ids)) || ids.length === 0) {
            return null;
        }
        return (<div>
                {ids.slice(0, MAX_LENGTH).map((id) => (<img className={mediaSelectionBlockPreviewTransformer_scss_1.default.image} key={id} src={this.imageFormatUrl.replace(':id', id) + '?locale=en&format=sulu-50x50'}/>))}
            </div>);
    }
}
exports.default = MediaSelectionBlockPreviewTransformer;
