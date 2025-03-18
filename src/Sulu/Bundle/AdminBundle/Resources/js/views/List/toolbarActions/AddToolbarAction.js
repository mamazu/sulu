"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const Translator_1 = require("../../../utils/Translator");
const AbstractListToolbarAction_1 = __importDefault(require("./AbstractListToolbarAction"));
class AddToolbarAction extends AbstractListToolbarAction_1.default {
    getToolbarItemConfig() {
        return {
            icon: 'su-plus-circle',
            label: (0, Translator_1.translate)('sulu_admin.add'),
            onClick: (0, mobx_1.action)(this.list.addItem),
            type: 'button',
        };
    }
}
exports.default = AddToolbarAction;
