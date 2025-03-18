"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const singleMediaSelectionBlockPreviewTransformer_scss_1 = __importDefault(require("./singleMediaSelectionBlockPreviewTransformer.scss"));
class SingleMediaSelectionBlockPreviewTransformer {
    constructor(imageFormatUrl) {
        this.imageFormatUrl = imageFormatUrl;
    }
    transform(value) {
        const { id } = value;
        if (!id) {
            return null;
        }
        return (<img className={singleMediaSelectionBlockPreviewTransformer_scss_1.default.image} key={id} src={this.imageFormatUrl.replace(':id', id) + '?locale=en&format=sulu-50x50'}/>);
    }
}
exports.default = SingleMediaSelectionBlockPreviewTransformer;
