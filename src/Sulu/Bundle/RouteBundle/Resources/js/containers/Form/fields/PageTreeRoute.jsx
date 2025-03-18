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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const stores_1 = require("sulu-admin-bundle/stores");
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
let PageTreeRoute = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.Component;
    let _mode_decorators;
    let _mode_initializers = [];
    let _mode_extraInitializers = [];
    var PageTreeRoute = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.mode = __runInitializers(this, _mode_initializers, void 0);
            this.handlePageChange = (__runInitializers(this, _mode_extraInitializers), (value, page = {
                path: null,
            }) => {
                const { onFinish } = this.props;
                const uuid = (value && value.toString()) || null;
                const path = (page && page.url) || null;
                this.handleChange(Object.assign(Object.assign({}, this.props.value), { page: {
                        uuid,
                        path,
                    } }));
                onFinish();
            });
            this.handleSuffixChange = (value) => {
                this.handleChange(Object.assign(Object.assign({}, this.props.value), { suffix: value }));
            };
            this.handleChange = (value) => {
                const { onChange } = this.props;
                onChange(value);
            };
            const { fieldTypeOptions: { modeResolver, }, } = props;
            if (!modeResolver) {
                throw new Error('The "modeResolver" must be a function returning a promise with the desired mode');
            }
            modeResolver(props).then((0, mobx_1.action)((mode) => this.mode = mode));
        }
        get locale() {
            const { formInspector } = this.props;
            return formInspector.locale ? formInspector.locale : mobx_1.observable.box(stores_1.userStore.contentLocale);
        }
        get pageValue() {
            const { value } = this.props;
            if (value && value.page && value.page.uuid) {
                return value.page.uuid;
            }
            return null;
        }
        get suffixValue() {
            const { value } = this.props;
            if (value && value.suffix) {
                return value.suffix;
            }
            return null;
        }
        render() {
            if (!this.mode) {
                return null;
            }
            const { data, dataPath, defaultType, disabled, fieldTypeOptions, formInspector, onFinish, onSuccess, router, schemaOptions, schemaPath, types, } = this.props;
            return (<react_1.Fragment>
                <components_1.Grid>
                    <components_1.Grid.Item colSpan={5}>
                        <containers_1.SingleSelection adapter="column_list" disabled={!!disabled} displayProperties={['url']} emptyText={(0, utils_1.translate)('sulu_page.no_page_selected')} icon="su-document" listKey="pages" locale={this.locale} onChange={this.handlePageChange} overlayTitle={(0, utils_1.translate)('sulu_page.single_selection_overlay_title')} resourceKey="pages" value={this.pageValue}/>
                    </components_1.Grid.Item>

                    <components_1.Grid.Item colSpan={7}>
                        <containers_1.ResourceLocator data={data} dataPath={dataPath} defaultType={defaultType} disabled={disabled} error={undefined} fieldTypeOptions={Object.assign({ historyResourceKey: 'routes', options: {
                        history: true,
                    } }, fieldTypeOptions)} formInspector={formInspector} label={undefined} maxOccurs={1} minOccurs={1} onChange={this.handleSuffixChange} onFinish={onFinish} onSuccess={onSuccess} router={router} schemaOptions={schemaOptions} schemaPath={schemaPath} showAllErrors={false} types={types} value={this.suffixValue}/>
                    </components_1.Grid.Item>
                </components_1.Grid>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "PageTreeRoute");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _mode_decorators = [mobx_1.observable];
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PageTreeRoute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PageTreeRoute = _classThis;
})();
exports.default = PageTreeRoute;
