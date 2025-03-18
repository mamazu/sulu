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
const classnames_1 = __importDefault(require("classnames"));
const Translator_1 = require("../../utils/Translator");
const modifiableRectangle_scss_1 = __importDefault(require("./modifiableRectangle.scss"));
let ModifiableRectangle = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _moveMode_decorators;
    let _moveMode_initializers = [];
    let _moveMode_extraInitializers = [];
    let _resizeMode_decorators;
    let _resizeMode_initializers = [];
    let _resizeMode_extraInitializers = [];
    let _clickAnchor_decorators;
    let _clickAnchor_initializers = [];
    let _clickAnchor_extraInitializers = [];
    let _setClickAnchor_decorators;
    let _handleMoveMouseDown_decorators;
    let _handleMoveMouseDown_initializers = [];
    let _handleMoveMouseDown_extraInitializers = [];
    let _handleResizeMouseDown_decorators;
    let _handleResizeMouseDown_initializers = [];
    let _handleResizeMouseDown_extraInitializers = [];
    let _handleMouseUp_decorators;
    let _handleMouseUp_initializers = [];
    let _handleMouseUp_extraInitializers = [];
    let _handleMouseMove_decorators;
    let _handleMouseMove_initializers = [];
    let _handleMouseMove_extraInitializers = [];
    var ModifiableRectangle = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.moveMode = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _moveMode_initializers, false));
            this.resizeMode = (__runInitializers(this, _moveMode_extraInitializers), __runInitializers(this, _resizeMode_initializers, false));
            this.clickAnchor = (__runInitializers(this, _resizeMode_extraInitializers), __runInitializers(this, _clickAnchor_initializers, { pageY: 0, pageX: 0 }));
            this.handleMoveMouseDown = (__runInitializers(this, _clickAnchor_extraInitializers), __runInitializers(this, _handleMoveMouseDown_initializers, (event) => {
                event.stopPropagation();
                this.setClickAnchor(event);
                this.moveMode = true;
            }));
            this.handleResizeMouseDown = (__runInitializers(this, _handleMoveMouseDown_extraInitializers), __runInitializers(this, _handleResizeMouseDown_initializers, (event) => {
                event.stopPropagation();
                this.setClickAnchor(event);
                this.resizeMode = true;
            }));
            this.handleMouseUp = (__runInitializers(this, _handleResizeMouseDown_extraInitializers), __runInitializers(this, _handleMouseUp_initializers, () => {
                const { onFinish } = this.props;
                if (this.moveMode || this.resizeMode) {
                    this.moveMode = false;
                    this.resizeMode = false;
                    if (onFinish) {
                        onFinish();
                    }
                }
            }));
            this.handleMouseMove = (__runInitializers(this, _handleMouseUp_extraInitializers), __runInitializers(this, _handleMouseMove_initializers, (event) => {
                const { onChange } = this.props;
                let top = 0, left = 0, width = 0, height = 0;
                if (this.moveMode) {
                    top = event.pageY - this.clickAnchor.pageY;
                    left = event.pageX - this.clickAnchor.pageX;
                }
                if (this.resizeMode) {
                    height = event.pageY - this.clickAnchor.pageY;
                    width = event.pageX - this.clickAnchor.pageX;
                }
                if (this.moveMode || this.resizeMode) {
                    this.setClickAnchor(event);
                    if (onChange) {
                        onChange({ top, left, width, height });
                    }
                }
            }));
            this.handleDoubleClick = (__runInitializers(this, _handleMouseMove_extraInitializers), this.props.onDoubleClick);
        }
        componentDidMount() {
            window.addEventListener('mouseup', this.handleMouseUp);
            window.addEventListener('mousemove', this.handleMouseMove);
        }
        componentWillUnmount() {
            window.removeEventListener('mouseup', this.handleMouseUp);
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
        setClickAnchor(event) {
            this.clickAnchor.pageY = event.pageY;
            this.clickAnchor.pageX = event.pageX;
        }
        render() {
            const { backdropSize, disabled, height, label, left, minSizeReached, top, width } = this.props;
            const rectangleClass = (0, classnames_1.default)(modifiableRectangle_scss_1.default.rectangle, {
                [modifiableRectangle_scss_1.default.disabled]: disabled,
                [modifiableRectangle_scss_1.default.hasBackdrop]: !!backdropSize,
            });
            return (<react_1.Fragment>
                <div className={rectangleClass} onDoubleClick={!disabled && this.handleDoubleClick || undefined} onMouseDown={!disabled && this.handleMoveMouseDown || undefined} role="button" style={{
                    left: left + 'px',
                    top: top + 'px',
                    width: width + 'px',
                    height: height + 'px',
                }}>
                    {!!backdropSize &&
                    <div className={modifiableRectangle_scss_1.default.backdrop} style={{ outlineWidth: backdropSize + 'px' }}/>}
                    {!!label &&
                    <div className={modifiableRectangle_scss_1.default.label} style={{ fontSize: `${Math.sqrt(height / 2) * 5}px` }}>
                            {label}
                        </div>}
                    {!disabled &&
                    <div className={modifiableRectangle_scss_1.default.resizeHandle} onMouseDown={this.handleResizeMouseDown} role="slider"/>}
                </div>
                {minSizeReached &&
                    <div className={modifiableRectangle_scss_1.default.minSizeNotification} style={{
                            left: left + 'px',
                            top: top + height + 'px',
                            width: width + 'px',
                        }}>
                        {(0, Translator_1.translate)('sulu_media.min_size_notification')}
                    </div>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ModifiableRectangle");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _moveMode_decorators = [mobx_1.observable];
        _resizeMode_decorators = [mobx_1.observable];
        _clickAnchor_decorators = [mobx_1.observable];
        _setClickAnchor_decorators = [mobx_1.action];
        _handleMoveMouseDown_decorators = [mobx_1.action];
        _handleResizeMouseDown_decorators = [mobx_1.action];
        _handleMouseUp_decorators = [mobx_1.action];
        _handleMouseMove_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setClickAnchor_decorators, { kind: "method", name: "setClickAnchor", static: false, private: false, access: { has: obj => "setClickAnchor" in obj, get: obj => obj.setClickAnchor }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _moveMode_decorators, { kind: "field", name: "moveMode", static: false, private: false, access: { has: obj => "moveMode" in obj, get: obj => obj.moveMode, set: (obj, value) => { obj.moveMode = value; } }, metadata: _metadata }, _moveMode_initializers, _moveMode_extraInitializers);
        __esDecorate(null, null, _resizeMode_decorators, { kind: "field", name: "resizeMode", static: false, private: false, access: { has: obj => "resizeMode" in obj, get: obj => obj.resizeMode, set: (obj, value) => { obj.resizeMode = value; } }, metadata: _metadata }, _resizeMode_initializers, _resizeMode_extraInitializers);
        __esDecorate(null, null, _clickAnchor_decorators, { kind: "field", name: "clickAnchor", static: false, private: false, access: { has: obj => "clickAnchor" in obj, get: obj => obj.clickAnchor, set: (obj, value) => { obj.clickAnchor = value; } }, metadata: _metadata }, _clickAnchor_initializers, _clickAnchor_extraInitializers);
        __esDecorate(null, null, _handleMoveMouseDown_decorators, { kind: "field", name: "handleMoveMouseDown", static: false, private: false, access: { has: obj => "handleMoveMouseDown" in obj, get: obj => obj.handleMoveMouseDown, set: (obj, value) => { obj.handleMoveMouseDown = value; } }, metadata: _metadata }, _handleMoveMouseDown_initializers, _handleMoveMouseDown_extraInitializers);
        __esDecorate(null, null, _handleResizeMouseDown_decorators, { kind: "field", name: "handleResizeMouseDown", static: false, private: false, access: { has: obj => "handleResizeMouseDown" in obj, get: obj => obj.handleResizeMouseDown, set: (obj, value) => { obj.handleResizeMouseDown = value; } }, metadata: _metadata }, _handleResizeMouseDown_initializers, _handleResizeMouseDown_extraInitializers);
        __esDecorate(null, null, _handleMouseUp_decorators, { kind: "field", name: "handleMouseUp", static: false, private: false, access: { has: obj => "handleMouseUp" in obj, get: obj => obj.handleMouseUp, set: (obj, value) => { obj.handleMouseUp = value; } }, metadata: _metadata }, _handleMouseUp_initializers, _handleMouseUp_extraInitializers);
        __esDecorate(null, null, _handleMouseMove_decorators, { kind: "field", name: "handleMouseMove", static: false, private: false, access: { has: obj => "handleMouseMove" in obj, get: obj => obj.handleMouseMove, set: (obj, value) => { obj.handleMouseMove = value; } }, metadata: _metadata }, _handleMouseMove_initializers, _handleMouseMove_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModifiableRectangle = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        backdropSize: 0,
        left: 0,
        top: 0,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModifiableRectangle = _classThis;
})();
exports.default = ModifiableRectangle;
