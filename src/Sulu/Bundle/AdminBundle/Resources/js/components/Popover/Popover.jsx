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
const react_portal_1 = require("react-portal");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const mousetrap_1 = __importDefault(require("mousetrap"));
const DOM_1 = require("../../utils/DOM");
const Backdrop_1 = __importDefault(require("../Backdrop"));
const PopoverPositioner_1 = __importDefault(require("./PopoverPositioner"));
const popover_scss_1 = __importDefault(require("./popover.scss"));
const CLOSE_KEY = 'esc';
let Popover = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _popoverChildRef_decorators;
    let _popoverChildRef_initializers = [];
    let _popoverChildRef_extraInitializers = [];
    let _popoverWidth_decorators;
    let _popoverWidth_initializers = [];
    let _popoverWidth_extraInitializers = [];
    let _popoverHeight_decorators;
    let _popoverHeight_initializers = [];
    let _popoverHeight_extraInitializers = [];
    let _get_dimensions_decorators;
    let _setPopoverSize_decorators;
    let _setPopoverChildRef_decorators;
    let _setPopoverChildRef_initializers = [];
    let _setPopoverChildRef_extraInitializers = [];
    var Popover = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.popoverChildRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _popoverChildRef_initializers, void 0));
            this.popoverWidth = (__runInitializers(this, _popoverChildRef_extraInitializers), __runInitializers(this, _popoverWidth_initializers, void 0));
            this.popoverHeight = (__runInitializers(this, _popoverWidth_extraInitializers), __runInitializers(this, _popoverHeight_initializers, void 0));
            this.mutationObserver = __runInitializers(this, _popoverHeight_extraInitializers);
            this.close = () => {
                const { open, onClose } = this.props;
                if (open && onClose) {
                    onClose();
                }
            };
            this.updateDimensions = () => {
                if (!this.popoverChildRef) {
                    return;
                }
                const { clientHeight, clientWidth, offsetHeight, offsetWidth, scrollHeight, scrollWidth, } = this.popoverChildRef;
                // calculating real size by considering borders, margins and paddings
                this.setPopoverSize(scrollWidth + offsetWidth - clientWidth, scrollHeight + offsetHeight - clientHeight);
            };
            this.handleBackdropClick = this.close;
            this.setPopoverChildRef = __runInitializers(this, _setPopoverChildRef_initializers, (ref) => {
                if (ref) {
                    this.popoverChildRef = ref;
                    this.mutationObserver.disconnect();
                    this.mutationObserver.observe(this.popoverChildRef, { childList: true, subtree: true });
                }
                const { popoverChildRef } = this.props;
                if (popoverChildRef) {
                    popoverChildRef(ref);
                }
            });
            __runInitializers(this, _setPopoverChildRef_extraInitializers);
            window.addEventListener('blur', this.close);
            window.addEventListener('resize', this.close);
            this.mutationObserver = new MutationObserver(() => {
                // The size of the popover has to be reset before updating the dimensions, because otherwise the old style
                // including width and height will still apply, and therefore the dimensions would not change
                this.setPopoverSize(0, 0);
                this.updateDimensions();
            });
            if (this.props.open) {
                mousetrap_1.default.bind(CLOSE_KEY, this.close);
            }
        }
        componentWillUnmount() {
            window.removeEventListener('blur', this.close);
            window.removeEventListener('resize', this.close);
            this.mutationObserver.disconnect();
            if (this.props.open) {
                mousetrap_1.default.unbind(CLOSE_KEY);
            }
        }
        componentDidUpdate(prevProps) {
            if (this.popoverChildRef) {
                this.updateDimensions();
                (0, DOM_1.afterElementsRendered)(() => {
                    this.popoverChildRef.scrollTop = this.dimensions.scrollTop;
                });
            }
            if (prevProps.open !== this.props.open) {
                if (this.props.open) {
                    mousetrap_1.default.bind(CLOSE_KEY, this.close);
                }
                else {
                    mousetrap_1.default.unbind(CLOSE_KEY);
                }
            }
        }
        get dimensions() {
            const { anchorElement, verticalOffset, horizontalAnchorMode, horizontalOffset, centerChildElement, } = this.props;
            const { top = 0, left = 0, width = 0, height = 0, } = anchorElement.getBoundingClientRect();
            const centerChildOffsetTop = (centerChildElement) ? centerChildElement.offsetTop : 0;
            const alignOnVerticalAnchorEdges = !centerChildElement;
            const horizontalOffsetValue = horizontalAnchorMode === 'center' ? (width - this.popoverWidth) / 2 : 0;
            return PopoverPositioner_1.default.getCroppedDimensions(this.popoverWidth, this.popoverHeight, top, left, width, height, horizontalOffsetValue + horizontalOffset, verticalOffset, centerChildOffsetTop, alignOnVerticalAnchorEdges);
        }
        setPopoverSize(width, height) {
            this.popoverWidth = width;
            this.popoverHeight = height;
        }
        render() {
            const { open, children, anchorElement, backdrop, } = this.props;
            if (!open || !anchorElement) {
                return null;
            }
            const dimensions = this.dimensions;
            const styles = Object.assign(Object.assign({}, PopoverPositioner_1.default.dimensionsToStyle(dimensions)), { position: 'fixed', pointerEvents: 'auto' });
            const verticalPosition = (dimensions.top > anchorElement.getBoundingClientRect().top) ? 'bottom' : 'top';
            const horizontalPosition = (dimensions.left === anchorElement.getBoundingClientRect().left) ? 'left' : 'right';
            return (<react_1.Fragment>
                <react_portal_1.Portal>
                    {backdrop && <Backdrop_1.default onClick={this.handleBackdropClick} visible={false}/>}
                    <div className={popover_scss_1.default.container}>
                        {children &&
                    children(this.setPopoverChildRef, styles, verticalPosition, horizontalPosition)}
                    </div>
                </react_portal_1.Portal>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Popover");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _popoverChildRef_decorators = [mobx_1.observable];
        _popoverWidth_decorators = [mobx_1.observable];
        _popoverHeight_decorators = [mobx_1.observable];
        _get_dimensions_decorators = [mobx_1.computed];
        _setPopoverSize_decorators = [mobx_1.action];
        _setPopoverChildRef_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_dimensions_decorators, { kind: "getter", name: "dimensions", static: false, private: false, access: { has: obj => "dimensions" in obj, get: obj => obj.dimensions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setPopoverSize_decorators, { kind: "method", name: "setPopoverSize", static: false, private: false, access: { has: obj => "setPopoverSize" in obj, get: obj => obj.setPopoverSize }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _popoverChildRef_decorators, { kind: "field", name: "popoverChildRef", static: false, private: false, access: { has: obj => "popoverChildRef" in obj, get: obj => obj.popoverChildRef, set: (obj, value) => { obj.popoverChildRef = value; } }, metadata: _metadata }, _popoverChildRef_initializers, _popoverChildRef_extraInitializers);
        __esDecorate(null, null, _popoverWidth_decorators, { kind: "field", name: "popoverWidth", static: false, private: false, access: { has: obj => "popoverWidth" in obj, get: obj => obj.popoverWidth, set: (obj, value) => { obj.popoverWidth = value; } }, metadata: _metadata }, _popoverWidth_initializers, _popoverWidth_extraInitializers);
        __esDecorate(null, null, _popoverHeight_decorators, { kind: "field", name: "popoverHeight", static: false, private: false, access: { has: obj => "popoverHeight" in obj, get: obj => obj.popoverHeight, set: (obj, value) => { obj.popoverHeight = value; } }, metadata: _metadata }, _popoverHeight_initializers, _popoverHeight_extraInitializers);
        __esDecorate(null, null, _setPopoverChildRef_decorators, { kind: "field", name: "setPopoverChildRef", static: false, private: false, access: { has: obj => "setPopoverChildRef" in obj, get: obj => obj.setPopoverChildRef, set: (obj, value) => { obj.setPopoverChildRef = value; } }, metadata: _metadata }, _setPopoverChildRef_initializers, _setPopoverChildRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Popover = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        backdrop: true,
        horizontalAnchorMode: 'left',
        horizontalOffset: 0,
        open: false,
        verticalOffset: 0,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Popover = _classThis;
})();
exports.default = Popover;
