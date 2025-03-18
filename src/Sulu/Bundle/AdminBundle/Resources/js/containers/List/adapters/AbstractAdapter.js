"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class AbstractAdapter extends react_1.default.Component {
}
AbstractAdapter.hasColumnOptions = false;
AbstractAdapter.searchable = true;
AbstractAdapter.paginatable = true;
exports.default = AbstractAdapter;
