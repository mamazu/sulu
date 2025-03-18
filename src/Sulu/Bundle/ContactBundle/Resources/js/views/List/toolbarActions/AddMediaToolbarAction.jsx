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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore"));
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
const views_1 = require("sulu-admin-bundle/views");
const containers_1 = require("sulu-media-bundle/containers");
let AddMediaToolbarAction = (() => {
    var _a;
    let _classSuper = views_1.AbstractListToolbarAction;
    let _showOverlay_decorators;
    let _showOverlay_initializers = [];
    let _showOverlay_extraInitializers = [];
    let _patching_decorators;
    let _patching_initializers = [];
    let _patching_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    return _a = class AddMediaToolbarAction extends _classSuper {
            getNode() {
                return (<containers_1.MultiMediaSelectionOverlay confirmLoading={this.patching} excludedIds={this.resourceStore ? this.resourceStore.data.medias : []} key="sulu_contact.add_media" locale={mobx_1.observable.box(userStore_1.default.contentLocale)} onClose={this.handleClose} onConfirm={this.handleConfirm} open={this.showOverlay}/>);
            }
            getToolbarItemConfig() {
                return {
                    icon: 'su-plus-circle',
                    label: (0, utils_1.translate)('sulu_admin.add'),
                    onClick: (0, mobx_1.action)(() => {
                        this.showOverlay = true;
                    }),
                    type: 'button',
                };
            }
            constructor() {
                super(...arguments);
                this.showOverlay = __runInitializers(this, _showOverlay_initializers, false);
                this.patching = (__runInitializers(this, _showOverlay_extraInitializers), __runInitializers(this, _patching_initializers, false));
                this.handleConfirm = (__runInitializers(this, _patching_extraInitializers), __runInitializers(this, _handleConfirm_initializers, (medias) => {
                    if (!this.resourceStore) {
                        throw new Error('The resourceStore needs to be available in order to update the media!');
                    }
                    const { data, resourceKey } = this.resourceStore;
                    this.patching = true;
                    services_1.ResourceRequester.patch(resourceKey, { medias: data.medias.concat(medias.map((media) => media.id)) }, { id: this.listStore.options.contactId }).then((0, mobx_1.action)((response) => {
                        this.patching = false;
                        this.showOverlay = false;
                        this.listStore.reload();
                        if (this.resourceStore) {
                            this.resourceStore.setMultiple(response);
                        }
                    }));
                }));
                this.handleClose = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                    this.showOverlay = false;
                }));
                __runInitializers(this, _handleClose_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showOverlay_decorators = [mobx_1.observable];
            _patching_decorators = [mobx_1.observable];
            _handleConfirm_decorators = [mobx_1.action];
            _handleClose_decorators = [mobx_1.action];
            __esDecorate(null, null, _showOverlay_decorators, { kind: "field", name: "showOverlay", static: false, private: false, access: { has: obj => "showOverlay" in obj, get: obj => obj.showOverlay, set: (obj, value) => { obj.showOverlay = value; } }, metadata: _metadata }, _showOverlay_initializers, _showOverlay_extraInitializers);
            __esDecorate(null, null, _patching_decorators, { kind: "field", name: "patching", static: false, private: false, access: { has: obj => "patching" in obj, get: obj => obj.patching, set: (obj, value) => { obj.patching = value; } }, metadata: _metadata }, _patching_initializers, _patching_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = AddMediaToolbarAction;
