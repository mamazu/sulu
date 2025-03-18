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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const SmartContent_1 = __importStar(require("../../SmartContent"));
const smartContentStorePool_1 = __importDefault(require("./smartContentStorePool"));
let SmartContent = (() => {
    var _a;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_previousSmartContentStores_decorators;
    let _get_presentations_decorators;
    let _get_provider_decorators;
    let _get_value_decorators;
    let _get_defaultValue_decorators;
    let _get_viewName_decorators;
    let _get_resultToView_decorators;
    return _a = class SmartContent extends _classSuper {
            get previousSmartContentStores() {
                return smartContentStorePool_1.default.findPreviousStores(this.smartContentStore);
            }
            get presentations() {
                const { schemaOptions: { present_as: { value: schemaPresentations = [], } = {}, } = {}, } = this.props;
                if (!(0, mobx_1.isArrayLike)(schemaPresentations)) {
                    throw new Error('The "present_as" schemaOption must be an array, but received ' + typeof schemaPresentations + '!');
                }
                return schemaPresentations.map((presentation) => {
                    const { name, title } = presentation;
                    if (!name) {
                        throw new Error('Every presentation in the "present_as" schema Option must contain a name');
                    }
                    if (!title) {
                        throw new Error('Every presentation in the "present_as" schema Option must contain a title');
                    }
                    return {
                        name: name.toString(),
                        value: title.toString(),
                    };
                });
            }
            get provider() {
                const { schemaOptions: { provider: { value: provider, } = { value: 'pages' }, } = {}, } = this.props;
                if (typeof provider !== 'string') {
                    throw new Error('The "provider" schemaOption must be a string, but received ' + typeof provider + '!');
                }
                return provider;
            }
            get value() {
                const { value } = this.props;
                return value !== undefined
                    ? value
                    : this.defaultValue;
            }
            get defaultValue() {
                return SmartContent_1.smartContentConfigStore.getDefaultValue(this.provider, this.presentations);
            }
            get viewName() {
                return SmartContent_1.smartContentConfigStore.getConfig(this.provider).view;
            }
            get resultToView() {
                return SmartContent_1.smartContentConfigStore.getConfig(this.provider).resultToView;
            }
            constructor(props) {
                var _b;
                super(props);
                this.smartContentStore = __runInitializers(this, _instanceExtraInitializers);
                this.handleFilterCriteriaChange = (filterCriteria) => {
                    const { onChange, onFinish, value } = this.props;
                    const currentValue = (0, mobx_1.toJS)(value);
                    const newValue = (0, mobx_1.toJS)(filterCriteria);
                    if (currentValue) {
                        if (currentValue.categories) {
                            currentValue.categories.sort();
                        }
                        if (currentValue.tags) {
                            currentValue.tags.sort();
                        }
                    }
                    if (newValue) {
                        if (newValue.categories) {
                            newValue.categories.sort();
                        }
                        if (newValue.tags) {
                            newValue.tags.sort();
                        }
                    }
                    if (this.smartContentStore.loading || (0, fast_deep_equal_1.default)(currentValue, newValue)) {
                        return;
                    }
                    onChange(filterCriteria);
                    onFinish();
                    smartContentStorePool_1.default.updateExcludedIds();
                };
                this.handleItemClick = (itemId, item) => {
                    const { router } = this.props;
                    const { resultToView, viewName } = this;
                    if (!router || !viewName || !resultToView) {
                        return;
                    }
                    router.navigate(viewName, Object.keys(resultToView).reduce((parameters, resultPath) => {
                        parameters[resultToView[resultPath]] = json_pointer_1.default.get(item, '/' + resultPath);
                        return parameters;
                    }, {}));
                };
                const { formInspector, onChange, schemaOptions = {}, value, } = this.props;
                const { exclude_duplicates: { value: excludeDuplicates = false, } = {}, } = schemaOptions;
                if (typeof excludeDuplicates !== 'boolean') {
                    throw new Error('The "exclude_duplicates" schemaOption must be a boolean if set!');
                }
                const { datasourceResourceKey } = SmartContent_1.smartContentConfigStore.getConfig(this.provider);
                if (value === undefined) {
                    onChange(this.value, { isDefaultValue: true });
                }
                this.smartContentStore = new SmartContent_1.SmartContentStore(this.provider, this.value, formInspector.locale, datasourceResourceKey, formInspector.resourceKey === this.provider ? formInspector.id : undefined, schemaOptions, (_b = formInspector.metadataOptions) === null || _b === void 0 ? void 0 : _b.webspace);
                smartContentStorePool_1.default.add(this.smartContentStore, excludeDuplicates);
                this.filterCriteriaChangeDisposer = (0, mobx_1.reaction)(() => (0, mobx_1.toJS)(this.smartContentStore.filterCriteria), (value) => this.handleFilterCriteriaChange(value));
                if (!excludeDuplicates || this.previousSmartContentStores.length === 0) {
                    this.smartContentStore.start();
                }
                else {
                    // If duplicates are excluded wait with loading the smart content until all previous ones have been loaded
                    // Otherwise it is not known which ids to exclude for the initial request and has to be done a second time
                    (0, mobx_1.when)(() => this.previousSmartContentStores.every((store) => !store.itemsLoading), () => {
                        smartContentStorePool_1.default.updateExcludedIds();
                        this.smartContentStore.start();
                    });
                }
            }
            componentWillUnmount() {
                smartContentStorePool_1.default.remove(this.smartContentStore);
                this.smartContentStore.destroy();
                this.filterCriteriaChangeDisposer();
            }
            render() {
                const { disabled, label, schemaOptions: { category_root: { value: categoryRootKey, } = {}, } = {}, } = this.props;
                if (categoryRootKey !== undefined && typeof categoryRootKey !== 'string') {
                    throw new Error('The "category_root" schemaOption must a string if set!');
                }
                return (<SmartContent_1.default categoryRootKey={categoryRootKey} defaultValue={this.defaultValue} disabled={!!disabled} fieldLabel={label} onItemClick={this.viewName && this.resultToView ? this.handleItemClick : undefined} presentations={this.presentations} store={this.smartContentStore}/>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_previousSmartContentStores_decorators = [mobx_1.computed];
            _get_presentations_decorators = [mobx_1.computed];
            _get_provider_decorators = [mobx_1.computed];
            _get_value_decorators = [mobx_1.computed];
            _get_defaultValue_decorators = [mobx_1.computed];
            _get_viewName_decorators = [mobx_1.computed];
            _get_resultToView_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_previousSmartContentStores_decorators, { kind: "getter", name: "previousSmartContentStores", static: false, private: false, access: { has: obj => "previousSmartContentStores" in obj, get: obj => obj.previousSmartContentStores }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_presentations_decorators, { kind: "getter", name: "presentations", static: false, private: false, access: { has: obj => "presentations" in obj, get: obj => obj.presentations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_provider_decorators, { kind: "getter", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_defaultValue_decorators, { kind: "getter", name: "defaultValue", static: false, private: false, access: { has: obj => "defaultValue" in obj, get: obj => obj.defaultValue }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_viewName_decorators, { kind: "getter", name: "viewName", static: false, private: false, access: { has: obj => "viewName" in obj, get: obj => obj.viewName }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_resultToView_decorators, { kind: "getter", name: "resultToView", static: false, private: false, access: { has: obj => "resultToView" in obj, get: obj => obj.resultToView }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SmartContent;
