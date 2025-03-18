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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const CardCollection_1 = __importDefault(require("../../../components/CardCollection"));
const Overlay_1 = __importDefault(require("../../../components/Overlay"));
const Form_1 = __importStar(require("../../../containers/Form"));
const Translator_1 = require("../../../utils/Translator");
const cardCollection_scss_1 = __importDefault(require("./cardCollection.scss"));
let CardCollection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _overlayIndex_decorators;
    let _overlayIndex_initializers = [];
    let _overlayIndex_extraInitializers = [];
    let _formStore_decorators;
    let _formStore_initializers = [];
    let _formStore_extraInitializers = [];
    let _handleAdd_decorators;
    let _handleAdd_initializers = [];
    let _handleAdd_extraInitializers = [];
    let _handleEdit_decorators;
    let _handleEdit_initializers = [];
    let _handleEdit_extraInitializers = [];
    let _handleRemove_decorators;
    let _handleRemove_initializers = [];
    let _handleRemove_extraInitializers = [];
    let _handleCloseOverlay_decorators;
    let _handleCloseOverlay_initializers = [];
    let _handleCloseOverlay_extraInitializers = [];
    let _handleOverlaySubmit_decorators;
    let _handleOverlaySubmit_initializers = [];
    let _handleOverlaySubmit_extraInitializers = [];
    let _closeFormStore_decorators;
    var CardCollection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.overlayIndex = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _overlayIndex_initializers, undefined));
            this.formStore = (__runInitializers(this, _overlayIndex_extraInitializers), __runInitializers(this, _formStore_initializers, undefined));
            this.formRef = __runInitializers(this, _formStore_extraInitializers);
            this.setFormRef = (formRef) => {
                this.formRef = formRef;
            };
            this.handleAdd = __runInitializers(this, _handleAdd_initializers, () => {
                const { fieldTypeOptions: { jsonSchema, schema, }, } = this.props;
                this.overlayIndex = undefined;
                this.formStore = Form_1.memoryFormStoreFactory.createFromSchema(schema, jsonSchema);
            });
            this.handleEdit = (__runInitializers(this, _handleAdd_extraInitializers), __runInitializers(this, _handleEdit_initializers, (index) => {
                const { fieldTypeOptions: { jsonSchema, schema, }, value, } = this.props;
                if (!value) {
                    throw new Error('The index to edit does not exists. This should not happen and is likely a bug.');
                }
                this.overlayIndex = index;
                this.formStore = Form_1.memoryFormStoreFactory.createFromSchema(schema, jsonSchema, (0, mobx_1.toJS)(value[index]));
            }));
            this.handleRemove = (__runInitializers(this, _handleEdit_extraInitializers), __runInitializers(this, _handleRemove_initializers, (index) => {
                const { onChange, value } = this.props;
                if (!value) {
                    throw new Error('The index to remove does not exists. This should not happen and is likely a bug.');
                }
                onChange(value.filter((element, elementIndex) => elementIndex !== index));
            }));
            this.handleCloseOverlay = (__runInitializers(this, _handleRemove_extraInitializers), __runInitializers(this, _handleCloseOverlay_initializers, () => {
                this.closeFormStore();
            }));
            this.handleConfirm = (__runInitializers(this, _handleCloseOverlay_extraInitializers), () => {
                if (!this.formRef) {
                    throw new Error('The reference to the form does not exist, although the overlay was confirmed.'
                        + ' This should not happen and is likely a bug.');
                }
                this.formRef.submit();
            });
            this.handleOverlaySubmit = __runInitializers(this, _handleOverlaySubmit_initializers, () => {
                const { onChange, onFinish, value } = this.props;
                const { formStore } = this;
                if (!formStore) {
                    throw new Error('The formStore does not exist, although it was submitted. This should nto happen and is likely a bug.');
                }
                if (value === null || value === undefined) {
                    onChange([formStore.data]);
                }
                else if (this.overlayIndex === undefined) {
                    onChange([...value, formStore.data]);
                }
                else {
                    onChange(value.map((element, index) => index === this.overlayIndex ? formStore.data : element));
                }
                onFinish();
                this.closeFormStore();
            });
            __runInitializers(this, _handleOverlaySubmit_extraInitializers);
            const { fieldTypeOptions: { renderCardContent, schema, } = {}, } = this.props;
            if (!renderCardContent) {
                throw new Error('The "renderCardContent" field type option must be a function!');
            }
            if (!schema) {
                throw new Error('The "schema" field type option must be a valid schema!');
            }
        }
        closeFormStore() {
            if (!this.formStore) {
                return;
            }
            this.formStore.destroy();
            this.formStore = undefined;
        }
        render() {
            const { fieldTypeOptions: { addOverlayTitle, editOverlayTitle, renderCardContent, }, value, } = this.props;
            return (<react_1.Fragment>
                <CardCollection_1.default onAdd={this.handleAdd} onEdit={this.handleEdit} onRemove={this.handleRemove}>
                    {!!value && value.map((card, index) => (<CardCollection_1.default.Card key={index}>
                            {renderCardContent(card)}
                        </CardCollection_1.default.Card>))}
                </CardCollection_1.default>
                <Overlay_1.default confirmDisabled={!!this.formStore && !this.formStore.dirty} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} onClose={this.handleCloseOverlay} onConfirm={this.handleConfirm} open={!!this.formStore} size="small" title={this.overlayIndex !== null
                    ? (0, Translator_1.translate)(editOverlayTitle)
                    : (0, Translator_1.translate)(addOverlayTitle)}>
                    <div className={cardCollection_scss_1.default.overlay}>
                        {!!this.formStore &&
                    <Form_1.default onSubmit={this.handleOverlaySubmit} ref={this.setFormRef} store={this.formStore}/>}
                    </div>
                </Overlay_1.default>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "CardCollection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _overlayIndex_decorators = [mobx_1.observable];
        _formStore_decorators = [mobx_1.observable];
        _handleAdd_decorators = [mobx_1.action];
        _handleEdit_decorators = [mobx_1.action];
        _handleRemove_decorators = [mobx_1.action];
        _handleCloseOverlay_decorators = [mobx_1.action];
        _handleOverlaySubmit_decorators = [mobx_1.action];
        _closeFormStore_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _closeFormStore_decorators, { kind: "method", name: "closeFormStore", static: false, private: false, access: { has: obj => "closeFormStore" in obj, get: obj => obj.closeFormStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _overlayIndex_decorators, { kind: "field", name: "overlayIndex", static: false, private: false, access: { has: obj => "overlayIndex" in obj, get: obj => obj.overlayIndex, set: (obj, value) => { obj.overlayIndex = value; } }, metadata: _metadata }, _overlayIndex_initializers, _overlayIndex_extraInitializers);
        __esDecorate(null, null, _formStore_decorators, { kind: "field", name: "formStore", static: false, private: false, access: { has: obj => "formStore" in obj, get: obj => obj.formStore, set: (obj, value) => { obj.formStore = value; } }, metadata: _metadata }, _formStore_initializers, _formStore_extraInitializers);
        __esDecorate(null, null, _handleAdd_decorators, { kind: "field", name: "handleAdd", static: false, private: false, access: { has: obj => "handleAdd" in obj, get: obj => obj.handleAdd, set: (obj, value) => { obj.handleAdd = value; } }, metadata: _metadata }, _handleAdd_initializers, _handleAdd_extraInitializers);
        __esDecorate(null, null, _handleEdit_decorators, { kind: "field", name: "handleEdit", static: false, private: false, access: { has: obj => "handleEdit" in obj, get: obj => obj.handleEdit, set: (obj, value) => { obj.handleEdit = value; } }, metadata: _metadata }, _handleEdit_initializers, _handleEdit_extraInitializers);
        __esDecorate(null, null, _handleRemove_decorators, { kind: "field", name: "handleRemove", static: false, private: false, access: { has: obj => "handleRemove" in obj, get: obj => obj.handleRemove, set: (obj, value) => { obj.handleRemove = value; } }, metadata: _metadata }, _handleRemove_initializers, _handleRemove_extraInitializers);
        __esDecorate(null, null, _handleCloseOverlay_decorators, { kind: "field", name: "handleCloseOverlay", static: false, private: false, access: { has: obj => "handleCloseOverlay" in obj, get: obj => obj.handleCloseOverlay, set: (obj, value) => { obj.handleCloseOverlay = value; } }, metadata: _metadata }, _handleCloseOverlay_initializers, _handleCloseOverlay_extraInitializers);
        __esDecorate(null, null, _handleOverlaySubmit_decorators, { kind: "field", name: "handleOverlaySubmit", static: false, private: false, access: { has: obj => "handleOverlaySubmit" in obj, get: obj => obj.handleOverlaySubmit, set: (obj, value) => { obj.handleOverlaySubmit = value; } }, metadata: _metadata }, _handleOverlaySubmit_initializers, _handleOverlaySubmit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardCollection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardCollection = _classThis;
})();
exports.default = CardCollection;
