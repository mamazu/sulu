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
const loglevel_1 = __importDefault(require("loglevel"));
const mobx_1 = require("mobx");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const router_1 = __importDefault(require("fos-jsrouting/router"));
const utils_1 = require("../../../utils");
const services_1 = require("../../../services");
const AbstractListToolbarAction_1 = __importDefault(require("./AbstractListToolbarAction"));
const defaultOptions = {
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
};
let UploadToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractListToolbarAction_1.default;
    let _instanceExtraInitializers = [];
    let _dropzoneRef_decorators;
    let _dropzoneRef_initializers = [];
    let _dropzoneRef_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _setDropzoneRef_decorators;
    let _setDropzoneRef_initializers = [];
    let _setDropzoneRef_extraInitializers = [];
    let _handleClick_decorators;
    let _handleClick_initializers = [];
    let _handleClick_extraInitializers = [];
    let _removeError_decorators;
    let _removeError_initializers = [];
    let _removeError_extraInitializers = [];
    let _addError_decorators;
    let _addError_initializers = [];
    let _addError_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _get_label_decorators;
    let _get_icon_decorators;
    let _get_url_decorators;
    let _get_errorCodeMapping_decorators;
    let _get_requestParameters_decorators;
    let _get_accept_decorators;
    let _get_minSize_decorators;
    let _get_maxSize_decorators;
    let _get_multiple_decorators;
    let _get_maxFiles_decorators;
    let _get_requestPropertyName_decorators;
    return _a = class UploadToolbarAction extends _classSuper {
            constructor(listStore, list, router, locales, resourceStore, options) {
                if (options.routeName) {
                    // @deprecated
                    loglevel_1.default.warn('The "routeName" option is deprecated and will be removed. ' +
                        'Use the "route_name" option instead.');
                    if (!options.route_name) {
                        options.route_name = options.routeName;
                    }
                }
                if (options.minSize) {
                    // @deprecated
                    loglevel_1.default.warn('The "minSize" option is deprecated and will be removed. ' +
                        'Use the "min_size" option instead.');
                    if (!options.min_size) {
                        options.min_size = options.minSize;
                    }
                }
                if (options.maxSize) {
                    // @deprecated
                    loglevel_1.default.warn('The "maxSize" option is deprecated and will be removed. ' +
                        'Use the "max_size" option instead.');
                    if (!options.max_size) {
                        options.max_size = options.maxSize;
                    }
                }
                if (options.requestPropertyName) {
                    // @deprecated
                    loglevel_1.default.warn('The "requestPropertyName" option is deprecated and will be removed. ' +
                        'Use the "request_property_name" option instead.');
                    if (!options.request_property_name) {
                        options.request_property_name = options.requestPropertyName;
                    }
                }
                if (options.requestParameters) {
                    // @deprecated
                    loglevel_1.default.warn('The "requestParameters" option is deprecated and will be removed. ' +
                        'Use the "request_parameters" option instead.');
                    if (!options.request_parameters) {
                        options.request_parameters = options.requestParameters;
                    }
                }
                if (options.routerAttributesToRequest) {
                    // @deprecated
                    loglevel_1.default.warn('The "routerAttributesToRequest" option is deprecated and will be removed. ' +
                        'Use the "router_attributes_to_request" option instead.');
                    if (!options.router_attributes_to_request) {
                        options.router_attributes_to_request = options.routerAttributesToRequest;
                    }
                }
                if (options.errorCodeMapping) {
                    // @deprecated
                    loglevel_1.default.warn('The "errorCodeMapping" option is deprecated and will be removed. ' +
                        'The API should return a specific error message in the "detail" property of the response instead.');
                }
                super(listStore, list, router, locales, resourceStore, options);
                this.dropzoneRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _dropzoneRef_initializers, void 0));
                this.errors = (__runInitializers(this, _dropzoneRef_extraInitializers), __runInitializers(this, _errors_initializers, []));
                this.setDropzoneRef = (__runInitializers(this, _errors_extraInitializers), __runInitializers(this, _setDropzoneRef_initializers, (ref) => {
                    this.dropzoneRef = ref;
                }));
                this.handleClick = (__runInitializers(this, _setDropzoneRef_extraInitializers), __runInitializers(this, _handleClick_initializers, () => {
                    const { dropzoneRef } = this;
                    if (dropzoneRef) {
                        dropzoneRef.open();
                        this.removeErrors();
                    }
                }));
                this.removeErrors = (__runInitializers(this, _handleClick_extraInitializers), () => {
                    for (const error of this.errors) {
                        this.removeError(error);
                    }
                });
                this.removeError = __runInitializers(this, _removeError_initializers, (errorToRemove) => {
                    this.errors = this.errors.filter((existingError) => errorToRemove !== existingError);
                    this.list.errors = this.list.errors.filter((existingError) => errorToRemove !== existingError);
                });
                this.addError = (__runInitializers(this, _removeError_extraInitializers), __runInitializers(this, _addError_initializers, (error) => {
                    this.removeError(error);
                    this.errors = [...this.errors, error];
                    this.list.errors = [...this.list.errors, error];
                }));
                this.handleError = (__runInitializers(this, _addError_extraInitializers), (fileRejections) => {
                    for (const fileRejection of fileRejections) {
                        for (const { code } of fileRejection.errors) {
                            let error;
                            switch (code) {
                                case 'file-invalid-type':
                                    error = (0, utils_1.translate)('sulu_admin.dropzone_error_file-invalid-type', {
                                        fileName: fileRejection.file.name,
                                        allowedTypes: this.accept ? Object.keys(this.accept).join(', ') : undefined,
                                    });
                                    break;
                                case 'file-too-large':
                                    error = (0, utils_1.translate)('sulu_admin.dropzone_error_file-too-large', {
                                        fileName: fileRejection.file.name,
                                        maxSize: this.maxSize ? (0, utils_1.transformBytesToReadableString)(this.maxSize) : undefined,
                                    });
                                    break;
                                case 'file-too-small':
                                    error = (0, utils_1.translate)('sulu_admin.dropzone_error_file-too-small', {
                                        fileName: fileRejection.file.name,
                                        minSize: this.minSize ? (0, utils_1.transformBytesToReadableString)(this.minSize) : undefined,
                                    });
                                    break;
                                case 'too-many-files':
                                    error = (0, utils_1.translate)('sulu_admin.dropzone_error_too-many-files', {
                                        fileName: fileRejection.file.name,
                                        maxFiles: this.maxFiles,
                                    });
                                    break;
                                default:
                                    error = (0, utils_1.translate)('sulu_admin.unexpected_upload_error', {
                                        fileName: fileRejection.file.name,
                                    });
                            }
                            this.addError(error);
                        }
                    }
                });
                this.handleConfirm = __runInitializers(this, _handleConfirm_initializers, (files) => {
                    const { multiple, requestPropertyName } = this;
                    const formData = new FormData();
                    for (const file of files) {
                        if (!multiple) {
                            formData.append(requestPropertyName, file);
                            break;
                        }
                        formData.append(requestPropertyName + '[]', file);
                    }
                    services_1.Requester.fetch(this.url, Object.assign(Object.assign({}, defaultOptions), { method: 'POST', body: formData })).then((response) => {
                        if (!response.ok) {
                            const translatedErrorMessage = (0, utils_1.translate)(this.errorCodeMapping[response.status] || 'sulu_admin.unexpected_upload_error', { statusText: response.statusText });
                            response.json().then((error) => {
                                this.addError(error.detail || error.title || translatedErrorMessage);
                            }).catch(() => {
                                this.addError(translatedErrorMessage);
                            });
                            return;
                        }
                        this.listStore.reload();
                    });
                });
                __runInitializers(this, _handleConfirm_extraInitializers);
            }
            get label() {
                const { label = 'sulu_admin.upload' } = this.options;
                if (typeof label !== 'string') {
                    throw new Error('The "label" option must be a string!');
                }
                return (0, utils_1.translate)(label);
            }
            get icon() {
                const { icon = 'su-upload' } = this.options;
                if (typeof icon !== 'string') {
                    throw new Error('The "icon" option must be a string!');
                }
                return icon;
            }
            get url() {
                const { route_name: routeName } = this.options;
                if (typeof routeName !== 'string') {
                    throw new Error('The "route_name" option must be a string!');
                }
                return router_1.default.generate(routeName, this.requestParameters);
            }
            get errorCodeMapping() {
                const { errorCodeMapping = {} } = this.options;
                if (typeof errorCodeMapping !== 'object') {
                    throw new Error('The "errorCodeMapping" option must be an object!');
                }
                return errorCodeMapping;
            }
            get requestParameters() {
                const { options: { request_parameters: attributesToRequest = {}, router_attributes_to_request: routerAttributesToRequest = {}, }, router: { attributes: routerAttributes, }, } = this;
                if (!attributesToRequest || typeof attributesToRequest !== 'object') {
                    throw new Error('The "request_parameters" option must be an object!');
                }
                if (!routerAttributesToRequest || typeof routerAttributesToRequest !== 'object') {
                    throw new Error('The "router_attributes_to_request" option must be an object!');
                }
                const requestParameters = {};
                Object.keys(routerAttributesToRequest)
                    .forEach((routerAttributeKey) => {
                    const requestAttributeKey = routerAttributesToRequest[routerAttributeKey];
                    if (typeof requestAttributeKey !== 'string') {
                        throw new Error('The "routerAttributesToRequest" option must contain strings!');
                    }
                    const attributeName = isNaN(routerAttributeKey)
                        ? routerAttributeKey
                        : requestAttributeKey;
                    requestParameters[requestAttributeKey] = routerAttributes[attributeName];
                });
                return Object.assign(Object.assign({}, requestParameters), attributesToRequest);
            }
            get accept() {
                const { accept } = this.options;
                if (accept === undefined || accept === null) {
                    return undefined;
                }
                if (!(0, mobx_1.isArrayLike)(accept)) {
                    throw new Error('The "accept" option must be an array!');
                }
                if (accept.length === 0) {
                    return undefined;
                }
                const dropzoneObjectOption = {};
                accept.forEach((type) => {
                    dropzoneObjectOption[type] = [];
                });
                return dropzoneObjectOption;
            }
            get minSize() {
                const { min_size: minSize } = this.options;
                if (minSize === undefined || minSize === null) {
                    return undefined;
                }
                if (typeof minSize !== 'number') {
                    throw new Error('The "min_size" option must be a number!');
                }
                return minSize;
            }
            get maxSize() {
                const { max_size: maxSize } = this.options;
                if (maxSize === undefined || maxSize === null) {
                    return undefined;
                }
                if (typeof maxSize !== 'number') {
                    throw new Error('The "max_size" option must be a number!');
                }
                return maxSize;
            }
            get multiple() {
                const { multiple = false } = this.options;
                if (typeof multiple !== 'boolean') {
                    throw new Error('The "multiple" option must be a boolean!');
                }
                return multiple;
            }
            get maxFiles() {
                return this.multiple ? undefined : 1;
            }
            get requestPropertyName() {
                const { request_property_name: requestPropertyName } = this.options;
                if (!requestPropertyName) {
                    return this.multiple ? 'files' : 'file';
                }
                if (typeof requestPropertyName !== 'string') {
                    throw new Error('The "request_property_name" option must be a string!');
                }
                return requestPropertyName;
            }
            getToolbarItemConfig() {
                return {
                    type: 'button',
                    label: this.label,
                    icon: this.icon,
                    onClick: this.handleClick,
                };
            }
            getNode() {
                return (<react_dropzone_1.default accept={this.accept} key="sulu_admin.upload" maxFiles={this.maxFiles} maxSize={this.maxSize} minSize={this.minSize} multiple={this.multiple} noClick={true} noDrag={true} noKeyboard={true} onDropAccepted={this.handleConfirm} onDropRejected={this.handleError} ref={this.setDropzoneRef}>
                {({ getRootProps, getInputProps }) => {
                        return (<div {...getRootProps()}>
                            <input {...getInputProps()}/>
                        </div>);
                    }}
            </react_dropzone_1.default>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dropzoneRef_decorators = [mobx_1.observable];
            _errors_decorators = [mobx_1.observable];
            _setDropzoneRef_decorators = [mobx_1.action];
            _handleClick_decorators = [mobx_1.action];
            _removeError_decorators = [mobx_1.action];
            _addError_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            _get_label_decorators = [mobx_1.computed];
            _get_icon_decorators = [mobx_1.computed];
            _get_url_decorators = [mobx_1.computed];
            _get_errorCodeMapping_decorators = [mobx_1.computed];
            _get_requestParameters_decorators = [mobx_1.computed];
            _get_accept_decorators = [mobx_1.computed];
            _get_minSize_decorators = [mobx_1.computed];
            _get_maxSize_decorators = [mobx_1.computed];
            _get_multiple_decorators = [mobx_1.computed];
            _get_maxFiles_decorators = [mobx_1.computed];
            _get_requestPropertyName_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_label_decorators, { kind: "getter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_icon_decorators, { kind: "getter", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_url_decorators, { kind: "getter", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_errorCodeMapping_decorators, { kind: "getter", name: "errorCodeMapping", static: false, private: false, access: { has: obj => "errorCodeMapping" in obj, get: obj => obj.errorCodeMapping }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_requestParameters_decorators, { kind: "getter", name: "requestParameters", static: false, private: false, access: { has: obj => "requestParameters" in obj, get: obj => obj.requestParameters }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_accept_decorators, { kind: "getter", name: "accept", static: false, private: false, access: { has: obj => "accept" in obj, get: obj => obj.accept }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_minSize_decorators, { kind: "getter", name: "minSize", static: false, private: false, access: { has: obj => "minSize" in obj, get: obj => obj.minSize }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_maxSize_decorators, { kind: "getter", name: "maxSize", static: false, private: false, access: { has: obj => "maxSize" in obj, get: obj => obj.maxSize }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_multiple_decorators, { kind: "getter", name: "multiple", static: false, private: false, access: { has: obj => "multiple" in obj, get: obj => obj.multiple }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_maxFiles_decorators, { kind: "getter", name: "maxFiles", static: false, private: false, access: { has: obj => "maxFiles" in obj, get: obj => obj.maxFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_requestPropertyName_decorators, { kind: "getter", name: "requestPropertyName", static: false, private: false, access: { has: obj => "requestPropertyName" in obj, get: obj => obj.requestPropertyName }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _dropzoneRef_decorators, { kind: "field", name: "dropzoneRef", static: false, private: false, access: { has: obj => "dropzoneRef" in obj, get: obj => obj.dropzoneRef, set: (obj, value) => { obj.dropzoneRef = value; } }, metadata: _metadata }, _dropzoneRef_initializers, _dropzoneRef_extraInitializers);
            __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            __esDecorate(null, null, _setDropzoneRef_decorators, { kind: "field", name: "setDropzoneRef", static: false, private: false, access: { has: obj => "setDropzoneRef" in obj, get: obj => obj.setDropzoneRef, set: (obj, value) => { obj.setDropzoneRef = value; } }, metadata: _metadata }, _setDropzoneRef_initializers, _setDropzoneRef_extraInitializers);
            __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
            __esDecorate(null, null, _removeError_decorators, { kind: "field", name: "removeError", static: false, private: false, access: { has: obj => "removeError" in obj, get: obj => obj.removeError, set: (obj, value) => { obj.removeError = value; } }, metadata: _metadata }, _removeError_initializers, _removeError_extraInitializers);
            __esDecorate(null, null, _addError_decorators, { kind: "field", name: "addError", static: false, private: false, access: { has: obj => "addError" in obj, get: obj => obj.addError, set: (obj, value) => { obj.addError = value; } }, metadata: _metadata }, _addError_initializers, _addError_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = UploadToolbarAction;
