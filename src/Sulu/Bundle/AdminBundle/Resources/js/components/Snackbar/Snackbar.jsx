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
const classnames_1 = __importDefault(require("classnames"));
const Translator_1 = require("../../utils/Translator");
const Icon_1 = __importDefault(require("../Icon"));
const snackbar_scss_1 = __importDefault(require("./snackbar.scss"));
const ICONS = {
    error: 'su-exclamation-triangle',
    warning: 'su-bell',
    info: 'su-exclamation-circle',
    success: 'su-check-circle',
};
const DEFAULT_SNACKBAR_TYPE = 'error';
let Snackbar = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _updateMessage_decorators;
    let _updateMessage_initializers = [];
    let _updateMessage_extraInitializers = [];
    let _updateType_decorators;
    let _updateType_initializers = [];
    let _updateType_extraInitializers = [];
    let _handleTransitionEnd_decorators;
    let _handleTransitionEnd_initializers = [];
    let _handleTransitionEnd_extraInitializers = [];
    var Snackbar = _classThis = class extends _classSuper {
        componentDidMount() {
            this.updateMessage();
            this.updateType();
        }
        componentDidUpdate(prevProps) {
            const { message, type, visible } = this.props;
            if (!visible) {
                return;
            }
            if (prevProps.visible !== visible || prevProps.message !== message) {
                this.updateMessage();
            }
            if (prevProps.visible !== visible || prevProps.type !== type) {
                this.updateType();
            }
        }
        render() {
            const { icon, onCloseClick, onClick, skin, visible } = this.props;
            const snackbarClass = (0, classnames_1.default)(snackbar_scss_1.default.snackbar, snackbar_scss_1.default[this.type], {
                [snackbar_scss_1.default.clickable]: onClick,
                [snackbar_scss_1.default.floating]: skin === 'floating',
                [snackbar_scss_1.default.visible]: visible,
            });
            return (<div className={snackbarClass} onClick={onClick} onTransitionEnd={this.handleTransitionEnd} role="button">
                <Icon_1.default className={snackbar_scss_1.default.icon} name={icon || ICONS[this.type]}/>
                <div className={snackbar_scss_1.default.text}>
                    {skin === 'static'
                    ? <>
                                <strong>{(0, Translator_1.translate)('sulu_admin.' + this.type)}</strong>{' - '}
                            </>
                    : null}
                    {this.message}
                </div>
                {onCloseClick &&
                    <Icon_1.default className={snackbar_scss_1.default.closeIcon} name="su-times" onClick={onCloseClick}/>}
            </div>);
        }
        constructor() {
            super(...arguments);
            this.message = __runInitializers(this, _message_initializers, void 0);
            this.type = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _type_initializers, DEFAULT_SNACKBAR_TYPE));
            this.updateMessage = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _updateMessage_initializers, () => {
                this.message = this.props.message;
            }));
            this.updateType = (__runInitializers(this, _updateMessage_extraInitializers), __runInitializers(this, _updateType_initializers, () => {
                this.type = this.props.type;
            }));
            this.handleTransitionEnd = (__runInitializers(this, _updateType_extraInitializers), __runInitializers(this, _handleTransitionEnd_initializers, () => {
                const { visible } = this.props;
                if (!visible) {
                    this.message = undefined;
                    this.type = DEFAULT_SNACKBAR_TYPE;
                }
            }));
            __runInitializers(this, _handleTransitionEnd_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Snackbar");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _message_decorators = [mobx_1.observable];
        _type_decorators = [mobx_1.observable];
        _updateMessage_decorators = [mobx_1.action];
        _updateType_decorators = [mobx_1.action];
        _handleTransitionEnd_decorators = [mobx_1.action];
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _updateMessage_decorators, { kind: "field", name: "updateMessage", static: false, private: false, access: { has: obj => "updateMessage" in obj, get: obj => obj.updateMessage, set: (obj, value) => { obj.updateMessage = value; } }, metadata: _metadata }, _updateMessage_initializers, _updateMessage_extraInitializers);
        __esDecorate(null, null, _updateType_decorators, { kind: "field", name: "updateType", static: false, private: false, access: { has: obj => "updateType" in obj, get: obj => obj.updateType, set: (obj, value) => { obj.updateType = value; } }, metadata: _metadata }, _updateType_initializers, _updateType_extraInitializers);
        __esDecorate(null, null, _handleTransitionEnd_decorators, { kind: "field", name: "handleTransitionEnd", static: false, private: false, access: { has: obj => "handleTransitionEnd" in obj, get: obj => obj.handleTransitionEnd, set: (obj, value) => { obj.handleTransitionEnd = value; } }, metadata: _metadata }, _handleTransitionEnd_initializers, _handleTransitionEnd_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Snackbar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        skin: 'static',
        visible: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Snackbar = _classThis;
})();
exports.default = Snackbar;
