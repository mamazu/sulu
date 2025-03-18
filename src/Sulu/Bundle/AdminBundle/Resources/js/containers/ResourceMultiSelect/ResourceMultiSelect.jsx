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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const MultiSelect_1 = __importDefault(require("../../components/MultiSelect"));
const ResourceListStore_1 = __importDefault(require("../../stores/ResourceListStore"));
const Loader_1 = __importDefault(require("../../components/Loader"));
let ResourceMultiSelect = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _resourceListStore_decorators;
    let _resourceListStore_initializers = [];
    let _resourceListStore_extraInitializers = [];
    let _createResourceListStore_decorators;
    let _createResourceListStore_initializers = [];
    let _createResourceListStore_extraInitializers = [];
    var ResourceMultiSelect = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.resourceListStore = __runInitializers(this, _resourceListStore_initializers, void 0);
            this.createResourceListStore = (__runInitializers(this, _resourceListStore_extraInitializers), __runInitializers(this, _createResourceListStore_initializers, () => {
                const { idProperty, resourceKey, requestParameters, } = this.props;
                // sending an empty limit to the server will disable pagination
                const parameters = Object.assign({ limit: '' }, requestParameters);
                this.resourceListStore = new ResourceListStore_1.default(resourceKey, parameters, idProperty);
            }));
            this.handleChange = (__runInitializers(this, _createResourceListStore_extraInitializers), (values) => {
                const { onChange, idProperty, } = this.props;
                const valueObjects = this.resourceListStore.data.filter((dataValue) => {
                    return values.includes(dataValue[idProperty]);
                });
                onChange(values, valueObjects);
            });
            this.createResourceListStore();
        }
        componentDidUpdate(prevProps) {
            const { resourceKey, requestParameters, } = this.props;
            if (!(0, fast_deep_equal_1.default)(prevProps.requestParameters, requestParameters) || prevProps.resourceKey !== resourceKey) {
                this.createResourceListStore();
            }
        }
        render() {
            const { allSelectedText, disabled, displayProperty, idProperty, noneSelectedText, onClose, values, } = this.props;
            if (this.resourceListStore.loading || !this.resourceListStore.data) {
                return <Loader_1.default size={30}/>;
            }
            return (<MultiSelect_1.default allSelectedText={allSelectedText} disabled={disabled} noneSelectedText={noneSelectedText} onChange={this.handleChange} onClose={onClose} values={values}>
                {this.resourceListStore.data.map((object, index) => <MultiSelect_1.default.Option key={index} value={object[idProperty]}>
                    {object[displayProperty]}
                </MultiSelect_1.default.Option>)}
            </MultiSelect_1.default>);
        }
    };
    __setFunctionName(_classThis, "ResourceMultiSelect");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _resourceListStore_decorators = [mobx_1.observable];
        _createResourceListStore_decorators = [mobx_1.action];
        __esDecorate(null, null, _resourceListStore_decorators, { kind: "field", name: "resourceListStore", static: false, private: false, access: { has: obj => "resourceListStore" in obj, get: obj => obj.resourceListStore, set: (obj, value) => { obj.resourceListStore = value; } }, metadata: _metadata }, _resourceListStore_initializers, _resourceListStore_extraInitializers);
        __esDecorate(null, null, _createResourceListStore_decorators, { kind: "field", name: "createResourceListStore", static: false, private: false, access: { has: obj => "createResourceListStore" in obj, get: obj => obj.createResourceListStore, set: (obj, value) => { obj.createResourceListStore = value; } }, metadata: _metadata }, _createResourceListStore_initializers, _createResourceListStore_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceMultiSelect = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        idProperty: 'id',
        requestParameters: {},
        values: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceMultiSelect = _classThis;
})();
exports.default = ResourceMultiSelect;
