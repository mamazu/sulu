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
const mobx_1 = require("mobx");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const mobx_react_1 = require("mobx-react");
const json_pointer_1 = __importDefault(require("json-pointer"));
const loglevel_1 = __importDefault(require("loglevel"));
const List_1 = __importDefault(require("../../../containers/List"));
const ListStore_1 = __importDefault(require("../../../containers/List/stores/ListStore"));
const MultiSelectionStore_1 = __importDefault(require("../../../stores/MultiSelectionStore"));
const MultiAutoComplete_1 = __importDefault(require("../../../containers/MultiAutoComplete"));
const Translator_1 = require("../../../utils/Translator");
const MultiSelection_1 = __importDefault(require("../../MultiSelection"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const selection_scss_1 = __importDefault(require("./selection.scss"));
const USER_SETTINGS_KEY = 'selection';
let Selection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _requestOptions_decorators;
    let _requestOptions_initializers = [];
    let _requestOptions_extraInitializers = [];
    let _get_value_decorators;
    let _get_locale_decorators;
    let _get_type_decorators;
    let _get_autoCompleteIdProperty_decorators;
    let _get_autoCompleteFilterParameter_decorators;
    let _get_viewName_decorators;
    let _get_resultToView_decorators;
    var Selection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.listStore = __runInitializers(this, _instanceExtraInitializers);
            this.requestOptions = __runInitializers(this, _requestOptions_initializers, void 0);
            this.handleItemClick = (__runInitializers(this, _requestOptions_extraInitializers), (itemId, item) => {
                const { router } = this.props;
                const { resultToView, viewName } = this;
                if (!router) {
                    return;
                }
                router.navigate(viewName, Object.keys(resultToView).reduce((parameters, resultPath) => {
                    parameters[resultToView[resultPath]] = json_pointer_1.default.get(item, '/' + resultPath);
                    return parameters;
                }, {}));
            });
            this.handleMultiSelectionChange = (selectedIds) => {
                const { onChange, onFinish } = this.props;
                onChange(selectedIds);
                onFinish();
            };
            this.handleListSelectionChange = (selectedIds) => {
                const { onChange, onFinish } = this.props;
                if (!this.listStore) {
                    throw new Error('The ListStore has not been initialized! This should not happen and is likely a bug.');
                }
                if (this.listStore.dataLoading || this.listStore.loading) {
                    return;
                }
                if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(this.value), (0, mobx_1.toJS)(selectedIds))) {
                    onChange(selectedIds);
                    onFinish();
                }
            };
            this.handleAutoCompleteSelectionChange = (selectedIds) => {
                const { onChange, onFinish } = this.props;
                if (!this.autoCompleteSelectionStore) {
                    throw new Error('The SelectionStore has not been initialized! This should not happen and is likely a bug.');
                }
                if (this.autoCompleteSelectionStore.loading) {
                    return;
                }
                if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(this.value) || [], (0, mobx_1.toJS)(selectedIds))) {
                    onChange(selectedIds);
                    onFinish();
                }
            };
            if (this.type !== 'list_overlay' && this.type !== 'list' && this.type !== 'auto_complete') {
                throw new Error('The Selection field must either be declared as "overlay", "list" or as "auto_complete", '
                    + 'received type was "' + this.type + '"!');
            }
            const { fieldTypeOptions: { resource_key: resourceKey, }, formInspector, schemaOptions: { request_parameters: { value: unvalidatedRequestParameters = [], } = {}, resource_store_properties_to_request: { value: unvalidatedResourceStorePropertiesToRequest = [], } = {}, }, } = this.props;
            if (!resourceKey) {
                throw new Error('The selection field needs a "resource_key" option to work properly');
            }
            if (!(0, mobx_1.isArrayLike)(unvalidatedRequestParameters)) {
                throw new Error('The "request_parameters" schemaOption must be an array!');
            }
            const requestParameters = unvalidatedRequestParameters;
            if (!(0, mobx_1.isArrayLike)(unvalidatedResourceStorePropertiesToRequest)) {
                throw new Error('The "resource_store_properties_to_request" schemaOption must be an array!');
            }
            const resourceStorePropertiesToRequest = unvalidatedResourceStorePropertiesToRequest;
            this.requestOptions = this.buildRequestOptions(requestParameters, resourceStorePropertiesToRequest, formInspector);
            // update requestOptions observable if one of the "resource_store_properties_to_request" properties is changed
            formInspector.addFinishFieldHandler((dataPath) => {
                const observedDataPaths = resourceStorePropertiesToRequest.map((property) => {
                    return typeof property.value === 'string' ? '/' + property.value : '/' + property.name;
                });
                if (observedDataPaths.includes(dataPath)) {
                    const newRequestOptions = this.buildRequestOptions(requestParameters, resourceStorePropertiesToRequest, formInspector);
                    if (!(0, fast_deep_equal_1.default)(this.requestOptions, newRequestOptions)) {
                        this.requestOptions = newRequestOptions;
                    }
                }
            });
            if (this.type === 'list') {
                const { fieldTypeOptions: { types: { list: { list_key: listKey, }, }, }, } = this.props;
                this.listStore = new ListStore_1.default(resourceKey, listKey || resourceKey, USER_SETTINGS_KEY, { locale: this.locale, page: mobx_1.observable.box() }, this.requestOptions, undefined, this.value);
                this.changeListDisposer = (0, mobx_1.reaction)(() => (this.listStore ? this.listStore.selectionIds : []), this.handleListSelectionChange);
                this.changeListOptionsDisposer = (0, mobx_1.reaction)(() => this.requestOptions, (requestOptions) => {
                    const listStore = this.listStore;
                    if (!listStore) {
                        throw new Error('The ListStore has not been initialized! This is likely a bug.');
                    }
                    // reset liststore to reload whole tree instead of children of current active item
                    listStore.reset();
                    // set selected items as initialSelectionIds to expand them in case of a tree
                    listStore.initialSelectionIds = listStore.selectionIds;
                    listStore.options = Object.assign(Object.assign({}, listStore.options), requestOptions);
                });
                this.changeLocaleDisposer = (0, mobx_1.intercept)(this.locale, '', (change) => {
                    if (this.listStore) {
                        this.listStore.sendRequestDisposer();
                    }
                    return change;
                });
            }
            else if (this.type === 'auto_complete') {
                this.autoCompleteSelectionStore = new MultiSelectionStore_1.default(resourceKey, this.value || [], this.locale, this.autoCompleteFilterParameter);
                this.changeAutoCompleteSelectionDisposer = (0, mobx_1.reaction)(() => this.autoCompleteSelectionStore
                    ? this.autoCompleteSelectionStore.items.map((item) => item[this.autoCompleteIdProperty])
                    : [], this.handleAutoCompleteSelectionChange);
            }
        }
        componentDidUpdate() {
            if (this.type === 'auto_complete'
                && this.autoCompleteSelectionStore
                && !(0, fast_deep_equal_1.default)(this.autoCompleteSelectionStore.items.map((item) => item[this.autoCompleteIdProperty]), (0, mobx_1.toJS)(this.value))) {
                this.autoCompleteSelectionStore.loadItems(this.value);
            }
        }
        componentWillUnmount() {
            if (this.changeListDisposer) {
                this.changeListDisposer();
            }
            if (this.changeAutoCompleteSelectionDisposer) {
                this.changeAutoCompleteSelectionDisposer();
            }
            if (this.changeListOptionsDisposer) {
                this.changeListOptionsDisposer();
            }
            if (this.changeLocaleDisposer) {
                this.changeLocaleDisposer();
            }
            if (this.listStore) {
                this.listStore.destroy();
            }
        }
        get value() {
            const { value, dataPath } = this.props;
            if (value && (0, mobx_1.isArrayLike)(value) && value.length > 0 && typeof value[0] === 'object') {
                loglevel_1.default.warn('The "Selection" field with the path "' + dataPath + '" expects an array of ids as value but '
                    + 'received an array of objects instead. Is it possible that your API returns an array serialized '
                    + 'objects?'
                    + '\n\nThe Sulu form view expects that your API returns the data in the same format as it is sent '
                    + 'to the server when submitting the form. '
                    + '\nSulu will try to extract the ids from the given array of objects heuristically. '
                    + 'This decreases performance and might lead to errors or other unexpected behaviour.');
                return value.map((item) => item && typeof item === 'object' ? item.id : item);
            }
            return value;
        }
        get locale() {
            const { formInspector } = this.props;
            return formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
        }
        get type() {
            const defaultType = this.props.fieldTypeOptions.default_type;
            if (typeof defaultType !== 'string') {
                throw new Error('The "default_type" field-type option must be a string!');
            }
            const { schemaOptions } = this.props;
            const { type: { value: type = defaultType, } = {}, } = schemaOptions;
            if (typeof type !== 'string') {
                throw new Error('The "type" schema option must be a string!');
            }
            return type;
        }
        get autoCompleteIdProperty() {
            const { fieldTypeOptions: { types: { auto_complete: { id_property: idProperty, }, }, }, } = this.props;
            return idProperty;
        }
        get autoCompleteFilterParameter() {
            const { fieldTypeOptions: { types: { auto_complete: { filter_parameter: filterParameter, }, }, }, } = this.props;
            return filterParameter;
        }
        buildRequestOptions(requestParameters, resourceStorePropertiesToRequest, formInspector) {
            const requestOptions = {};
            requestParameters.forEach((parameter) => {
                requestOptions[parameter.name] = parameter.value;
            });
            resourceStorePropertiesToRequest.forEach((propertyToRequest) => {
                const { name: parameterName, value: propertyName } = propertyToRequest;
                const propertyPath = typeof propertyName === 'string' ? propertyName : parameterName;
                requestOptions[parameterName] = (0, mobx_1.toJS)(formInspector.getValueByPath('/' + propertyPath));
            });
            return requestOptions;
        }
        get viewName() {
            const { fieldTypeOptions: { view: { name, } = {}, }, } = this.props;
            return name;
        }
        get resultToView() {
            const { fieldTypeOptions: { view: { result_to_view: resultToView, } = {}, }, } = this.props;
            return resultToView;
        }
        render() {
            if (this.type === 'list_overlay') {
                return this.renderListOverlay();
            }
            if (this.type === 'auto_complete') {
                return this.renderAutoComplete();
            }
            if (this.type === 'list') {
                return this.renderList();
            }
            throw new Error('The "' + this.type + '" type does not exist in the Selection field type.');
        }
        renderListOverlay() {
            const { disabled, formInspector, fieldTypeOptions: { resource_key: resourceKey, types: { list_overlay: { adapter, list_key: listKey, display_properties: displayProperties, icon, label, overlay_title: overlayTitle, }, }, }, schemaOptions: { types: { value: types, } = {}, item_disabled_condition: { value: itemDisabledCondition, } = {}, allow_deselect_for_disabled_items: { value: allowDeselectForDisabledItems = true, } = {}, sortable: { value: sortable = true, } = {}, }, } = this.props;
            if (types !== undefined && typeof types !== 'string') {
                throw new Error('The "types" schema option must be a string if given!');
            }
            if (itemDisabledCondition !== undefined && typeof itemDisabledCondition !== 'string') {
                throw new Error('The "item_disabled_condition" schema option must be a string if given!');
            }
            if (allowDeselectForDisabledItems !== undefined && typeof allowDeselectForDisabledItems !== 'boolean') {
                throw new Error('The "allow_deselect_for_disabled_items" schema option must be a boolean if given!');
            }
            if (sortable !== undefined && typeof sortable !== 'boolean') {
                throw new Error('The "sortable" schema option must be a boolean if given!');
            }
            if (!adapter) {
                throw new Error('The selection field needs a "adapter" option to work properly');
            }
            const options = Object.assign({}, this.requestOptions);
            if (types) {
                options.types = types;
            }
            return (<MultiSelection_1.default adapter={adapter} allowDeselectForDisabledItems={!!allowDeselectForDisabledItems} disabled={!!disabled} disabledIds={resourceKey === formInspector.resourceKey && formInspector.id ? [formInspector.id] : []} displayProperties={displayProperties} icon={icon} itemDisabledCondition={itemDisabledCondition} label={(0, Translator_1.translate)(label, { count: this.value ? this.value.length : 0 })} listKey={listKey || resourceKey} locale={this.locale} onChange={this.handleMultiSelectionChange} onItemClick={this.viewName && this.resultToView && this.handleItemClick} options={options} overlayTitle={(0, Translator_1.translate)(overlayTitle)} resourceKey={resourceKey} sortable={sortable} value={this.value || []}/>);
        }
        renderAutoComplete() {
            if (!this.autoCompleteSelectionStore) {
                throw new Error('The SelectionStore has not been initialized! This should not happen and is likely a bug.');
            }
            const { dataPath, disabled, fieldTypeOptions: { types: { auto_complete: { allow_add: allowAdd, display_property: displayProperty, search_properties: searchProperties, }, }, }, } = this.props;
            if (!displayProperty) {
                throw new Error('The selection field needs a "display_property" option to work properly!');
            }
            if (!searchProperties) {
                throw new Error('The selection field needs a "search_properties" option to work properly!');
            }
            return (<MultiAutoComplete_1.default allowAdd={allowAdd} disabled={!!disabled} displayProperty={displayProperty} id={dataPath} idProperty={this.autoCompleteIdProperty} options={this.requestOptions} searchProperties={searchProperties} selectionStore={this.autoCompleteSelectionStore}/>);
        }
        renderList() {
            if (!this.listStore) {
                throw new Error('The ListStore has not been initialized! This should not happen and is likely a bug.');
            }
            const { disabled, fieldTypeOptions: { types: { list: { adapter, }, }, }, schemaOptions: { item_disabled_condition: { value: itemDisabledCondition, } = {}, }, } = this.props;
            if (!adapter) {
                throw new Error('The selection field needs a "adapter" option for the list type to work properly');
            }
            if (itemDisabledCondition !== undefined && typeof itemDisabledCondition !== 'string') {
                throw new Error('The "item_disabled_condition" schema option must be a string if given!');
            }
            return (<div className={selection_scss_1.default.list}>
                <List_1.default adapters={[adapter]} disabled={!!disabled} itemDisabledCondition={itemDisabledCondition} paginated={false} searchable={false} showColumnOptions={false} store={this.listStore}/>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Selection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _requestOptions_decorators = [mobx_1.observable];
        _get_value_decorators = [mobx_1.computed];
        _get_locale_decorators = [mobx_1.computed];
        _get_type_decorators = [mobx_1.computed];
        _get_autoCompleteIdProperty_decorators = [mobx_1.computed];
        _get_autoCompleteFilterParameter_decorators = [mobx_1.computed];
        _get_viewName_decorators = [mobx_1.computed];
        _get_resultToView_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_locale_decorators, { kind: "getter", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_autoCompleteIdProperty_decorators, { kind: "getter", name: "autoCompleteIdProperty", static: false, private: false, access: { has: obj => "autoCompleteIdProperty" in obj, get: obj => obj.autoCompleteIdProperty }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_autoCompleteFilterParameter_decorators, { kind: "getter", name: "autoCompleteFilterParameter", static: false, private: false, access: { has: obj => "autoCompleteFilterParameter" in obj, get: obj => obj.autoCompleteFilterParameter }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_viewName_decorators, { kind: "getter", name: "viewName", static: false, private: false, access: { has: obj => "viewName" in obj, get: obj => obj.viewName }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resultToView_decorators, { kind: "getter", name: "resultToView", static: false, private: false, access: { has: obj => "resultToView" in obj, get: obj => obj.resultToView }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _requestOptions_decorators, { kind: "field", name: "requestOptions", static: false, private: false, access: { has: obj => "requestOptions" in obj, get: obj => obj.requestOptions, set: (obj, value) => { obj.requestOptions = value; } }, metadata: _metadata }, _requestOptions_initializers, _requestOptions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Selection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Selection = _classThis;
})();
exports.default = Selection;
