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
const loglevel_1 = __importDefault(require("loglevel"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const mobx_react_1 = require("mobx-react");
const ResourceSingleSelect_1 = __importDefault(require("../../../containers/ResourceSingleSelect"));
const SingleAutoComplete_1 = __importDefault(require("../../../containers/SingleAutoComplete"));
const SingleSelection_1 = __importDefault(require("../../../containers/SingleSelection"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const Translator_1 = require("../../../utils/Translator");
const SingleSelectionStore_1 = __importDefault(require("../../../stores/SingleSelectionStore"));
let SingleSelection = (() => {
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
    let _get_type_decorators;
    let _get_locale_decorators;
    let _get_viewName_decorators;
    let _get_resultToView_decorators;
    let _get_useDeprecatedObjectDataFormat_decorators;
    var SingleSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.requestOptions = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _requestOptions_initializers, void 0));
            this.autoCompleteSelectionStore = __runInitializers(this, _requestOptions_extraInitializers);
            this.handleAutoCompleteSelectionChange = (selectedItem) => {
                if (!this.autoCompleteSelectionStore) {
                    throw new Error('The SelectionStore has not been initialized! This should not happen and is likely a bug.');
                }
                if (this.autoCompleteSelectionStore.loading) {
                    return;
                }
                if (this.value !== (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id)) {
                    if (this.useDeprecatedObjectDataFormat) {
                        this.handleChange(selectedItem);
                    }
                    else {
                        this.handleChange(selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id);
                    }
                }
            };
            this.handleChange = (value) => {
                const { onChange, onFinish } = this.props;
                onChange(value);
                onFinish();
            };
            this.handleItemClick = (itemId, item) => {
                const { router } = this.props;
                const { resultToView, viewName } = this;
                if (!router) {
                    return;
                }
                router.navigate(viewName, Object.keys(resultToView).reduce((parameters, resultPath) => {
                    parameters[resultToView[resultPath]] = json_pointer_1.default.get(item, '/' + resultPath);
                    return parameters;
                }, {}));
            };
            if (this.type !== 'list_overlay' && this.type !== 'single_select' && this.type !== 'auto_complete') {
                throw new Error('The Selection field must either be declared as "list_overlay", "single_select" '
                    + 'or as "auto_complete", received type was "' + this.type + '"!');
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
            if (this.type === 'auto_complete') {
                this.autoCompleteSelectionStore = new SingleSelectionStore_1.default(resourceKey, this.value, this.locale);
                this.changeAutoCompleteSelectionDisposer = (0, mobx_1.reaction)(() => { var _a; return (_a = this.autoCompleteSelectionStore) === null || _a === void 0 ? void 0 : _a.item; }, this.handleAutoCompleteSelectionChange);
            }
        }
        componentWillUnmount() {
            if (this.changeAutoCompleteSelectionDisposer) {
                this.changeAutoCompleteSelectionDisposer();
            }
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
        get value() {
            const { value, dataPath } = this.props;
            if (value && typeof value === 'object') {
                if (this.type === 'auto_complete' && this.useDeprecatedObjectDataFormat) {
                    return value.id;
                }
                loglevel_1.default.warn('The "SingleSelection" field with the path "' + dataPath + '" expects an id as value but '
                    + 'received an object instead. Is it possible that your API returns a serialized object?'
                    + '\n\nThe Sulu form view expects that your API returns the data in the same format as it is sent '
                    + 'to the server when submitting the form. '
                    + '\nSulu will try to extract the id from the given object heuristically. '
                    + 'This decreases performance and might lead to errors or other unexpected behaviour.');
                return value.id;
            }
            return value;
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
        get locale() {
            const { formInspector } = this.props;
            return formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
        }
        get viewName() {
            const { fieldTypeOptions: { view: { name, } = {}, }, } = this.props;
            return name;
        }
        get resultToView() {
            const { fieldTypeOptions: { view: { result_to_view: resultToView, } = {}, }, } = this.props;
            return resultToView;
        }
        get useDeprecatedObjectDataFormat() {
            const { schemaOptions: { use_deprecated_object_data_format: { value: useDeprecatedObjectDataFormat = false, } = {}, } = {}, } = this.props;
            if (useDeprecatedObjectDataFormat) {
                // @deprecated
                loglevel_1.default.warn('The "use_deprecated_object_data_format" param is deprecated since version 2.3 and will be removed. ' +
                    'You should adjust your API to process an id instead of a serialized object.');
            }
            return useDeprecatedObjectDataFormat;
        }
        render() {
            if (this.type === 'list_overlay') {
                return this.renderListOverlay();
            }
            if (this.type === 'single_select') {
                return this.renderSingleSelect();
            }
            if (this.type === 'auto_complete') {
                return this.renderAutoComplete();
            }
            throw new Error('The "' + this.type + '" type does not exist in the SingleSelection field type.');
        }
        renderListOverlay() {
            const { disabled, formInspector, fieldTypeOptions: { resource_key: resourceKey, types: { list_overlay: { adapter, detail_options: typeDetailOptions, list_key: listKey, display_properties: displayProperties, empty_text: emptyText, icon, overlay_title: overlayTitle, }, }, }, schemaOptions: { form_options_to_list_options: { value: unvalidatedFormOptionsToListOptions = [], } = {}, item_disabled_condition: { value: itemDisabledCondition, } = {}, allow_deselect_for_disabled_items: { value: allowDeselectForDisabledItems = true, } = {}, types: { value: types, } = {}, } = {}, } = this.props;
            if (types !== undefined && typeof types !== 'string') {
                throw new Error('The "types" schema option must be a string if given!');
            }
            if (itemDisabledCondition !== undefined && typeof itemDisabledCondition !== 'string') {
                throw new Error('The "item_disabled_condition" schema option must be a string if given!');
            }
            if (allowDeselectForDisabledItems !== undefined && typeof allowDeselectForDisabledItems !== 'boolean') {
                throw new Error('The "allow_deselect_for_disabled_items" schema option must be a boolean if given!');
            }
            if (!(0, mobx_1.isArrayLike)(unvalidatedFormOptionsToListOptions)) {
                throw new Error('The "form_options_to_list_options" option has to be an array if defined!');
            }
            const formOptionsToListOptions = unvalidatedFormOptionsToListOptions;
            if (typeDetailOptions && typeof typeDetailOptions !== 'object') {
                throw new Error('The "detail_options" option has to be an array if defined!');
            }
            const formListOptions = formOptionsToListOptions.reduce((currentOptions, formOption) => {
                if (!formOption.name) {
                    throw new Error('All options set in "form_options_to_list_options" must define name!');
                }
                currentOptions[formOption.name] = formInspector.options[formOption.name];
                return currentOptions;
            }, {});
            const typeOptions = types ? { types } : undefined;
            const listOptions = Object.assign(Object.assign(Object.assign({}, this.requestOptions), formListOptions), typeOptions);
            const detailOptions = Object.assign(Object.assign({}, this.requestOptions), typeDetailOptions);
            return (<SingleSelection_1.default adapter={adapter} allowDeselectForDisabledItems={!!allowDeselectForDisabledItems} detailOptions={detailOptions} disabled={!!disabled} disabledIds={resourceKey === formInspector.resourceKey && formInspector.id ? [formInspector.id] : []} displayProperties={displayProperties} emptyText={(0, Translator_1.translate)(emptyText)} icon={icon} itemDisabledCondition={itemDisabledCondition} listKey={listKey || resourceKey} listOptions={listOptions} locale={this.locale} onChange={this.handleChange} onItemClick={this.viewName && this.resultToView && this.handleItemClick} overlayTitle={(0, Translator_1.translate)(overlayTitle)} resourceKey={resourceKey} value={this.value}/>);
        }
        renderSingleSelect() {
            const { disabled, fieldTypeOptions: { resource_key: resourceKey, types: { single_select: { display_property: displayProperty, id_property: idProperty, overlay_title: overlayTitle, } = {}, }, }, schemaOptions: { editable: { value: editable, } = {}, } = {}, } = this.props;
            if (typeof displayProperty !== 'string') {
                throw new Error('The "display_property" field-type option must be a string!');
            }
            if (typeof idProperty !== 'string') {
                throw new Error('The "id_property" field-type option must be a string!');
            }
            return (<ResourceSingleSelect_1.default disabled={!!disabled} displayProperty={displayProperty} editable={!!editable} idProperty={idProperty} onChange={this.handleChange} overlayTitle={(0, Translator_1.translate)(overlayTitle)} resourceKey={resourceKey} value={this.value}/>);
        }
        renderAutoComplete() {
            const { disabled, dataPath, fieldTypeOptions, formInspector, schemaOptions: { data_path_to_auto_complete: { value: unvalidatedDataPathToAutoComplete = [], } = {}, }, } = this.props;
            if (!fieldTypeOptions.types.auto_complete) {
                throw new Error('The single_selection field needs an "auto_complete" type if rendered as SingleAutoComplete');
            }
            const { types: { auto_complete: { display_property: displayProperty, search_properties: searchProperties, }, }, } = fieldTypeOptions;
            if (!(0, mobx_1.isArrayLike)(unvalidatedDataPathToAutoComplete)) {
                throw new Error('The "data_path_to_auto_complete" schemaOption must be an array!');
            }
            const dataPathToAutoComplete = unvalidatedDataPathToAutoComplete;
            if (dataPathToAutoComplete.length > 0) {
                // @deprecated
                loglevel_1.default.warn('The "data_path_to_auto_complete" option is deprecated since version 2.2 and will be removed. ' +
                    'Use the "resource_store_properties_to_request" option instead.');
            }
            const options = Object.assign(Object.assign({}, dataPathToAutoComplete.reduce((options, schemaEntry) => {
                const { name, value } = schemaEntry;
                if (typeof name !== 'string' || typeof value !== 'string') {
                    throw new Error('An entry of the "data_path_to_auto_complete" schemaOption must provide strings for their ' +
                        'name and value');
                }
                options[value] = formInspector.getValueByPath('/' + name);
                return options;
            }, {})), this.requestOptions);
            if (!this.autoCompleteSelectionStore) {
                throw new Error('The SelectionStore has not been initialized! This should not happen and is likely a bug.');
            }
            return (<SingleAutoComplete_1.default disabled={!!disabled} displayProperty={displayProperty} id={dataPath} options={options} searchProperties={searchProperties} selectionStore={this.autoCompleteSelectionStore}/>);
        }
    };
    __setFunctionName(_classThis, "SingleSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _requestOptions_decorators = [mobx_1.observable];
        _get_value_decorators = [mobx_1.computed];
        _get_type_decorators = [mobx_1.computed];
        _get_locale_decorators = [mobx_1.computed];
        _get_viewName_decorators = [mobx_1.computed];
        _get_resultToView_decorators = [mobx_1.computed];
        _get_useDeprecatedObjectDataFormat_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_locale_decorators, { kind: "getter", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_viewName_decorators, { kind: "getter", name: "viewName", static: false, private: false, access: { has: obj => "viewName" in obj, get: obj => obj.viewName }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resultToView_decorators, { kind: "getter", name: "resultToView", static: false, private: false, access: { has: obj => "resultToView" in obj, get: obj => obj.resultToView }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_useDeprecatedObjectDataFormat_decorators, { kind: "getter", name: "useDeprecatedObjectDataFormat", static: false, private: false, access: { has: obj => "useDeprecatedObjectDataFormat" in obj, get: obj => obj.useDeprecatedObjectDataFormat }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _requestOptions_decorators, { kind: "field", name: "requestOptions", static: false, private: false, access: { has: obj => "requestOptions" in obj, get: obj => obj.requestOptions, set: (obj, value) => { obj.requestOptions = value; } }, metadata: _metadata }, _requestOptions_initializers, _requestOptions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleSelection = _classThis;
})();
exports.default = SingleSelection;
