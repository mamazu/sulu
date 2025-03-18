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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const ResourceLocator_1 = __importDefault(require("../../../components/ResourceLocator"));
const ResourceLocatorHistory_1 = __importDefault(require("../../../containers/ResourceLocatorHistory"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
const Translator_1 = require("../../../utils/Translator");
const Button_1 = __importDefault(require("../../../components/Button"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const resourceLocator_scss_1 = __importDefault(require("./resourceLocator.scss"));
const PART_TAG = 'sulu.rlp.part';
const HOMEPAGE_RESOURCE_LOCATOR = '/';
let ResourceLocator = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _mode_extraInitializers = [];
    let _inputChanged_decorators;
    let _inputChanged_initializers = [];
    let _inputChanged_extraInitializers = [];
    let _inputChangedSinceRefresh_decorators;
    let _inputChangedSinceRefresh_initializers = [];
    let _inputChangedSinceRefresh_extraInitializers = [];
    let _partsChangedSinceRefresh_decorators;
    let _partsChangedSinceRefresh_initializers = [];
    let _partsChangedSinceRefresh_extraInitializers = [];
    let _get_parts_decorators;
    let _get_enableAutoGeneration_decorators;
    let _get_enableRefreshButton_decorators;
    let _refreshResourceLocator_decorators;
    let _refreshResourceLocator_initializers = [];
    let _refreshResourceLocator_extraInitializers = [];
    let _handleInputChange_decorators;
    let _handleInputChange_initializers = [];
    let _handleInputChange_extraInitializers = [];
    var ResourceLocator = _classThis = class extends _classSuper {
        get parts() {
            const { formInspector, } = this.props;
            const partEntries = formInspector.getPathsByTag(PART_TAG)
                .map((path) => [path, formInspector.getValueByPath(path)])
                .filter(([, value]) => !!value)
                .map(([path, value]) => {
                // path is a jsonpointer but the api controller requires property names
                if (path.startsWith('/')) {
                    return [path.substr(1), value];
                }
                return [path, value];
            });
            return Object.fromEntries(partEntries);
        }
        get enableAutoGeneration() {
            const { formInspector: { id, }, } = this.props;
            return !id && !this.inputChanged && Object.keys(this.parts).length > 0;
        }
        get enableRefreshButton() {
            if (this.enableAutoGeneration) {
                return false;
            }
            return (this.inputChangedSinceRefresh || this.partsChangedSinceRefresh) && Object.keys(this.parts).length > 0;
        }
        constructor(props) {
            super(props);
            this.mode = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _mode_initializers, void 0));
            this.inputChanged = (__runInitializers(this, _mode_extraInitializers), __runInitializers(this, _inputChanged_initializers, false));
            this.inputChangedSinceRefresh = (__runInitializers(this, _inputChanged_extraInitializers), __runInitializers(this, _inputChangedSinceRefresh_initializers, false));
            this.partsChangedSinceRefresh = (__runInitializers(this, _inputChangedSinceRefresh_extraInitializers), __runInitializers(this, _partsChangedSinceRefresh_initializers, false));
            this.partsChangeDisposer = __runInitializers(this, _partsChangedSinceRefresh_extraInitializers);
            this.refreshResourceLocator = __runInitializers(this, _refreshResourceLocator_initializers, () => {
                const { fieldTypeOptions: { generationUrl, resourceStorePropertiesToRequest = {}, }, formInspector, onChange, schemaOptions: { entity_class: { value: entityClass, } = {}, route_schema: { value: routeSchema, } = {}, } = {}, } = this.props;
                const requestOptions = Object.assign({}, formInspector.options);
                Object.entries(resourceStorePropertiesToRequest).forEach(([propertyName, parameterName]) => {
                    const propertyValue = (0, mobx_1.toJS)(formInspector.getValueByPath('/' + propertyName));
                    if (propertyValue !== undefined) {
                        requestOptions[parameterName] = propertyValue;
                    }
                });
                this.inputChangedSinceRefresh = false;
                this.partsChangedSinceRefresh = false;
                Requester_1.default.post(generationUrl, Object.assign({ parts: this.parts, resourceKey: formInspector.resourceKey, locale: formInspector.locale ? formInspector.locale.get() : userStore_1.default.contentLocale, id: formInspector.id, entityClass,
                    routeSchema }, requestOptions)).then((0, mobx_1.action)((response) => {
                    onChange(response.resourcelocator);
                }));
            });
            this.handleInputBlur = (__runInitializers(this, _refreshResourceLocator_extraInitializers), () => {
                const { onFinish } = this.props;
                onFinish();
            });
            this.handleInputChange = __runInitializers(this, _handleInputChange_initializers, (value) => {
                const { onChange } = this.props;
                this.inputChanged = true;
                this.inputChangedSinceRefresh = true;
                onChange(value);
            });
            this.handleRefreshButtonClick = (__runInitializers(this, _handleInputChange_extraInitializers), () => {
                this.refreshResourceLocator();
            });
            const { fieldTypeOptions: { generationUrl, modeResolver, }, formInspector, value, } = this.props;
            if (!modeResolver) {
                throw new Error('The "modeResolver" must be a function returning a promise with the desired mode');
            }
            modeResolver(this.props).then((0, mobx_1.action)((mode) => this.mode = mode));
            if (value === HOMEPAGE_RESOURCE_LOCATOR) {
                return;
            }
            if (!generationUrl) {
                return;
            }
            if (typeof generationUrl !== 'string') {
                throw new Error('The "generationUrl" fieldTypeOption must be a string!');
            }
            this.partsChangeDisposer = (0, mobx_1.reaction)(() => (this.parts), (0, mobx_1.action)(() => {
                this.partsChangedSinceRefresh = true;
            }), { equals: mobx_1.comparer.structural });
            formInspector.addFinishFieldHandler((0, mobx_1.action)((finishedFieldDataPath, finishedFieldSchemaPath) => {
                const { tags: finishedFieldTags } = formInspector.getSchemaEntryByPath(finishedFieldSchemaPath) || {};
                if (!finishedFieldTags || !finishedFieldTags.some((tag) => tag.name === PART_TAG)) {
                    return;
                }
                if (this.enableAutoGeneration) {
                    this.refreshResourceLocator();
                }
            }));
        }
        componentWillUnmount() {
            if (this.partsChangeDisposer) {
                this.partsChangeDisposer();
            }
        }
        render() {
            if (!this.mode) {
                return null;
            }
            const { fieldTypeOptions: { historyResourceKey, options = {}, }, } = this.props;
            if (!historyResourceKey || typeof historyResourceKey !== 'string') {
                throw new Error('The "historyResourceKey" field type option must be set to a string!');
            }
            if (typeof options !== 'object') {
                throw new Error('The "options" field type must be an object if given!');
            }
            const { dataPath, disabled, formInspector, schemaOptions: { entity_class: { value: entityClass, } = {}, } = {}, value, } = this.props;
            if (value === HOMEPAGE_RESOURCE_LOCATOR) {
                return '/';
            }
            return (<react_1.Fragment>
                <ResourceLocator_1.default disabled={!!disabled} id={dataPath} locale={formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale)} mode={this.mode} onBlur={this.handleInputBlur} onChange={this.handleInputChange} value={value}/>
                <div className={resourceLocator_scss_1.default.buttonsContainer}>
                    <Button_1.default className={resourceLocator_scss_1.default.refreshButton} disabled={!this.enableRefreshButton} icon="su-sync" onClick={this.handleRefreshButtonClick} skin="link">
                        {(0, Translator_1.translate)('sulu_admin.refresh_url')}
                    </Button_1.default>
                    <ResourceLocatorHistory_1.default id={formInspector.id} options={Object.assign({ locale: formInspector.locale ? formInspector.locale.get() : userStore_1.default.contentLocale, resourceKey: formInspector.resourceKey, webspace: formInspector.options.webspace, entityClass }, options)} resourceKey={historyResourceKey}/>
                </div>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ResourceLocator");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _mode_decorators = [mobx_1.observable];
        _inputChanged_decorators = [mobx_1.observable];
        _inputChangedSinceRefresh_decorators = [mobx_1.observable];
        _partsChangedSinceRefresh_decorators = [mobx_1.observable];
        _get_parts_decorators = [mobx_1.computed];
        _get_enableAutoGeneration_decorators = [mobx_1.computed];
        _get_enableRefreshButton_decorators = [mobx_1.computed];
        _refreshResourceLocator_decorators = [mobx_1.action];
        _handleInputChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_parts_decorators, { kind: "getter", name: "parts", static: false, private: false, access: { has: obj => "parts" in obj, get: obj => obj.parts }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_enableAutoGeneration_decorators, { kind: "getter", name: "enableAutoGeneration", static: false, private: false, access: { has: obj => "enableAutoGeneration" in obj, get: obj => obj.enableAutoGeneration }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_enableRefreshButton_decorators, { kind: "getter", name: "enableRefreshButton", static: false, private: false, access: { has: obj => "enableRefreshButton" in obj, get: obj => obj.enableRefreshButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
        __esDecorate(null, null, _inputChanged_decorators, { kind: "field", name: "inputChanged", static: false, private: false, access: { has: obj => "inputChanged" in obj, get: obj => obj.inputChanged, set: (obj, value) => { obj.inputChanged = value; } }, metadata: _metadata }, _inputChanged_initializers, _inputChanged_extraInitializers);
        __esDecorate(null, null, _inputChangedSinceRefresh_decorators, { kind: "field", name: "inputChangedSinceRefresh", static: false, private: false, access: { has: obj => "inputChangedSinceRefresh" in obj, get: obj => obj.inputChangedSinceRefresh, set: (obj, value) => { obj.inputChangedSinceRefresh = value; } }, metadata: _metadata }, _inputChangedSinceRefresh_initializers, _inputChangedSinceRefresh_extraInitializers);
        __esDecorate(null, null, _partsChangedSinceRefresh_decorators, { kind: "field", name: "partsChangedSinceRefresh", static: false, private: false, access: { has: obj => "partsChangedSinceRefresh" in obj, get: obj => obj.partsChangedSinceRefresh, set: (obj, value) => { obj.partsChangedSinceRefresh = value; } }, metadata: _metadata }, _partsChangedSinceRefresh_initializers, _partsChangedSinceRefresh_extraInitializers);
        __esDecorate(null, null, _refreshResourceLocator_decorators, { kind: "field", name: "refreshResourceLocator", static: false, private: false, access: { has: obj => "refreshResourceLocator" in obj, get: obj => obj.refreshResourceLocator, set: (obj, value) => { obj.refreshResourceLocator = value; } }, metadata: _metadata }, _refreshResourceLocator_initializers, _refreshResourceLocator_extraInitializers);
        __esDecorate(null, null, _handleInputChange_decorators, { kind: "field", name: "handleInputChange", static: false, private: false, access: { has: obj => "handleInputChange" in obj, get: obj => obj.handleInputChange, set: (obj, value) => { obj.handleInputChange = value; } }, metadata: _metadata }, _handleInputChange_initializers, _handleInputChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceLocator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceLocator = _classThis;
})();
exports.default = ResourceLocator;
