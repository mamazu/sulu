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
exports.default = withPercentageValues;
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const react_2 = require("../../utils/react");
function withPercentageValues(Component) {
    let WithPercentageValuesComponent = (() => {
        let _classDecorators = [mobx_react_1.observer];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = react_1.default.Component;
        let _instanceExtraInitializers = [];
        let _get_transformedMinHeight_decorators;
        let _get_transformedMinWidth_decorators;
        let _get_transformedValue_decorators;
        var WithPercentageValuesComponent = _classThis = class extends _classSuper {
            constructor() {
                super(...arguments);
                this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                    const { onChange, containerHeight, containerWidth } = this.props;
                    if (!value) {
                        onChange(value);
                        return;
                    }
                    onChange(Object.assign(Object.assign({}, value), { left: value.left / containerWidth, top: value.top / containerHeight, width: value.width / containerWidth, height: value.height / containerHeight }));
                });
            }
            get transformedMinHeight() {
                const { containerHeight, minHeight } = this.props;
                if (!minHeight) {
                    return minHeight;
                }
                return minHeight * containerHeight;
            }
            get transformedMinWidth() {
                const { containerWidth, minWidth } = this.props;
                if (!minWidth) {
                    return minWidth;
                }
                return minWidth * containerWidth;
            }
            get transformedValue() {
                const { containerHeight, containerWidth, value } = this.props;
                if (!value) {
                    return value;
                }
                return Object.assign(Object.assign({}, value), { left: value.left * containerWidth, top: value.top * containerHeight, width: value.width * containerWidth, height: value.height * containerHeight });
            }
            render() {
                const props = Object.assign(Object.assign({}, this.props), { minHeight: this.transformedMinHeight, minWidth: this.transformedMinWidth, onChange: this.handleChange, value: this.transformedValue });
                return (<Component {...props}/>);
            }
        };
        __setFunctionName(_classThis, "WithPercentageValuesComponent");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _get_transformedMinHeight_decorators = [mobx_1.computed];
            _get_transformedMinWidth_decorators = [mobx_1.computed];
            _get_transformedValue_decorators = [mobx_1.computed];
            __esDecorate(_classThis, null, _get_transformedMinHeight_decorators, { kind: "getter", name: "transformedMinHeight", static: false, private: false, access: { has: obj => "transformedMinHeight" in obj, get: obj => obj.transformedMinHeight }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _get_transformedMinWidth_decorators, { kind: "getter", name: "transformedMinWidth", static: false, private: false, access: { has: obj => "transformedMinWidth" in obj, get: obj => obj.transformedMinWidth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _get_transformedValue_decorators, { kind: "getter", name: "transformedValue", static: false, private: false, access: { has: obj => "transformedValue" in obj, get: obj => obj.transformedValue }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WithPercentageValuesComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })();
        _classThis.defaultProps = {
            minHeight: undefined,
            minWidth: undefined,
        };
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return WithPercentageValuesComponent = _classThis;
    })();
    WithPercentageValuesComponent.displayName = (0, react_2.buildHocDisplayName)('withPercentageValues', Component);
    return WithPercentageValuesComponent;
}
