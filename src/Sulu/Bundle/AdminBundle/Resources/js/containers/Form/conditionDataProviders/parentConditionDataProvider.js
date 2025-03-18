"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const mobx_1 = require("mobx");
const json_pointer_1 = __importDefault(require("json-pointer"));
function default_1(data, dataPath) {
    if (!dataPath) {
        return { __parent: data };
    }
    let parentDataPath = dataPath;
    const conditionData = {};
    let currentConditionData = conditionData;
    do {
        parentDataPath = parentDataPath.substring(0, parentDataPath.lastIndexOf('/'));
        if (!json_pointer_1.default.has(data, parentDataPath)) {
            currentConditionData.__parent = null;
            break;
        }
        const evaluatedData = json_pointer_1.default.get(data, parentDataPath);
        if ((0, mobx_1.isArrayLike)(evaluatedData)) {
            continue;
        }
        currentConditionData.__parent = Object.assign({}, evaluatedData);
        currentConditionData = currentConditionData.__parent;
    } while (parentDataPath.match(/^\/.*\//));
    return conditionData;
}
