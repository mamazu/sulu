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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const Translator_1 = require("../../utils/Translator");
const Form_1 = require("../../containers/Form");
const FormOverlay_1 = __importDefault(require("../../containers/FormOverlay"));
const ResourceStore_1 = __importDefault(require("../../stores/ResourceStore"));
const List_1 = __importDefault(require("../List"));
let FormOverlayList = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _formStore_decorators;
    let _formStore_initializers = [];
    let _formStore_extraInitializers = [];
    let _createFormOverlay_decorators;
    let _createFormOverlay_initializers = [];
    let _createFormOverlay_extraInitializers = [];
    let _destroyFormStore_decorators;
    let _destroyFormStore_initializers = [];
    let _destroyFormStore_extraInitializers = [];
    var FormOverlayList = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.locale = mobx_1.observable.box();
            this.formStore = __runInitializers(this, _formStore_initializers, void 0);
            this.handleItemAdd = (__runInitializers(this, _formStore_extraInitializers), () => {
                this.createFormOverlay(undefined);
            });
            this.handleItemClick = (itemId) => {
                this.createFormOverlay(itemId);
            };
            this.handleFormOverlayConfirm = () => {
                this.destroyFormStore();
                if (this.listRef) {
                    this.listRef.reload();
                }
            };
            this.handleFormOverlayClose = () => {
                this.destroyFormStore();
            };
            this.createFormOverlay = __runInitializers(this, _createFormOverlay_initializers, (itemId) => {
                const { router: { attributes, route: { options: { requestParameters = {}, formKey, resourceKey, routerAttributesToFormRequest = {}, resourceStorePropertiesToFormRequest = {}, routerAttributesToFormMetadata = {}, metadataRequestParameters = {}, }, }, }, } = this.props;
                if (this.formStore) {
                    this.formStore.destroy();
                }
                const observableOptions = {};
                if (this.locale.get()) {
                    observableOptions.locale = this.locale;
                }
                const formStoreOptions = this.buildFormStoreOptions(requestParameters, attributes, routerAttributesToFormRequest, resourceStorePropertiesToFormRequest);
                const formStoreMetadataOptions = this.buildFormStoreMetadataOptions(metadataRequestParameters, attributes, routerAttributesToFormMetadata);
                const resourceStore = new ResourceStore_1.default(resourceKey, itemId, observableOptions, formStoreOptions);
                this.formStore = Form_1.resourceFormStoreFactory.createFromResourceStore(resourceStore, formKey, formStoreOptions, formStoreMetadataOptions);
            });
            this.destroyFormStore = (__runInitializers(this, _createFormOverlay_extraInitializers), __runInitializers(this, _destroyFormStore_initializers, () => {
                if (this.formStore) {
                    this.formStore.destroy();
                    this.formStore = undefined;
                }
            }));
            this.setListRef = (__runInitializers(this, _destroyFormStore_extraInitializers), (listRef) => {
                this.listRef = listRef;
            });
        }
        buildFormStoreOptions(requestParameters, attributes, routerAttributesToFormRequest, resourceStorePropertiesToFormRequest) {
            const formStoreOptions = requestParameters ? requestParameters : {};
            routerAttributesToFormRequest = (0, mobx_1.toJS)(routerAttributesToFormRequest);
            Object.keys(routerAttributesToFormRequest).forEach((key) => {
                const formOptionKey = routerAttributesToFormRequest[key];
                const attributeName = isNaN(key) ? key : routerAttributesToFormRequest[key];
                formStoreOptions[formOptionKey] = attributes[attributeName];
            });
            resourceStorePropertiesToFormRequest = (0, mobx_1.toJS)(resourceStorePropertiesToFormRequest);
            Object.keys(resourceStorePropertiesToFormRequest).forEach((key) => {
                const formOptionKey = resourceStorePropertiesToFormRequest[key];
                const attributeName = isNaN(key) ? key : resourceStorePropertiesToFormRequest[key];
                if (!this.props.resourceStore) {
                    return;
                }
                formStoreOptions[formOptionKey] = this.props.resourceStore.data[attributeName];
            });
            return formStoreOptions;
        }
        buildFormStoreMetadataOptions(metadataRequestParameters, attributes, routerAttributesToFormMetadata) {
            const metadataOptions = metadataRequestParameters ? metadataRequestParameters : {};
            Object.keys((0, mobx_1.toJS)(routerAttributesToFormMetadata)).forEach((key) => {
                const metadataOptionKey = routerAttributesToFormMetadata[key];
                const attributeName = isNaN(key) ? key : (0, mobx_1.toJS)(routerAttributesToFormMetadata[key]);
                metadataOptions[metadataOptionKey] = attributes[attributeName];
            });
            return metadataOptions;
        }
        componentWillUnmount() {
            this.destroyFormStore();
        }
        render() {
            const { formStore, props: { router: { route: { options: { addOverlayTitle, editOverlayTitle, formKey, overlaySize, }, }, }, }, } = this;
            const overlayTitle = formStore && formStore.id
                ? (0, Translator_1.translate)(editOverlayTitle || 'sulu_admin.edit')
                : (0, Translator_1.translate)(addOverlayTitle || 'sulu_admin.create');
            return (<react_1.Fragment>
                <List_1.default {...this.props} locale={this.locale} onItemAdd={formKey && this.handleItemAdd} onItemClick={formKey && this.handleItemClick} ref={this.setListRef}/>
                {!!formStore && (<FormOverlay_1.default confirmDisabled={!formStore.dirty} confirmText={(0, Translator_1.translate)('sulu_admin.save')} formStore={formStore} onClose={this.handleFormOverlayClose} onConfirm={this.handleFormOverlayConfirm} open={!!formStore} size={overlaySize ? overlaySize : 'small'} title={overlayTitle}/>)}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "FormOverlayList");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _formStore_decorators = [mobx_1.observable];
        _createFormOverlay_decorators = [mobx_1.action];
        _destroyFormStore_decorators = [mobx_1.action];
        __esDecorate(null, null, _formStore_decorators, { kind: "field", name: "formStore", static: false, private: false, access: { has: obj => "formStore" in obj, get: obj => obj.formStore, set: (obj, value) => { obj.formStore = value; } }, metadata: _metadata }, _formStore_initializers, _formStore_extraInitializers);
        __esDecorate(null, null, _createFormOverlay_decorators, { kind: "field", name: "createFormOverlay", static: false, private: false, access: { has: obj => "createFormOverlay" in obj, get: obj => obj.createFormOverlay, set: (obj, value) => { obj.createFormOverlay = value; } }, metadata: _metadata }, _createFormOverlay_initializers, _createFormOverlay_extraInitializers);
        __esDecorate(null, null, _destroyFormStore_decorators, { kind: "field", name: "destroyFormStore", static: false, private: false, access: { has: obj => "destroyFormStore" in obj, get: obj => obj.destroyFormStore, set: (obj, value) => { obj.destroyFormStore = value; } }, metadata: _metadata }, _destroyFormStore_initializers, _destroyFormStore_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormOverlayList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.getDerivedRouteAttributes = List_1.default.getDerivedRouteAttributes;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormOverlayList = _classThis;
})();
exports.default = FormOverlayList;
