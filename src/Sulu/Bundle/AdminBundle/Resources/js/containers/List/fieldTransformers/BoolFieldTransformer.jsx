"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../../../components/Checkbox"));
class BoolFieldTransformer {
    transform(value) {
        return <Checkbox_1.default checked={!!value} disabled={true}/>;
    }
}
exports.default = BoolFieldTransformer;
