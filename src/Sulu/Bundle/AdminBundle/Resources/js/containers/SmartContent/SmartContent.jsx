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
const MultiItemSelection_1 = __importDefault(require("../../components/MultiItemSelection"));
const Translator_1 = require("../../utils/Translator");
const smartContentConfigStore_1 = __importDefault(require("./stores/smartContentConfigStore"));
const FilterOverlay_1 = __importDefault(require("./FilterOverlay"));
const SmartContentItem_1 = __importDefault(require("./SmartContentItem"));
let SmartContent = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showFilterOverlay_decorators;
    let _showFilterOverlay_initializers = [];
    let _showFilterOverlay_extraInitializers = [];
    let _initialize_decorators;
    let _handleFilterClick_decorators;
    let _handleFilterClick_initializers = [];
    let _handleFilterClick_extraInitializers = [];
    let _handleFilterOverlayClose_decorators;
    let _handleFilterOverlayClose_initializers = [];
    let _handleFilterOverlayClose_extraInitializers = [];
    var SmartContent = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.config = __runInitializers(this, _instanceExtraInitializers);
            this.sections = [];
            this.showFilterOverlay = __runInitializers(this, _showFilterOverlay_initializers, false);
            this.handleFilterClick = (__runInitializers(this, _showFilterOverlay_extraInitializers), __runInitializers(this, _handleFilterClick_initializers, () => {
                this.showFilterOverlay = true;
            }));
            this.handleFilterOverlayClose = (__runInitializers(this, _handleFilterClick_extraInitializers), __runInitializers(this, _handleFilterOverlayClose_initializers, () => {
                this.showFilterOverlay = false;
            }));
            __runInitializers(this, _handleFilterOverlayClose_extraInitializers);
            this.initialize();
        }
        initialize() {
            const { store } = this.props;
            this.config = smartContentConfigStore_1.default.getConfig(store.provider);
            if (this.config.datasourceResourceKey && this.config.datasourceAdapter) {
                this.sections.push('datasource');
            }
            if (this.config.categories) {
                this.sections.push('categories');
            }
            if (this.config.tags) {
                this.sections.push('tags');
            }
            if (this.config.audienceTargeting) {
                this.sections.push('audienceTargeting');
            }
            if (this.config.sorting.length > 0) {
                this.sections.push('sorting');
            }
            if (this.config.types && this.config.types.length > 0) {
                this.sections.push('types');
            }
            if (this.config.presentAs && this.props.presentations.length > 0) {
                this.sections.push('presentation');
            }
            if (this.config.limit) {
                this.sections.push('limit');
            }
        }
        render() {
            const { categoryRootKey, defaultValue, disabled, fieldLabel, onItemClick, store } = this.props;
            const presentations = this.props.presentations.reduce((presentations, presentation) => {
                presentations[presentation.name] = presentation.value;
                return presentations;
            }, {});
            return (<react_1.Fragment>
                <MultiItemSelection_1.default disabled={disabled} label={(0, Translator_1.translate)('sulu_admin.smart_content_label', { count: store.items.length })} leftButton={{
                    icon: 'su-filter',
                    onClick: this.handleFilterClick,
                }} loading={store.itemsLoading || store.loading} onItemClick={onItemClick} sortable={false}>
                    {store.items.map((item, index) => (<MultiItemSelection_1.default.Item id={item.id} index={index + 1} key={index} value={item}>
                            <SmartContentItem_1.default item={item}/>
                        </MultiItemSelection_1.default.Item>))}
                </MultiItemSelection_1.default>
                <FilterOverlay_1.default categoryRootKey={categoryRootKey} dataSourceAdapter={this.config.datasourceAdapter} dataSourceListKey={this.config.datasourceListKey} dataSourceResourceKey={this.config.datasourceResourceKey} defaultValue={defaultValue} onClose={this.handleFilterOverlayClose} open={this.showFilterOverlay} presentations={presentations} sections={this.sections} smartContentStore={store} sortings={this.config.sorting} title={(0, Translator_1.translate)('sulu_admin.filter_overlay_title', { fieldLabel: fieldLabel || '' })} types={this.config.types}/>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "SmartContent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showFilterOverlay_decorators = [mobx_1.observable];
        _initialize_decorators = [mobx_1.action];
        _handleFilterClick_decorators = [mobx_1.action];
        _handleFilterOverlayClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _initialize_decorators, { kind: "method", name: "initialize", static: false, private: false, access: { has: obj => "initialize" in obj, get: obj => obj.initialize }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showFilterOverlay_decorators, { kind: "field", name: "showFilterOverlay", static: false, private: false, access: { has: obj => "showFilterOverlay" in obj, get: obj => obj.showFilterOverlay, set: (obj, value) => { obj.showFilterOverlay = value; } }, metadata: _metadata }, _showFilterOverlay_initializers, _showFilterOverlay_extraInitializers);
        __esDecorate(null, null, _handleFilterClick_decorators, { kind: "field", name: "handleFilterClick", static: false, private: false, access: { has: obj => "handleFilterClick" in obj, get: obj => obj.handleFilterClick, set: (obj, value) => { obj.handleFilterClick = value; } }, metadata: _metadata }, _handleFilterClick_initializers, _handleFilterClick_extraInitializers);
        __esDecorate(null, null, _handleFilterOverlayClose_decorators, { kind: "field", name: "handleFilterOverlayClose", static: false, private: false, access: { has: obj => "handleFilterOverlayClose" in obj, get: obj => obj.handleFilterOverlayClose, set: (obj, value) => { obj.handleFilterOverlayClose = value; } }, metadata: _metadata }, _handleFilterOverlayClose_initializers, _handleFilterOverlayClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmartContent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        presentations: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmartContent = _classThis;
})();
exports.default = SmartContent;
