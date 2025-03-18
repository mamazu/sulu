"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
class PublishToolbarAction extends AbstractFormToolbarAction_1.default {
    getToolbarItemConfig() {
        const { visible_condition: visibleCondition, } = this.options;
        const { dirty, data } = this.resourceFormStore;
        const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
        if (visibleConditionFulfilled) {
            return {
                label: (0, Translator_1.translate)('sulu_admin.publish'),
                disabled: dirty || data.publishedState === undefined || !!data.publishedState,
                onClick: () => {
                    this.form.submit({ action: 'publish' });
                },
                type: 'button',
            };
        }
    }
}
exports.default = PublishToolbarAction;
