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
const debounce_1 = __importDefault(require("debounce"));
const components_1 = require("sulu-admin-bundle/components");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const imageRenderer_scss_1 = __importDefault(require("./imageRenderer.scss"));
const DEBOUNCE_TIME = 200;
let ImageRenderer = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _imageWrapperSize_decorators;
    let _imageWrapperSize_initializers = [];
    let _imageWrapperSize_extraInitializers = [];
    let _get_imageUrl_decorators;
    let _setImageWrapperSize_decorators;
    let _setImageWrapperSize_initializers = [];
    let _setImageWrapperSize_extraInitializers = [];
    let _get_sortedHotspots_decorators;
    var ImageRenderer = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.imageWrapperSize = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _imageWrapperSize_initializers, { width: 0, height: 0 }));
            this.imageWrapperRef = __runInitializers(this, _imageWrapperSize_extraInitializers);
            this.setImageWrapperSize = __runInitializers(this, _setImageWrapperSize_initializers, () => {
                if (!this.imageWrapperRef) {
                    return;
                }
                const { width, height } = this.imageWrapperRef.getBoundingClientRect();
                this.imageWrapperSize = { width, height };
            });
            this.setImageWrapperRef = (__runInitializers(this, _setImageWrapperSize_extraInitializers), (ref) => {
                this.imageWrapperRef = ref;
            });
            this.handleSelectionChange = (data) => {
                const { onSelectionChange, selectedIndex } = this.props;
                onSelectionChange(selectedIndex, data);
            };
            this.getCommonSelectionProps = (hotspot, index) => {
                const { disabled, onFinish, selectedIndex } = this.props;
                const entries = Object.entries(hotspot.hotspot).filter(([key]) => key !== 'type');
                const value = entries.length !== 0 ? Object.fromEntries(entries) : undefined;
                return {
                    containerHeight: this.imageWrapperSize.height,
                    containerWidth: this.imageWrapperSize.width,
                    disabled: disabled || index !== selectedIndex,
                    key: index,
                    label: (index + 1).toString(),
                    onChange: this.handleSelectionChange,
                    onFinish,
                    usePercentageValues: true,
                    round: false,
                    value,
                };
            };
            this.renderCircleSelection = (hotspot, index) => {
                return (<components_1.CircleSelection {...this.getCommonSelectionProps(hotspot, index)} resizable={true} skin="outlined"/>);
            };
            this.renderPointSelection = (hotspot, index) => {
                return (<components_1.CircleSelection {...this.getCommonSelectionProps(hotspot, index)} resizable={false} skin="filled"/>);
            };
            this.renderRectangleSelection = (hotspot, index) => {
                return (<components_1.RectangleSelection {...this.getCommonSelectionProps(hotspot, index)} backdrop={false} minSizeNotification={false}/>);
            };
        }
        componentDidMount() {
            this.setImageWrapperSize();
            const resizeObserver = new ResizeObserver((0, debounce_1.default)(() => {
                this.setImageWrapperSize();
            }, DEBOUNCE_TIME));
            if (!this.imageWrapperRef) {
                return;
            }
            resizeObserver.observe(this.imageWrapperRef);
        }
        get imageUrl() {
            const { value: { imageId }, locale } = this.props;
            if (!imageId) {
                return undefined;
            }
            return router_1.default.generate('sulu_media.redirect', { id: imageId, locale: locale.get() });
        }
        get sortedHotspots() {
            const { value, selectedIndex } = this.props;
            const hotspots = Array.from((0, mobx_1.toJS)(value.hotspots).entries());
            hotspots
                .sort(([a], [b]) => {
                if (a === selectedIndex) {
                    return 1;
                }
                if (b === selectedIndex) {
                    return -1;
                }
                return 0;
            });
            return hotspots;
        }
        render() {
            const { imageUrl } = this;
            return (<div className={imageRenderer_scss_1.default.imageRenderer}>
                <div className={imageRenderer_scss_1.default.imageRendererWrapper} ref={this.setImageWrapperRef}>
                    {imageUrl &&
                    <img className={imageRenderer_scss_1.default.image} key={imageUrl} src={imageUrl}/>}

                    {this.sortedHotspots.map(([index, hotspotData]) => {
                    switch (hotspotData.hotspot.type) {
                        case 'circle':
                            return this.renderCircleSelection(hotspotData, index);
                        case 'point':
                            return this.renderPointSelection(hotspotData, index);
                        case 'rectangle':
                            return this.renderRectangleSelection(hotspotData, index);
                        default:
                            throw new Error(`Unexpected hotspot type "${hotspotData.hotspot.type}".`);
                    }
                })}
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "ImageRenderer");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _imageWrapperSize_decorators = [mobx_1.observable];
        _get_imageUrl_decorators = [mobx_1.computed];
        _setImageWrapperSize_decorators = [mobx_1.action];
        _get_sortedHotspots_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_imageUrl_decorators, { kind: "getter", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_sortedHotspots_decorators, { kind: "getter", name: "sortedHotspots", static: false, private: false, access: { has: obj => "sortedHotspots" in obj, get: obj => obj.sortedHotspots }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _imageWrapperSize_decorators, { kind: "field", name: "imageWrapperSize", static: false, private: false, access: { has: obj => "imageWrapperSize" in obj, get: obj => obj.imageWrapperSize, set: (obj, value) => { obj.imageWrapperSize = value; } }, metadata: _metadata }, _imageWrapperSize_initializers, _imageWrapperSize_extraInitializers);
        __esDecorate(null, null, _setImageWrapperSize_decorators, { kind: "field", name: "setImageWrapperSize", static: false, private: false, access: { has: obj => "setImageWrapperSize" in obj, get: obj => obj.setImageWrapperSize, set: (obj, value) => { obj.setImageWrapperSize = value; } }, metadata: _metadata }, _setImageWrapperSize_initializers, _setImageWrapperSize_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageRenderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageRenderer = _classThis;
})();
exports.default = ImageRenderer;
