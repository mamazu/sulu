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
let SetUnpublishedToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _showUnpublishDialog_decorators;
    let _showUnpublishDialog_initializers = [];
    let _showUnpublishDialog_extraInitializers = [];
    let _unpublishing_decorators;
    let _unpublishing_initializers = [];
    let _unpublishing_extraInitializers = [];
    let _handleUnpublishDialogConfirm_decorators;
    let _handleUnpublishDialogConfirm_initializers = [];
    let _handleUnpublishDialogConfirm_extraInitializers = [];
    let _handleUnpublishDialogClose_decorators;
    let _handleUnpublishDialogClose_initializers = [];
    let _handleUnpublishDialogClose_extraInitializers = [];
    return _a = class SetUnpublishedToolbarAction extends _classSuper {
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
                this.showUnpublishDialog = __runInitializers(this, _showUnpublishDialog_initializers, false);
                this.unpublishing = (__runInitializers(this, _showUnpublishDialog_extraInitializers), __runInitializers(this, _unpublishing_initializers, false));
                this.handleUnpublishDialogConfirm = (__runInitializers(this, _unpublishing_extraInitializers), __runInitializers(this, _handleUnpublishDialogConfirm_initializers, () => {
                    const { id, locale, options: { webspace, }, resourceKey, } = this.resourceFormStore;
                    if (!id) {
                        throw new Error('The page can only be unpublished if an ID is given! This should not happen and is likely a bug.');
                    }
                    this.unpublishing = true;
                    ResourceRequester_1.default.post(resourceKey, undefined, {
                        action: 'unpublish',
                        locale,
                        id,
                        webspace,
                    }).then((0, mobx_1.action)((response) => {
                        this.unpublishing = false;
                        this.showUnpublishDialog = false;
                        this.form.showSuccessSnackbar();
                        this.resourceFormStore.changeMultiple(response, { isServerValue: true });
                        this.resourceFormStore.dirty = false;
                    }));
                }));
                this.handleUnpublishDialogClose = (__runInitializers(this, _handleUnpublishDialogConfirm_extraInitializers), __runInitializers(this, _handleUnpublishDialogClose_initializers, () => {
                    this.showUnpublishDialog = false;
                }));
                __runInitializers(this, _handleUnpublishDialogClose_extraInitializers);
            }
            getNode() {
                const { resourceFormStore: { id, }, } = this;
                if (!id) {
                    return null;
                }
                return (<Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmLoading={this.unpublishing} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} key="sulu_admin.set_unpublished" onCancel={this.handleUnpublishDialogClose} onConfirm={this.handleUnpublishDialogConfirm} open={this.showUnpublishDialog} title={(0, Translator_1.translate)('sulu_page.unpublish_warning_title')}>
                {(0, Translator_1.translate)('sulu_page.unpublish_warning_text')}
            </Dialog_1.default>);
            }
            getToolbarItemConfig() {
                const { visible_condition: visibleCondition, } = this.options;
                const { id, data } = this.resourceFormStore;
                const { published } = data;
                const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
                if (visibleConditionFulfilled) {
                    return {
                        disabled: !id || !published,
                        label: (0, Translator_1.translate)('sulu_page.unpublish'),
                        onClick: (0, mobx_1.action)(() => {
                            this.showUnpublishDialog = true;
                        }),
                        type: 'button',
                    };
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showUnpublishDialog_decorators = [mobx_1.observable];
            _unpublishing_decorators = [mobx_1.observable];
            _handleUnpublishDialogConfirm_decorators = [mobx_1.action];
            _handleUnpublishDialogClose_decorators = [mobx_1.action];
            __esDecorate(null, null, _showUnpublishDialog_decorators, { kind: "field", name: "showUnpublishDialog", static: false, private: false, access: { has: obj => "showUnpublishDialog" in obj, get: obj => obj.showUnpublishDialog, set: (obj, value) => { obj.showUnpublishDialog = value; } }, metadata: _metadata }, _showUnpublishDialog_initializers, _showUnpublishDialog_extraInitializers);
            __esDecorate(null, null, _unpublishing_decorators, { kind: "field", name: "unpublishing", static: false, private: false, access: { has: obj => "unpublishing" in obj, get: obj => obj.unpublishing, set: (obj, value) => { obj.unpublishing = value; } }, metadata: _metadata }, _unpublishing_initializers, _unpublishing_extraInitializers);
            __esDecorate(null, null, _handleUnpublishDialogConfirm_decorators, { kind: "field", name: "handleUnpublishDialogConfirm", static: false, private: false, access: { has: obj => "handleUnpublishDialogConfirm" in obj, get: obj => obj.handleUnpublishDialogConfirm, set: (obj, value) => { obj.handleUnpublishDialogConfirm = value; } }, metadata: _metadata }, _handleUnpublishDialogConfirm_initializers, _handleUnpublishDialogConfirm_extraInitializers);
            __esDecorate(null, null, _handleUnpublishDialogClose_decorators, { kind: "field", name: "handleUnpublishDialogClose", static: false, private: false, access: { has: obj => "handleUnpublishDialogClose" in obj, get: obj => obj.handleUnpublishDialogClose, set: (obj, value) => { obj.handleUnpublishDialogClose = value; } }, metadata: _metadata }, _handleUnpublishDialogClose_initializers, _handleUnpublishDialogClose_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SetUnpublishedToolbarAction;
