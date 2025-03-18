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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const ImageFocusPoint_1 = __importDefault(require("../../components/ImageFocusPoint"));
const focusPointOverlay_scss_1 = __importDefault(require("./focusPointOverlay.scss"));
let FocusPointOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _focusPointX_decorators;
    let _focusPointX_initializers = [];
    let _focusPointX_extraInitializers = [];
    let _focusPointY_decorators;
    let _focusPointY_initializers = [];
    let _focusPointY_extraInitializers = [];
    let _resourceStore_decorators;
    let _resourceStore_initializers = [];
    let _resourceStore_extraInitializers = [];
    let _get_confirmDisabled_decorators;
    let _componentDidUpdate_decorators;
    let _updateFocusPoint_decorators;
    let _updateFocusPoint_initializers = [];
    let _updateFocusPoint_extraInitializers = [];
    let _handleFocusPointChange_decorators;
    let _handleFocusPointChange_initializers = [];
    let _handleFocusPointChange_extraInitializers = [];
    var FocusPointOverlay = _classThis = class extends _classSuper {
        get confirmDisabled() {
            const { resourceStore: { data: { focusPointX, focusPointY, }, }, } = this.props;
            return this.focusPointX === focusPointX && this.focusPointY === focusPointY;
        }
        constructor(props) {
            super(props);
            this.focusPointX = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _focusPointX_initializers, void 0));
            this.focusPointY = (__runInitializers(this, _focusPointX_extraInitializers), __runInitializers(this, _focusPointY_initializers, void 0));
            this.resourceStore = (__runInitializers(this, _focusPointY_extraInitializers), __runInitializers(this, _resourceStore_initializers, void 0));
            this.updateFocusPoint = (__runInitializers(this, _resourceStore_extraInitializers), __runInitializers(this, _updateFocusPoint_initializers, () => {
                const { resourceStore } = this.props;
                const { focusPointX = 1, focusPointY = 1 } = resourceStore.data;
                this.focusPointX = focusPointX;
                this.focusPointY = focusPointY;
            }));
            this.handleClose = (__runInitializers(this, _updateFocusPoint_extraInitializers), () => {
                this.props.onClose();
            });
            this.handleConfirm = () => {
                const { resourceStore } = this;
                if (!resourceStore) {
                    throw new Error('There is no resourceStore defined! This should not happen and is likely a bug.');
                }
                resourceStore.change('focusPointX', this.focusPointX);
                resourceStore.change('focusPointY', this.focusPointY);
                resourceStore.save().then(() => {
                    this.props.resourceStore.set('focusPointX', this.focusPointX);
                    this.props.resourceStore.set('focusPointY', this.focusPointY);
                    this.props.onConfirm();
                });
            };
            this.handleFocusPointChange = __runInitializers(this, _handleFocusPointChange_initializers, (point) => {
                this.focusPointX = point.x;
                this.focusPointY = point.y;
            });
            __runInitializers(this, _handleFocusPointChange_extraInitializers);
            this.updateFocusPoint();
        }
        componentDidUpdate(prevProps) {
            if (!prevProps.open && this.props.open) {
                this.resourceStore = this.props.resourceStore.clone();
                this.updateFocusPoint();
            }
            if (prevProps.open && !this.props.open && this.resourceStore) {
                this.resourceStore.destroy();
                this.resourceStore = undefined;
            }
        }
        render() {
            const { open } = this.props;
            return (<components_1.Overlay confirmDisabled={this.confirmDisabled} confirmLoading={!!this.resourceStore && this.resourceStore.saving} confirmText={(0, utils_1.translate)('sulu_admin.save')} onClose={this.handleClose} onConfirm={this.handleConfirm} open={open} size="large" title={(0, utils_1.translate)('sulu_media.set_focus_point')}>
                <div className={focusPointOverlay_scss_1.default.focusPointContainer}>
                    {!!this.resourceStore &&
                    <ImageFocusPoint_1.default image={this.resourceStore.data.adminUrl
                            ? this.resourceStore.data.adminUrl
                            : this.resourceStore.data.url} onChange={this.handleFocusPointChange} value={{ x: this.focusPointX, y: this.focusPointY }}/>}
                </div>
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "FocusPointOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _focusPointX_decorators = [mobx_1.observable];
        _focusPointY_decorators = [mobx_1.observable];
        _resourceStore_decorators = [mobx_1.observable];
        _get_confirmDisabled_decorators = [mobx_1.computed];
        _componentDidUpdate_decorators = [mobx_1.action];
        _updateFocusPoint_decorators = [mobx_1.action];
        _handleFocusPointChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_confirmDisabled_decorators, { kind: "getter", name: "confirmDisabled", static: false, private: false, access: { has: obj => "confirmDisabled" in obj, get: obj => obj.confirmDisabled }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _focusPointX_decorators, { kind: "field", name: "focusPointX", static: false, private: false, access: { has: obj => "focusPointX" in obj, get: obj => obj.focusPointX, set: (obj, value) => { obj.focusPointX = value; } }, metadata: _metadata }, _focusPointX_initializers, _focusPointX_extraInitializers);
        __esDecorate(null, null, _focusPointY_decorators, { kind: "field", name: "focusPointY", static: false, private: false, access: { has: obj => "focusPointY" in obj, get: obj => obj.focusPointY, set: (obj, value) => { obj.focusPointY = value; } }, metadata: _metadata }, _focusPointY_initializers, _focusPointY_extraInitializers);
        __esDecorate(null, null, _resourceStore_decorators, { kind: "field", name: "resourceStore", static: false, private: false, access: { has: obj => "resourceStore" in obj, get: obj => obj.resourceStore, set: (obj, value) => { obj.resourceStore = value; } }, metadata: _metadata }, _resourceStore_initializers, _resourceStore_extraInitializers);
        __esDecorate(null, null, _updateFocusPoint_decorators, { kind: "field", name: "updateFocusPoint", static: false, private: false, access: { has: obj => "updateFocusPoint" in obj, get: obj => obj.updateFocusPoint, set: (obj, value) => { obj.updateFocusPoint = value; } }, metadata: _metadata }, _updateFocusPoint_initializers, _updateFocusPoint_extraInitializers);
        __esDecorate(null, null, _handleFocusPointChange_decorators, { kind: "field", name: "handleFocusPointChange", static: false, private: false, access: { has: obj => "handleFocusPointChange" in obj, get: obj => obj.handleFocusPointChange, set: (obj, value) => { obj.handleFocusPointChange = value; } }, metadata: _metadata }, _handleFocusPointChange_initializers, _handleFocusPointChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FocusPointOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FocusPointOverlay = _classThis;
})();
exports.default = FocusPointOverlay;
