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
const components_1 = require("sulu-admin-bundle/components");
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
let CacheClearToolbarAction = (() => {
    var _a;
    let _cacheClearing_decorators;
    let _cacheClearing_initializers = [];
    let _cacheClearing_extraInitializers = [];
    let _showDialog_decorators;
    let _showDialog_initializers = [];
    let _showDialog_extraInitializers = [];
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    return _a = class CacheClearToolbarAction {
            constructor(webspaceKey) {
                this.cacheClearing = __runInitializers(this, _cacheClearing_initializers, false);
                this.showDialog = (__runInitializers(this, _cacheClearing_extraInitializers), __runInitializers(this, _showDialog_initializers, false));
                this.handleCancel = (__runInitializers(this, _showDialog_extraInitializers), __runInitializers(this, _handleCancel_initializers, () => {
                    this.showDialog = false;
                }));
                this.handleConfirm = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                    this.cacheClearing = true;
                    const url = _a.clearCacheEndpoint + (0, utils_1.buildQueryString)({ webspaceKey: this.webspaceKey });
                    services_1.Requester.delete(url).then((0, mobx_1.action)(() => {
                        this.showDialog = false;
                        this.cacheClearing = false;
                    }));
                }));
                __runInitializers(this, _handleConfirm_extraInitializers);
                this.webspaceKey = webspaceKey;
            }
            getNode() {
                return (<components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.cacheClearing} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleCancel} onConfirm={this.handleConfirm} open={this.showDialog} title={(0, utils_1.translate)('sulu_website.cache_clear_warning_title')}>
                {this.webspaceKey
                        ? (0, utils_1.translate)('sulu_website.cache_clear_warning_text_webspace', { webspace: this.webspaceKey })
                        : (0, utils_1.translate)('sulu_website.cache_clear_warning_text')}
            </components_1.Dialog>);
            }
            getToolbarItemConfig() {
                return {
                    icon: 'su-paint',
                    label: (0, utils_1.translate)('sulu_website.cache_clear'),
                    onClick: (0, mobx_1.action)(() => {
                        this.showDialog = true;
                    }),
                    type: 'button',
                };
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _cacheClearing_decorators = [mobx_1.observable];
            _showDialog_decorators = [mobx_1.observable];
            _handleCancel_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            __esDecorate(null, null, _cacheClearing_decorators, { kind: "field", name: "cacheClearing", static: false, private: false, access: { has: obj => "cacheClearing" in obj, get: obj => obj.cacheClearing, set: (obj, value) => { obj.cacheClearing = value; } }, metadata: _metadata }, _cacheClearing_initializers, _cacheClearing_extraInitializers);
            __esDecorate(null, null, _showDialog_decorators, { kind: "field", name: "showDialog", static: false, private: false, access: { has: obj => "showDialog" in obj, get: obj => obj.showDialog, set: (obj, value) => { obj.showDialog = value; } }, metadata: _metadata }, _showDialog_initializers, _showDialog_extraInitializers);
            __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = CacheClearToolbarAction;
