"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.ResourceTabs = exports.formToolbarActionRegistry = exports.Form = exports.listToolbarActionRegistry = exports.listItemActionRegistry = exports.List = exports.AbstractFormToolbarAction = exports.AbstractListToolbarAction = exports.AbstractListItemAction = void 0;
const Form_1 = __importStar(require("./Form"));
exports.Form = Form_1.default;
Object.defineProperty(exports, "AbstractFormToolbarAction", { enumerable: true, get: function () { return Form_1.AbstractFormToolbarAction; } });
Object.defineProperty(exports, "formToolbarActionRegistry", { enumerable: true, get: function () { return Form_1.formToolbarActionRegistry; } });
const List_1 = __importStar(require("./List"));
exports.List = List_1.default;
Object.defineProperty(exports, "AbstractListItemAction", { enumerable: true, get: function () { return List_1.AbstractListItemAction; } });
Object.defineProperty(exports, "AbstractListToolbarAction", { enumerable: true, get: function () { return List_1.AbstractListToolbarAction; } });
Object.defineProperty(exports, "listItemActionRegistry", { enumerable: true, get: function () { return List_1.listItemActionRegistry; } });
Object.defineProperty(exports, "listToolbarActionRegistry", { enumerable: true, get: function () { return List_1.listToolbarActionRegistry; } });
const Tabs_1 = __importDefault(require("./Tabs"));
exports.Tabs = Tabs_1.default;
const ResourceTabs_1 = __importDefault(require("./ResourceTabs"));
exports.ResourceTabs = ResourceTabs_1.default;
