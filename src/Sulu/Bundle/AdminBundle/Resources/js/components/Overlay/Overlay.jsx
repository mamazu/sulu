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
const classnames_1 = __importDefault(require("classnames"));
const mousetrap_1 = __importDefault(require("mousetrap"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_1 = __importStar(require("react"));
const react_portal_1 = require("react-portal");
const Icon_1 = __importDefault(require("../Icon"));
const Button_1 = __importDefault(require("../Button"));
const DOM_1 = require("../../utils/DOM");
const Backdrop_1 = __importDefault(require("../Backdrop"));
const Snackbar_1 = __importDefault(require("../Snackbar"));
const Actions_1 = __importDefault(require("./Actions"));
const overlay_scss_1 = __importDefault(require("./overlay.scss"));
const CLOSE_ICON = 'su-times';
const CLOSE_OVERLAY_KEY = 'esc';
let Overlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _visible_decorators;
    let _visible_initializers = [];
    let _visible_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleTransitionEnd_decorators;
    let _handleTransitionEnd_initializers = [];
    let _handleTransitionEnd_extraInitializers = [];
    var Overlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.open = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _open_initializers, false));
            this.visible = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _visible_initializers, false));
            this.close = (__runInitializers(this, _visible_extraInitializers), () => {
                this.props.onClose();
            });
            this.handleTransitionEnd = __runInitializers(this, _handleTransitionEnd_initializers, () => {
                const { open } = this.props;
                if (!open) {
                    this.visible = false;
                }
            });
            this.handleIconClick = (__runInitializers(this, _handleTransitionEnd_extraInitializers), () => {
                this.close();
            });
            const { open } = this.props;
            if (open) {
                mousetrap_1.default.bind(CLOSE_OVERLAY_KEY, this.close);
            }
            this.open = open;
            this.visible = open;
        }
        componentWillUnmount() {
            if (this.props.open) {
                mousetrap_1.default.unbind(CLOSE_OVERLAY_KEY);
            }
        }
        componentDidUpdate(prevProps) {
            const { open } = this.props;
            if (prevProps.open !== open) {
                if (open) {
                    mousetrap_1.default.bind(CLOSE_OVERLAY_KEY, this.close);
                }
                else {
                    mousetrap_1.default.unbind(CLOSE_OVERLAY_KEY);
                }
                (0, DOM_1.afterElementsRendered)((0, mobx_1.action)(() => {
                    this.open = open;
                }));
            }
            if (prevProps.open === false && open === true) {
                this.visible = true;
            }
        }
        render() {
            const { actions, children, confirmDisabled, confirmLoading, confirmText, onConfirm, onSnackbarClick, onSnackbarCloseClick, size, snackbarMessage, snackbarType, title, } = this.props;
            const footerVisible = onConfirm !== undefined || actions.length > 0;
            const { open, visible } = this;
            const containerClass = (0, classnames_1.default)(overlay_scss_1.default.container, {
                [overlay_scss_1.default.isDown]: open,
            });
            const overlayClass = (0, classnames_1.default)(overlay_scss_1.default.overlay, {
                [overlay_scss_1.default[size]]: size,
            });
            return (<react_1.Fragment>
                {visible &&
                    <react_portal_1.Portal>
                        <Backdrop_1.default />
                        <div className={containerClass} onTransitionEnd={this.handleTransitionEnd}>
                            <div className={overlayClass}>
                                <section className={overlay_scss_1.default.content}>
                                    <header className={overlay_scss_1.default.header}>
                                        <h2>{title}</h2>
                                        <Icon_1.default className={overlay_scss_1.default.icon} name={CLOSE_ICON} onClick={this.handleIconClick}/>
                                    </header>
                                    <article className={overlay_scss_1.default.article}>{children}</article>
                                    {footerVisible &&
                            <footer className={overlay_scss_1.default.footer}>
                                            {actions.length > 0 && (<Actions_1.default actions={actions}/>)}
                                            {onConfirm !== undefined && (<Button_1.default disabled={confirmDisabled} loading={confirmLoading} onClick={onConfirm} skin="primary">
                                                    {confirmText}
                                                </Button_1.default>)}
                                        </footer>}
                                    <div className={overlay_scss_1.default.snackbar}>
                                        <Snackbar_1.default message={snackbarMessage || ''} onClick={onSnackbarClick} onCloseClick={onSnackbarCloseClick} type={snackbarType} visible={!!snackbarMessage}/>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </react_portal_1.Portal>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Overlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _visible_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleTransitionEnd_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _visible_decorators, { kind: "field", name: "visible", static: false, private: false, access: { has: obj => "visible" in obj, get: obj => obj.visible, set: (obj, value) => { obj.visible = value; } }, metadata: _metadata }, _visible_initializers, _visible_extraInitializers);
        __esDecorate(null, null, _handleTransitionEnd_decorators, { kind: "field", name: "handleTransitionEnd", static: false, private: false, access: { has: obj => "handleTransitionEnd" in obj, get: obj => obj.handleTransitionEnd, set: (obj, value) => { obj.handleTransitionEnd = value; } }, metadata: _metadata }, _handleTransitionEnd_initializers, _handleTransitionEnd_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Overlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        actions: [],
        confirmDisabled: false,
        confirmLoading: false,
        snackbarType: 'error',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Overlay = _classThis;
})();
exports.default = Overlay;
