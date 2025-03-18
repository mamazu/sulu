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
const ResourceListStore_1 = __importDefault(require("../../stores/ResourceListStore"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const SingleSelect_1 = __importDefault(require("../../components/SingleSelect"));
const Translator_1 = require("../../utils/Translator");
const EditOverlay_1 = __importDefault(require("./EditOverlay"));
let ResourceSingleSelect = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showEditOverlay_decorators;
    let _showEditOverlay_initializers = [];
    let _showEditOverlay_extraInitializers = [];
    let _get_data_decorators;
    let _handleEdit_decorators;
    let _handleEdit_initializers = [];
    let _handleEdit_extraInitializers = [];
    let _handleEditOverlayClose_decorators;
    let _handleEditOverlayClose_initializers = [];
    let _handleEditOverlayClose_extraInitializers = [];
    var ResourceSingleSelect = _classThis = class extends _classSuper {
        get data() {
            const { displayProperty } = this.props;
            return this.resourceListStore.data.concat()
                .sort((data1, data2) => data1[displayProperty] < data2[displayProperty] ? -1 : 1);
        }
        constructor(props) {
            super(props);
            this.resourceListStore = __runInitializers(this, _instanceExtraInitializers);
            this.showEditOverlay = __runInitializers(this, _showEditOverlay_initializers, false);
            this.handleReset = (__runInitializers(this, _showEditOverlay_extraInitializers), () => {
                const { onChange } = this.props;
                onChange(undefined);
            });
            this.handleEdit = __runInitializers(this, _handleEdit_initializers, () => {
                this.showEditOverlay = true;
            });
            this.handleEditOverlayClose = (__runInitializers(this, _handleEdit_extraInitializers), __runInitializers(this, _handleEditOverlayClose_initializers, () => {
                this.showEditOverlay = false;
            }));
            __runInitializers(this, _handleEditOverlayClose_extraInitializers);
            const { idProperty, resourceKey, requestParameters, } = this.props;
            // sending an empty limit to the server will disable pagination
            const parameters = Object.assign({ limit: '' }, requestParameters);
            this.resourceListStore = new ResourceListStore_1.default(resourceKey, parameters, idProperty);
        }
        render() {
            const { disabled, displayProperty, editable, idProperty, onChange, overlayTitle, value } = this.props;
            if (this.resourceListStore.loading) {
                return <Loader_1.default size={30}/>;
            }
            return (<react_1.Fragment>
                <SingleSelect_1.default disabled={disabled} onChange={onChange} value={value}>
                    <SingleSelect_1.default.Action onClick={this.handleReset}>
                        {(0, Translator_1.translate)('sulu_admin.please_choose')}
                    </SingleSelect_1.default.Action>
                    {this.data.map((object, index) => <SingleSelect_1.default.Option key={index} value={object[idProperty]}>
                        {object[displayProperty]}
                    </SingleSelect_1.default.Option>)}
                    {editable && <SingleSelect_1.default.Divider />}
                    {editable &&
                    <SingleSelect_1.default.Action onClick={this.handleEdit}>
                            {(0, Translator_1.translate)('sulu_admin.edit')}
                        </SingleSelect_1.default.Action>}
                </SingleSelect_1.default>
                {editable &&
                    <EditOverlay_1.default displayProperty={displayProperty} idProperty={idProperty} onClose={this.handleEditOverlayClose} open={this.showEditOverlay} resourceListStore={this.resourceListStore} title={overlayTitle}/>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ResourceSingleSelect");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showEditOverlay_decorators = [mobx_1.observable];
        _get_data_decorators = [mobx_1.computed];
        _handleEdit_decorators = [mobx_1.action];
        _handleEditOverlayClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_data_decorators, { kind: "getter", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showEditOverlay_decorators, { kind: "field", name: "showEditOverlay", static: false, private: false, access: { has: obj => "showEditOverlay" in obj, get: obj => obj.showEditOverlay, set: (obj, value) => { obj.showEditOverlay = value; } }, metadata: _metadata }, _showEditOverlay_initializers, _showEditOverlay_extraInitializers);
        __esDecorate(null, null, _handleEdit_decorators, { kind: "field", name: "handleEdit", static: false, private: false, access: { has: obj => "handleEdit" in obj, get: obj => obj.handleEdit, set: (obj, value) => { obj.handleEdit = value; } }, metadata: _metadata }, _handleEdit_initializers, _handleEdit_extraInitializers);
        __esDecorate(null, null, _handleEditOverlayClose_decorators, { kind: "field", name: "handleEditOverlayClose", static: false, private: false, access: { has: obj => "handleEditOverlayClose" in obj, get: obj => obj.handleEditOverlayClose, set: (obj, value) => { obj.handleEditOverlayClose = value; } }, metadata: _metadata }, _handleEditOverlayClose_initializers, _handleEditOverlayClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceSingleSelect = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        editable: false,
        requestParameters: {},
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceSingleSelect = _classThis;
})();
exports.default = ResourceSingleSelect;
