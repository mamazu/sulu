"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = convertDisplayOptionsFromParams;
const validateDisplayOption_1 = __importDefault(require("./validateDisplayOption"));
function convertDisplayOptionsFromParams(displayOptions) {
    if (!displayOptions) {
        return [];
    }
    return displayOptions
        .filter((displayOption) => displayOption.value === true)
        .map(({ name }) => {
        if (!(0, validateDisplayOption_1.default)(name)) {
            throw new Error('The children of "displayOptions" contains the invalid value "' + (name || '') + '".');
        }
        return name;
    });
}
