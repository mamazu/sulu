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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const searchField_scss_1 = __importDefault(require("./searchField.scss"));
let SearchField = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showIndexes_decorators;
    let _showIndexes_initializers = [];
    let _showIndexes_extraInitializers = [];
    let _get_allIndexes_decorators;
    let _get_index_decorators;
    let _handleIndexClick_decorators;
    let _handleIndexClick_initializers = [];
    let _handleIndexClick_extraInitializers = [];
    let _handleIndexClose_decorators;
    let _handleIndexClose_initializers = [];
    let _handleIndexClose_extraInitializers = [];
    let _handleIndexChange_decorators;
    let _handleIndexChange_initializers = [];
    let _handleIndexChange_extraInitializers = [];
    var SearchField = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.showIndexes = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _showIndexes_initializers, false));
            this.handleIndexClick = (__runInitializers(this, _showIndexes_extraInitializers), __runInitializers(this, _handleIndexClick_initializers, () => {
                this.showIndexes = true;
            }));
            this.handleIndexClose = (__runInitializers(this, _handleIndexClick_extraInitializers), __runInitializers(this, _handleIndexClose_initializers, () => {
                this.showIndexes = false;
            }));
            this.handleIndexChange = (__runInitializers(this, _handleIndexClose_extraInitializers), __runInitializers(this, _handleIndexChange_initializers, (value) => {
                const { onIndexChange, onSearch } = this.props;
                this.showIndexes = false;
                onIndexChange(value);
                onSearch();
            }));
            this.handleQueryChange = (__runInitializers(this, _handleIndexChange_extraInitializers), (event) => {
                const { onQueryChange } = this.props;
                onQueryChange(event.currentTarget.value);
            });
            this.handleQueryKeyPress = (event) => {
                if (event.key === 'Enter') {
                    const { onSearch } = this.props;
                    onSearch();
                }
            };
            this.handleClearClick = () => {
                const { onQueryChange, onSearch } = this.props;
                onQueryChange(undefined);
                onSearch();
            };
        }
        get allIndexes() {
            const { indexes } = this.props;
            if (!indexes) {
                return undefined;
            }
            return Object.values(indexes);
        }
        get index() {
            const { indexName, indexes } = this.props;
            if (!indexName || !indexes) {
                return undefined;
            }
            return indexes[indexName];
        }
        render() {
            const { onSearch, query } = this.props;
            const everythingTranslation = (0, utils_1.translate)('sulu_search.everything');
            return (<react_1.Fragment>
                <div className={searchField_scss_1.default.searchField}>
                    <components_1.ArrowMenu anchorElement={<button className={searchField_scss_1.default.indexButton} onClick={this.handleIndexClick} type="button">
                                <span className={searchField_scss_1.default.index}>
                                    {this.index ? this.index.name : everythingTranslation}
                                </span>
                                <components_1.Icon name="su-angle-down"/>
                            </button>} onClose={this.handleIndexClose} open={this.showIndexes}>
                        <components_1.ArrowMenu.SingleItemSection onChange={this.handleIndexChange} value={this.index ? this.index.indexName : undefined}>
                            <components_1.ArrowMenu.Item value={undefined}>{everythingTranslation}</components_1.ArrowMenu.Item>
                            {this.allIndexes
                    ? this.allIndexes.map((index) => (<components_1.ArrowMenu.Item key={index.indexName} value={index.indexName}>
                                        {index.name}
                                    </components_1.ArrowMenu.Item>))
                    : []}
                        </components_1.ArrowMenu.SingleItemSection>
                    </components_1.ArrowMenu>
                    <div className={searchField_scss_1.default.inputContainer}>
                        <input autoFocus={true} className={searchField_scss_1.default.input} onChange={this.handleQueryChange} onKeyPress={this.handleQueryKeyPress} value={query}/>
                        {query &&
                    <components_1.Icon className={searchField_scss_1.default.clearIcon} name="su-times" onClick={this.handleClearClick}/>}
                        <components_1.Icon className={searchField_scss_1.default.searchIcon} name="su-search" onClick={onSearch}/>
                    </div>
                </div>
                <p className={searchField_scss_1.default.hint}>
                    {(0, utils_1.translate)('sulu_search.search_hint')}
                </p>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "SearchField");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showIndexes_decorators = [mobx_1.observable];
        _get_allIndexes_decorators = [mobx_1.computed];
        _get_index_decorators = [mobx_1.computed];
        _handleIndexClick_decorators = [mobx_1.action];
        _handleIndexClose_decorators = [mobx_1.action];
        _handleIndexChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_allIndexes_decorators, { kind: "getter", name: "allIndexes", static: false, private: false, access: { has: obj => "allIndexes" in obj, get: obj => obj.allIndexes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_index_decorators, { kind: "getter", name: "index", static: false, private: false, access: { has: obj => "index" in obj, get: obj => obj.index }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showIndexes_decorators, { kind: "field", name: "showIndexes", static: false, private: false, access: { has: obj => "showIndexes" in obj, get: obj => obj.showIndexes, set: (obj, value) => { obj.showIndexes = value; } }, metadata: _metadata }, _showIndexes_initializers, _showIndexes_extraInitializers);
        __esDecorate(null, null, _handleIndexClick_decorators, { kind: "field", name: "handleIndexClick", static: false, private: false, access: { has: obj => "handleIndexClick" in obj, get: obj => obj.handleIndexClick, set: (obj, value) => { obj.handleIndexClick = value; } }, metadata: _metadata }, _handleIndexClick_initializers, _handleIndexClick_extraInitializers);
        __esDecorate(null, null, _handleIndexClose_decorators, { kind: "field", name: "handleIndexClose", static: false, private: false, access: { has: obj => "handleIndexClose" in obj, get: obj => obj.handleIndexClose, set: (obj, value) => { obj.handleIndexClose = value; } }, metadata: _metadata }, _handleIndexClose_initializers, _handleIndexClose_extraInitializers);
        __esDecorate(null, null, _handleIndexChange_decorators, { kind: "field", name: "handleIndexChange", static: false, private: false, access: { has: obj => "handleIndexChange" in obj, get: obj => obj.handleIndexChange, set: (obj, value) => { obj.handleIndexChange = value; } }, metadata: _metadata }, _handleIndexChange_initializers, _handleIndexChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SearchField = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        query: '',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchField = _classThis;
})();
exports.default = SearchField;
