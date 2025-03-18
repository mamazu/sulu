"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const Icon_1 = __importDefault(require("../Icon"));
const sortableHandle_scss_1 = __importDefault(require("./sortableHandle.scss"));
exports.default = (0, react_sortable_hoc_1.SortableHandle)(() => <Icon_1.default className={sortableHandle_scss_1.default.sortableHandle} name="su-more"/>);
