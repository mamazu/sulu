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
exports.default = withContainerSize;
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const react_2 = require("../../utils/react");
const DOM_1 = require("../../utils/DOM");
const withContainerSize_scss_1 = __importDefault(require("./withContainerSize.scss"));
function withContainerSize(Component, containerClass = withContainerSize_scss_1.default.container) {
    let WithContainerSizeComponent = (() => {
        let _classDecorators = [mobx_react_1.observer];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = react_1.default.Component;
        let _containerWidth_decorators;
        let _containerWidth_initializers = [];
        let _containerWidth_extraInitializers = [];
        let _containerHeight_decorators;
        let _containerHeight_initializers = [];
        let _containerHeight_extraInitializers = [];
        var WithContainerSizeComponent = _classThis = class extends _classSuper {
            constructor() {
                super(...arguments);
                this.containerWidth = __runInitializers(this, _containerWidth_initializers, 0);
                this.containerHeight = (__runInitializers(this, _containerWidth_extraInitializers), __runInitializers(this, _containerHeight_initializers, 0));
                this.readContainerDimensions = (__runInitializers(this, _containerHeight_extraInitializers), (container) => {
                    (0, DOM_1.afterElementsRendered)((0, mobx_1.action)(() => {
                        if (!container) {
                            return;
                        }
                        this.container = container;
                        this.containerWidth = container.clientWidth;
                        this.containerHeight = container.clientHeight;
                    }));
                });
                this.setComponent = (component) => {
                    this.component = component;
                };
                this.handleWindowResize = () => this.readContainerDimensions(this.container);
            }
            componentDidMount() {
                window.addEventListener('resize', this.handleWindowResize);
                if (typeof this.component.containerDidMount === 'function') {
                    (0, DOM_1.afterElementsRendered)(this.component.containerDidMount);
                }
            }
            componentWillUnmount() {
                window.removeEventListener('resize', this.handleWindowResize);
            }
            render() {
                const props = Object.assign(Object.assign({}, this.props), { containerWidth: this.containerWidth, containerHeight: this.containerHeight, ref: this.setComponent });
                return (<div className={containerClass} ref={this.readContainerDimensions}>
                    <Component {...props}/>
                </div>);
            }
        };
        __setFunctionName(_classThis, "WithContainerSizeComponent");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _containerWidth_decorators = [mobx_1.observable];
            _containerHeight_decorators = [mobx_1.observable];
            __esDecorate(null, null, _containerWidth_decorators, { kind: "field", name: "containerWidth", static: false, private: false, access: { has: obj => "containerWidth" in obj, get: obj => obj.containerWidth, set: (obj, value) => { obj.containerWidth = value; } }, metadata: _metadata }, _containerWidth_initializers, _containerWidth_extraInitializers);
            __esDecorate(null, null, _containerHeight_decorators, { kind: "field", name: "containerHeight", static: false, private: false, access: { has: obj => "containerHeight" in obj, get: obj => obj.containerHeight, set: (obj, value) => { obj.containerHeight = value; } }, metadata: _metadata }, _containerHeight_initializers, _containerHeight_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WithContainerSizeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return WithContainerSizeComponent = _classThis;
    })();
    WithContainerSizeComponent.displayName = (0, react_2.buildHocDisplayName)('withContainerSize', Component);
    return WithContainerSizeComponent;
}
