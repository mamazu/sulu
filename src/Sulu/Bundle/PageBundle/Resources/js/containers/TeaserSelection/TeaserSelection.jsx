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
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const TeaserStore_1 = __importDefault(require("./stores/TeaserStore"));
const Item_1 = __importDefault(require("./Item"));
const teaserProviderRegistry_1 = __importDefault(require("./registries/teaserProviderRegistry"));
const ID_SEPERATOR = ';';
function getUniqueId(teaserItem) {
    return teaserItem.type + ';' + teaserItem.id;
}
function extractUniqueId(id) {
    const splitId = id.split(ID_SEPERATOR);
    return {
        id: splitId[1],
        type: splitId[0],
    };
}
let TeaserSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _editIds_decorators;
    let _editIds_initializers = [];
    let _editIds_extraInitializers = [];
    let _openedOverlay_decorators;
    let _openedOverlay_initializers = [];
    let _openedOverlay_extraInitializers = [];
    let _get_teaserItems_decorators;
    let _get_presentationOptions_decorators;
    let _get_selectedPresentation_decorators;
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleEdit_decorators;
    let _handleEdit_initializers = [];
    let _handleEdit_extraInitializers = [];
    let _handleApply_decorators;
    let _handleApply_initializers = [];
    let _handleApply_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleAddClick_decorators;
    let _handleAddClick_initializers = [];
    let _handleAddClick_extraInitializers = [];
    let _handlePresentationClick_decorators;
    let _handlePresentationClick_initializers = [];
    let _handlePresentationClick_extraInitializers = [];
    var TeaserSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.editIds = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _editIds_initializers, []));
            this.openedOverlay = (__runInitializers(this, _editIds_extraInitializers), __runInitializers(this, _openedOverlay_initializers, undefined));
            this.teaserStore = __runInitializers(this, _openedOverlay_extraInitializers);
            this.handleCancel = __runInitializers(this, _handleCancel_initializers, (type, id) => {
                this.closeItemEdit(getUniqueId({ id, type }));
            });
            this.handleEdit = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleEdit_initializers, (id) => {
                this.openItemEdit(id);
            }));
            this.handleApply = (__runInitializers(this, _handleEdit_extraInitializers), __runInitializers(this, _handleApply_initializers, (item) => {
                const { onChange } = this.props;
                const value = Object.assign({}, this.props.value);
                const editIndex = value.items.findIndex((oldItem) => oldItem.id === item.id);
                value.items[editIndex] = item;
                onChange(value);
                this.closeItemEdit(getUniqueId(item));
            }));
            this.handleRemove = (__runInitializers(this, _handleApply_extraInitializers), (id) => {
                const { onChange, value } = this.props;
                const teaserItem = extractUniqueId(id);
                onChange(Object.assign(Object.assign({}, value), { items: value.items.filter((item) => item.id.toString() !== teaserItem.id || item.type !== teaserItem.type) }));
            });
            this.handleSorted = (oldItemIndex, newItemIndex) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { items: (0, utils_1.arrayMove)(value.items, oldItemIndex, newItemIndex) }));
            };
            this.handleClose = __runInitializers(this, _handleClose_initializers, () => {
                this.openedOverlay = undefined;
            });
            this.handleConfirm = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _handleConfirm_initializers, (items) => {
                const { openedOverlay } = this;
                if (!openedOverlay) {
                    throw new Error('There was no opened overlay defined! This should not happen and is likely a bug.');
                }
                const { onChange, value } = this.props;
                const oldItems = value.items
                    .filter((currentItem) => currentItem.type !== openedOverlay || items.find((item) => item.id === currentItem.id));
                const newItems = items
                    .filter((item) => !oldItems.find((oldItem) => oldItem.id === item.id && oldItem.type === openedOverlay))
                    .map((item) => ({ id: item.id, type: openedOverlay }));
                onChange(Object.assign(Object.assign({}, value), { items: [...oldItems, ...newItems] }));
                items.forEach((item) => {
                    this.teaserStore.add(openedOverlay, item.id);
                });
                this.openedOverlay = undefined;
            }));
            this.handleAddClick = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleAddClick_initializers, (provider) => {
                this.openedOverlay = provider;
            }));
            this.handlePresentationClick = (__runInitializers(this, _handleAddClick_extraInitializers), __runInitializers(this, _handlePresentationClick_initializers, (presentation) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { presentAs: presentation }));
            }));
            __runInitializers(this, _handlePresentationClick_extraInitializers);
            (0, mobx_1.action)(() => {
                const { locale, value } = this.props;
                this.teaserStore = new TeaserStore_1.default(locale);
                value.items.forEach((item) => {
                    this.teaserStore.add(item.type, item.id);
                });
            })();
        }
        componentWillUnmount() {
            this.teaserStore.destroy();
        }
        get teaserItems() {
            return this.props.value.items.map((teaserItem) => (Object.assign(Object.assign(Object.assign({}, this.teaserStore.findById(teaserItem.type, teaserItem.id)), Object.keys(teaserItem).reduce((clearedTeaserItem, key) => {
                if (teaserItem[key] !== undefined) {
                    clearedTeaserItem[key] = teaserItem[key];
                }
                return clearedTeaserItem;
            }, {})), { edited: !!(teaserItem.description || teaserItem.mediaId || teaserItem.title) })));
        }
        get presentationOptions() {
            const { presentations } = this.props;
            if (!presentations) {
                return undefined;
            }
            return presentations.map((presentation) => {
                return {
                    label: presentation.label,
                    value: presentation.value,
                };
            });
        }
        get selectedPresentation() {
            const { presentations, value } = this.props;
            if (!presentations) {
                return undefined;
            }
            return presentations.find((presentation) => presentation.value === value.presentAs);
        }
        openItemEdit(id) {
            this.editIds.push(id);
        }
        closeItemEdit(id) {
            this.editIds.splice(this.editIds.findIndex((editId) => editId === id), 1);
        }
        render() {
            const { disabled, locale, onItemClick, value } = this.props;
            const addButtonOptions = teaserProviderRegistry_1.default.keys.map((teaserProviderKey) => {
                const teaserProvider = teaserProviderRegistry_1.default.get(teaserProviderKey);
                return {
                    label: teaserProvider.title,
                    value: teaserProviderKey,
                };
            });
            const rightButton = this.presentationOptions
                ? {
                    icon: 'su-eye',
                    label: this.selectedPresentation && this.selectedPresentation.label,
                    onClick: this.handlePresentationClick,
                    options: this.presentationOptions,
                }
                : undefined;
            return (<react_1.Fragment>
                <components_1.MultiItemSelection disabled={disabled} leftButton={{
                    icon: 'su-plus-circle',
                    onClick: this.handleAddClick,
                    options: addButtonOptions,
                }} loading={this.teaserStore.loading} onItemsSorted={this.handleSorted} rightButton={rightButton}>
                    {this.teaserItems.map((teaserItem, index) => {
                    const teaserId = getUniqueId(teaserItem);
                    return (<components_1.MultiItemSelection.Item id={teaserId} index={index + 1} key={teaserId} onClick={this.editIds.includes(teaserId) ? undefined : onItemClick} onEdit={this.editIds.includes(teaserId) ? undefined : this.handleEdit} onRemove={this.handleRemove} value={teaserItem}>
                                <Item_1.default description={teaserItem.description} edited={teaserItem.edited} editing={this.editIds.includes(teaserId)} id={teaserItem.id} locale={locale} mediaId={teaserItem.mediaId} onApply={this.handleApply} onCancel={this.handleCancel} title={teaserItem.title} type={teaserItem.type}/>
                            </components_1.MultiItemSelection.Item>);
                })}
                </components_1.MultiItemSelection>
                {teaserProviderRegistry_1.default.keys.map((teaserProviderKey) => (<containers_1.MultiListOverlay adapter={teaserProviderRegistry_1.default.get(teaserProviderKey).listAdapter} key={teaserProviderKey} listKey={teaserProviderKey} locale={locale} onClose={this.handleClose} onConfirm={this.handleConfirm} open={this.openedOverlay === teaserProviderKey} preloadSelectedItems={false} preSelectedItems={value.items.filter((item) => item.type === teaserProviderKey)} resourceKey={teaserProviderKey} title={teaserProviderRegistry_1.default.get(teaserProviderKey).overlayTitle}/>))}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "TeaserSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _editIds_decorators = [mobx_1.observable];
        _openedOverlay_decorators = [mobx_1.observable];
        _get_teaserItems_decorators = [mobx_1.computed];
        _get_presentationOptions_decorators = [mobx_1.computed];
        _get_selectedPresentation_decorators = [mobx_1.computed];
        _handleCancel_decorators = [mobx_1.action];
        _handleEdit_decorators = [mobx_1.action];
        _handleApply_decorators = [mobx_1.action];
        _handleClose_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _handleAddClick_decorators = [mobx_1.action];
        _handlePresentationClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_teaserItems_decorators, { kind: "getter", name: "teaserItems", static: false, private: false, access: { has: obj => "teaserItems" in obj, get: obj => obj.teaserItems }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_presentationOptions_decorators, { kind: "getter", name: "presentationOptions", static: false, private: false, access: { has: obj => "presentationOptions" in obj, get: obj => obj.presentationOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_selectedPresentation_decorators, { kind: "getter", name: "selectedPresentation", static: false, private: false, access: { has: obj => "selectedPresentation" in obj, get: obj => obj.selectedPresentation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _editIds_decorators, { kind: "field", name: "editIds", static: false, private: false, access: { has: obj => "editIds" in obj, get: obj => obj.editIds, set: (obj, value) => { obj.editIds = value; } }, metadata: _metadata }, _editIds_initializers, _editIds_extraInitializers);
        __esDecorate(null, null, _openedOverlay_decorators, { kind: "field", name: "openedOverlay", static: false, private: false, access: { has: obj => "openedOverlay" in obj, get: obj => obj.openedOverlay, set: (obj, value) => { obj.openedOverlay = value; } }, metadata: _metadata }, _openedOverlay_initializers, _openedOverlay_extraInitializers);
        __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
        __esDecorate(null, null, _handleEdit_decorators, { kind: "field", name: "handleEdit", static: false, private: false, access: { has: obj => "handleEdit" in obj, get: obj => obj.handleEdit, set: (obj, value) => { obj.handleEdit = value; } }, metadata: _metadata }, _handleEdit_initializers, _handleEdit_extraInitializers);
        __esDecorate(null, null, _handleApply_decorators, { kind: "field", name: "handleApply", static: false, private: false, access: { has: obj => "handleApply" in obj, get: obj => obj.handleApply, set: (obj, value) => { obj.handleApply = value; } }, metadata: _metadata }, _handleApply_initializers, _handleApply_extraInitializers);
        __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _handleAddClick_decorators, { kind: "field", name: "handleAddClick", static: false, private: false, access: { has: obj => "handleAddClick" in obj, get: obj => obj.handleAddClick, set: (obj, value) => { obj.handleAddClick = value; } }, metadata: _metadata }, _handleAddClick_initializers, _handleAddClick_extraInitializers);
        __esDecorate(null, null, _handlePresentationClick_decorators, { kind: "field", name: "handlePresentationClick", static: false, private: false, access: { has: obj => "handlePresentationClick" in obj, get: obj => obj.handlePresentationClick, set: (obj, value) => { obj.handlePresentationClick = value; } }, metadata: _metadata }, _handlePresentationClick_initializers, _handlePresentationClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeaserSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        value: {
            presentAs: undefined,
            items: [],
        },
    };
    _classThis.Item = Item_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeaserSelection = _classThis;
})();
exports.default = TeaserSelection;
