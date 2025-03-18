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
const utils_1 = require("sulu-admin-bundle/utils");
const components_1 = require("sulu-admin-bundle/components");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const Button_1 = __importDefault(require("./Button"));
const hotspotsFormRenderer_scss_1 = __importDefault(require("./hotspotsFormRenderer.scss"));
const AVAILABLE_HOTSPOT_TYPES = {
    circle: 'sulu_media.circle',
    point: 'sulu_media.point',
    rectangle: 'sulu_media.rectangle',
};
let HotspotsFormRenderer = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_selectedHotspot_decorators;
    var HotspotsFormRenderer = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleTypeChange = (__runInitializers(this, _instanceExtraInitializers), (type) => {
                const { onTypeChange, selectedIndex } = this.props;
                onTypeChange(selectedIndex, type);
            });
            this.handleHotspotTypeChange = (type) => {
                const { onHotspotTypeChange, selectedIndex } = this.props;
                onHotspotTypeChange(selectedIndex, type);
            };
            this.handleHotspotRemove = () => {
                const { onHotspotRemove, selectedIndex } = this.props;
                onHotspotRemove(selectedIndex);
            };
        }
        get selectedHotspot() {
            const { value, selectedIndex } = this.props;
            return value[selectedIndex];
        }
        render() {
            const { children, disabled, onHotspotAdd, onHotspotSelect, selectedIndex, types, value } = this.props;
            return (<components_1.Form>
                <components_1.Form.Field label={(0, utils_1.translate)('sulu_media.hotspots')}>
                    <div className={hotspotsFormRenderer_scss_1.default.hotspotsFormRenderer}>
                        <div className={hotspotsFormRenderer_scss_1.default.toolbar}>
                            <Button_1.default disabled={disabled} icon="su-plus-circle" onClick={onHotspotAdd}/>

                            {!value.length &&
                    <div className={hotspotsFormRenderer_scss_1.default.emptyTabsLabel}>
                                    {(0, utils_1.translate)('sulu_media.add_hotspot')}
                                </div>}

                            <components_1.Tabs className={hotspotsFormRenderer_scss_1.default.tabs} onSelect={onHotspotSelect} selectedIndex={selectedIndex} type="inline">
                                {value.map((hotspot, index) => (<components_1.Tabs.Tab key={index}>{'#' + (index + 1)}</components_1.Tabs.Tab>))}
                            </components_1.Tabs>
                        </div>

                        {!!value.length &&
                    <div className={hotspotsFormRenderer_scss_1.default.content}>
                                <div className={hotspotsFormRenderer_scss_1.default.settings}>
                                    <div className={hotspotsFormRenderer_scss_1.default.form}>
                                        <components_1.Form>
                                            <components_1.Form.Field colSpan={5} label={(0, utils_1.translate)('sulu_media.hotspot_type')} required={false} spaceAfter={1}>
                                                <components_1.SingleSelect disabled={disabled} onChange={this.handleHotspotTypeChange} value={this.selectedHotspot.hotspot
                            && this.selectedHotspot.hotspot.type}>
                                                    {Object.keys(AVAILABLE_HOTSPOT_TYPES)
                            .map((key) => (<components_1.SingleSelect.Option key={key} value={key}>
                                                                {(0, utils_1.translate)(AVAILABLE_HOTSPOT_TYPES[key])}
                                                            </components_1.SingleSelect.Option>))}
                                                </components_1.SingleSelect>
                                            </components_1.Form.Field>

                                            {Object.keys(types).length > 1 &&
                            <components_1.Form.Field colSpan={5} label={(0, utils_1.translate)('sulu_media.form_type')} required={false} spaceAfter={1}>
                                                    <components_1.SingleSelect disabled={disabled} onChange={this.handleTypeChange} value={this.selectedHotspot.type}>
                                                        {Object.entries(types).map(([key, value]) => (<components_1.SingleSelect.Option key={key} value={key}>
                                                                {value}
                                                            </components_1.SingleSelect.Option>))}
                                                    </components_1.SingleSelect>
                                                </components_1.Form.Field>}
                                        </components_1.Form>
                                    </div>

                                    <button className={hotspotsFormRenderer_scss_1.default.removeButton} disabled={disabled} onClick={this.handleHotspotRemove} type="button">
                                        <components_1.Icon name="su-trash-alt"/>
                                    </button>
                                </div>

                                {children}
                            </div>}
                    </div>
                </components_1.Form.Field>
            </components_1.Form>);
        }
    };
    __setFunctionName(_classThis, "HotspotsFormRenderer");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_selectedHotspot_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_selectedHotspot_decorators, { kind: "getter", name: "selectedHotspot", static: false, private: false, access: { has: obj => "selectedHotspot" in obj, get: obj => obj.selectedHotspot }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HotspotsFormRenderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HotspotsFormRenderer = _classThis;
})();
exports.default = HotspotsFormRenderer;
