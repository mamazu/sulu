"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const mobx_1 = require("mobx");
const webspaceStore_1 = __importDefault(require("../../../stores/webspaceStore"));
function default_1(data, dataPath, formInspector) {
    const { options, metadataOptions } = formInspector;
    const webspaceKey = data.webspace || options.webspace || (metadataOptions && metadataOptions.webspace);
    const conditionData = {};
    conditionData.__webspaces = (0, mobx_1.toJS)(webspaceStore_1.default.allWebspaces);
    if (webspaceKey && webspaceStore_1.default.hasWebspace(webspaceKey)) {
        conditionData.__webspace = webspaceStore_1.default.getWebspace(webspaceKey);
    }
    return conditionData;
}
