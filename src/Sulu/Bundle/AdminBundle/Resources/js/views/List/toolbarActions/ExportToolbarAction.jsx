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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const Translator_1 = require("../../../utils/Translator");
const Overlay_1 = __importDefault(require("../../../components/Overlay"));
const Form_1 = __importDefault(require("../../../components/Form"));
const SingleSelect_1 = __importDefault(require("../../../components/SingleSelect"));
const resourceRouteRegistry_1 = __importDefault(require("../../../services/ResourceRequester/registries/resourceRouteRegistry"));
const exportToolbarAction_scss_1 = __importDefault(require("./exportToolbarAction.scss"));
const AbstractListToolbarAction_1 = __importDefault(require("./AbstractListToolbarAction"));
let ExportToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractListToolbarAction_1.default;
    let _showOverlay_decorators;
    let _showOverlay_initializers = [];
    let _showOverlay_extraInitializers = [];
    let _delimiter_decorators;
    let _delimiter_initializers = [];
    let _delimiter_extraInitializers = [];
    let _enclosure_decorators;
    let _enclosure_initializers = [];
    let _enclosure_extraInitializers = [];
    let _escape_decorators;
    let _escape_initializers = [];
    let _escape_extraInitializers = [];
    let _newLine_decorators;
    let _newLine_initializers = [];
    let _newLine_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleDelimiterChanged_decorators;
    let _handleDelimiterChanged_initializers = [];
    let _handleDelimiterChanged_extraInitializers = [];
    let _handleEnclosureChanged_decorators;
    let _handleEnclosureChanged_initializers = [];
    let _handleEnclosureChanged_extraInitializers = [];
    let _handleEscapeChanged_decorators;
    let _handleEscapeChanged_initializers = [];
    let _handleEscapeChanged_extraInitializers = [];
    let _handleNewLineChanged_decorators;
    let _handleNewLineChanged_initializers = [];
    let _handleNewLineChanged_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    return _a = class ExportToolbarAction extends _classSuper {
            getNode() {
                return (<Overlay_1.default confirmDisabled={false} confirmLoading={false} confirmText={(0, Translator_1.translate)('sulu_admin.export')} key="sulu_admin.export" onClose={this.handleClose} onConfirm={this.handleConfirm} open={this.showOverlay} size="small" title={(0, Translator_1.translate)('sulu_admin.export_overlay_title')}>
                <div className={exportToolbarAction_scss_1.default.overlay}>
                    <Form_1.default>
                        <Form_1.default.Section colSpan={6}>
                            <Form_1.default.Field description={(0, Translator_1.translate)('sulu_admin.delimiter_description')} label={(0, Translator_1.translate)('sulu_admin.delimiter')}>
                                <SingleSelect_1.default onChange={this.handleDelimiterChanged} value={this.delimiter}>
                                    <SingleSelect_1.default.Option value=";">;</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value=",">,</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value="\t">
                                        {(0, Translator_1.translate)('sulu_admin.delimiter_tab')}
                                    </SingleSelect_1.default.Option>
                                </SingleSelect_1.default>
                            </Form_1.default.Field>
                            <Form_1.default.Field description={(0, Translator_1.translate)('sulu_admin.enclosure_description')} label={(0, Translator_1.translate)('sulu_admin.enclosure')}>
                                <SingleSelect_1.default onChange={this.handleEnclosureChanged} value={this.enclosure}>
                                    <SingleSelect_1.default.Option value='"'>&quot;</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value="">
                                        {(0, Translator_1.translate)('sulu_admin.enclosure_nothing')}
                                    </SingleSelect_1.default.Option>
                                </SingleSelect_1.default>
                            </Form_1.default.Field>
                        </Form_1.default.Section>
                        <Form_1.default.Section colSpan={6}>
                            <Form_1.default.Field description={(0, Translator_1.translate)('sulu_admin.escape_description')} label={(0, Translator_1.translate)('sulu_admin.escape')}>
                                <SingleSelect_1.default onChange={this.handleEscapeChanged} value={this.escape}>
                                    <SingleSelect_1.default.Option value={'\\'}>\</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value='"'>&quot;</SingleSelect_1.default.Option>
                                </SingleSelect_1.default>
                            </Form_1.default.Field>
                            <Form_1.default.Field description={(0, Translator_1.translate)('sulu_admin.new_line_description')} label={(0, Translator_1.translate)('sulu_admin.new_line')}>
                                <SingleSelect_1.default onChange={this.handleNewLineChanged} value={this.newLine}>
                                    <SingleSelect_1.default.Option value={'\\n'}>\n</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value={'\\r\\n'}>\r\n</SingleSelect_1.default.Option>
                                    <SingleSelect_1.default.Option value={'\\r'}>\r</SingleSelect_1.default.Option>
                                </SingleSelect_1.default>
                            </Form_1.default.Field>
                        </Form_1.default.Section>
                    </Form_1.default>
                </div>
            </Overlay_1.default>);
            }
            getToolbarItemConfig() {
                return {
                    disabled: this.listStore.data.length === 0,
                    icon: 'su-download',
                    label: (0, Translator_1.translate)('sulu_admin.export'),
                    onClick: (0, mobx_1.action)(() => {
                        this.showOverlay = true;
                    }),
                    type: 'button',
                };
            }
            constructor() {
                super(...arguments);
                this.showOverlay = __runInitializers(this, _showOverlay_initializers, false);
                this.delimiter = (__runInitializers(this, _showOverlay_extraInitializers), __runInitializers(this, _delimiter_initializers, ';'));
                this.enclosure = (__runInitializers(this, _delimiter_extraInitializers), __runInitializers(this, _enclosure_initializers, '"'));
                this.escape = (__runInitializers(this, _enclosure_extraInitializers), __runInitializers(this, _escape_initializers, '\\'));
                this.newLine = (__runInitializers(this, _escape_extraInitializers), __runInitializers(this, _newLine_initializers, '\\n'));
                this.handleClose = (__runInitializers(this, _newLine_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                    this.showOverlay = false;
                }));
                this.handleDelimiterChanged = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _handleDelimiterChanged_initializers, (value) => {
                    this.delimiter = value;
                }));
                this.handleEnclosureChanged = (__runInitializers(this, _handleDelimiterChanged_extraInitializers), __runInitializers(this, _handleEnclosureChanged_initializers, (value) => {
                    this.enclosure = value;
                }));
                this.handleEscapeChanged = (__runInitializers(this, _handleEnclosureChanged_extraInitializers), __runInitializers(this, _handleEscapeChanged_initializers, (value) => {
                    this.escape = value;
                }));
                this.handleNewLineChanged = (__runInitializers(this, _handleEscapeChanged_extraInitializers), __runInitializers(this, _handleNewLineChanged_initializers, (value) => {
                    this.newLine = value;
                }));
                this.handleConfirm = (__runInitializers(this, _handleNewLineChanged_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                    const { filterQueryOption } = this.listStore;
                    const filter = Object.keys(filterQueryOption).length > 0 ? filterQueryOption : undefined;
                    const search = this.listStore.searchTerm.get();
                    window.location.assign(resourceRouteRegistry_1.default.getUrl('list', this.listStore.resourceKey, Object.assign(Object.assign({ _format: 'csv', locale: this.list.locale.get(), flat: true, delimiter: this.delimiter, escape: this.escape, enclosure: this.enclosure, newLine: this.newLine }, this.listStore.options), { filter,
                        search })));
                    this.showOverlay = false;
                }));
                __runInitializers(this, _handleConfirm_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showOverlay_decorators = [mobx_1.observable];
            _delimiter_decorators = [mobx_1.observable];
            _enclosure_decorators = [mobx_1.observable];
            _escape_decorators = [mobx_1.observable];
            _newLine_decorators = [mobx_1.observable];
            _handleClose_decorators = [mobx_1.action];
            _handleDelimiterChanged_decorators = [mobx_1.action];
            _handleEnclosureChanged_decorators = [mobx_1.action];
            _handleEscapeChanged_decorators = [mobx_1.action];
            _handleNewLineChanged_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            __esDecorate(null, null, _showOverlay_decorators, { kind: "field", name: "showOverlay", static: false, private: false, access: { has: obj => "showOverlay" in obj, get: obj => obj.showOverlay, set: (obj, value) => { obj.showOverlay = value; } }, metadata: _metadata }, _showOverlay_initializers, _showOverlay_extraInitializers);
            __esDecorate(null, null, _delimiter_decorators, { kind: "field", name: "delimiter", static: false, private: false, access: { has: obj => "delimiter" in obj, get: obj => obj.delimiter, set: (obj, value) => { obj.delimiter = value; } }, metadata: _metadata }, _delimiter_initializers, _delimiter_extraInitializers);
            __esDecorate(null, null, _enclosure_decorators, { kind: "field", name: "enclosure", static: false, private: false, access: { has: obj => "enclosure" in obj, get: obj => obj.enclosure, set: (obj, value) => { obj.enclosure = value; } }, metadata: _metadata }, _enclosure_initializers, _enclosure_extraInitializers);
            __esDecorate(null, null, _escape_decorators, { kind: "field", name: "escape", static: false, private: false, access: { has: obj => "escape" in obj, get: obj => obj.escape, set: (obj, value) => { obj.escape = value; } }, metadata: _metadata }, _escape_initializers, _escape_extraInitializers);
            __esDecorate(null, null, _newLine_decorators, { kind: "field", name: "newLine", static: false, private: false, access: { has: obj => "newLine" in obj, get: obj => obj.newLine, set: (obj, value) => { obj.newLine = value; } }, metadata: _metadata }, _newLine_initializers, _newLine_extraInitializers);
            __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
            __esDecorate(null, null, _handleDelimiterChanged_decorators, { kind: "field", name: "handleDelimiterChanged", static: false, private: false, access: { has: obj => "handleDelimiterChanged" in obj, get: obj => obj.handleDelimiterChanged, set: (obj, value) => { obj.handleDelimiterChanged = value; } }, metadata: _metadata }, _handleDelimiterChanged_initializers, _handleDelimiterChanged_extraInitializers);
            __esDecorate(null, null, _handleEnclosureChanged_decorators, { kind: "field", name: "handleEnclosureChanged", static: false, private: false, access: { has: obj => "handleEnclosureChanged" in obj, get: obj => obj.handleEnclosureChanged, set: (obj, value) => { obj.handleEnclosureChanged = value; } }, metadata: _metadata }, _handleEnclosureChanged_initializers, _handleEnclosureChanged_extraInitializers);
            __esDecorate(null, null, _handleEscapeChanged_decorators, { kind: "field", name: "handleEscapeChanged", static: false, private: false, access: { has: obj => "handleEscapeChanged" in obj, get: obj => obj.handleEscapeChanged, set: (obj, value) => { obj.handleEscapeChanged = value; } }, metadata: _metadata }, _handleEscapeChanged_initializers, _handleEscapeChanged_extraInitializers);
            __esDecorate(null, null, _handleNewLineChanged_decorators, { kind: "field", name: "handleNewLineChanged", static: false, private: false, access: { has: obj => "handleNewLineChanged" in obj, get: obj => obj.handleNewLineChanged, set: (obj, value) => { obj.handleNewLineChanged = value; } }, metadata: _metadata }, _handleNewLineChanged_initializers, _handleNewLineChanged_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ExportToolbarAction;
