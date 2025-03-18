"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
const utils_1 = require("../../../utils");
const AbstractListToolbarAction_1 = __importDefault(require("./AbstractListToolbarAction"));
class DeleteToolbarAction extends AbstractListToolbarAction_1.default {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { allow_conflict_deletion: allowConflictDeletion = true } = this.options;
            if (allowConflictDeletion !== undefined && typeof allowConflictDeletion !== 'boolean') {
                throw new Error('The "allow_conflict_deletion" option must have a boolean value!');
            }
            this.list.requestSelectionDelete(allowConflictDeletion);
        };
    }
    getToolbarItemConfig() {
        const { disabled_condition: disabledCondition, } = this.options;
        const disabledConditionFulfilled = !!disabledCondition && this.listStore.selections.some((item) => jexl_1.default.evalSync(disabledCondition, item));
        return {
            disabled: disabledConditionFulfilled || this.listStore.selectionIds.length === 0,
            icon: 'su-trash-alt',
            label: (0, utils_1.translate)('sulu_admin.delete'),
            loading: this.listStore.deletingSelection,
            onClick: this.handleClick,
            type: 'button',
        };
    }
}
exports.default = DeleteToolbarAction;
