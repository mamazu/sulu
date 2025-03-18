"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
const loglevel_1 = __importDefault(require("loglevel"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
class SaveWithPublishingToolbarAction extends AbstractFormToolbarAction_1.default {
    // @deprecated
    constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
        const { publish_display_condition: publishDisplayCondition, save_display_condition: saveDisplayCondition, publish_visible_condition: publishVisibleCondition, save_visible_condition: saveVisibleCondition, } = options;
        loglevel_1.default.warn('The "SaveWithPublishingToolbarAction" is deprecated since 2.3 and will be removed. ' +
            'Use a "DropdownToolbarAction" with a "SaveToolbarAction" and "PublishToolbarAction" instead.');
        if (publishDisplayCondition) {
            // @deprecated
            loglevel_1.default.warn('The "publish_display_condition" option is deprecated since version 2.0 and will be removed. ' +
                'Use the "publish_visible_condition" option instead.');
            if (!publishVisibleCondition) {
                options.publish_visible_condition = publishDisplayCondition;
            }
        }
        if (saveDisplayCondition) {
            // @deprecated
            loglevel_1.default.warn('The "save_display_condition" option is deprecated since version 2.0 and will be removed. ' +
                'Use the "save_visible_condition" option instead.');
            if (!saveVisibleCondition) {
                options.save_visible_condition = saveDisplayCondition;
            }
        }
        super(resourceFormStore, form, router, locales, options, parentResourceStore);
    }
    getToolbarItemConfig() {
        const { publish_visible_condition: publishVisibleCondition, save_visible_condition: saveVisibleCondition, } = this.options;
        const { dirty, data, saving } = this.resourceFormStore;
        const publishVisibleConditionFulfilled = !publishVisibleCondition
            || jexl_1.default.evalSync(publishVisibleCondition, this.conditionData);
        const saveVisibleConditionFulfilled = !saveVisibleCondition
            || jexl_1.default.evalSync(saveVisibleCondition, this.conditionData);
        const options = [];
        if (saveVisibleConditionFulfilled) {
            options.push({
                label: (0, Translator_1.translate)('sulu_admin.save_draft'),
                disabled: !dirty,
                onClick: () => {
                    this.form.submit({ action: 'draft' });
                },
            });
        }
        if (saveVisibleConditionFulfilled && publishVisibleConditionFulfilled) {
            options.push({
                label: (0, Translator_1.translate)('sulu_admin.save_publish'),
                disabled: !dirty,
                onClick: () => {
                    this.form.submit({ action: 'publish' });
                },
            });
        }
        if (publishVisibleConditionFulfilled) {
            options.push({
                label: (0, Translator_1.translate)('sulu_admin.publish'),
                // TODO do not hardcode "publishedState" but use metadata instead
                disabled: dirty || data.publishedState === undefined || !!data.publishedState,
                onClick: () => {
                    this.form.submit({ action: 'publish' });
                },
            });
        }
        if (options.length === 0) {
            return;
        }
        return {
            type: 'dropdown',
            label: (0, Translator_1.translate)('sulu_admin.save'),
            icon: 'su-save',
            loading: saving,
            options,
        };
    }
}
exports.default = SaveWithPublishingToolbarAction;
