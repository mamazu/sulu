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
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const Form_1 = __importDefault(require("../../components/Form"));
const SingleSelect_1 = __importDefault(require("../../components/SingleSelect"));
const Translator_1 = require("../../utils/Translator");
let MissingTypeDialog = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _selectedType_decorators;
    let _selectedType_initializers = [];
    let _selectedType_extraInitializers = [];
    let _handleTypeChange_decorators;
    let _handleTypeChange_initializers = [];
    let _handleTypeChange_extraInitializers = [];
    var MissingTypeDialog = _classThis = class extends _classSuper {
        render() {
            const { open, types, } = this.props;
            return (<Dialog_1.default align="left" cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmDisabled={!this.selectedType} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} onCancel={this.handleCancel} onConfirm={this.handleConfirm} open={open} title={(0, Translator_1.translate)('sulu_admin.missing_type_dialog_title')}>
                <p>{(0, Translator_1.translate)('sulu_admin.missing_type_dialog_description')}</p>
                <Form_1.default>
                    <Form_1.default.Field colSpan={6}>
                        <SingleSelect_1.default onChange={this.handleTypeChange} value={this.selectedType}>
                            {Object.keys(types).map((key) => (<SingleSelect_1.default.Option key={types[key].key} value={types[key].key}>
                                    {types[key].title}
                                </SingleSelect_1.default.Option>))}
                        </SingleSelect_1.default>
                    </Form_1.default.Field>
                </Form_1.default>
            </Dialog_1.default>);
        }
        constructor() {
            super(...arguments);
            this.selectedType = __runInitializers(this, _selectedType_initializers, void 0);
            this.handleCancel = (__runInitializers(this, _selectedType_extraInitializers), () => {
                this.props.onCancel();
            });
            this.handleConfirm = () => {
                this.props.onConfirm(this.selectedType);
            };
            this.handleTypeChange = __runInitializers(this, _handleTypeChange_initializers, (type) => {
                if (typeof type !== 'string') {
                    throw new Error('Only strings are accepted as types! This should not happen and is likely a bug.');
                }
                this.selectedType = type;
            });
            __runInitializers(this, _handleTypeChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MissingTypeDialog");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _selectedType_decorators = [mobx_1.observable];
        _handleTypeChange_decorators = [mobx_1.action];
        __esDecorate(null, null, _selectedType_decorators, { kind: "field", name: "selectedType", static: false, private: false, access: { has: obj => "selectedType" in obj, get: obj => obj.selectedType, set: (obj, value) => { obj.selectedType = value; } }, metadata: _metadata }, _selectedType_initializers, _selectedType_extraInitializers);
        __esDecorate(null, null, _handleTypeChange_decorators, { kind: "field", name: "handleTypeChange", static: false, private: false, access: { has: obj => "handleTypeChange" in obj, get: obj => obj.handleTypeChange, set: (obj, value) => { obj.handleTypeChange = value; } }, metadata: _metadata }, _handleTypeChange_initializers, _handleTypeChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MissingTypeDialog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MissingTypeDialog = _classThis;
})();
exports.default = MissingTypeDialog;
