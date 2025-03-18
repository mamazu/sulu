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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const jexl_1 = __importDefault(require("jexl"));
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const BlockCollection_1 = __importDefault(require("../../components/BlockCollection"));
const Translator_1 = require("../../utils/Translator");
const Form_1 = require("../Form");
const FormOverlay_1 = __importDefault(require("../FormOverlay"));
const snackbarStore_1 = __importDefault(require("../../stores/snackbarStore"));
const conditionDataProviderRegistry_1 = __importDefault(require("../Form/registries/conditionDataProviderRegistry"));
const DifferenceCalculator_1 = require("../../utils/DifferenceCalculator");
const blockPreviewTransformerRegistry_1 = __importDefault(require("./registries/blockPreviewTransformerRegistry"));
const FieldRenderer_1 = __importDefault(require("./FieldRenderer"));
const MISSING_BLOCK_ERROR_MESSAGE = 'The "block" field type needs at least one type to be configured!';
const BLOCK_PREVIEW_TAG = 'sulu.block_preview';
const SETTINGS_KEY = 'settings';
const SETTINGS_PREFIX = '/settings/';
const SETTINGS_TAG = 'sulu.block_setting_icon';
let FieldBlocks = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _openedBlockSettingsIndex_decorators;
    let _openedBlockSettingsIndex_initializers = [];
    let _openedBlockSettingsIndex_extraInitializers = [];
    let _blockSettingsFormStore_decorators;
    let _blockSettingsFormStore_initializers = [];
    let _blockSettingsFormStore_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _componentDidMount_decorators;
    let _get_settingsFormKey_decorators;
    let _get_addButtonText_decorators;
    let _get_pasteButtonText_decorators;
    let _get_collapsable_decorators;
    let _get_movable_decorators;
    let _get_iconsMapping_decorators;
    let _get_icons_decorators;
    let _setValue_decorators;
    let _setValue_initializers = [];
    let _setValue_extraInitializers = [];
    let _handleSettingsClick_decorators;
    let _handleSettingsClick_initializers = [];
    let _handleSettingsClick_extraInitializers = [];
    let _closeSettingsOverlay_decorators;
    let _closeSettingsOverlay_initializers = [];
    let _closeSettingsOverlay_extraInitializers = [];
    var FieldBlocks = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.openedBlockSettingsIndex = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _openedBlockSettingsIndex_initializers, void 0));
            this.blockSettingsFormStore = (__runInitializers(this, _openedBlockSettingsIndex_extraInitializers), __runInitializers(this, _blockSettingsFormStore_initializers, void 0));
            this.value = (__runInitializers(this, _blockSettingsFormStore_extraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.oldIconValue = __runInitializers(this, _value_extraInitializers);
            this.computedIcons = [];
            this.setValue = __runInitializers(this, _setValue_initializers, (value) => {
                this.value = value;
            });
            this.handleBlockChange = (__runInitializers(this, _setValue_extraInitializers), (index, name, value) => {
                const { onChange } = this.props;
                const oldValues = this.value;
                if (!oldValues) {
                    return;
                }
                const newValues = (0, mobx_1.toJS)(oldValues);
                json_pointer_1.default.set(newValues[index], '/' + name, value);
                this.setValue(newValues);
                onChange(newValues);
            });
            this.handleBlocksChange = (value) => {
                const { onChange } = this.props;
                this.setValue(value);
                onChange(value);
            };
            this.handleSortEnd = () => {
                const { onFinish } = this.props;
                onFinish();
            };
            this.getBlockSchemaType = (type) => {
                const { defaultType, schemaPath, types } = this.props;
                if (!type) {
                    throw new Error('It is impossible that a block has no type. This should not happen and is likely a bug.');
                }
                if (!types) {
                    throw new Error(MISSING_BLOCK_ERROR_MESSAGE);
                }
                if (types[type]) {
                    return types[type];
                }
                if (!defaultType) {
                    throw new Error('It is impossible that a block has no defaultType. This should not happen and is likely a bug.');
                }
                if (!types[defaultType]) {
                    throw new Error('The default type should exist in block "' + schemaPath + '".');
                }
                return types[defaultType];
            };
            this.renderBlockContent = (value, type, index, expanded) => {
                return expanded
                    ? this.renderExpandedBlockContent(value, type, index)
                    : this.renderCollapsedBlockContent(value, type, index);
            };
            this.renderExpandedBlockContent = (value, type, index) => {
                const { data, dataPath, error, formInspector, onFinish, onSuccess, router, schemaPath, showAllErrors, } = this.props;
                const blockSchemaType = this.getBlockSchemaType(type);
                const errors = (0, mobx_1.toJS)(error);
                return (<FieldRenderer_1.default data={data} dataPath={dataPath + '/' + index} errors={errors && errors.length > index && errors[index] ? errors[index] : undefined} formInspector={formInspector} index={index} onChange={this.handleBlockChange} onFieldFinish={onFinish} onSuccess={onSuccess} router={router} schema={blockSchemaType.form} schemaPath={schemaPath + '/types/' + type + '/form'} showAllErrors={showAllErrors} value={value}/>);
            };
            // eslint-disable-next-line no-unused-vars
            this.renderCollapsedBlockContent = (value, type, index) => {
                const blockSchemaType = this.getBlockSchemaType(type);
                const blockSchemaTypeForm = this.removeSections(blockSchemaType.form);
                const previewPropertyNames = Object.keys(blockSchemaTypeForm)
                    .filter((schemaKey) => {
                    const schemaEntryTags = blockSchemaTypeForm[schemaKey].tags;
                    return schemaEntryTags &&
                        value[schemaKey] &&
                        schemaEntryTags.some((tag) => tag.name === BLOCK_PREVIEW_TAG);
                })
                    .sort((propertyName1, propertyName2) => {
                    const propertyTags1 = blockSchemaTypeForm[propertyName1].tags;
                    const propertyTags2 = blockSchemaTypeForm[propertyName2].tags;
                    if (!propertyTags1 || !propertyTags2) {
                        throw new Error('All properties without any tag should have been filtered before.'
                            + ' This should not happen and is likely a bug.');
                    }
                    const propertyTag1 = propertyTags1.find((tag) => tag.name === BLOCK_PREVIEW_TAG);
                    const propertyTag2 = propertyTags2.find((tag) => tag.name === BLOCK_PREVIEW_TAG);
                    if (!propertyTag1 || !propertyTag2) {
                        throw new Error('All properties not having the "sulu.block_preview" tag should have been filtered before.'
                            + ' This should not happen and is likely a bug.');
                    }
                    return (propertyTag2.priority || 0) - (propertyTag1.priority || 0);
                });
                if (previewPropertyNames.length === 0) {
                    for (const fieldTypeKey of blockPreviewTransformerRegistry_1.default.blockPreviewTransformerKeysByPriority) {
                        for (const propertyName of Object.keys(blockSchemaTypeForm)) {
                            if (blockSchemaTypeForm[propertyName].type === fieldTypeKey && value[propertyName]) {
                                previewPropertyNames.push(propertyName);
                                break;
                            }
                        }
                        if (previewPropertyNames.length >= 3) {
                            break;
                        }
                    }
                }
                return (<react_1.Fragment>
                {previewPropertyNames.map((previewPropertyName) => blockPreviewTransformerRegistry_1.default.has(blockSchemaTypeForm[previewPropertyName].type)
                        && value[previewPropertyName]
                        && (<react_1.Fragment key={previewPropertyName}>
                            {blockPreviewTransformerRegistry_1.default
                                .get(blockSchemaTypeForm[previewPropertyName].type)
                                .transform(value[previewPropertyName], blockSchemaTypeForm[previewPropertyName])}
                        </react_1.Fragment>))}
            </react_1.Fragment>);
            };
            this.handleSettingsClick = __runInitializers(this, _handleSettingsClick_initializers, (index) => {
                var _a;
                const settingsFormKey = this.settingsFormKey;
                if (!settingsFormKey || !this.value) {
                    return;
                }
                // create new formstore to make sure that overlay displays correct data
                (_a = this.blockSettingsFormStore) === null || _a === void 0 ? void 0 : _a.destroy();
                this.blockSettingsFormStore = Form_1.memoryFormStoreFactory.createFromFormKey(settingsFormKey, Object.assign({}, this.value[index][SETTINGS_KEY]), this.props.formInspector.locale, undefined, this.props.formInspector.options);
                this.openedBlockSettingsIndex = index;
            });
            this.handleSettingsOverlayClose = (__runInitializers(this, _handleSettingsClick_extraInitializers), () => {
                this.closeSettingsOverlay();
            });
            this.handleSettingsOverlayConfirm = () => {
                this.applySettingsFromOverlay();
                this.closeSettingsOverlay();
            };
            this.handleDisplaySnackbar = (message) => {
                snackbarStore_1.default.add(message, 2500);
            };
            this.closeSettingsOverlay = __runInitializers(this, _closeSettingsOverlay_initializers, () => {
                this.openedBlockSettingsIndex = undefined;
            });
            this.applySettingsFromOverlay = (__runInitializers(this, _closeSettingsOverlay_extraInitializers), () => {
                const { onChange } = this.props;
                const oldValues = this.value || [];
                const { blockSettingsFormStore, openedBlockSettingsIndex } = this;
                if (!blockSettingsFormStore
                    || openedBlockSettingsIndex === undefined
                    || openedBlockSettingsIndex === null
                    || !oldValues) {
                    return;
                }
                const newValue = [
                    ...oldValues.slice(0, openedBlockSettingsIndex),
                    Object.assign(Object.assign({}, oldValues[openedBlockSettingsIndex]), { [SETTINGS_KEY]: blockSettingsFormStore.data }),
                    ...oldValues.slice(openedBlockSettingsIndex + 1),
                ];
                this.setValue(newValue);
                onChange(newValue);
            });
            this.setValue(this.props.value);
        }
        componentDidMount() {
            if (this.settingsFormKey) {
                // initialize empty blockSettingsFormStore because schema of the store is used for determining iconsMapping
                this.blockSettingsFormStore = Form_1.memoryFormStoreFactory.createFromFormKey(this.settingsFormKey, {}, this.props.formInspector.locale, undefined, this.props.formInspector.options);
            }
        }
        componentDidUpdate(prevProps) {
            const { defaultType, onChange, types, value } = this.props;
            const { types: oldTypes } = prevProps;
            if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(prevProps.value), (0, mobx_1.toJS)(value))) {
                this.setValue(value);
            }
            if (!types || !oldTypes) {
                throw new Error(MISSING_BLOCK_ERROR_MESSAGE);
            }
            let newValue = (0, mobx_1.toJS)(value);
            if (newValue && types !== oldTypes) {
                if (!defaultType) {
                    throw new Error('It is impossible that a block has no defaultType. This should not happen and is likely a bug.');
                }
                // set block to default type if type does not longer exist
                // this could happen for example in a template switch
                newValue = newValue.map((block) => {
                    if (!types[block.type]) {
                        return Object.assign(Object.assign({}, block), { type: defaultType });
                    }
                    return block;
                });
            }
            // onChange should only be called when value was changed else it will end in a infinite loop
            if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(value), newValue)) {
                onChange(newValue);
            }
        }
        componentWillUnmount() {
            var _a;
            (_a = this.blockSettingsFormStore) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        get settingsFormKey() {
            const { schemaOptions: { settings_form_key: { value: settingsFormKey, } = {}, }, } = this.props;
            if (settingsFormKey !== undefined && typeof settingsFormKey !== 'string') {
                throw new Error('The "block" field types only accepts strings as "settings_form_key" schema option!');
            }
            return settingsFormKey;
        }
        get addButtonText() {
            const { schemaOptions: { add_button_text: { title: addButtonText, } = {}, }, } = this.props;
            if (addButtonText !== undefined && typeof addButtonText !== 'string') {
                throw new Error('The "block" field types only accepts strings as "add_button_text" schema option!');
            }
            return addButtonText;
        }
        get pasteButtonText() {
            const { schemaOptions: { paste_button_text: { title: pasteButtonText, } = {}, }, } = this.props;
            if (pasteButtonText !== undefined && typeof pasteButtonText !== 'string') {
                throw new Error('The "block" field types only accepts strings as "paste_button_text" schema option!');
            }
            return pasteButtonText;
        }
        get collapsable() {
            const { schemaOptions: { collapsable: { value: collapsable, } = {}, }, } = this.props;
            if (collapsable !== undefined && typeof collapsable !== 'boolean') {
                throw new Error('The "block" field types only accepts booleans as "collapsable" schema option!');
            }
            return collapsable;
        }
        get movable() {
            const { schemaOptions: { movable: { value: movable, } = {}, }, } = this.props;
            if (movable !== undefined && typeof movable !== 'boolean') {
                throw new Error('The "block" field types only accepts booleans as "collapsable" schema option!');
            }
            return movable;
        }
        get iconsMapping() {
            var _a;
            const settingsSchema = (_a = this.blockSettingsFormStore) === null || _a === void 0 ? void 0 : _a.schema;
            if (!settingsSchema) {
                return {};
            }
            const iconMappingReducerCreator = (prefixSchemaKey = '') => (iconsMapping, schemaKey) => {
                const pointer = '/' + prefixSchemaKey + schemaKey;
                if (!json_pointer_1.default.has(settingsSchema, pointer)) {
                    return iconsMapping;
                }
                const schemaEntry = json_pointer_1.default.get(settingsSchema, pointer);
                if (schemaEntry.items) {
                    return Object.keys(schemaEntry.items).reduce(iconMappingReducerCreator(schemaKey + '/items/'), iconsMapping);
                }
                const blockSettingsTag = schemaEntry.tags.find((tag) => tag.name === SETTINGS_TAG);
                if (blockSettingsTag) {
                    iconsMapping[SETTINGS_PREFIX + schemaKey] = blockSettingsTag.attributes;
                }
                return iconsMapping;
            };
            return Object.keys(settingsSchema).reduce(iconMappingReducerCreator(), {});
        }
        get icons() {
            if (!this.value || Object.keys(this.iconsMapping).length === 0) {
                return [];
            }
            const jsValue = (0, mobx_1.toJS)(this.value);
            const changedValues = (0, DifferenceCalculator_1.getDifference)(jsValue, this.oldIconValue);
            this.oldIconValue = jsValue;
            for (const key in changedValues) {
                const value = this.value[key];
                const icons = [];
                for (const pointer in this.iconsMapping) {
                    const visibleCondition = this.iconsMapping[pointer].visibleCondition;
                    const icon = this.iconsMapping[pointer].icon;
                    if (( // evaluate visible condition
                    visibleCondition !== undefined &&
                        jexl_1.default.evalSync(visibleCondition, this.getConditionData(value, pointer)))
                        ||
                            ( // use value from pointer if no visible condition is defined
                            visibleCondition === undefined &&
                                json_pointer_1.default.has(value, pointer) &&
                                json_pointer_1.default.get(value, pointer))) {
                        icons.push(icon);
                    }
                }
                this.computedIcons[parseInt(key)] = icons;
            }
            if (this.computedIcons.length !== this.value.length) {
                this.computedIcons = this.computedIcons.slice(0, this.value.length);
            }
            return this.computedIcons;
        }
        getConditionData(data, dataPath) {
            const { formInspector } = this.props;
            return conditionDataProviderRegistry_1.default.getAll().reduce(function (data, conditionDataProvider) {
                return Object.assign(Object.assign({}, data), conditionDataProvider(data, dataPath, formInspector));
            }, Object.assign({}, data));
        }
        removeSections(blockSchemaTypeForm) {
            let filteredForm = {};
            Object.keys(blockSchemaTypeForm).forEach((key) => {
                if (blockSchemaTypeForm[key]['type'] === 'section') {
                    filteredForm = Object.assign(Object.assign({}, filteredForm), this.removeSections(blockSchemaTypeForm[key]['items']));
                    return false;
                }
                filteredForm[key] = blockSchemaTypeForm[key];
            });
            return filteredForm;
        }
        render() {
            const { defaultType, disabled, maxOccurs, minOccurs, types } = this.props;
            const value = this.value || [];
            const blockSettingsFormStore = this.blockSettingsFormStore;
            if (!defaultType) {
                throw new Error('The "block" field type needs a defaultType!');
            }
            if (!types) {
                throw new Error(MISSING_BLOCK_ERROR_MESSAGE);
            }
            const blockTypes = Object.keys(types).reduce((blockTypes, current) => {
                blockTypes[current] = types[current].title;
                return blockTypes;
            }, {});
            return (<>
                <BlockCollection_1.default addButtonText={this.addButtonText} collapsable={this.collapsable} defaultType={defaultType} disabled={!!disabled} icons={this.icons} maxOccurs={maxOccurs} minOccurs={minOccurs} movable={this.movable} onChange={this.handleBlocksChange} onDisplaySnackbar={this.handleDisplaySnackbar} onSettingsClick={this.settingsFormKey ? this.handleSettingsClick : undefined} onSortEnd={this.handleSortEnd} pasteButtonText={this.pasteButtonText} renderBlockContent={this.renderBlockContent} types={blockTypes} value={value}/>
                {this.openedBlockSettingsIndex !== undefined && blockSettingsFormStore && (<FormOverlay_1.default confirmDisabled={!blockSettingsFormStore.dirty} confirmText={(0, Translator_1.translate)('sulu_admin.apply')} formStore={blockSettingsFormStore} onClose={this.handleSettingsOverlayClose} onConfirm={this.handleSettingsOverlayConfirm} open={!!blockSettingsFormStore} size="small" title={(0, Translator_1.translate)('sulu_admin.block_settings')}/>)}
            </>);
        }
    };
    __setFunctionName(_classThis, "FieldBlocks");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedBlockSettingsIndex_decorators = [mobx_1.observable];
        _blockSettingsFormStore_decorators = [mobx_1.observable];
        _value_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _get_settingsFormKey_decorators = [mobx_1.computed];
        _get_addButtonText_decorators = [mobx_1.computed];
        _get_pasteButtonText_decorators = [mobx_1.computed];
        _get_collapsable_decorators = [mobx_1.computed];
        _get_movable_decorators = [mobx_1.computed];
        _get_iconsMapping_decorators = [mobx_1.computed];
        _get_icons_decorators = [mobx_1.computed];
        _setValue_decorators = [mobx_1.action];
        _handleSettingsClick_decorators = [mobx_1.action];
        _closeSettingsOverlay_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_settingsFormKey_decorators, { kind: "getter", name: "settingsFormKey", static: false, private: false, access: { has: obj => "settingsFormKey" in obj, get: obj => obj.settingsFormKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_addButtonText_decorators, { kind: "getter", name: "addButtonText", static: false, private: false, access: { has: obj => "addButtonText" in obj, get: obj => obj.addButtonText }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_pasteButtonText_decorators, { kind: "getter", name: "pasteButtonText", static: false, private: false, access: { has: obj => "pasteButtonText" in obj, get: obj => obj.pasteButtonText }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_collapsable_decorators, { kind: "getter", name: "collapsable", static: false, private: false, access: { has: obj => "collapsable" in obj, get: obj => obj.collapsable }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_movable_decorators, { kind: "getter", name: "movable", static: false, private: false, access: { has: obj => "movable" in obj, get: obj => obj.movable }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_iconsMapping_decorators, { kind: "getter", name: "iconsMapping", static: false, private: false, access: { has: obj => "iconsMapping" in obj, get: obj => obj.iconsMapping }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_icons_decorators, { kind: "getter", name: "icons", static: false, private: false, access: { has: obj => "icons" in obj, get: obj => obj.icons }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _openedBlockSettingsIndex_decorators, { kind: "field", name: "openedBlockSettingsIndex", static: false, private: false, access: { has: obj => "openedBlockSettingsIndex" in obj, get: obj => obj.openedBlockSettingsIndex, set: (obj, value) => { obj.openedBlockSettingsIndex = value; } }, metadata: _metadata }, _openedBlockSettingsIndex_initializers, _openedBlockSettingsIndex_extraInitializers);
        __esDecorate(null, null, _blockSettingsFormStore_decorators, { kind: "field", name: "blockSettingsFormStore", static: false, private: false, access: { has: obj => "blockSettingsFormStore" in obj, get: obj => obj.blockSettingsFormStore, set: (obj, value) => { obj.blockSettingsFormStore = value; } }, metadata: _metadata }, _blockSettingsFormStore_initializers, _blockSettingsFormStore_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _setValue_decorators, { kind: "field", name: "setValue", static: false, private: false, access: { has: obj => "setValue" in obj, get: obj => obj.setValue, set: (obj, value) => { obj.setValue = value; } }, metadata: _metadata }, _setValue_initializers, _setValue_extraInitializers);
        __esDecorate(null, null, _handleSettingsClick_decorators, { kind: "field", name: "handleSettingsClick", static: false, private: false, access: { has: obj => "handleSettingsClick" in obj, get: obj => obj.handleSettingsClick, set: (obj, value) => { obj.handleSettingsClick = value; } }, metadata: _metadata }, _handleSettingsClick_initializers, _handleSettingsClick_extraInitializers);
        __esDecorate(null, null, _closeSettingsOverlay_decorators, { kind: "field", name: "closeSettingsOverlay", static: false, private: false, access: { has: obj => "closeSettingsOverlay" in obj, get: obj => obj.closeSettingsOverlay, set: (obj, value) => { obj.closeSettingsOverlay = value; } }, metadata: _metadata }, _closeSettingsOverlay_initializers, _closeSettingsOverlay_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FieldBlocks = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FieldBlocks = _classThis;
})();
exports.default = FieldBlocks;
