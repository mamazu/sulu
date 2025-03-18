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
const jexl_1 = __importDefault(require("jexl"));
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const utils_1 = require("../../../utils");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let TypeToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _selectedTypeForUnsavedChangesDialog_decorators;
    let _selectedTypeForUnsavedChangesDialog_initializers = [];
    let _selectedTypeForUnsavedChangesDialog_extraInitializers = [];
    let _handleUnsavedChangesDialogClose_decorators;
    let _handleUnsavedChangesDialogClose_initializers = [];
    let _handleUnsavedChangesDialogClose_extraInitializers = [];
    let _handleUnsavedChangesDialogConfirm_decorators;
    let _handleUnsavedChangesDialogConfirm_initializers = [];
    let _handleUnsavedChangesDialogConfirm_extraInitializers = [];
    return _a = class TypeToolbarAction extends _classSuper {
            getToolbarItemConfig() {
                const formTypes = Object.keys(this.resourceFormStore.types).map((key) => this.resourceFormStore.types[key]);
                if (!this.resourceFormStore.typesLoading && formTypes.length === 0) {
                    throw new Error('The ToolbarAction for types only works with entities actually supporting types!');
                }
                const { disabled_condition: disabledCondition, sort_by: sortBy, } = this.options;
                if (sortBy !== undefined && typeof sortBy !== 'string') {
                    throw new Error('The "sort_by" option must be a string if given!');
                }
                const isDisabled = disabledCondition ? jexl_1.default.evalSync(disabledCondition, this.conditionData) : false;
                const sortedTypes = sortBy
                    ? formTypes.sort((t1, t2) => String(t1[sortBy]).localeCompare(String(t2[sortBy])))
                    : formTypes;
                return {
                    type: 'select',
                    icon: 'su-brush',
                    onChange: (0, mobx_1.action)((value) => {
                        if (typeof value !== 'string') {
                            throw new Error('Only strings are valid as a form type!');
                        }
                        if (!this.resourceFormStore.dirty) {
                            this.resourceFormStore.changeType(value);
                        }
                        else {
                            this.selectedTypeForUnsavedChangesDialog = value;
                        }
                    }),
                    loading: this.resourceFormStore.typesLoading,
                    value: this.resourceFormStore.type,
                    disabled: isDisabled,
                    options: sortedTypes.map((type) => ({
                        value: type.key,
                        label: type.title,
                    })),
                };
            }
            getNode() {
                return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.ok')} key="sulu_admin.type" onCancel={this.handleUnsavedChangesDialogClose} onConfirm={this.handleUnsavedChangesDialogConfirm} open={!!this.selectedTypeForUnsavedChangesDialog} title={(0, utils_1.translate)('sulu_admin.change_type_dirty_warning_dialog_title')}>
                {(0, utils_1.translate)('sulu_admin.dirty_warning_dialog_text')}
            </Dialog_1.default>);
            }
            constructor() {
                super(...arguments);
                this.selectedTypeForUnsavedChangesDialog = __runInitializers(this, _selectedTypeForUnsavedChangesDialog_initializers, undefined);
                this.handleUnsavedChangesDialogClose = (__runInitializers(this, _selectedTypeForUnsavedChangesDialog_extraInitializers), __runInitializers(this, _handleUnsavedChangesDialogClose_initializers, () => {
                    this.selectedTypeForUnsavedChangesDialog = undefined;
                }));
                this.handleUnsavedChangesDialogConfirm = (__runInitializers(this, _handleUnsavedChangesDialogClose_extraInitializers), __runInitializers(this, _handleUnsavedChangesDialogConfirm_initializers, () => {
                    if (this.selectedTypeForUnsavedChangesDialog) {
                        this.resourceFormStore.changeType(this.selectedTypeForUnsavedChangesDialog);
                    }
                    this.selectedTypeForUnsavedChangesDialog = undefined;
                }));
                __runInitializers(this, _handleUnsavedChangesDialogConfirm_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _selectedTypeForUnsavedChangesDialog_decorators = [mobx_1.observable];
            _handleUnsavedChangesDialogClose_decorators = [mobx_1.action];
            _handleUnsavedChangesDialogConfirm_decorators = [mobx_1.action];
            __esDecorate(null, null, _selectedTypeForUnsavedChangesDialog_decorators, { kind: "field", name: "selectedTypeForUnsavedChangesDialog", static: false, private: false, access: { has: obj => "selectedTypeForUnsavedChangesDialog" in obj, get: obj => obj.selectedTypeForUnsavedChangesDialog, set: (obj, value) => { obj.selectedTypeForUnsavedChangesDialog = value; } }, metadata: _metadata }, _selectedTypeForUnsavedChangesDialog_initializers, _selectedTypeForUnsavedChangesDialog_extraInitializers);
            __esDecorate(null, null, _handleUnsavedChangesDialogClose_decorators, { kind: "field", name: "handleUnsavedChangesDialogClose", static: false, private: false, access: { has: obj => "handleUnsavedChangesDialogClose" in obj, get: obj => obj.handleUnsavedChangesDialogClose, set: (obj, value) => { obj.handleUnsavedChangesDialogClose = value; } }, metadata: _metadata }, _handleUnsavedChangesDialogClose_initializers, _handleUnsavedChangesDialogClose_extraInitializers);
            __esDecorate(null, null, _handleUnsavedChangesDialogConfirm_decorators, { kind: "field", name: "handleUnsavedChangesDialogConfirm", static: false, private: false, access: { has: obj => "handleUnsavedChangesDialogConfirm" in obj, get: obj => obj.handleUnsavedChangesDialogConfirm, set: (obj, value) => { obj.handleUnsavedChangesDialogConfirm = value; } }, metadata: _metadata }, _handleUnsavedChangesDialogConfirm_initializers, _handleUnsavedChangesDialogConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = TypeToolbarAction;
