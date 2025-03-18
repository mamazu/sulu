"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
class SaveToolbarAction extends AbstractFormToolbarAction_1.default {
    getToolbarItemConfig() {
        const { label = 'sulu_admin.save', visible_condition: visibleCondition, options: submitOptions, } = this.options;
        const { dirty, saving } = this.resourceFormStore;
        if (typeof label !== 'string') {
            throw new Error('The "label" option must be a string!');
        }
        if (submitOptions && typeof submitOptions !== 'object') {
            throw new Error('The "options" option must be an object!');
        }
        const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
        if (visibleConditionFulfilled) {
            return {
                disabled: !dirty,
                icon: 'su-save',
                label: (0, Translator_1.translate)(label),
                loading: saving,
                onClick: () => {
                    this.form.submit(submitOptions);
                },
                type: 'button',
            };
        }
    }
}
exports.default = SaveToolbarAction;
