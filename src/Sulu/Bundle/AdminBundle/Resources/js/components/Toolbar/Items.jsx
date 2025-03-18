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
const debounce_1 = __importDefault(require("debounce"));
const items_scss_1 = __importDefault(require("./items.scss"));
const DEBOUNCE_TIME = 200;
let Items = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _expandedWidth_decorators;
    let _expandedWidth_initializers = [];
    let _expandedWidth_extraInitializers = [];
    let _parentWidth_decorators;
    let _parentWidth_initializers = [];
    let _parentWidth_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _setDimensions_decorators;
    let _setDimensions_initializers = [];
    let _setDimensions_extraInitializers = [];
    let _get_showText_decorators;
    var Items = _classThis = class extends _classSuper {
        componentDidMount() {
            this.setDimensions();
            this.resizeObserver = new ResizeObserver((0, debounce_1.default)(this.setDimensions, DEBOUNCE_TIME));
            if (!this.parentRef) {
                return;
            }
            this.resizeObserver.observe(this.parentRef);
        }
        componentWillUnmount() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        }
        componentDidUpdate() {
            if (this.parentRef && this.parentWidth !== this.parentRef.offsetWidth) {
                this.parentWidth = this.parentRef.offsetWidth;
            }
            if (this.childRef && this.showText && this.expandedWidth !== this.childRef.offsetWidth) {
                this.expandedWidth = this.childRef.offsetWidth;
            }
        }
        get showText() {
            return this.parentWidth >= this.expandedWidth;
        }
        render() {
            const { skin, children } = this.props;
            const itemsClass = (0, classnames_1.default)(items_scss_1.default.items, items_scss_1.default[skin]);
            return (<div className={items_scss_1.default.itemsContainer} ref={this.setParentRef}>
                <ul className={itemsClass} ref={this.setChildRef}>
                    {children &&
                    react_1.default.Children.map(children, (item, index) => (item && <li key={index}>
                                {react_1.default.cloneElement(item, Object.assign(Object.assign({}, item.props), { showText: this.showText, skin }))}
                            </li>))}
                </ul>
            </div>);
        }
        constructor() {
            super(...arguments);
            this.expandedWidth = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _expandedWidth_initializers, 0));
            this.parentWidth = (__runInitializers(this, _expandedWidth_extraInitializers), __runInitializers(this, _parentWidth_initializers, 0));
            this.resizeObserver = __runInitializers(this, _parentWidth_extraInitializers);
            this.setParentRef = (ref) => {
                this.parentRef = ref;
            };
            this.setChildRef = (ref) => {
                this.childRef = ref;
            };
            this.setDimensions = __runInitializers(this, _setDimensions_initializers, () => {
                const { parentRef, childRef } = this;
                if (childRef && (this.showText || childRef.offsetWidth > this.expandedWidth)) {
                    this.expandedWidth = childRef.offsetWidth;
                }
                if (!parentRef) {
                    return;
                }
                this.parentWidth = parentRef.offsetWidth;
            });
            __runInitializers(this, _setDimensions_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Items");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _expandedWidth_decorators = [mobx_1.observable];
        _parentWidth_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _setDimensions_decorators = [mobx_1.action];
        _get_showText_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_showText_decorators, { kind: "getter", name: "showText", static: false, private: false, access: { has: obj => "showText" in obj, get: obj => obj.showText }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _expandedWidth_decorators, { kind: "field", name: "expandedWidth", static: false, private: false, access: { has: obj => "expandedWidth" in obj, get: obj => obj.expandedWidth, set: (obj, value) => { obj.expandedWidth = value; } }, metadata: _metadata }, _expandedWidth_initializers, _expandedWidth_extraInitializers);
        __esDecorate(null, null, _parentWidth_decorators, { kind: "field", name: "parentWidth", static: false, private: false, access: { has: obj => "parentWidth" in obj, get: obj => obj.parentWidth, set: (obj, value) => { obj.parentWidth = value; } }, metadata: _metadata }, _parentWidth_initializers, _parentWidth_extraInitializers);
        __esDecorate(null, null, _setDimensions_decorators, { kind: "field", name: "setDimensions", static: false, private: false, access: { has: obj => "setDimensions" in obj, get: obj => obj.setDimensions, set: (obj, value) => { obj.setDimensions = value; } }, metadata: _metadata }, _setDimensions_initializers, _setDimensions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Items = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        skin: 'light',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Items = _classThis;
})();
exports.default = Items;
