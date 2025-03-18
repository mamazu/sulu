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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const react_leaflet_1 = require("react-leaflet");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const classnames_1 = __importDefault(require("classnames"));
const location_scss_1 = __importDefault(require("./location.scss"));
const LocationOverlay_1 = __importDefault(require("./LocationOverlay"));
let Location = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _overlayOpen_decorators;
    let _overlayOpen_initializers = [];
    let _overlayOpen_extraInitializers = [];
    let _get_label_decorators;
    let _get_hasAdditionalInformation_decorators;
    let _handleEditButtonClick_decorators;
    let _handleEditButtonClick_initializers = [];
    let _handleEditButtonClick_extraInitializers = [];
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    var Location = _classThis = class extends _classSuper {
        get label() {
            const { value } = this.props;
            if (value) {
                return (0, utils_1.translate)('sulu_location.latitude') + ': ' + value.lat + ', '
                    + (0, utils_1.translate)('sulu_location.longitude') + ': ' + value.long + ', '
                    + (0, utils_1.translate)('sulu_location.zoom') + ': ' + value.zoom;
            }
            return (0, utils_1.translate)('sulu_location.select_location');
        }
        get hasAdditionalInformation() {
            const { value } = this.props;
            if (!value) {
                return false;
            }
            return value.code || value.country || value.number || value.street || value.title || value.town;
        }
        componentDidUpdate(prevProps) {
            const prevValue = (0, mobx_1.toJS)(prevProps.value);
            const newValue = (0, mobx_1.toJS)(this.props.value);
            if (!(0, fast_deep_equal_1.default)(prevValue, newValue) && newValue && this.map) {
                this.map.setView([newValue.lat || 0, newValue.long || 0], newValue.zoom || 1);
            }
        }
        render() {
            const { disabled, value, locale, } = this.props;
            const locationClass = (0, classnames_1.default)(location_scss_1.default.locationContainer, {
                [location_scss_1.default.disabled]: disabled,
            });
            return (<div className={locationClass}>
                <div className={location_scss_1.default.locationHeader}>
                    <button className={location_scss_1.default.locationHeaderButton} onClick={this.handleEditButtonClick} type="button">
                        <components_1.Icon name="su-map-pin"/>
                    </button>
                    <div className={location_scss_1.default.locationHeaderLabel}>
                        <components_1.CroppedText>{this.label}</components_1.CroppedText>
                    </div>
                </div>
                {value &&
                    <react_leaflet_1.MapContainer attributionControl={false} center={[value.lat, value.long]} className={location_scss_1.default.locationMap} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} tap={false} whenCreated={this.setLeafletMap} zoom={value.zoom} zoomControl={false}>
                        <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <react_leaflet_1.Marker interactive={false} position={[value.lat, value.long]}>
                            {this.hasAdditionalInformation &&
                            <react_leaflet_1.Tooltip className={location_scss_1.default.locationMapTooltip} permanent={true}>
                                    <div><b>{value.title}</b></div>
                                    <div>{value.street} {value.number}</div>
                                    <div>{value.code} {value.town}</div>
                                    <div>{value.country}</div>
                                </react_leaflet_1.Tooltip>}
                        </react_leaflet_1.Marker>
                    </react_leaflet_1.MapContainer>}
                <LocationOverlay_1.default locale={locale} onClose={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} open={this.overlayOpen} value={value}/>
            </div>);
        }
        constructor() {
            super(...arguments);
            this.overlayOpen = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _overlayOpen_initializers, false));
            this.map = __runInitializers(this, _overlayOpen_extraInitializers);
            this.setLeafletMap = (map) => {
                this.map = map;
            };
            this.handleEditButtonClick = __runInitializers(this, _handleEditButtonClick_initializers, () => {
                this.overlayOpen = true;
            });
            this.handleOverlayConfirm = (__runInitializers(this, _handleEditButtonClick_extraInitializers), __runInitializers(this, _handleOverlayConfirm_initializers, (newValue) => {
                this.overlayOpen = false;
                this.props.onChange(newValue);
            }));
            this.handleOverlayClose = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.overlayOpen = false;
            }));
            __runInitializers(this, _handleOverlayClose_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Location");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _overlayOpen_decorators = [mobx_1.observable];
        _get_label_decorators = [mobx_1.computed];
        _get_hasAdditionalInformation_decorators = [mobx_1.computed];
        _handleEditButtonClick_decorators = [mobx_1.action];
        _handleOverlayConfirm_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_label_decorators, { kind: "getter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasAdditionalInformation_decorators, { kind: "getter", name: "hasAdditionalInformation", static: false, private: false, access: { has: obj => "hasAdditionalInformation" in obj, get: obj => obj.hasAdditionalInformation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _overlayOpen_decorators, { kind: "field", name: "overlayOpen", static: false, private: false, access: { has: obj => "overlayOpen" in obj, get: obj => obj.overlayOpen, set: (obj, value) => { obj.overlayOpen = value; } }, metadata: _metadata }, _overlayOpen_initializers, _overlayOpen_extraInitializers);
        __esDecorate(null, null, _handleEditButtonClick_decorators, { kind: "field", name: "handleEditButtonClick", static: false, private: false, access: { has: obj => "handleEditButtonClick" in obj, get: obj => obj.handleEditButtonClick, set: (obj, value) => { obj.handleEditButtonClick = value; } }, metadata: _metadata }, _handleEditButtonClick_initializers, _handleEditButtonClick_extraInitializers);
        __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Location = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Location = _classThis;
})();
exports.default = Location;
