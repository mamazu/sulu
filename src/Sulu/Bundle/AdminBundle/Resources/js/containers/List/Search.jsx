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
const Input_1 = __importDefault(require("../../components/Input/Input"));
const Translator_1 = require("../../utils/Translator");
let Search = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _collapsed_decorators;
    let _collapsed_initializers = [];
    let _collapsed_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _setCollapsed_decorators;
    let _setValue_decorators;
    var Search = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.collapsed = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _collapsed_initializers, true));
            this.value = (__runInitializers(this, _collapsed_extraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.handleChange = (__runInitializers(this, _value_extraInitializers), (value) => {
                this.setValue(value);
            });
            this.handleKeyPress = (key) => {
                if (key === 'Enter') {
                    this.search();
                }
            };
            this.search = () => {
                if (!this.collapsed && !this.value) {
                    this.setCollapsed(true);
                }
                this.props.onSearch(this.value);
            };
            this.handleBlur = () => {
                this.search();
            };
            this.handleIconClick = () => {
                if (this.collapsed) {
                    this.setCollapsed(false);
                }
            };
            this.handleClearClick = () => {
                this.setValue(undefined);
                this.search();
            };
        }
        setCollapsed(collapsed) {
            this.collapsed = collapsed;
        }
        setValue(value) {
            this.value = value;
        }
        updateValue(value) {
            this.setValue(value);
            if (value) {
                this.setCollapsed(false);
            }
        }
        componentDidMount() {
            this.updateValue(this.props.value);
        }
        componentDidUpdate(prevProps) {
            if (prevProps.value !== this.props.value) {
                this.updateValue(this.props.value);
            }
        }
        render() {
            return (<label aria-label={(0, Translator_1.translate)('sulu_admin.list_search_placeholder')}>
                <Input_1.default collapsed={this.collapsed} icon="su-search" onBlur={this.handleBlur} onChange={this.handleChange} onClearClick={this.handleClearClick} onIconClick={this.handleIconClick} onKeyPress={this.handleKeyPress} placeholder={(0, Translator_1.translate)('sulu_admin.list_search_placeholder')} skin="dark" value={this.value}/>
            </label>);
        }
    };
    __setFunctionName(_classThis, "Search");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _collapsed_decorators = [mobx_1.observable];
        _value_decorators = [mobx_1.observable];
        _setCollapsed_decorators = [mobx_1.action];
        _setValue_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setCollapsed_decorators, { kind: "method", name: "setCollapsed", static: false, private: false, access: { has: obj => "setCollapsed" in obj, get: obj => obj.setCollapsed }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setValue_decorators, { kind: "method", name: "setValue", static: false, private: false, access: { has: obj => "setValue" in obj, get: obj => obj.setValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _collapsed_decorators, { kind: "field", name: "collapsed", static: false, private: false, access: { has: obj => "collapsed" in obj, get: obj => obj.collapsed, set: (obj, value) => { obj.collapsed = value; } }, metadata: _metadata }, _collapsed_initializers, _collapsed_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Search = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Search = _classThis;
})();
exports.default = Search;
