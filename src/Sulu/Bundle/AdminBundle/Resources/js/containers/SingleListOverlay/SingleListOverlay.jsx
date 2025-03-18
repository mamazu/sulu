"use strict";
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
const ListStore_1 = __importDefault(require("../../containers/List/stores/ListStore"));
const ListOverlay_1 = __importDefault(require("../ListOverlay"));
const USER_SETTINGS_KEY = 'single_list_overlay';
let SingleListOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    var SingleListOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.page = mobx_1.observable.box(1);
            this.handleConfirm = () => {
                if (this.listStore.selections.length > 1) {
                    throw new Error('The SingleListOverlay can only handle single selection.'
                        + 'This should not happen and is likely a bug.');
                }
                this.props.onConfirm(this.listStore.selections[0]);
            };
            const excludedIds = (0, mobx_1.computed)(() => this.props.excludedIds.length ? this.props.excludedIds : undefined, { equals: mobx_1.comparer.structural });
            this.excludedIdsDisposer = excludedIds.observe(() => this.listStore.clear());
            const { listKey, locale, metadataOptions, options, preSelectedItem, resourceKey } = this.props;
            const observableOptions = {};
            observableOptions.page = this.page;
            observableOptions.excludedIds = excludedIds;
            if (locale) {
                observableOptions.locale = locale;
            }
            const initialSelectionIds = [];
            if (preSelectedItem) {
                initialSelectionIds.push(preSelectedItem.id);
            }
            this.listStore = new ListStore_1.default(resourceKey, listKey, USER_SETTINGS_KEY, observableOptions, options, metadataOptions, initialSelectionIds);
            this.changeOptionsDisposer = (0, mobx_1.reaction)(() => this.props.options, (options) => {
                // reset liststore to reload whole tree instead of children of current active item
                this.listStore.reset();
                // set selected items as initialSelectionIds to expand them in case of a tree
                this.listStore.initialSelectionIds = this.listStore.selectionIds;
                this.listStore.options = Object.assign(Object.assign({}, this.listStore.options), options);
            }, { equals: mobx_1.comparer.structural });
            this.selectionDisposer = (0, mobx_1.autorun)(() => {
                const { selections } = this.listStore;
                if (selections.length <= 1) {
                    return;
                }
                const selection = selections[selections.length - 1];
                if (!selection) {
                    return;
                }
                this.listStore.clearSelection();
                this.listStore.select(selection);
            });
        }
        componentWillUnmount() {
            this.listStore.destroy();
            this.excludedIdsDisposer();
            this.changeOptionsDisposer();
            this.selectionDisposer();
        }
        render() {
            const { adapter, allowActivateForDisabledItems, clearSelectionOnClose, confirmLoading, disabledIds, itemDisabledCondition, onClose, open, overlayType, preSelectedItem, reloadOnOpen, title, } = this.props;
            return (<ListOverlay_1.default adapter={adapter} allowActivateForDisabledItems={allowActivateForDisabledItems} clearSelectionOnClose={clearSelectionOnClose} confirmLoading={confirmLoading} disabledIds={disabledIds} itemDisabledCondition={itemDisabledCondition} listStore={this.listStore} onClose={onClose} onConfirm={this.handleConfirm} open={open} overlayType={overlayType} preSelectedItems={preSelectedItem ? [preSelectedItem] : undefined} reloadOnOpen={reloadOnOpen} title={title}/>);
        }
    };
    __setFunctionName(_classThis, "SingleListOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleListOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        clearSelectionOnClose: false,
        disabledIds: [],
        excludedIds: [],
        overlayType: 'overlay',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleListOverlay = _classThis;
})();
exports.default = SingleListOverlay;
