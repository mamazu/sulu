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
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const ruleOverlay_scss_1 = __importDefault(require("./ruleOverlay.scss"));
const ConditionList_1 = __importDefault(require("./ConditionList"));
const utils_2 = require("./utils");
let RuleOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _frequency_decorators;
    let _frequency_initializers = [];
    let _frequency_extraInitializers = [];
    let _conditions_decorators;
    let _conditions_initializers = [];
    let _conditions_extraInitializers = [];
    let _showTitleError_decorators;
    let _showTitleError_initializers = [];
    let _showTitleError_extraInitializers = [];
    let _showFrequencyError_decorators;
    let _showFrequencyError_initializers = [];
    let _showFrequencyError_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleTitleChange_decorators;
    let _handleTitleChange_initializers = [];
    let _handleTitleChange_extraInitializers = [];
    let _handleTitleBlur_decorators;
    let _handleTitleBlur_initializers = [];
    let _handleTitleBlur_extraInitializers = [];
    let _handleFrequencyChange_decorators;
    let _handleFrequencyChange_initializers = [];
    let _handleFrequencyChange_extraInitializers = [];
    let _handleConditionChange_decorators;
    let _handleConditionChange_initializers = [];
    let _handleConditionChange_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _validateTitle_decorators;
    let _validateTitle_initializers = [];
    let _validateTitle_extraInitializers = [];
    let _validateFrequency_decorators;
    let _validateFrequency_initializers = [];
    let _validateFrequency_extraInitializers = [];
    let _validate_decorators;
    let _validate_initializers = [];
    let _validate_extraInitializers = [];
    var RuleOverlay = _classThis = class extends _classSuper {
        componentDidUpdate(prevProps) {
            if (prevProps.open === false && this.props.open === true) {
                const { value } = this.props;
                this.showTitleError = false;
                this.showFrequencyError = false;
                if (value) {
                    this.title = value.title;
                    this.frequency = value.frequency;
                    this.conditions = value.conditions;
                }
                else {
                    this.title = undefined;
                    this.frequency = undefined;
                    this.conditions = undefined;
                }
            }
        }
        render() {
            const { onClose, open } = this.props;
            return (<components_1.Overlay confirmText={(0, utils_1.translate)('sulu_admin.ok')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={(0, utils_1.translate)('sulu_audience_targeting.configure_rule')}>
                <div className={ruleOverlay_scss_1.default.overlay}>
                    <components_1.Form>
                        <components_1.Form.Field error={this.showTitleError ? (0, utils_1.translate)('sulu_admin.error_required') : undefined} label={(0, utils_1.translate)('sulu_admin.title')} required={true}>
                            <components_1.Input onBlur={this.handleTitleBlur} onChange={this.handleTitleChange} value={this.title}/>
                        </components_1.Form.Field>
                        <components_1.Form.Field error={this.showFrequencyError ? (0, utils_1.translate)('sulu_admin.error_required') : undefined} label={(0, utils_1.translate)('sulu_audience_targeting.assigned_at')} required={true}>
                            <components_1.SingleSelect onChange={this.handleFrequencyChange} value={this.frequency}>
                                <components_1.SingleSelect.Option value={1}>
                                    {(0, utils_2.getFrequencyTranslation)(1)}
                                </components_1.SingleSelect.Option>
                                <components_1.SingleSelect.Option value={2}>
                                    {(0, utils_2.getFrequencyTranslation)(2)}
                                </components_1.SingleSelect.Option>
                                <components_1.SingleSelect.Option value={3}>
                                    {(0, utils_2.getFrequencyTranslation)(3)}
                                </components_1.SingleSelect.Option>
                            </components_1.SingleSelect>
                        </components_1.Form.Field>
                        <components_1.Form.Field description={(0, utils_1.translate)('sulu_audience_targeting.conditions_info_text')} label={(0, utils_1.translate)('sulu_audience_targeting.conditions')}>
                            <ConditionList_1.default onChange={this.handleConditionChange} value={this.conditions || []}/>
                        </components_1.Form.Field>
                    </components_1.Form>
                </div>
            </components_1.Overlay>);
        }
        constructor() {
            super(...arguments);
            this.title = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _title_initializers, undefined));
            this.frequency = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _frequency_initializers, undefined));
            this.conditions = (__runInitializers(this, _frequency_extraInitializers), __runInitializers(this, _conditions_initializers, undefined));
            this.showTitleError = (__runInitializers(this, _conditions_extraInitializers), __runInitializers(this, _showTitleError_initializers, false));
            this.showFrequencyError = (__runInitializers(this, _showTitleError_extraInitializers), __runInitializers(this, _showFrequencyError_initializers, false));
            this.handleTitleChange = (__runInitializers(this, _showFrequencyError_extraInitializers), __runInitializers(this, _handleTitleChange_initializers, (title) => {
                this.title = title;
            }));
            this.handleTitleBlur = (__runInitializers(this, _handleTitleChange_extraInitializers), __runInitializers(this, _handleTitleBlur_initializers, () => {
                this.validateTitle();
            }));
            this.handleFrequencyChange = (__runInitializers(this, _handleTitleBlur_extraInitializers), __runInitializers(this, _handleFrequencyChange_initializers, (frequency) => {
                this.frequency = frequency;
                this.validateFrequency();
            }));
            this.handleConditionChange = (__runInitializers(this, _handleFrequencyChange_extraInitializers), __runInitializers(this, _handleConditionChange_initializers, (conditions) => {
                this.conditions = conditions;
            }));
            this.handleConfirm = (__runInitializers(this, _handleConditionChange_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                if (!this.validate() || !this.title || !this.frequency) {
                    return;
                }
                const { onConfirm } = this.props;
                onConfirm({
                    conditions: this.conditions || [],
                    frequency: this.frequency,
                    title: this.title,
                });
            }));
            this.validateTitle = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _validateTitle_initializers, () => {
                this.showTitleError = !this.title;
            }));
            this.validateFrequency = (__runInitializers(this, _validateTitle_extraInitializers), __runInitializers(this, _validateFrequency_initializers, () => {
                this.showFrequencyError = !this.frequency;
            }));
            this.validate = (__runInitializers(this, _validateFrequency_extraInitializers), __runInitializers(this, _validate_initializers, () => {
                this.validateTitle();
                this.validateFrequency();
                return !this.showTitleError && !this.showFrequencyError;
            }));
            __runInitializers(this, _validate_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "RuleOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _title_decorators = [mobx_1.observable];
        _frequency_decorators = [mobx_1.observable];
        _conditions_decorators = [mobx_1.observable];
        _showTitleError_decorators = [mobx_1.observable];
        _showFrequencyError_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleTitleChange_decorators = [mobx_1.action];
        _handleTitleBlur_decorators = [mobx_1.action];
        _handleFrequencyChange_decorators = [mobx_1.action];
        _handleConditionChange_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _validateTitle_decorators = [mobx_1.action];
        _validateFrequency_decorators = [mobx_1.action];
        _validate_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _frequency_decorators, { kind: "field", name: "frequency", static: false, private: false, access: { has: obj => "frequency" in obj, get: obj => obj.frequency, set: (obj, value) => { obj.frequency = value; } }, metadata: _metadata }, _frequency_initializers, _frequency_extraInitializers);
        __esDecorate(null, null, _conditions_decorators, { kind: "field", name: "conditions", static: false, private: false, access: { has: obj => "conditions" in obj, get: obj => obj.conditions, set: (obj, value) => { obj.conditions = value; } }, metadata: _metadata }, _conditions_initializers, _conditions_extraInitializers);
        __esDecorate(null, null, _showTitleError_decorators, { kind: "field", name: "showTitleError", static: false, private: false, access: { has: obj => "showTitleError" in obj, get: obj => obj.showTitleError, set: (obj, value) => { obj.showTitleError = value; } }, metadata: _metadata }, _showTitleError_initializers, _showTitleError_extraInitializers);
        __esDecorate(null, null, _showFrequencyError_decorators, { kind: "field", name: "showFrequencyError", static: false, private: false, access: { has: obj => "showFrequencyError" in obj, get: obj => obj.showFrequencyError, set: (obj, value) => { obj.showFrequencyError = value; } }, metadata: _metadata }, _showFrequencyError_initializers, _showFrequencyError_extraInitializers);
        __esDecorate(null, null, _handleTitleChange_decorators, { kind: "field", name: "handleTitleChange", static: false, private: false, access: { has: obj => "handleTitleChange" in obj, get: obj => obj.handleTitleChange, set: (obj, value) => { obj.handleTitleChange = value; } }, metadata: _metadata }, _handleTitleChange_initializers, _handleTitleChange_extraInitializers);
        __esDecorate(null, null, _handleTitleBlur_decorators, { kind: "field", name: "handleTitleBlur", static: false, private: false, access: { has: obj => "handleTitleBlur" in obj, get: obj => obj.handleTitleBlur, set: (obj, value) => { obj.handleTitleBlur = value; } }, metadata: _metadata }, _handleTitleBlur_initializers, _handleTitleBlur_extraInitializers);
        __esDecorate(null, null, _handleFrequencyChange_decorators, { kind: "field", name: "handleFrequencyChange", static: false, private: false, access: { has: obj => "handleFrequencyChange" in obj, get: obj => obj.handleFrequencyChange, set: (obj, value) => { obj.handleFrequencyChange = value; } }, metadata: _metadata }, _handleFrequencyChange_initializers, _handleFrequencyChange_extraInitializers);
        __esDecorate(null, null, _handleConditionChange_decorators, { kind: "field", name: "handleConditionChange", static: false, private: false, access: { has: obj => "handleConditionChange" in obj, get: obj => obj.handleConditionChange, set: (obj, value) => { obj.handleConditionChange = value; } }, metadata: _metadata }, _handleConditionChange_initializers, _handleConditionChange_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _validateTitle_decorators, { kind: "field", name: "validateTitle", static: false, private: false, access: { has: obj => "validateTitle" in obj, get: obj => obj.validateTitle, set: (obj, value) => { obj.validateTitle = value; } }, metadata: _metadata }, _validateTitle_initializers, _validateTitle_extraInitializers);
        __esDecorate(null, null, _validateFrequency_decorators, { kind: "field", name: "validateFrequency", static: false, private: false, access: { has: obj => "validateFrequency" in obj, get: obj => obj.validateFrequency, set: (obj, value) => { obj.validateFrequency = value; } }, metadata: _metadata }, _validateFrequency_initializers, _validateFrequency_extraInitializers);
        __esDecorate(null, null, _validate_decorators, { kind: "field", name: "validate", static: false, private: false, access: { has: obj => "validate" in obj, get: obj => obj.validate, set: (obj, value) => { obj.validate = value; } }, metadata: _metadata }, _validate_initializers, _validate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RuleOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RuleOverlay = _classThis;
})();
exports.default = RuleOverlay;
