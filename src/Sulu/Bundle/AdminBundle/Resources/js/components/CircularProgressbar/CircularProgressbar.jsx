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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const react_circular_progressbar_1 = require("react-circular-progressbar");
const circularProgressbar_scss_1 = __importDefault(require("./circularProgressbar.scss"));
let CircularProgressbar = (() => {
    var _a;
    let _classSuper = react_1.default.PureComponent;
    let _instanceExtraInitializers = [];
    let _get_percentageText_decorators;
    return _a = class CircularProgressbar extends _classSuper {
            get percentageText() {
                const { hidePercentageText, percentage } = this.props;
                if (hidePercentageText) {
                    return null;
                }
                return `${percentage}%`;
            }
            render() {
                const { size, percentage } = this.props;
                const sizeStyle = {
                    width: size,
                    height: size,
                };
                return (<div style={sizeStyle}>
                <react_circular_progressbar_1.CircularProgressbar background={true} classes={{
                        root: circularProgressbar_scss_1.default.root,
                        path: circularProgressbar_scss_1.default.path,
                        tail: circularProgressbar_scss_1.default.tail,
                        text: circularProgressbar_scss_1.default.text,
                        background: circularProgressbar_scss_1.default.background,
                    }} text={this.percentageText} value={percentage}/>
            </div>);
            }
            constructor() {
                super(...arguments);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_percentageText_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_percentageText_decorators, { kind: "getter", name: "percentageText", static: false, private: false, access: { has: obj => "percentageText" in obj, get: obj => obj.percentageText }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.defaultProps = {
            hidePercentageText: false,
            percentage: 0,
            size: 100,
        },
        _a;
})();
exports.default = CircularProgressbar;
