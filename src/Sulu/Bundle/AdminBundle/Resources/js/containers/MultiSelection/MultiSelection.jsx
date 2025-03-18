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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const jexl_1 = __importDefault(require("jexl"));
const classnames_1 = __importDefault(require("classnames"));
const CroppedText_1 = __importDefault(require("../../components/CroppedText"));
const MultiItemSelection_1 = __importDefault(require("../../components/MultiItemSelection"));
const PublishIndicator_1 = __importDefault(require("../../components/PublishIndicator"));
const MultiSelectionStore_1 = __importDefault(require("../../stores/MultiSelectionStore"));
const MultiListOverlay_1 = __importDefault(require("../MultiListOverlay"));
const multiSelection_scss_1 = __importDefault(require("./multiSelection.scss"));
let MultiSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _overlayOpen_decorators;
    let _overlayOpen_initializers = [];
    let _overlayOpen_extraInitializers = [];
    let _closeOverlay_decorators;
    let _openOverlay_decorators;
    let _handleOverlayOpen_decorators;
    let _handleOverlayOpen_initializers = [];
    let _handleOverlayOpen_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    var MultiSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.selectionStore = __runInitializers(this, _instanceExtraInitializers);
            this.overlayOpen = __runInitializers(this, _overlayOpen_initializers, false);
            this.handleOverlayOpen = (__runInitializers(this, _overlayOpen_extraInitializers), __runInitializers(this, _handleOverlayOpen_initializers, () => {
                this.openOverlay();
            }));
            this.handleOverlayClose = (__runInitializers(this, _handleOverlayOpen_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.closeOverlay();
            }));
            this.handleOverlayConfirm = (__runInitializers(this, _handleOverlayClose_extraInitializers), (selectedItems) => {
                this.selectionStore.set(selectedItems);
                this.closeOverlay();
            });
            this.handleRemove = (id) => {
                this.selectionStore.removeById(id);
            };
            this.handleSorted = (oldItemIndex, newItemIndex) => {
                this.selectionStore.move(oldItemIndex, newItemIndex);
            };
            const { locale, options, resourceKey, value } = this.props;
            // TODO instead of creating the store here and passing the props required for this, we should pass a store prop
            this.selectionStore = new MultiSelectionStore_1.default(resourceKey, value, locale, 'ids', options);
            this.changeSelectionDisposer = (0, mobx_1.reaction)(() => (this.selectionStore.items.map((item) => item.id)), (loadedItemIds) => {
                const { onChange, value } = this.props;
                if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(value), (0, mobx_1.toJS)(loadedItemIds))) {
                    onChange(loadedItemIds);
                }
            });
            this.changeOptionsDisposer = (0, mobx_1.reaction)(() => this.props.options, (options) => {
                this.selectionStore.setRequestParameters(options);
                this.selectionStore.loadItems(this.props.value);
            }, { equals: mobx_1.comparer.structural });
        }
        componentDidUpdate() {
            const newIds = (0, mobx_1.toJS)(this.props.value);
            const loadedIds = (0, mobx_1.toJS)(this.selectionStore.items.map((item) => item.id));
            newIds.sort();
            loadedIds.sort();
            if (!(0, fast_deep_equal_1.default)(newIds, loadedIds)) {
                this.selectionStore.loadItems(newIds);
            }
        }
        componentWillUnmount() {
            this.changeSelectionDisposer();
            this.changeOptionsDisposer();
        }
        closeOverlay() {
            this.overlayOpen = false;
        }
        openOverlay() {
            this.overlayOpen = true;
        }
        render() {
            const { adapter, allowDeselectForDisabledItems, listKey, disabled, disabledIds, displayProperties, icon, itemDisabledCondition, label, locale, onItemClick, options, overlayTitle, resourceKey, sortable, } = this.props;
            const { items, loading } = this.selectionStore;
            const columns = displayProperties.length;
            return (<react_1.Fragment>
                <MultiItemSelection_1.default disabled={disabled} label={label} leftButton={{
                    icon,
                    onClick: this.handleOverlayOpen,
                }} loading={loading} onItemClick={onItemClick} onItemRemove={this.handleRemove} onItemsSorted={this.handleSorted} sortable={sortable}>
                    {items.map((item, index) => {
                    const itemDisabled = disabledIds.includes(item.id) ||
                        (!!itemDisabledCondition && jexl_1.default.evalSync(itemDisabledCondition, item));
                    const itemColumnClass = (0, classnames_1.default)(multiSelection_scss_1.default.itemColumn, {
                        [multiSelection_scss_1.default.disabled]: itemDisabled,
                    });
                    const { published = undefined, publishedState = undefined } = item;
                    return (<MultiItemSelection_1.default.Item allowRemoveWhileDisabled={allowDeselectForDisabledItems} disabled={itemDisabled} id={item.id} index={index + 1} key={item.id} value={item}>
                                <div className={multiSelection_scss_1.default.itemContainer}>
                                    {(publishedState !== undefined || published !== undefined) &&
                            !(publishedState && published) &&
                            <div className={multiSelection_scss_1.default.publishIndicator}>
                                                <PublishIndicator_1.default draft={!publishedState} published={!!published}/>
                                            </div>}

                                    <div className={multiSelection_scss_1.default.columnList}>
                                        {displayProperties.map((displayProperty) => (<span className={itemColumnClass} key={displayProperty} style={{ width: 100 / columns + '%' }}>
                                                <CroppedText_1.default>{item[displayProperty]}</CroppedText_1.default>
                                            </span>))}
                                    </div>
                                </div>
                            </MultiItemSelection_1.default.Item>);
                })}
                </MultiItemSelection_1.default>
                <MultiListOverlay_1.default adapter={adapter} disabledIds={disabledIds} itemDisabledCondition={itemDisabledCondition} listKey={listKey} locale={locale} onClose={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} open={this.overlayOpen} options={options} preSelectedItems={items} resourceKey={resourceKey} title={overlayTitle}/>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "MultiSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _overlayOpen_decorators = [mobx_1.observable];
        _closeOverlay_decorators = [mobx_1.action];
        _openOverlay_decorators = [mobx_1.action];
        _handleOverlayOpen_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _closeOverlay_decorators, { kind: "method", name: "closeOverlay", static: false, private: false, access: { has: obj => "closeOverlay" in obj, get: obj => obj.closeOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _openOverlay_decorators, { kind: "method", name: "openOverlay", static: false, private: false, access: { has: obj => "openOverlay" in obj, get: obj => obj.openOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _overlayOpen_decorators, { kind: "field", name: "overlayOpen", static: false, private: false, access: { has: obj => "overlayOpen" in obj, get: obj => obj.overlayOpen, set: (obj, value) => { obj.overlayOpen = value; } }, metadata: _metadata }, _overlayOpen_initializers, _overlayOpen_extraInitializers);
        __esDecorate(null, null, _handleOverlayOpen_decorators, { kind: "field", name: "handleOverlayOpen", static: false, private: false, access: { has: obj => "handleOverlayOpen" in obj, get: obj => obj.handleOverlayOpen, set: (obj, value) => { obj.handleOverlayOpen = value; } }, metadata: _metadata }, _handleOverlayOpen_initializers, _handleOverlayOpen_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        allowDeselectForDisabledItems: false,
        disabled: false,
        disabledIds: [],
        displayProperties: [],
        icon: 'su-plus',
        options: {},
        sortable: true,
        value: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiSelection = _classThis;
})();
exports.default = MultiSelection;
