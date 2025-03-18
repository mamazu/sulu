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
const classnames_1 = __importDefault(require("classnames"));
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const List_1 = __importDefault(require("../../containers/List"));
const utils_1 = require("../../utils");
const listOverlay_scss_1 = __importDefault(require("./listOverlay.scss"));
let ListOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_preSelectedItems_decorators;
    let _get_listStore_decorators;
    let _componentDidUpdate_decorators;
    var ListOverlay = _classThis = class extends _classSuper {
        get preSelectedItems() {
            return this.props.preSelectedItems;
        }
        get listStore() {
            return this.props.listStore;
        }
        constructor(props) {
            super(props);
            this.updateSelectionDisposer = __runInitializers(this, _instanceExtraInitializers);
            this.updateSelection = () => {
                this.listStore.clearSelection();
                this.preSelectedItems.forEach((preSelectedItem) => {
                    this.listStore.select(preSelectedItem);
                });
            };
            this.handleConfirm = () => {
                this.props.onConfirm();
            };
            this.updateSelectionDisposer = (0, mobx_1.autorun)(this.updateSelection);
        }
        componentDidUpdate(prevProps) {
            const { clearSelectionOnClose, open, reloadOnOpen } = this.props;
            if (!this.listStore.loading && reloadOnOpen && prevProps.open === false && open === true) {
                this.listStore.reset();
                this.listStore.reload();
            }
            if (clearSelectionOnClose && prevProps.open === true && open === false) {
                this.listStore.clearSelection();
            }
        }
        componentWillUnmount() {
            this.updateSelectionDisposer();
        }
        render() {
            const { adapter, allowActivateForDisabledItems, confirmLoading, disabledIds, itemDisabledCondition, onClose, open, overlayType, preSelectedItems, title, } = this.props;
            const listContainerClass = (0, classnames_1.default)(listOverlay_scss_1.default.adapterContainer, listOverlay_scss_1.default[overlayType], listOverlay_scss_1.default[adapter]);
            const listClass = (0, classnames_1.default)(listOverlay_scss_1.default.list, listOverlay_scss_1.default['adapter'], listOverlay_scss_1.default[adapter]);
            const list = (<div className={listContainerClass}>
                <div className={listClass}>
                    <List_1.default adapters={[adapter]} allowActivateForDisabledItems={allowActivateForDisabledItems} copyable={false} deletable={false} disabledIds={disabledIds} itemDisabledCondition={itemDisabledCondition} movable={false} orderable={false} searchable={true} store={this.listStore}/>
                </div>
            </div>);
            if (overlayType === 'overlay') {
                return (<Overlay_1.default confirmDisabled={(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(preSelectedItems), (0, mobx_1.toJS)(this.listStore.selections))} confirmLoading={confirmLoading} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="large" title={title}>
                    {list}
                </Overlay_1.default>);
            }
            if (overlayType === 'dialog') {
                return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmDisabled={(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(preSelectedItems), (0, mobx_1.toJS)(this.listStore.selections))} confirmLoading={confirmLoading} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={onClose} onConfirm={this.handleConfirm} open={open} size="large" title={title}>
                    {list}
                </Dialog_1.default>);
            }
            throw new Error('The "' + overlayType + '" overlayType does not exist in the ListOverlay.');
        }
    };
    __setFunctionName(_classThis, "ListOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_preSelectedItems_decorators = [mobx_1.computed];
        _get_listStore_decorators = [mobx_1.computed];
        _componentDidUpdate_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_preSelectedItems_decorators, { kind: "getter", name: "preSelectedItems", static: false, private: false, access: { has: obj => "preSelectedItems" in obj, get: obj => obj.preSelectedItems }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_listStore_decorators, { kind: "getter", name: "listStore", static: false, private: false, access: { has: obj => "listStore" in obj, get: obj => obj.listStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        allowActivateForDisabledItems: true,
        clearSelectionOnClose: false,
        disabledIds: [],
        overlayType: 'overlay',
        preSelectedItems: [],
        reloadOnOpen: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListOverlay = _classThis;
})();
exports.default = ListOverlay;
