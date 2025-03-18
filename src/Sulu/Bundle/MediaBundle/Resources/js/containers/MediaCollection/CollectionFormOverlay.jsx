"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const components_1 = require("sulu-admin-bundle/components");
const collectionFormOverlay_scss_1 = __importDefault(require("./collectionFormOverlay.scss"));
const FORM_KEY = 'collection_details';
let CollectionFormOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _formStore_decorators;
    let _formStore_initializers = [];
    let _formStore_extraInitializers = [];
    let _componentDidUpdate_decorators;
    var CollectionFormOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.formRef = __runInitializers(this, _instanceExtraInitializers);
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.formStore = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _formStore_initializers, void 0));
            this.setFormRef = (__runInitializers(this, _formStore_extraInitializers), (formRef) => {
                this.formRef = formRef;
            });
            this.handleConfirm = () => {
                if (this.formRef) {
                    this.formRef.submit();
                }
            };
            this.handleClose = () => {
                this.props.onClose();
            };
            this.handleSubmit = () => {
                const { onConfirm, resourceStore } = this.props;
                onConfirm(resourceStore);
            };
            const { resourceStore } = this.props;
            this.formStore = containers_1.resourceFormStoreFactory.createFromResourceStore(resourceStore, FORM_KEY);
        }
        componentDidUpdate(prevProps) {
            const { operationType } = this.props;
            if (operationType) {
                this.title = operationType === 'create'
                    ? (0, utils_1.translate)('sulu_media.add_collection')
                    : (0, utils_1.translate)('sulu_media.edit_collection');
            }
            if (this.props.resourceStore !== prevProps.resourceStore) {
                this.formStore.destroy();
                this.formStore = containers_1.resourceFormStoreFactory.createFromResourceStore(this.props.resourceStore, FORM_KEY);
            }
        }
        componentWillUnmount() {
            this.formStore.destroy();
        }
        render() {
            const { operationType, overlayType, resourceStore, } = this.props;
            const open = operationType === 'create' || operationType === 'update';
            const confirmText = (0, utils_1.translate)('sulu_admin.ok');
            const cancelText = (0, utils_1.translate)('sulu_admin.cancel');
            const form = (<containers_1.Form onSubmit={this.handleSubmit} ref={this.setFormRef} store={this.formStore}/>);
            if (overlayType === 'dialog') {
                return (<components_1.Dialog cancelText={cancelText} confirmLoading={resourceStore.saving} confirmText={confirmText} onCancel={this.handleClose} onConfirm={this.handleConfirm} open={open} title={this.title}>
                    {form}
                </components_1.Dialog>);
            }
            return (<components_1.Overlay confirmLoading={resourceStore.saving} confirmText={confirmText} onClose={this.handleClose} onConfirm={this.handleConfirm} open={open} title={this.title}>
                <div className={collectionFormOverlay_scss_1.default.overlay}>
                    {form}
                </div>
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "CollectionFormOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _title_decorators = [mobx_1.observable];
        _formStore_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _formStore_decorators, { kind: "field", name: "formStore", static: false, private: false, access: { has: obj => "formStore" in obj, get: obj => obj.formStore, set: (obj, value) => { obj.formStore = value; } }, metadata: _metadata }, _formStore_initializers, _formStore_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CollectionFormOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CollectionFormOverlay = _classThis;
})();
exports.default = CollectionFormOverlay;
