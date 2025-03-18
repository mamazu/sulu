"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const countryFieldFilterType_scss_1 = __importDefault(require("./countryFieldFilterType.scss"));
let CountryFieldFilterType = (() => {
    var _a;
    let _classSuper = containers_1.AbstractFieldFilterType;
    let _searchValue_decorators;
    let _searchValue_initializers = [];
    let _searchValue_extraInitializers = [];
    let _handleSearchChange_decorators;
    let _handleSearchChange_initializers = [];
    let _handleSearchChange_extraInitializers = [];
    return _a = class CountryFieldFilterType extends _classSuper {
            getFormNode() {
                const { countries } = _a;
                const { onChange, searchValue, value } = this;
                return (<react_1.Fragment>
                <components_1.Input icon="su-search" onChange={this.handleSearchChange} value={this.searchValue}/>
                <components_1.CheckboxGroup className={countryFieldFilterType_scss_1.default.checkboxGroup} onChange={onChange} values={value || []}>
                    {Object.keys(countries)
                        .filter((key) => searchValue
                        ? countries[key].toLowerCase().startsWith(searchValue.toLowerCase())
                        : true)
                        .map((key) => (<components_1.Checkbox key={key} value={key}>{countries[key]}</components_1.Checkbox>))}
                </components_1.CheckboxGroup>
            </react_1.Fragment>);
            }
            getValueNode(values) {
                const { countries } = _a;
                return Promise.resolve(values ? values.map((value) => countries[value]).join(', ') : null);
            }
            constructor() {
                super(...arguments);
                this.searchValue = __runInitializers(this, _searchValue_initializers, void 0);
                this.handleSearchChange = (__runInitializers(this, _searchValue_extraInitializers), __runInitializers(this, _handleSearchChange_initializers, (searchValue) => {
                    this.searchValue = searchValue;
                }));
                __runInitializers(this, _handleSearchChange_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _searchValue_decorators = [mobx_1.observable];
            _handleSearchChange_decorators = [mobx_1.action];
            __esDecorate(null, null, _searchValue_decorators, { kind: "field", name: "searchValue", static: false, private: false, access: { has: obj => "searchValue" in obj, get: obj => obj.searchValue, set: (obj, value) => { obj.searchValue = value; } }, metadata: _metadata }, _searchValue_initializers, _searchValue_extraInitializers);
            __esDecorate(null, null, _handleSearchChange_decorators, { kind: "field", name: "handleSearchChange", static: false, private: false, access: { has: obj => "handleSearchChange" in obj, get: obj => obj.handleSearchChange, set: (obj, value) => { obj.handleSearchChange = value; } }, metadata: _metadata }, _handleSearchChange_initializers, _handleSearchChange_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.countries = {},
        _a;
})();
exports.default = CountryFieldFilterType;
