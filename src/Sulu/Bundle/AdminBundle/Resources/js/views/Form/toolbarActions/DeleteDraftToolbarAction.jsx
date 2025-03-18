"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const jexl_1 = __importDefault(require("jexl"));
const loglevel_1 = __importDefault(require("loglevel"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let DeleteDraftToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _showDeleteDraftDialog_decorators;
    let _showDeleteDraftDialog_initializers = [];
    let _showDeleteDraftDialog_extraInitializers = [];
    let _deletingDraft_decorators;
    let _deletingDraft_initializers = [];
    let _deletingDraft_extraInitializers = [];
    let _handleDeleteDraftDialogConfirm_decorators;
    let _handleDeleteDraftDialogConfirm_initializers = [];
    let _handleDeleteDraftDialogConfirm_extraInitializers = [];
    let _handleDeleteDraftDialogClose_decorators;
    let _handleDeleteDraftDialogClose_initializers = [];
    let _handleDeleteDraftDialogClose_extraInitializers = [];
    return _a = class DeleteDraftToolbarAction extends _classSuper {
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                const { display_condition: displayCondition, visible_condition: visibleCondition, } = options;
                if (displayCondition) {
                    // @deprecated
                    loglevel_1.default.warn('The "display_condition" option is deprecated since version 2.0 and will be removed. ' +
                        'Use the "visible_condition" option instead.');
                    if (!visibleCondition) {
                        options.visible_condition = displayCondition;
                    }
                }
                super(resourceFormStore, form, router, locales, options, parentResourceStore);
                this.showDeleteDraftDialog = __runInitializers(this, _showDeleteDraftDialog_initializers, false);
                this.deletingDraft = (__runInitializers(this, _showDeleteDraftDialog_extraInitializers), __runInitializers(this, _deletingDraft_initializers, false));
                this.handleDeleteDraftDialogConfirm = (__runInitializers(this, _deletingDraft_extraInitializers), __runInitializers(this, _handleDeleteDraftDialogConfirm_initializers, () => {
                    const { id, locale, options: { webspace, }, resourceKey, } = this.resourceFormStore;
                    if (!id) {
                        throw new Error('The draft can only be deleted if an ID is given! This should not happen and is likely a bug.');
                    }
                    this.deletingDraft = true;
                    ResourceRequester_1.default.post(resourceKey, undefined, {
                        action: 'remove-draft',
                        locale,
                        id,
                        webspace,
                    }).then((0, mobx_1.action)((response) => {
                        this.deletingDraft = false;
                        this.showDeleteDraftDialog = false;
                        this.form.showSuccessSnackbar();
                        this.resourceFormStore.changeMultiple(response, { isServerValue: true });
                        this.resourceFormStore.dirty = false;
                    }));
                }));
                this.handleDeleteDraftDialogClose = (__runInitializers(this, _handleDeleteDraftDialogConfirm_extraInitializers), __runInitializers(this, _handleDeleteDraftDialogClose_initializers, () => {
                    this.showDeleteDraftDialog = false;
                }));
                __runInitializers(this, _handleDeleteDraftDialogClose_extraInitializers);
            }
            getNode() {
                const { resourceFormStore: { id, }, } = this;
                if (!id) {
                    return null;
                }
                return (<Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmLoading={this.deletingDraft} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} key="sulu_admin.delete_draft" onCancel={this.handleDeleteDraftDialogClose} onConfirm={this.handleDeleteDraftDialogConfirm} open={this.showDeleteDraftDialog} title={(0, Translator_1.translate)('sulu_page.delete_draft_warning_title')}>
                {(0, Translator_1.translate)('sulu_page.delete_draft_warning_text')}
            </Dialog_1.default>);
            }
            getToolbarItemConfig() {
                const { visible_condition: visibleCondition, } = this.options;
                const { id, data } = this.resourceFormStore;
                const { published, publishedState } = data;
                const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
                if (visibleConditionFulfilled) {
                    return {
                        disabled: !id || !published || publishedState,
                        label: (0, Translator_1.translate)('sulu_page.delete_draft'),
                        onClick: (0, mobx_1.action)(() => {
                            this.showDeleteDraftDialog = true;
                        }),
                        type: 'button',
                    };
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showDeleteDraftDialog_decorators = [mobx_1.observable];
            _deletingDraft_decorators = [mobx_1.observable];
            _handleDeleteDraftDialogConfirm_decorators = [mobx_1.action];
            _handleDeleteDraftDialogClose_decorators = [mobx_1.action];
            __esDecorate(null, null, _showDeleteDraftDialog_decorators, { kind: "field", name: "showDeleteDraftDialog", static: false, private: false, access: { has: obj => "showDeleteDraftDialog" in obj, get: obj => obj.showDeleteDraftDialog, set: (obj, value) => { obj.showDeleteDraftDialog = value; } }, metadata: _metadata }, _showDeleteDraftDialog_initializers, _showDeleteDraftDialog_extraInitializers);
            __esDecorate(null, null, _deletingDraft_decorators, { kind: "field", name: "deletingDraft", static: false, private: false, access: { has: obj => "deletingDraft" in obj, get: obj => obj.deletingDraft, set: (obj, value) => { obj.deletingDraft = value; } }, metadata: _metadata }, _deletingDraft_initializers, _deletingDraft_extraInitializers);
            __esDecorate(null, null, _handleDeleteDraftDialogConfirm_decorators, { kind: "field", name: "handleDeleteDraftDialogConfirm", static: false, private: false, access: { has: obj => "handleDeleteDraftDialogConfirm" in obj, get: obj => obj.handleDeleteDraftDialogConfirm, set: (obj, value) => { obj.handleDeleteDraftDialogConfirm = value; } }, metadata: _metadata }, _handleDeleteDraftDialogConfirm_initializers, _handleDeleteDraftDialogConfirm_extraInitializers);
            __esDecorate(null, null, _handleDeleteDraftDialogClose_decorators, { kind: "field", name: "handleDeleteDraftDialogClose", static: false, private: false, access: { has: obj => "handleDeleteDraftDialogClose" in obj, get: obj => obj.handleDeleteDraftDialogClose, set: (obj, value) => { obj.handleDeleteDraftDialogClose = value; } }, metadata: _metadata }, _handleDeleteDraftDialogClose_initializers, _handleDeleteDraftDialogClose_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = DeleteDraftToolbarAction;
