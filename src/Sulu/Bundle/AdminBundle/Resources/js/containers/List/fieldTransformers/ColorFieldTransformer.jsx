"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const colorFieldTransformer_scss_1 = __importDefault(require("./colorFieldTransformer.scss"));
class ColorFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        if (!/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value)) {
            loglevel_1.default.error(`Invalid color given: "${value}". Format needs to be "#RGB" or "#RRGGBB".`);
            return null;
        }
        const style = {};
        style.backgroundColor = value;
        return <div className={colorFieldTransformer_scss_1.default.colorBox} style={style}/>;
    }
}
exports.default = ColorFieldTransformer;
