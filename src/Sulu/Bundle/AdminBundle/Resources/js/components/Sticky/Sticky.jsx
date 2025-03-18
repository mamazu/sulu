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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const sticky_scss_1 = __importDefault(require("./sticky.scss"));
let Sticky = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _isSticky_decorators;
    let _isSticky_initializers = [];
    let _isSticky_extraInitializers = [];
    let _stickySentinelRef_decorators;
    let _stickySentinelRef_initializers = [];
    let _stickySentinelRef_extraInitializers = [];
    var Sticky = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.isSticky = __runInitializers(this, _isSticky_initializers, false);
            this.stickySentinelRef = (__runInitializers(this, _isSticky_extraInitializers), __runInitializers(this, _stickySentinelRef_initializers, void 0));
            this.setStickySentinelRef = (__runInitializers(this, _stickySentinelRef_extraInitializers), (ref) => {
                this.stickySentinelRef = ref;
                if (!this.stickySentinelRef || !this.intersectionObserver) {
                    return;
                }
                this.intersectionObserver.observe(this.stickySentinelRef);
            });
            if (typeof IntersectionObserver !== 'undefined') {
                this.intersectionObserver = new IntersectionObserver((records) => {
                    for (const record of records) {
                        (0, mobx_1.action)(() => {
                            this.isSticky = !record.isIntersecting;
                        })();
                    }
                }, {});
            }
        }
        componentWillUnmount() {
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }
        }
        render() {
            const { children, top, } = this.props;
            return (<>
                <div className={sticky_scss_1.default.stickySentinel} ref={this.setStickySentinelRef} style={{ top: (0 - top - 1) }}/>

                <div className={sticky_scss_1.default.sticky} style={{ top }}>
                    {children(this.isSticky)}
                </div>
            </>);
        }
    };
    __setFunctionName(_classThis, "Sticky");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _isSticky_decorators = [mobx_1.observable];
        _stickySentinelRef_decorators = [mobx_1.observable];
        __esDecorate(null, null, _isSticky_decorators, { kind: "field", name: "isSticky", static: false, private: false, access: { has: obj => "isSticky" in obj, get: obj => obj.isSticky, set: (obj, value) => { obj.isSticky = value; } }, metadata: _metadata }, _isSticky_initializers, _isSticky_extraInitializers);
        __esDecorate(null, null, _stickySentinelRef_decorators, { kind: "field", name: "stickySentinelRef", static: false, private: false, access: { has: obj => "stickySentinelRef" in obj, get: obj => obj.stickySentinelRef, set: (obj, value) => { obj.stickySentinelRef = value; } }, metadata: _metadata }, _stickySentinelRef_initializers, _stickySentinelRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Sticky = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        top: 0,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Sticky = _classThis;
})();
exports.default = Sticky;
