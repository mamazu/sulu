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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const FormOverlay_1 = __importDefault(require("sulu-admin-bundle/containers/FormOverlay"));
const Translator_1 = require("sulu-admin-bundle/utils/Translator");
const services_1 = require("sulu-admin-bundle/services");
const SchemaFormStoreDecorator_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/SchemaFormStoreDecorator"));
const MemoryFormStore_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/MemoryFormStore"));
let RestoreFormOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _formStore_decorators;
    let _formStore_initializers = [];
    let _formStore_extraInitializers = [];
    let _updateFormStoreInstance_decorators;
    var RestoreFormOverlay = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.formStore = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _formStore_initializers, void 0));
            this.handleConfirm = (__runInitializers(this, _formStore_extraInitializers), () => {
                var _a;
                const { onConfirm } = this.props;
                onConfirm((0, mobx_1.toJS)((_a = this.formStore) === null || _a === void 0 ? void 0 : _a.data));
            });
        }
        componentDidMount() {
            this.updateFormStoreInstance();
        }
        componentDidUpdate(prevProps) {
            const { open, formKey, trashItemId } = this.props;
            if (prevProps.formKey !== formKey
                || prevProps.trashItemId !== trashItemId
                || prevProps.open === false && open === true) {
                this.updateFormStoreInstance();
            }
        }
        componentWillUnmount() {
            if (this.formStore) {
                this.formStore.destroy();
            }
        }
        updateFormStoreInstance() {
            const { formKey, trashItemId } = this.props;
            if (this.formStore) {
                this.formStore.destroy();
                this.formStore = null;
            }
            if (!formKey || !trashItemId) {
                return;
            }
            const formStore = new SchemaFormStoreDecorator_1.default((schema, jsonSchema) => {
                const store = new MemoryFormStore_1.default({}, schema, jsonSchema);
                store.loading = true;
                return store;
            }, formKey);
            services_1.ResourceRequester.get('trash_items', { id: trashItemId }).then((0, mobx_1.action)((response) => {
                formStore.changeMultiple(response.restoreData, { isServerValue: true });
                formStore.loading = false;
            }));
            this.formStore = formStore;
        }
        render() {
            const { onClose, open, confirmLoading } = this.props;
            const { formStore } = this;
            if (!formStore) {
                return null;
            }
            return (<FormOverlay_1.default confirmLoading={confirmLoading} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} formStore={formStore} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={(0, Translator_1.translate)('sulu_trash.restore_element')}/>);
        }
    };
    __setFunctionName(_classThis, "RestoreFormOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _formStore_decorators = [mobx_1.observable];
        _updateFormStoreInstance_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _updateFormStoreInstance_decorators, { kind: "method", name: "updateFormStoreInstance", static: false, private: false, access: { has: obj => "updateFormStoreInstance" in obj, get: obj => obj.updateFormStoreInstance }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _formStore_decorators, { kind: "field", name: "formStore", static: false, private: false, access: { has: obj => "formStore" in obj, get: obj => obj.formStore, set: (obj, value) => { obj.formStore = value; } }, metadata: _metadata }, _formStore_initializers, _formStore_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RestoreFormOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        confirmLoading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RestoreFormOverlay = _classThis;
})();
exports.default = RestoreFormOverlay;
