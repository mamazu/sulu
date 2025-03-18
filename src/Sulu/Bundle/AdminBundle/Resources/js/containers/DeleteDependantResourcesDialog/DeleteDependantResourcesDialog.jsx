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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const ProgressBar_1 = __importDefault(require("../../components/ProgressBar"));
const ResourceRequester_1 = __importDefault(require("../../services/ResourceRequester"));
const utils_1 = require("../../utils");
const deleteDependantResourcesDialogStyles_scss_1 = __importDefault(require("./deleteDependantResourcesDialogStyles.scss"));
let DeleteDependantResourcesDialog = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inProgress_decorators;
    let _inProgress_initializers = [];
    let _inProgress_extraInitializers = [];
    let _finished_decorators;
    let _finished_initializers = [];
    let _finished_extraInitializers = [];
    let _showSnackbar_decorators;
    let _showSnackbar_initializers = [];
    let _showSnackbar_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _closed_decorators;
    let _closed_initializers = [];
    let _closed_extraInitializers = [];
    let _totalDeletedResources_decorators;
    let _totalDeletedResources_initializers = [];
    let _totalDeletedResources_extraInitializers = [];
    let _get_title_decorators;
    let _get_detail_decorators;
    let _get_dependantResourceBatches_decorators;
    let _get_dependantResourcesCount_decorators;
    let _componentDidUpdate_decorators;
    let _get_errored_decorators;
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleSnackbarCloseClick_decorators;
    let _handleSnackbarCloseClick_initializers = [];
    let _handleSnackbarCloseClick_extraInitializers = [];
    let _get_snackbarType_decorators;
    let _get_snackbarMessage_decorators;
    var DeleteDependantResourcesDialog = _classThis = class extends _classSuper {
        get title() {
            return this.props.dependantResourcesData.title;
        }
        get detail() {
            return this.props.dependantResourcesData.detail;
        }
        get dependantResourceBatches() {
            return this.props.dependantResourcesData.dependantResourceBatches;
        }
        get dependantResourcesCount() {
            return this.props.dependantResourcesData.dependantResourcesCount;
        }
        componentDidUpdate(prevProps) {
            if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(prevProps.dependantResourcesData), (0, mobx_1.toJS)(this.props.dependantResourcesData))
                || !(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(prevProps.requestOptions), (0, mobx_1.toJS)(this.props.requestOptions))) {
                this.inProgress = false;
                this.finished = false;
                this.showSnackbar = true;
                this.error = undefined;
                this.closed = false;
                this.totalDeletedResources = 0;
                this.promises = [];
            }
        }
        get errored() {
            return !!this.error;
        }
        get snackbarType() {
            if (this.showSnackbar && this.errored) {
                return 'error';
            }
            return undefined;
        }
        get snackbarMessage() {
            if (this.snackbarType === 'error' && this.error) {
                return this.error;
            }
            return undefined;
        }
        render() {
            return (<Dialog_1.default cancelText={this.errored || this.finished
                    ? (0, utils_1.translate)('sulu_admin.close')
                    : (0, utils_1.translate)('sulu_admin.cancel')} confirmDisabled={this.errored || this.finished} confirmLoading={this.inProgress} confirmText={(0, utils_1.translate)('sulu_admin.delete')} onCancel={this.handleCancel} onConfirm={this.handleConfirm} onSnackbarCloseClick={this.handleSnackbarCloseClick} open={!this.closed} snackbarMessage={this.snackbarMessage} snackbarType={this.snackbarType} title={this.title}>
                {!this.inProgress && !this.finished && !this.errored && (<p>
                        {this.detail}
                    </p>)}

                {(this.inProgress || this.finished || this.errored) && (<react_1.default.Fragment>
                        <div className={deleteDependantResourcesDialogStyles_scss_1.default.progressBar}>
                            <ProgressBar_1.default max={this.dependantResourcesCount} skin={this.errored
                        ? 'error'
                        : this.finished
                            ? 'success'
                            : 'progress'} value={this.errored
                        ? this.totalDeletedResources + 1
                        : this.totalDeletedResources}/>
                        </div>

                        <p>
                            {(0, utils_1.translate)('sulu_admin.delete_dependants_progress_text', {
                        count: `${this.totalDeletedResources}/${this.dependantResourcesCount}`,
                    })}
                        </p>
                    </react_1.default.Fragment>)}
            </Dialog_1.default>);
        }
        constructor() {
            super(...arguments);
            this.inProgress = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inProgress_initializers, false));
            this.finished = (__runInitializers(this, _inProgress_extraInitializers), __runInitializers(this, _finished_initializers, false));
            this.showSnackbar = (__runInitializers(this, _finished_extraInitializers), __runInitializers(this, _showSnackbar_initializers, true));
            this.error = (__runInitializers(this, _showSnackbar_extraInitializers), __runInitializers(this, _error_initializers, undefined));
            this.closed = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _closed_initializers, false));
            this.totalDeletedResources = (__runInitializers(this, _closed_extraInitializers), __runInitializers(this, _totalDeletedResources_initializers, 0));
            this.promises = (__runInitializers(this, _totalDeletedResources_extraInitializers), []);
            this.handleConfirm = __runInitializers(this, _handleConfirm_initializers, () => {
                const { onFinish, onError } = this.props;
                this.inProgress = true;
                this.deleteResourceBatches(this.dependantResourceBatches)
                    .then((0, mobx_1.action)(() => {
                    this.inProgress = false;
                    this.finished = true;
                    if (!onFinish) {
                        return;
                    }
                    onFinish();
                }))
                    .catch((errorResponse) => {
                    errorResponse.json().then((0, mobx_1.action)((error) => {
                        this.inProgress = false;
                        this.error = error.detail || error.title || (0, utils_1.translate)('sulu_admin.unexpected_delete_server_error');
                        if (!onError) {
                            return;
                        }
                        onError(error);
                    }));
                });
            });
            this.deleteResourceBatches = (__runInitializers(this, _handleConfirm_extraInitializers), (batchedResources) => {
                const { requestOptions } = this.props;
                if (batchedResources.length === 0) {
                    return Promise.resolve();
                }
                const [currentBatch, ...remainingBatches] = batchedResources;
                currentBatch.forEach((resource) => {
                    const promise = ResourceRequester_1.default.delete(resource.resourceKey, Object.assign(Object.assign({}, requestOptions), { id: resource.id }));
                    promise
                        .then((0, mobx_1.action)(() => {
                        this.totalDeletedResources++;
                    }))
                        .catch(() => {
                        // Ignore exception here, because it is being caught in `handleConfirm`
                        // This just prevents an `Uncaught (in promise)` exception to be thrown
                    });
                    this.promises.push(promise);
                });
                return Promise.all(this.promises)
                    .then(() => {
                    this.promises.splice(0, this.promises.length);
                    if (!this.inProgress) {
                        // do not delete next batch if user cancelled the dialog during the previous batch
                        return;
                    }
                    return this.deleteResourceBatches(remainingBatches);
                });
            });
            this.handleCancel = __runInitializers(this, _handleCancel_initializers, () => {
                const { onCancel } = this.props;
                if (this.inProgress) {
                    this.inProgress = false;
                    this.promises.forEach((promise) => {
                        promise.abort();
                    });
                }
                this.closed = true;
                if (!onCancel) {
                    return;
                }
                onCancel();
            });
            this.handleSnackbarCloseClick = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleSnackbarCloseClick_initializers, () => {
                this.showSnackbar = false;
            }));
            __runInitializers(this, _handleSnackbarCloseClick_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DeleteDependantResourcesDialog");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inProgress_decorators = [mobx_1.observable];
        _finished_decorators = [mobx_1.observable];
        _showSnackbar_decorators = [mobx_1.observable];
        _error_decorators = [mobx_1.observable];
        _closed_decorators = [mobx_1.observable];
        _totalDeletedResources_decorators = [mobx_1.observable];
        _get_title_decorators = [mobx_1.computed];
        _get_detail_decorators = [mobx_1.computed];
        _get_dependantResourceBatches_decorators = [mobx_1.computed];
        _get_dependantResourcesCount_decorators = [mobx_1.computed];
        _componentDidUpdate_decorators = [mobx_1.action];
        _get_errored_decorators = [mobx_1.computed];
        _handleConfirm_decorators = [mobx_1.action];
        _handleCancel_decorators = [mobx_1.action];
        _handleSnackbarCloseClick_decorators = [mobx_1.action];
        _get_snackbarType_decorators = [mobx_1.computed];
        _get_snackbarMessage_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_title_decorators, { kind: "getter", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_detail_decorators, { kind: "getter", name: "detail", static: false, private: false, access: { has: obj => "detail" in obj, get: obj => obj.detail }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_dependantResourceBatches_decorators, { kind: "getter", name: "dependantResourceBatches", static: false, private: false, access: { has: obj => "dependantResourceBatches" in obj, get: obj => obj.dependantResourceBatches }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_dependantResourcesCount_decorators, { kind: "getter", name: "dependantResourcesCount", static: false, private: false, access: { has: obj => "dependantResourcesCount" in obj, get: obj => obj.dependantResourcesCount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_errored_decorators, { kind: "getter", name: "errored", static: false, private: false, access: { has: obj => "errored" in obj, get: obj => obj.errored }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_snackbarType_decorators, { kind: "getter", name: "snackbarType", static: false, private: false, access: { has: obj => "snackbarType" in obj, get: obj => obj.snackbarType }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_snackbarMessage_decorators, { kind: "getter", name: "snackbarMessage", static: false, private: false, access: { has: obj => "snackbarMessage" in obj, get: obj => obj.snackbarMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inProgress_decorators, { kind: "field", name: "inProgress", static: false, private: false, access: { has: obj => "inProgress" in obj, get: obj => obj.inProgress, set: (obj, value) => { obj.inProgress = value; } }, metadata: _metadata }, _inProgress_initializers, _inProgress_extraInitializers);
        __esDecorate(null, null, _finished_decorators, { kind: "field", name: "finished", static: false, private: false, access: { has: obj => "finished" in obj, get: obj => obj.finished, set: (obj, value) => { obj.finished = value; } }, metadata: _metadata }, _finished_initializers, _finished_extraInitializers);
        __esDecorate(null, null, _showSnackbar_decorators, { kind: "field", name: "showSnackbar", static: false, private: false, access: { has: obj => "showSnackbar" in obj, get: obj => obj.showSnackbar, set: (obj, value) => { obj.showSnackbar = value; } }, metadata: _metadata }, _showSnackbar_initializers, _showSnackbar_extraInitializers);
        __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
        __esDecorate(null, null, _closed_decorators, { kind: "field", name: "closed", static: false, private: false, access: { has: obj => "closed" in obj, get: obj => obj.closed, set: (obj, value) => { obj.closed = value; } }, metadata: _metadata }, _closed_initializers, _closed_extraInitializers);
        __esDecorate(null, null, _totalDeletedResources_decorators, { kind: "field", name: "totalDeletedResources", static: false, private: false, access: { has: obj => "totalDeletedResources" in obj, get: obj => obj.totalDeletedResources, set: (obj, value) => { obj.totalDeletedResources = value; } }, metadata: _metadata }, _totalDeletedResources_initializers, _totalDeletedResources_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
        __esDecorate(null, null, _handleSnackbarCloseClick_decorators, { kind: "field", name: "handleSnackbarCloseClick", static: false, private: false, access: { has: obj => "handleSnackbarCloseClick" in obj, get: obj => obj.handleSnackbarCloseClick, set: (obj, value) => { obj.handleSnackbarCloseClick = value; } }, metadata: _metadata }, _handleSnackbarCloseClick_initializers, _handleSnackbarCloseClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeleteDependantResourcesDialog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeleteDependantResourcesDialog = _classThis;
})();
exports.default = DeleteDependantResourcesDialog;
