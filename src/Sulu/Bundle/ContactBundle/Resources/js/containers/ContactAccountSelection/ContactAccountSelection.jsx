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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const ContactAccountSelectionStore_1 = __importDefault(require("./stores/ContactAccountSelectionStore"));
const contactAccountSelection_scss_1 = __importDefault(require("./contactAccountSelection.scss"));
let ContactAccountSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _openedOverlayType_decorators;
    let _openedOverlayType_initializers = [];
    let _openedOverlayType_extraInitializers = [];
    let _get_loadedIds_decorators;
    let _handleAddButtonClick_decorators;
    let _handleAddButtonClick_initializers = [];
    let _handleAddButtonClick_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleContactConfirm_decorators;
    let _handleContactConfirm_initializers = [];
    let _handleContactConfirm_extraInitializers = [];
    let _handleAccountConfirm_decorators;
    let _handleAccountConfirm_initializers = [];
    let _handleAccountConfirm_extraInitializers = [];
    var ContactAccountSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.openedOverlayType = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _openedOverlayType_initializers, undefined));
            this.store = __runInitializers(this, _openedOverlayType_extraInitializers);
            this.handleAddButtonClick = __runInitializers(this, _handleAddButtonClick_initializers, (type) => {
                this.openedOverlayType = type;
            });
            this.handleOverlayClose = (__runInitializers(this, _handleAddButtonClick_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.openedOverlayType = undefined;
            }));
            this.handleContactConfirm = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleContactConfirm_initializers, (contacts) => {
                this.handleConfirm(contacts, ContactAccountSelectionStore_1.default.contactPrefix);
            }));
            this.handleAccountConfirm = (__runInitializers(this, _handleContactConfirm_extraInitializers), __runInitializers(this, _handleAccountConfirm_initializers, (accounts) => {
                this.handleConfirm(accounts, ContactAccountSelectionStore_1.default.accountPrefix);
            }));
            this.handleRemove = (__runInitializers(this, _handleAccountConfirm_extraInitializers), (id) => {
                this.store.remove(id);
                this.callChange();
            });
            this.handleSorted = (oldItemIndex, newItemIndex) => {
                this.store.move(oldItemIndex, newItemIndex);
                this.callChange();
            };
            this.handleItemClick = (itemId, item) => {
                const { onItemClick } = this.props;
                if (!onItemClick) {
                    return;
                }
                onItemClick(itemId, item);
            };
            const { value } = this.props;
            this.store = new ContactAccountSelectionStore_1.default();
            this.store.loadItems(value);
        }
        componentDidUpdate(prevProps) {
            const { value } = this.props;
            const oldIds = (0, mobx_1.toJS)(prevProps.value);
            const newIds = (0, mobx_1.toJS)(value);
            if (!(0, fast_deep_equal_1.default)(oldIds, newIds) && !this.store.loading) {
                this.store.loadItems(value);
            }
        }
        get loadedIds() {
            return (0, mobx_1.toJS)(this.store.items.map((item) => item.id));
        }
        handleConfirm(items, prefix) {
            const { onChange, value } = this.props;
            const itemIds = items.map((item) => prefix + item.id);
            onChange([
                ...value.filter((id) => !id.startsWith(prefix) || itemIds.includes(id)),
                ...itemIds.filter((id) => !value.includes(id)),
            ]);
            this.openedOverlayType = undefined;
        }
        callChange() {
            const { onChange } = this.props;
            onChange(this.loadedIds);
        }
        render() {
            const { disabled, value } = this.props;
            return (<react_1.Fragment>
                <components_1.MultiItemSelection disabled={disabled || false} label={(0, utils_1.translate)('sulu_contact.contact_account_selection_label', { count: value ? value.length : 0 })} leftButton={{
                    icon: 'su-plus-circle',
                    onClick: this.handleAddButtonClick,
                    options: [
                        { label: (0, utils_1.translate)('sulu_contact.people'), value: 'contacts' },
                        { label: (0, utils_1.translate)('sulu_contact.organizations'), value: 'accounts' },
                    ],
                }} loading={this.store.loading} onItemClick={this.handleItemClick} onItemsSorted={this.handleSorted}>
                    {this.store.items.map((item, index) => (<components_1.MultiItemSelection.Item id={item.id} index={index + 1} key={item.id} onRemove={this.handleRemove} value={item}>
                            <div className={contactAccountSelection_scss_1.default.item}>
                                {item.fullName || item.name}
                            </div>
                        </components_1.MultiItemSelection.Item>))}
                </components_1.MultiItemSelection>
                <containers_1.MultiListOverlay adapter="table" listKey="contacts" onClose={this.handleOverlayClose} onConfirm={this.handleContactConfirm} open={this.openedOverlayType === 'contacts'} preloadSelectedItems={false} preSelectedItems={this.store.contactItems} resourceKey="contacts" title={(0, utils_1.translate)('sulu_contact.contact_selection_overlay_title')}/>
                <containers_1.MultiListOverlay adapter="table" listKey="accounts" onClose={this.handleOverlayClose} onConfirm={this.handleAccountConfirm} open={this.openedOverlayType === 'accounts'} preloadSelectedItems={false} preSelectedItems={this.store.accountItems} resourceKey="accounts" title={(0, utils_1.translate)('sulu_contact.account_selection_overlay_title')}/>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ContactAccountSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedOverlayType_decorators = [mobx_1.observable];
        _get_loadedIds_decorators = [mobx_1.computed];
        _handleAddButtonClick_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _handleContactConfirm_decorators = [mobx_1.action];
        _handleAccountConfirm_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_loadedIds_decorators, { kind: "getter", name: "loadedIds", static: false, private: false, access: { has: obj => "loadedIds" in obj, get: obj => obj.loadedIds }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleConfirm_decorators, { kind: "method", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _openedOverlayType_decorators, { kind: "field", name: "openedOverlayType", static: false, private: false, access: { has: obj => "openedOverlayType" in obj, get: obj => obj.openedOverlayType, set: (obj, value) => { obj.openedOverlayType = value; } }, metadata: _metadata }, _openedOverlayType_initializers, _openedOverlayType_extraInitializers);
        __esDecorate(null, null, _handleAddButtonClick_decorators, { kind: "field", name: "handleAddButtonClick", static: false, private: false, access: { has: obj => "handleAddButtonClick" in obj, get: obj => obj.handleAddButtonClick, set: (obj, value) => { obj.handleAddButtonClick = value; } }, metadata: _metadata }, _handleAddButtonClick_initializers, _handleAddButtonClick_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleContactConfirm_decorators, { kind: "field", name: "handleContactConfirm", static: false, private: false, access: { has: obj => "handleContactConfirm" in obj, get: obj => obj.handleContactConfirm, set: (obj, value) => { obj.handleContactConfirm = value; } }, metadata: _metadata }, _handleContactConfirm_initializers, _handleContactConfirm_extraInitializers);
        __esDecorate(null, null, _handleAccountConfirm_decorators, { kind: "field", name: "handleAccountConfirm", static: false, private: false, access: { has: obj => "handleAccountConfirm" in obj, get: obj => obj.handleAccountConfirm, set: (obj, value) => { obj.handleAccountConfirm = value; } }, metadata: _metadata }, _handleAccountConfirm_initializers, _handleAccountConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactAccountSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        value: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactAccountSelection = _classThis;
})();
exports.default = ContactAccountSelection;
