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
const components_1 = require("sulu-admin-bundle/components");
const ImageFocusPointCell_1 = __importDefault(require("./ImageFocusPointCell"));
const imageFocusPoint_scss_1 = __importDefault(require("./imageFocusPoint.scss"));
const FOCUS_POINT_MATRIX_SIZE = 3;
let ImageFocusPoint = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _imageDimension_decorators;
    let _imageDimension_initializers = [];
    let _imageDimension_extraInitializers = [];
    let _updateImageDimension_decorators;
    let _updateImageDimension_initializers = [];
    let _updateImageDimension_extraInitializers = [];
    var ImageFocusPoint = _classThis = class extends _classSuper {
        componentDidMount() {
            window.addEventListener('resize', this.updateImageDimension);
        }
        componentWillUnmount() {
            window.removeEventListener('resize', this.updateImageDimension);
        }
        createFocusPoints(selectedPoint) {
            const points = [];
            for (let row = 0; row < FOCUS_POINT_MATRIX_SIZE; row++) {
                for (let column = 0; column < FOCUS_POINT_MATRIX_SIZE; column++) {
                    points.push(this.createFocusPoint(selectedPoint, column, row));
                }
            }
            return points;
        }
        createFocusPoint(selectedPoint, column, row) {
            const key = `${column}-${row}`;
            const props = {
                size: 100 / FOCUS_POINT_MATRIX_SIZE,
                value: { x: column, y: row },
                onClick: this.handleFocusPointClick,
            };
            if (selectedPoint.x === column && selectedPoint.y === row) {
                return (<ImageFocusPointCell_1.default key={key} {...props} active={true}/>);
            }
            if (this.isLeftOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="left"/>);
            }
            if (this.isRightOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="right"/>);
            }
            if (this.isAboveOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="top"/>);
            }
            if (this.isBeneathOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="bottom"/>);
            }
            if (this.isAboveRightOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="top-right"/>);
            }
            if (this.isAboveLeftOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="top-left"/>);
            }
            if (this.isBeneathRightOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="bottom-right"/>);
            }
            if (this.isBeneathLeftOfSelectedPoint(selectedPoint, row, column)) {
                return (<ImageFocusPointCell_1.default key={key} {...props} arrowDirection="bottom-left"/>);
            }
            return <ImageFocusPointCell_1.default key={key} {...props}/>;
        }
        isLeftOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x - 1 === column && selectedPoint.y === row;
        }
        isRightOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x + 1 === column && selectedPoint.y === row;
        }
        isAboveOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x === column && selectedPoint.y - 1 === row;
        }
        isAboveLeftOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x - 1 === column && selectedPoint.y - 1 === row;
        }
        isAboveRightOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x + 1 === column && selectedPoint.y - 1 === row;
        }
        isBeneathOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x === column && selectedPoint.y + 1 === row;
        }
        isBeneathRightOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x + 1 === column && selectedPoint.y + 1 === row;
        }
        isBeneathLeftOfSelectedPoint(selectedPoint, row, column) {
            return selectedPoint.x - 1 === column && selectedPoint.y + 1 === row;
        }
        render() {
            const { image, value, } = this.props;
            return (<div className={imageFocusPoint_scss_1.default.imageFocusPoint}>
                {this.imageDimension
                    ? <div className={imageFocusPoint_scss_1.default.focusPoints} style={{ height: this.imageDimension.height, width: this.imageDimension.width }}>
                        {this.createFocusPoints(value)}
                    </div>
                    : <components_1.Loader />}
                <img className={imageFocusPoint_scss_1.default.image} onLoad={this.handleImageLoad} ref={this.setImageRef} src={image}/>
            </div>);
        }
        constructor() {
            super(...arguments);
            this.imageDimension = __runInitializers(this, _imageDimension_initializers, void 0);
            this.handleFocusPointClick = (__runInitializers(this, _imageDimension_extraInitializers), (selectedPoint) => {
                this.props.onChange(selectedPoint);
            });
            this.setImageRef = (ref) => {
                this.imageRef = ref;
            };
            this.handleImageLoad = () => {
                this.updateImageDimension();
            };
            this.updateImageDimension = __runInitializers(this, _updateImageDimension_initializers, () => {
                if (this.imageRef) {
                    this.imageDimension = this.imageRef.getBoundingClientRect();
                }
            });
            __runInitializers(this, _updateImageDimension_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ImageFocusPoint");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _imageDimension_decorators = [mobx_1.observable];
        _updateImageDimension_decorators = [mobx_1.action];
        __esDecorate(null, null, _imageDimension_decorators, { kind: "field", name: "imageDimension", static: false, private: false, access: { has: obj => "imageDimension" in obj, get: obj => obj.imageDimension, set: (obj, value) => { obj.imageDimension = value; } }, metadata: _metadata }, _imageDimension_initializers, _imageDimension_extraInitializers);
        __esDecorate(null, null, _updateImageDimension_decorators, { kind: "field", name: "updateImageDimension", static: false, private: false, access: { has: obj => "updateImageDimension" in obj, get: obj => obj.updateImageDimension, set: (obj, value) => { obj.updateImageDimension = value; } }, metadata: _metadata }, _updateImageDimension_initializers, _updateImageDimension_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageFocusPoint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageFocusPoint = _classThis;
})();
exports.default = ImageFocusPoint;
