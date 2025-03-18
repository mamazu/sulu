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
const classnames_1 = __importDefault(require("classnames"));
const SingleMediaSelection_1 = __importDefault(require("../SingleMediaSelection"));
const ImageRenderer_1 = __importDefault(require("./ImageRenderer"));
const HotspotsFormRenderer_1 = __importDefault(require("./HotspotsFormRenderer"));
const imageMap_scss_1 = __importDefault(require("./imageMap.scss"));
const MEDIA_TYPES = ['image'];
let ImageMap = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _selectedIndex_decorators;
    let _selectedIndex_initializers = [];
    let _selectedIndex_extraInitializers = [];
    let _imageValue_decorators;
    let _imageValue_initializers = [];
    let _imageValue_extraInitializers = [];
    let _componentDidMount_decorators;
    let _componentDidUpdate_decorators;
    let _handleHotspotRemove_decorators;
    let _handleHotspotRemove_initializers = [];
    let _handleHotspotRemove_extraInitializers = [];
    let _handleHotspotSelect_decorators;
    let _handleHotspotSelect_initializers = [];
    let _handleHotspotSelect_extraInitializers = [];
    let _handleHotspotAdd_decorators;
    let _handleHotspotAdd_initializers = [];
    let _handleHotspotAdd_extraInitializers = [];
    let _get_currentHotspot_decorators;
    var ImageMap = _classThis = class extends _classSuper {
        componentDidMount() {
            const { value: { imageId }, types } = this.props;
            this.imageValue = {
                displayOption: undefined,
                id: imageId,
            };
            if (Object.keys(types).length === 0) {
                throw new Error('There needs to be at least one form type specified!');
            }
        }
        componentDidUpdate() {
            const { value: { imageId } } = this.props;
            if (this.imageValue.id !== imageId) {
                this.imageValue = {
                    displayOption: undefined,
                    id: imageId,
                };
            }
        }
        get currentHotspot() {
            const { value } = this.props;
            return value.hotspots.length ? value.hotspots[this.selectedIndex] : undefined;
        }
        render() {
            const { disabled, locale, onFinish, renderHotspotForm, types, valid, value } = this.props;
            const imageMapClass = (0, classnames_1.default)(imageMap_scss_1.default.imageMap, {
                [imageMap_scss_1.default.error]: !valid,
            });
            return (<react_1.Fragment>
                <SingleMediaSelection_1.default className={!!value.imageId && imageMap_scss_1.default.singleItemSelection || undefined} disabled={disabled} locale={locale} onChange={this.handleImageChange} types={MEDIA_TYPES} valid={valid} value={this.imageValue}/>

                {!!value.imageId &&
                    <div className={imageMapClass}>
                        <ImageRenderer_1.default disabled={disabled} locale={locale} onFinish={onFinish} onSelectionChange={this.handleSelectionChange} selectedIndex={this.selectedIndex} value={value}/>

                        <div className={imageMap_scss_1.default.form}>
                            <HotspotsFormRenderer_1.default disabled={disabled} onHotspotAdd={this.handleHotspotAdd} onHotspotRemove={this.handleHotspotRemove} onHotspotSelect={this.handleHotspotSelect} onHotspotTypeChange={this.handleHotspotTypeChange} onTypeChange={this.handleTypeChange} selectedIndex={this.selectedIndex} types={types} value={value.hotspots}>
                                {this.currentHotspot
                            ? renderHotspotForm(this.currentHotspot, this.currentHotspot.type, this.selectedIndex)
                            : null}
                            </HotspotsFormRenderer_1.default>
                        </div>
                    </div>}
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.selectedIndex = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _selectedIndex_initializers, 0));
            this.imageValue = (__runInitializers(this, _selectedIndex_extraInitializers), __runInitializers(this, _imageValue_initializers, {
                displayOption: undefined,
                id: undefined,
            }));
            this.handleFinish = (__runInitializers(this, _imageValue_extraInitializers), () => {
                const { onFinish } = this.props;
                if (onFinish) {
                    onFinish();
                }
            });
            this.handleImageChange = ({ id, }) => {
                const { onChange } = this.props;
                onChange({
                    imageId: id,
                    hotspots: [],
                });
                this.handleFinish();
            };
            this.handleSelectionChange = (index, selection) => {
                const { onChange, value } = this.props;
                const hotspots = (0, mobx_1.toJS)(value.hotspots);
                hotspots[index].hotspot = Object.assign(Object.assign({}, hotspots[index].hotspot), selection);
                onChange(Object.assign(Object.assign({}, value), { hotspots }));
            };
            this.handleHotspotTypeChange = (index, type) => {
                const { onChange, value } = this.props;
                const hotspots = (0, mobx_1.toJS)(value.hotspots);
                hotspots[index].hotspot = { type };
                onChange(Object.assign(Object.assign({}, value), { hotspots }));
                this.handleFinish();
            };
            this.handleTypeChange = (index, type) => {
                const { onChange, value } = this.props;
                const hotspots = (0, mobx_1.toJS)(value.hotspots);
                hotspots[index].type = type;
                onChange(Object.assign(Object.assign({}, value), { hotspots }));
                this.handleFinish();
            };
            this.handleHotspotRemove = __runInitializers(this, _handleHotspotRemove_initializers, (index) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { hotspots: (0, mobx_1.toJS)(value.hotspots).filter((hotspot, hotspotIndex) => hotspotIndex !== index) }));
                this.handleFinish();
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
            });
            this.handleHotspotSelect = (__runInitializers(this, _handleHotspotRemove_extraInitializers), __runInitializers(this, _handleHotspotSelect_initializers, (index) => {
                this.selectedIndex = index;
            }));
            this.getDefaultHotspotData = (__runInitializers(this, _handleHotspotSelect_extraInitializers), () => {
                const { defaultFormType } = this.props;
                return {
                    hotspot: {
                        type: 'point',
                    },
                    type: defaultFormType,
                };
            });
            this.handleHotspotAdd = __runInitializers(this, _handleHotspotAdd_initializers, () => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { hotspots: [
                        ...value.hotspots,
                        this.getDefaultHotspotData(),
                    ] }));
                this.handleFinish();
                this.selectedIndex = value.hotspots.length;
            });
            __runInitializers(this, _handleHotspotAdd_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ImageMap");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _selectedIndex_decorators = [mobx_1.observable];
        _imageValue_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleHotspotRemove_decorators = [mobx_1.action];
        _handleHotspotSelect_decorators = [mobx_1.action];
        _handleHotspotAdd_decorators = [mobx_1.action];
        _get_currentHotspot_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_currentHotspot_decorators, { kind: "getter", name: "currentHotspot", static: false, private: false, access: { has: obj => "currentHotspot" in obj, get: obj => obj.currentHotspot }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _selectedIndex_decorators, { kind: "field", name: "selectedIndex", static: false, private: false, access: { has: obj => "selectedIndex" in obj, get: obj => obj.selectedIndex, set: (obj, value) => { obj.selectedIndex = value; } }, metadata: _metadata }, _selectedIndex_initializers, _selectedIndex_extraInitializers);
        __esDecorate(null, null, _imageValue_decorators, { kind: "field", name: "imageValue", static: false, private: false, access: { has: obj => "imageValue" in obj, get: obj => obj.imageValue, set: (obj, value) => { obj.imageValue = value; } }, metadata: _metadata }, _imageValue_initializers, _imageValue_extraInitializers);
        __esDecorate(null, null, _handleHotspotRemove_decorators, { kind: "field", name: "handleHotspotRemove", static: false, private: false, access: { has: obj => "handleHotspotRemove" in obj, get: obj => obj.handleHotspotRemove, set: (obj, value) => { obj.handleHotspotRemove = value; } }, metadata: _metadata }, _handleHotspotRemove_initializers, _handleHotspotRemove_extraInitializers);
        __esDecorate(null, null, _handleHotspotSelect_decorators, { kind: "field", name: "handleHotspotSelect", static: false, private: false, access: { has: obj => "handleHotspotSelect" in obj, get: obj => obj.handleHotspotSelect, set: (obj, value) => { obj.handleHotspotSelect = value; } }, metadata: _metadata }, _handleHotspotSelect_initializers, _handleHotspotSelect_extraInitializers);
        __esDecorate(null, null, _handleHotspotAdd_decorators, { kind: "field", name: "handleHotspotAdd", static: false, private: false, access: { has: obj => "handleHotspotAdd" in obj, get: obj => obj.handleHotspotAdd, set: (obj, value) => { obj.handleHotspotAdd = value; } }, metadata: _metadata }, _handleHotspotAdd_initializers, _handleHotspotAdd_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageMap = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        valid: true,
        value: {
            imageId: undefined,
            hotspots: [],
        },
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageMap = _classThis;
})();
exports.default = ImageMap;
