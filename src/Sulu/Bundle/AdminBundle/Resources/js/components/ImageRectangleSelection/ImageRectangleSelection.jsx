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
exports.ImageRectangleSelection = void 0;
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const RectangleSelection_1 = __importDefault(require("../RectangleSelection"));
const withContainerSize_1 = __importDefault(require("../withContainerSize"));
const imageRectangleSelection_scss_1 = __importDefault(require("./imageRectangleSelection.scss"));
let ImageRectangleSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _imageLoaded_decorators;
    let _imageLoaded_initializers = [];
    let _imageLoaded_extraInitializers = [];
    let _get_scaledImageHeight_decorators;
    let _get_scaledImageWidth_decorators;
    let _get_scaledMinDimensions_decorators;
    let _get_scaledMinWidth_decorators;
    let _get_scaledMinHeight_decorators;
    var ImageRectangleSelection = _classThis = class extends _classSuper {
        naturalDataToScaled(data) {
            return {
                width: this.naturalHorizontalToScaled(data.width),
                height: this.naturalVerticalToScaled(data.height),
                left: this.naturalHorizontalToScaled(data.left),
                top: this.naturalVerticalToScaled(data.top),
            };
        }
        scaledDataToNatural(data) {
            return {
                width: this.scaledHorizontalToNatural(data.width),
                height: this.scaledVerticalToNatural(data.height),
                left: this.scaledHorizontalToNatural(data.left),
                top: this.scaledVerticalToNatural(data.top),
            };
        }
        constructor(props) {
            super(props);
            this.image = __runInitializers(this, _instanceExtraInitializers);
            this.imageLoaded = __runInitializers(this, _imageLoaded_initializers, false);
            this.naturalHorizontalToScaled = (__runInitializers(this, _imageLoaded_extraInitializers), (h) => {
                return Math.max(h * this.scaledImageWidth / this.image.naturalWidth, 0);
            });
            this.scaledHorizontalToNatural = (h) => {
                return Math.min(h * this.image.naturalWidth / this.scaledImageWidth, this.image.naturalWidth);
            };
            this.naturalVerticalToScaled = (v) => {
                return Math.max(v * this.scaledImageHeight / this.image.naturalHeight, 0);
            };
            this.scaledVerticalToNatural = (v) => {
                return Math.min(v * this.image.naturalHeight / this.scaledImageHeight, this.image.naturalHeight);
            };
            this.handleRectangleSelectionChange = (data) => {
                const { onChange } = this.props;
                onChange(data ? this.scaledDataToNatural(data) : undefined);
            };
            this.image = new Image();
            this.image.onload = (0, mobx_1.action)(() => this.imageLoaded = true);
            this.image.onerror = () => loglevel_1.default.error('Failed to preload image "' + this.props.image + '"');
            this.image.src = this.props.image;
        }
        get scaledImageHeight() {
            if (this.imageFillsContainerHeight()) {
                return Math.min(this.image.naturalHeight, this.props.containerHeight);
            }
            else {
                return this.scaledImageWidth * this.image.naturalHeight / this.image.naturalWidth;
            }
        }
        get scaledImageWidth() {
            if (this.imageFillsContainerHeight()) {
                return this.scaledImageHeight * this.image.naturalWidth / this.image.naturalHeight;
            }
            else {
                return Math.min(this.image.naturalWidth, this.props.containerWidth);
            }
        }
        imageFillsContainerHeight() {
            const imageHeightToWidth = this.image.naturalHeight / this.image.naturalWidth;
            const containerHeightToWidth = this.props.containerHeight / this.props.containerWidth;
            return imageHeightToWidth > containerHeightToWidth;
        }
        get scaledMinDimensions() {
            const { minHeight, minWidth, containerHeight, containerWidth } = this.props;
            let height = minHeight ? this.naturalVerticalToScaled(minHeight) : undefined;
            let width = minWidth ? this.naturalHorizontalToScaled(minWidth) : undefined;
            if (height && height > containerHeight) {
                height = containerHeight;
                width = minWidth && minHeight ? height * minWidth / minHeight : undefined;
            }
            if (width && width > containerWidth) {
                width = containerWidth;
                height = minHeight && minWidth ? width * minHeight / minWidth : undefined;
            }
            return { width, height };
        }
        get scaledMinWidth() {
            return this.scaledMinDimensions.width;
        }
        get scaledMinHeight() {
            return this.scaledMinDimensions.height;
        }
        render() {
            if (!this.imageLoaded || !this.props.containerWidth || !this.props.containerHeight) {
                return null;
            }
            const value = this.props.value ? this.naturalDataToScaled(this.props.value) : undefined;
            return (<RectangleSelection_1.default minHeight={this.scaledMinHeight} minWidth={this.scaledMinWidth} onChange={this.handleRectangleSelectionChange} round={false} value={value}>
                <img height={this.scaledImageHeight} src={this.props.image} width={this.scaledImageWidth}/>
            </RectangleSelection_1.default>);
        }
    };
    __setFunctionName(_classThis, "ImageRectangleSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _imageLoaded_decorators = [mobx_1.observable];
        _get_scaledImageHeight_decorators = [mobx_1.computed];
        _get_scaledImageWidth_decorators = [mobx_1.computed];
        _get_scaledMinDimensions_decorators = [mobx_1.computed];
        _get_scaledMinWidth_decorators = [mobx_1.computed];
        _get_scaledMinHeight_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_scaledImageHeight_decorators, { kind: "getter", name: "scaledImageHeight", static: false, private: false, access: { has: obj => "scaledImageHeight" in obj, get: obj => obj.scaledImageHeight }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_scaledImageWidth_decorators, { kind: "getter", name: "scaledImageWidth", static: false, private: false, access: { has: obj => "scaledImageWidth" in obj, get: obj => obj.scaledImageWidth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_scaledMinDimensions_decorators, { kind: "getter", name: "scaledMinDimensions", static: false, private: false, access: { has: obj => "scaledMinDimensions" in obj, get: obj => obj.scaledMinDimensions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_scaledMinWidth_decorators, { kind: "getter", name: "scaledMinWidth", static: false, private: false, access: { has: obj => "scaledMinWidth" in obj, get: obj => obj.scaledMinWidth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_scaledMinHeight_decorators, { kind: "getter", name: "scaledMinHeight", static: false, private: false, access: { has: obj => "scaledMinHeight" in obj, get: obj => obj.scaledMinHeight }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _imageLoaded_decorators, { kind: "field", name: "imageLoaded", static: false, private: false, access: { has: obj => "imageLoaded" in obj, get: obj => obj.imageLoaded, set: (obj, value) => { obj.imageLoaded = value; } }, metadata: _metadata }, _imageLoaded_initializers, _imageLoaded_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageRectangleSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageRectangleSelection = _classThis;
})();
exports.ImageRectangleSelection = ImageRectangleSelection;
exports.default = (0, withContainerSize_1.default)(ImageRectangleSelection, imageRectangleSelection_scss_1.default.container);
