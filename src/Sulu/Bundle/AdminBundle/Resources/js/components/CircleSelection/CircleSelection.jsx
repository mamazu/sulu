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
const withContainerSize_1 = __importDefault(require("../withContainerSize"));
const ModifiableCircle_1 = __importDefault(require("./ModifiableCircle"));
const PositionNormalizer_1 = __importDefault(require("./normalizers/PositionNormalizer"));
const RoundingNormalizer_1 = __importDefault(require("./normalizers/RoundingNormalizer"));
const SizeNormalizer_1 = __importDefault(require("./normalizers/SizeNormalizer"));
const withPercentageValues_1 = __importDefault(require("./withPercentageValues"));
const circleSelection_scss_1 = __importDefault(require("./circleSelection.scss"));
let RawCircleSelectionComponent = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_value_decorators;
    let _get_normalizers_decorators;
    let _get_maximumSelection_decorators;
    var RawCircleSelectionComponent = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.setInitialValue = (__runInitializers(this, _instanceExtraInitializers), () => {
                const { containerHeight, containerWidth, onChange, value } = this.props;
                if (!containerHeight || !containerWidth) {
                    return;
                }
                if (!value) {
                    onChange(this.value);
                }
            });
            this.handleCircleDoubleClick = () => {
                const { onChange, resizable } = this.props;
                if (resizable) {
                    onChange(this.maximumSelection);
                    return;
                }
                onChange(this.normalize(this.centerSelection(this.value)));
            };
            this.handleCircleChange = (change) => {
                const { value } = this;
                const { onChange } = this.props;
                onChange(this.normalize({
                    left: value.left + change.left,
                    top: value.top + change.top,
                    radius: value.radius + change.radius,
                }));
            };
        }
        get value() {
            const { value } = this.props;
            if (!value) {
                return this.maximumSelection;
            }
            return value;
        }
        componentDidMount() {
            this.setInitialValue();
        }
        static createNormalizers(props) {
            const { containerWidth, containerHeight, maxRadius, minRadius, round, resizable } = props;
            if (!containerWidth || !containerHeight) {
                return [];
            }
            const normalizers = [
                new PositionNormalizer_1.default(containerWidth, containerHeight),
            ];
            if (resizable) {
                normalizers.push(new SizeNormalizer_1.default(containerWidth, containerHeight, maxRadius, minRadius));
            }
            if (round) {
                normalizers.push(new RoundingNormalizer_1.default());
            }
            return normalizers;
        }
        get normalizers() {
            return RawCircleSelectionComponent.createNormalizers(this.props);
        }
        normalize(selection) {
            return this.normalizers.reduce((data, normalizer) => normalizer.normalize(data), selection);
        }
        get maximumSelection() {
            const { containerWidth, containerHeight, resizable, value } = this.props;
            const radius = resizable
                ? Math.min(containerWidth, containerHeight) / 2
                : (value && value.radius) || 0;
            return this.normalize(this.centerSelection({
                left: 0,
                top: 0,
                radius,
            }));
        }
        centerSelection(selection) {
            const { containerWidth, containerHeight } = this.props;
            const halfWidth = containerWidth / 2;
            const halfHeight = containerHeight / 2;
            return Object.assign(Object.assign({}, selection), { left: halfWidth, top: halfHeight });
        }
        render() {
            const { children, disabled, label, onFinish, resizable, skin } = this.props;
            const { left, top, radius } = this.value;
            const circle = (<ModifiableCircle_1.default disabled={disabled} label={label} left={left} onChange={this.handleCircleChange} onDoubleClick={this.handleCircleDoubleClick} onFinish={onFinish} radius={radius} resizable={resizable} skin={skin} top={top}/>);
            if (children) {
                return (<div className={circleSelection_scss_1.default.selection}>
                    {children}
                    {circle}
                </div>);
            }
            return circle;
        }
    };
    __setFunctionName(_classThis, "RawCircleSelectionComponent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_value_decorators = [mobx_1.computed];
        _get_normalizers_decorators = [mobx_1.computed];
        _get_maximumSelection_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_normalizers_decorators, { kind: "getter", name: "normalizers", static: false, private: false, access: { has: obj => "normalizers" in obj, get: obj => obj.normalizers }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_maximumSelection_decorators, { kind: "getter", name: "maximumSelection", static: false, private: false, access: { has: obj => "maximumSelection" in obj, get: obj => obj.maximumSelection }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RawCircleSelectionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        maxRadius: undefined,
        minRadius: undefined,
        resizable: true,
        round: true,
        skin: 'outlined',
        usePercentageValues: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RawCircleSelectionComponent = _classThis;
})();
const CircleSelectionComponentWithPercentageValues = (0, withPercentageValues_1.default)(RawCircleSelectionComponent);
class CircleSelectionComponent extends react_1.default.Component {
    render() {
        const { usePercentageValues } = this.props;
        if (usePercentageValues) {
            return <CircleSelectionComponentWithPercentageValues {...this.props}/>;
        }
        return <RawCircleSelectionComponent {...this.props}/>;
    }
}
const CircleSelectionComponentWithContainerSize = (0, withContainerSize_1.default)(CircleSelectionComponent, circleSelection_scss_1.default.container);
class CircleSelection extends react_1.default.Component {
    render() {
        const { children } = this.props;
        if (children) {
            return <CircleSelectionComponentWithContainerSize {...this.props}/>;
        }
        return <CircleSelectionComponent {...this.props}/>;
    }
}
CircleSelection.defaultProps = {
    containerHeight: 0,
    containerWidth: 0,
    disabled: false,
    maxRadius: undefined,
    minRadius: undefined,
    resizable: true,
    round: true,
    skin: 'outlined',
    usePercentageValues: false,
};
exports.default = CircleSelection;
