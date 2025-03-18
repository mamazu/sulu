"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const utils_1 = require("../../utils");
class DeleteReferencedResourceDialog extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleCancel = () => {
            const { onCancel } = this.props;
            onCancel();
        };
        this.handleConfirm = () => {
            const { allowDeletion, onCancel, onConfirm } = this.props;
            if (!allowDeletion) {
                onCancel();
                return;
            }
            onConfirm();
        };
    }
    render() {
        const { allowDeletion, confirmLoading, referencingResourcesData } = this.props;
        return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={confirmLoading} confirmText={allowDeletion ? (0, utils_1.translate)('sulu_admin.delete') : (0, utils_1.translate)('sulu_admin.ok')} onCancel={allowDeletion ? this.handleCancel : undefined} onConfirm={this.handleConfirm} open={true} title={allowDeletion
                ? (0, utils_1.translate)('sulu_admin.delete_linked_warning_title')
                : (0, utils_1.translate)('sulu_admin.item_not_deletable')}>
                {allowDeletion
                ? (0, utils_1.translate)('sulu_admin.delete_linked_warning_text')
                : (0, utils_1.translate)('sulu_admin.delete_linked_abort_text')}

                <ul>
                    {referencingResourcesData.referencingResources.map((item, index) => {
                const { title = null } = item;
                if (!title) {
                    return null;
                }
                return (<li key={index}>{title}</li>);
            })}
                </ul>
            </Dialog_1.default>);
    }
}
DeleteReferencedResourceDialog.defaultProps = {
    allowDeletion: true,
};
exports.default = DeleteReferencedResourceDialog;
