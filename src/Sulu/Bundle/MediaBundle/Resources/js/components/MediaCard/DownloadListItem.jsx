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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const react_clipboard_js_1 = __importDefault(require("react-clipboard.js"));
const downloadListItem_scss_1 = __importDefault(require("./downloadListItem.scss"));
let DownloadListItem = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _copying_decorators;
    let _copying_initializers = [];
    let _copying_extraInitializers = [];
    let _copyUrl_decorators;
    var DownloadListItem = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.copying = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _copying_initializers, false));
            this.handleCopySuccess = (__runInitializers(this, _copying_extraInitializers), () => {
                this.copyUrl();
            });
            this.handleClick = () => {
                const { url, onClick, } = this.props;
                if (onClick) {
                    onClick(url);
                }
            };
        }
        copyUrl() {
            this.copying = true;
        }
        render() {
            const { url, children, copyText, copyUrlOnClick, } = this.props;
            const itemClass = (0, classnames_1.default)(downloadListItem_scss_1.default.item, {
                [downloadListItem_scss_1.default.copying]: this.copying,
            });
            const content = (<span className={downloadListItem_scss_1.default.content}>
                {children}
                <span className={downloadListItem_scss_1.default.copyText}>
                    {copyText}
                </span>
            </span>);
            return (<li className={itemClass} onAnimationEnd={this.handleClick}>
                {(copyUrlOnClick)
                    ? <react_clipboard_js_1.default data-clipboard-text={url} onSuccess={this.handleCopySuccess}>
                        {content}
                    </react_clipboard_js_1.default>
                    : <button onClick={this.handleClick} type="button">
                        {content}
                    </button>}
            </li>);
        }
    };
    __setFunctionName(_classThis, "DownloadListItem");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _copying_decorators = [mobx_1.observable];
        _copyUrl_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _copyUrl_decorators, { kind: "method", name: "copyUrl", static: false, private: false, access: { has: obj => "copyUrl" in obj, get: obj => obj.copyUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _copying_decorators, { kind: "field", name: "copying", static: false, private: false, access: { has: obj => "copying" in obj, get: obj => obj.copying, set: (obj, value) => { obj.copying = value; } }, metadata: _metadata }, _copying_initializers, _copying_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DownloadListItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        copyUrlOnClick: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DownloadListItem = _classThis;
})();
exports.default = DownloadListItem;
