"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const IMAGE_FORMAT = 'sulu-40x40';
class ThumbnailFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        if (typeof value !== 'object') {
            loglevel_1.default.error('Invalid type given: "' + typeof value + '". "object" is needed.');
            return null;
        }
        if (!value.hasOwnProperty(IMAGE_FORMAT)) {
            loglevel_1.default.error('Object needs property "' + IMAGE_FORMAT + '".');
            return null;
        }
        return <img src={value[IMAGE_FORMAT]}/>;
    }
}
exports.default = ThumbnailFieldTransformer;
