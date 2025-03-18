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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const Translator_1 = require("../../../utils/Translator");
const SingleListOverlay_1 = __importDefault(require("../../../containers/SingleListOverlay"));
const AbstractListToolbarAction_1 = __importDefault(require("./AbstractListToolbarAction"));
let MoveToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractListToolbarAction_1.default;
    let _showOverlay_decorators;
    let _showOverlay_initializers = [];
    let _showOverlay_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    return _a = class MoveToolbarAction extends _classSuper {
            getNode() {
                return (<SingleListOverlay_1.default adapter="column_list" allowActivateForDisabledItems={false} clearSelectionOnClose={true} confirmLoading={this.listStore.movingSelection} disabledIds={this.listStore.selectionIds} key="sulu_admin.move" listKey={this.listStore.listKey} locale={this.list.locale} onClose={this.handleClose} onConfirm={this.handleConfirm} open={this.showOverlay} options={{ includeRoot: true }} reloadOnOpen={true} resourceKey={this.listStore.resourceKey} title={(0, Translator_1.translate)('sulu_admin.move_items')}/>);
            }
            getToolbarItemConfig() {
                return {
                    disabled: this.listStore.selectionIds.length === 0,
                    icon: 'su-arrows-alt',
                    label: (0, Translator_1.translate)('sulu_admin.move_selected'),
                    onClick: (0, mobx_1.action)(() => {
                        this.showOverlay = true;
                    }),
                    type: 'button',
                };
            }
            constructor() {
                super(...arguments);
                this.showOverlay = __runInitializers(this, _showOverlay_initializers, false);
                this.handleClose = (__runInitializers(this, _showOverlay_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                    this.showOverlay = false;
                }));
                this.handleConfirm = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _handleConfirm_initializers, (item) => {
                    this.listStore.moveSelection(item.id).then((0, mobx_1.action)(() => {
                        this.showOverlay = false;
                    }));
                }));
                __runInitializers(this, _handleConfirm_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showOverlay_decorators = [mobx_1.observable];
            _handleClose_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            __esDecorate(null, null, _showOverlay_decorators, { kind: "field", name: "showOverlay", static: false, private: false, access: { has: obj => "showOverlay" in obj, get: obj => obj.showOverlay, set: (obj, value) => { obj.showOverlay = value; } }, metadata: _metadata }, _showOverlay_initializers, _showOverlay_extraInitializers);
            __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = MoveToolbarAction;
