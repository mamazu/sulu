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
const loglevel_1 = __importDefault(require("loglevel"));
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore"));
const mobx_1 = require("mobx");
const MediaSelectionHelper_1 = require("../../../utils/MediaSelectionHelper");
const MultiMediaSelection_1 = __importDefault(require("../../MultiMediaSelection"));
let MediaSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_value_decorators;
    var MediaSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                const { onChange, onFinish } = this.props;
                onChange(value);
                onFinish();
            });
            this.handleItemClick = (itemId, item) => {
                const { router } = this.props;
                if (!router || !item) {
                    return;
                }
                const { id, locale } = item;
                router.navigate('sulu_media.form', { id, locale });
            };
            const { onChange, schemaOptions } = this.props;
            const { defaultDisplayOption: { value: defaultDisplayOption, } = {}, } = schemaOptions;
            if (!defaultDisplayOption) {
                return;
            }
            if (typeof defaultDisplayOption !== 'string' || !(0, MediaSelectionHelper_1.validateDisplayOption)(defaultDisplayOption)) {
                throw new Error('The children of "defaultDisplayOption" contains the invalid value "'
                    + (defaultDisplayOption.toString() + '') + '".');
            }
            if (this.value === undefined) {
                onChange({ ids: [], displayOption: defaultDisplayOption }, { isDefaultValue: true });
            }
        }
        get value() {
            const { value, dataPath } = this.props;
            if (value && (0, mobx_1.isArrayLike)(value)) {
                loglevel_1.default.warn('The "MediaSelection" field with the path "' + dataPath + '" expects an object with an "ids" '
                    + 'property as value but received an array instead. Is it possible that your API returns an array of '
                    + 'ids or an array serialized objects?'
                    + '\n\nThe Sulu form view expects that your API returns the data in the same format as it is sent '
                    + 'to the server when submitting the form. '
                    + '\nSulu will try to extract the required data from the given array heuristically. '
                    + 'This decreases performance and might lead to errors or other unexpected behaviour.');
                return { ids: value.map((item) => item && typeof item === 'object' ? item.id : item) };
            }
            if (value && (typeof value !== 'object' || !(0, mobx_1.isArrayLike)(value.ids))) {
                throw new Error('The "MediaSelection" field expects an object with an "ids" property and '
                    + 'an optional "displayOption" property as value.');
            }
            return value;
        }
        render() {
            const { disabled, formInspector, schemaOptions } = this.props;
            const { displayOptions: { value: displayOptions, } = {}, types: { value: mediaTypes, } = {}, sortable: { value: sortable = true, } = {}, } = schemaOptions;
            const locale = formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
            if (displayOptions !== undefined && displayOptions !== null && !(0, mobx_1.isArrayLike)(displayOptions)) {
                throw new Error('The "displayOptions" option has to be an Array if set.');
            }
            const displayOptionValues = (0, MediaSelectionHelper_1.convertDisplayOptionsFromParams)(displayOptions);
            if (mediaTypes !== undefined && mediaTypes !== null && typeof mediaTypes !== 'string') {
                throw new Error('The "types" option has to be a string if set.');
            }
            const mediaTypeValues = (0, MediaSelectionHelper_1.convertMediaTypesFromParams)(mediaTypes);
            if (sortable !== undefined && typeof sortable !== 'boolean') {
                throw new Error('The "sortable" schema option must be a boolean if given!');
            }
            return (<MultiMediaSelection_1.default disabled={!!disabled} displayOptions={displayOptionValues} locale={locale} onChange={this.handleChange} onItemClick={this.handleItemClick} sortable={sortable} types={mediaTypeValues} value={this.value ? this.value : undefined}/>);
        }
    };
    __setFunctionName(_classThis, "MediaSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_value_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaSelection = _classThis;
})();
exports.default = MediaSelection;
