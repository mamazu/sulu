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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const react_leaflet_1 = require("react-leaflet");
const containers_1 = require("sulu-admin-bundle/containers");
const SingleSelectionStore_1 = __importDefault(require("sulu-admin-bundle/stores/SingleSelectionStore"));
const locationOverlay_scss_1 = __importDefault(require("./locationOverlay.scss"));
let LocationOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _lat_decorators;
    let _lat_initializers = [];
    let _lat_extraInitializers = [];
    let _long_decorators;
    let _long_initializers = [];
    let _long_extraInitializers = [];
    let _zoom_decorators;
    let _zoom_initializers = [];
    let _zoom_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _street_decorators;
    let _street_initializers = [];
    let _street_extraInitializers = [];
    let _number_decorators;
    let _number_initializers = [];
    let _number_extraInitializers = [];
    let _code_decorators;
    let _code_initializers = [];
    let _code_extraInitializers = [];
    let _town_decorators;
    let _town_initializers = [];
    let _town_extraInitializers = [];
    let _country_decorators;
    let _country_initializers = [];
    let _country_extraInitializers = [];
    let _handleAutoCompleteChange_decorators;
    let _handleAutoCompleteChange_initializers = [];
    let _handleAutoCompleteChange_extraInitializers = [];
    let _handleMapZoom_decorators;
    let _handleMapZoom_initializers = [];
    let _handleMapZoom_extraInitializers = [];
    let _handleMarkerDrag_decorators;
    let _handleMarkerDrag_initializers = [];
    let _handleMarkerDrag_extraInitializers = [];
    let _handleMarkerDragEnd_decorators;
    let _handleMarkerDragEnd_initializers = [];
    let _handleMarkerDragEnd_extraInitializers = [];
    let _handleResetLocation_decorators;
    let _handleResetLocation_initializers = [];
    let _handleResetLocation_extraInitializers = [];
    let _handleTitleChange_decorators;
    let _handleTitleChange_initializers = [];
    let _handleTitleChange_extraInitializers = [];
    let _handleStreetChange_decorators;
    let _handleStreetChange_initializers = [];
    let _handleStreetChange_extraInitializers = [];
    let _handleNumberChange_decorators;
    let _handleNumberChange_initializers = [];
    let _handleNumberChange_extraInitializers = [];
    let _handleCodeChange_decorators;
    let _handleCodeChange_initializers = [];
    let _handleCodeChange_extraInitializers = [];
    let _handleTownChange_decorators;
    let _handleTownChange_initializers = [];
    let _handleTownChange_extraInitializers = [];
    let _handleCountryChange_decorators;
    let _handleCountryChange_initializers = [];
    let _handleCountryChange_extraInitializers = [];
    let _handleLatChange_decorators;
    let _handleLatChange_initializers = [];
    let _handleLatChange_extraInitializers = [];
    let _handleLongChange_decorators;
    let _handleLongChange_initializers = [];
    let _handleLongChange_extraInitializers = [];
    let _handleZoomChange_decorators;
    let _handleZoomChange_initializers = [];
    let _handleZoomChange_extraInitializers = [];
    var LocationOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.lat = __runInitializers(this, _lat_initializers, void 0);
            this.long = (__runInitializers(this, _lat_extraInitializers), __runInitializers(this, _long_initializers, void 0));
            this.zoom = (__runInitializers(this, _long_extraInitializers), __runInitializers(this, _zoom_initializers, void 0));
            this.title = (__runInitializers(this, _zoom_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.street = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _street_initializers, void 0));
            this.number = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _number_initializers, void 0));
            this.code = (__runInitializers(this, _number_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.town = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _town_initializers, void 0));
            this.country = (__runInitializers(this, _town_extraInitializers), __runInitializers(this, _country_initializers, void 0));
            this.map = __runInitializers(this, _country_extraInitializers);
            this.setLeafletMap = (map) => {
                map.on('zoomanim', this.handleMapZoom);
                this.map = map;
            };
            this.updateMapToData = () => {
                if (this.map) {
                    this.map.setView([this.lat || 0, this.long || 0], this.zoom || 1);
                }
            };
            this.handleConfirm = () => {
                const { onConfirm } = this.props;
                const { title, street, number, code, town, country, lat, long, zoom } = this;
                if (lat === null || lat === undefined || long === null || long === undefined) {
                    onConfirm(null);
                    return;
                }
                onConfirm({
                    title,
                    street,
                    number,
                    code,
                    town,
                    country,
                    lat,
                    long,
                    zoom,
                });
            };
            this.handleAutoCompleteChange = __runInitializers(this, _handleAutoCompleteChange_initializers, (data) => {
                if (!data) {
                    return;
                }
                this.lat = data.latitude;
                this.long = data.longitude;
                this.updateMapToData();
                this.title = data.displayTitle;
                this.street = data.street;
                this.number = data.number;
                this.code = data.code;
                this.town = data.town;
                this.country = data.country;
            });
            this.handleMapZoom = (__runInitializers(this, _handleAutoCompleteChange_extraInitializers), __runInitializers(this, _handleMapZoom_initializers, (event) => {
                this.zoom = event.zoom;
            }));
            this.handleMarkerDrag = (__runInitializers(this, _handleMapZoom_extraInitializers), __runInitializers(this, _handleMarkerDrag_initializers, (event) => {
                this.long = event.latlng.lng;
                this.lat = event.latlng.lat;
            }));
            this.handleMarkerDragEnd = (__runInitializers(this, _handleMarkerDrag_extraInitializers), __runInitializers(this, _handleMarkerDragEnd_initializers, () => {
                this.updateMapToData();
            }));
            this.handleResetLocation = (__runInitializers(this, _handleMarkerDragEnd_extraInitializers), __runInitializers(this, _handleResetLocation_initializers, () => {
                this.long = null;
                this.lat = null;
                this.zoom = 1;
                this.updateMapToData();
                this.title = null;
                this.street = null;
                this.number = null;
                this.code = null;
                this.town = null;
                this.country = null;
            }));
            this.handleTitleChange = (__runInitializers(this, _handleResetLocation_extraInitializers), __runInitializers(this, _handleTitleChange_initializers, (title) => {
                this.title = title;
            }));
            this.handleStreetChange = (__runInitializers(this, _handleTitleChange_extraInitializers), __runInitializers(this, _handleStreetChange_initializers, (street) => {
                this.street = street;
            }));
            this.handleNumberChange = (__runInitializers(this, _handleStreetChange_extraInitializers), __runInitializers(this, _handleNumberChange_initializers, (number) => {
                this.number = number;
            }));
            this.handleCodeChange = (__runInitializers(this, _handleNumberChange_extraInitializers), __runInitializers(this, _handleCodeChange_initializers, (code) => {
                this.code = code;
            }));
            this.handleTownChange = (__runInitializers(this, _handleCodeChange_extraInitializers), __runInitializers(this, _handleTownChange_initializers, (town) => {
                this.town = town;
            }));
            this.handleCountryChange = (__runInitializers(this, _handleTownChange_extraInitializers), __runInitializers(this, _handleCountryChange_initializers, (country) => {
                this.country = country;
            }));
            this.handleLatChange = (__runInitializers(this, _handleCountryChange_extraInitializers), __runInitializers(this, _handleLatChange_initializers, (lat) => {
                this.lat = lat;
                this.updateMapToData();
            }));
            this.handleLongChange = (__runInitializers(this, _handleLatChange_extraInitializers), __runInitializers(this, _handleLongChange_initializers, (long) => {
                this.long = long;
                this.updateMapToData();
            }));
            this.handleZoomChange = (__runInitializers(this, _handleLongChange_extraInitializers), __runInitializers(this, _handleZoomChange_initializers, (zoom) => {
                this.zoom = zoom || 1;
                this.updateMapToData();
            }));
            __runInitializers(this, _handleZoomChange_extraInitializers);
            this.geolocatorSelectionStore = new SingleSelectionStore_1.default('geolocator_locations', undefined, mobx_1.observable.box(props.locale));
            this.updateDataOnGeolocatorSelectDisposer = (0, mobx_1.reaction)(() => this.geolocatorSelectionStore.item, this.handleAutoCompleteChange);
            this.updateDataOnOpenDisposer = (0, mobx_1.reaction)(() => this.props.open, (newOpenValue) => {
                if (newOpenValue === true) {
                    this.lat = this.props.value ? this.props.value.lat : null;
                    this.long = this.props.value ? this.props.value.long : null;
                    this.zoom = this.props.value ? this.props.value.zoom : 1;
                    this.updateMapToData();
                    this.title = this.props.value ? this.props.value.title : null;
                    this.street = this.props.value ? this.props.value.street : null;
                    this.number = this.props.value ? this.props.value.number : null;
                    this.code = this.props.value ? this.props.value.code : null;
                    this.town = this.props.value ? this.props.value.town : null;
                    this.country = this.props.value ? this.props.value.country : null;
                }
            }, { fireImmediately: true });
        }
        componentWillUnmount() {
            this.updateDataOnGeolocatorSelectDisposer();
            this.updateDataOnOpenDisposer();
        }
        render() {
            const { onClose, open, } = this.props;
            // enable confirm button if all marker properties are set or no property is set in case of a reset
            const confirmEnabled = (this.lat !== null && this.long !== null)
                || (this.lat === null && this.long === null);
            return (<components_1.Overlay actions={[
                    {
                        title: (0, utils_1.translate)('sulu_admin.reset'),
                        onClick: this.handleResetLocation,
                    },
                ]} confirmDisabled={!confirmEnabled} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={(0, utils_1.translate)('sulu_location.select_location')}>
                <div className={locationOverlay_scss_1.default.container}>
                    <components_1.Form>
                        <components_1.Form.Field>
                            <containers_1.SingleAutoComplete displayProperty="displayTitle" searchProperties={['displayTitle']} selectionStore={this.geolocatorSelectionStore}/>
                        </components_1.Form.Field>

                        <components_1.Form.Field>
                            <react_leaflet_1.MapContainer attributionControl={false} center={[this.lat || 0, this.long || 0]} className={locationOverlay_scss_1.default.map} whenCreated={this.setLeafletMap} zoom={this.zoom}>
                                <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                <react_leaflet_1.Marker draggable={true} eventHandlers={{
                    drag: this.handleMarkerDrag,
                    dragend: this.handleMarkerDragEnd,
                }} position={[this.lat || 0, this.long || 0]}/>
                            </react_leaflet_1.MapContainer>
                        </components_1.Form.Field>

                        <components_1.Form.Field colSpan={4} label={(0, utils_1.translate)('sulu_location.latitude')} required={true}>
                            <components_1.Number onChange={this.handleLatChange} step={0.001} value={this.lat}/>
                        </components_1.Form.Field>
                        <components_1.Form.Field colSpan={4} label={(0, utils_1.translate)('sulu_location.longitude')} required={true}>
                            <components_1.Number onChange={this.handleLongChange} step={0.001} value={this.long}/>
                        </components_1.Form.Field>
                        <components_1.Form.Field colSpan={4} label={(0, utils_1.translate)('sulu_location.zoom')} required={true}>
                            <components_1.Number max={18} min={0} onChange={this.handleZoomChange} value={this.zoom}/>
                        </components_1.Form.Field>

                        <components_1.Form.Section label={(0, utils_1.translate)('sulu_location.additional_information')}>
                            <components_1.Form.Field label={(0, utils_1.translate)('sulu_location.title')}>
                                <components_1.Input onChange={this.handleTitleChange} value={this.title}/>
                            </components_1.Form.Field>
                            <components_1.Form.Field colSpan={6} label={(0, utils_1.translate)('sulu_location.street')}>
                                <components_1.Input onChange={this.handleStreetChange} value={this.street}/>
                            </components_1.Form.Field>
                            <components_1.Form.Field colSpan={6} label={(0, utils_1.translate)('sulu_location.number')}>
                                <components_1.Input onChange={this.handleNumberChange} value={this.number}/>
                            </components_1.Form.Field>
                            <components_1.Form.Field colSpan={6} label={(0, utils_1.translate)('sulu_location.code')}>
                                <components_1.Input onChange={this.handleCodeChange} value={this.code}/>
                            </components_1.Form.Field>
                            <components_1.Form.Field colSpan={6} label={(0, utils_1.translate)('sulu_location.town')}>
                                <components_1.Input onChange={this.handleTownChange} value={this.town}/>
                            </components_1.Form.Field>
                            <components_1.Form.Field label={(0, utils_1.translate)('sulu_location.country')}>
                                <components_1.Input onChange={this.handleCountryChange} value={this.country}/>
                            </components_1.Form.Field>
                        </components_1.Form.Section>
                    </components_1.Form>
                </div>
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "LocationOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _lat_decorators = [mobx_1.observable];
        _long_decorators = [mobx_1.observable];
        _zoom_decorators = [mobx_1.observable];
        _title_decorators = [mobx_1.observable];
        _street_decorators = [mobx_1.observable];
        _number_decorators = [mobx_1.observable];
        _code_decorators = [mobx_1.observable];
        _town_decorators = [mobx_1.observable];
        _country_decorators = [mobx_1.observable];
        _handleAutoCompleteChange_decorators = [mobx_1.action];
        _handleMapZoom_decorators = [mobx_1.action];
        _handleMarkerDrag_decorators = [mobx_1.action];
        _handleMarkerDragEnd_decorators = [mobx_1.action];
        _handleResetLocation_decorators = [mobx_1.action];
        _handleTitleChange_decorators = [mobx_1.action];
        _handleStreetChange_decorators = [mobx_1.action];
        _handleNumberChange_decorators = [mobx_1.action];
        _handleCodeChange_decorators = [mobx_1.action];
        _handleTownChange_decorators = [mobx_1.action];
        _handleCountryChange_decorators = [mobx_1.action];
        _handleLatChange_decorators = [mobx_1.action];
        _handleLongChange_decorators = [mobx_1.action];
        _handleZoomChange_decorators = [mobx_1.action];
        __esDecorate(null, null, _lat_decorators, { kind: "field", name: "lat", static: false, private: false, access: { has: obj => "lat" in obj, get: obj => obj.lat, set: (obj, value) => { obj.lat = value; } }, metadata: _metadata }, _lat_initializers, _lat_extraInitializers);
        __esDecorate(null, null, _long_decorators, { kind: "field", name: "long", static: false, private: false, access: { has: obj => "long" in obj, get: obj => obj.long, set: (obj, value) => { obj.long = value; } }, metadata: _metadata }, _long_initializers, _long_extraInitializers);
        __esDecorate(null, null, _zoom_decorators, { kind: "field", name: "zoom", static: false, private: false, access: { has: obj => "zoom" in obj, get: obj => obj.zoom, set: (obj, value) => { obj.zoom = value; } }, metadata: _metadata }, _zoom_initializers, _zoom_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: obj => "street" in obj, get: obj => obj.street, set: (obj, value) => { obj.street = value; } }, metadata: _metadata }, _street_initializers, _street_extraInitializers);
        __esDecorate(null, null, _number_decorators, { kind: "field", name: "number", static: false, private: false, access: { has: obj => "number" in obj, get: obj => obj.number, set: (obj, value) => { obj.number = value; } }, metadata: _metadata }, _number_initializers, _number_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: obj => "code" in obj, get: obj => obj.code, set: (obj, value) => { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _town_decorators, { kind: "field", name: "town", static: false, private: false, access: { has: obj => "town" in obj, get: obj => obj.town, set: (obj, value) => { obj.town = value; } }, metadata: _metadata }, _town_initializers, _town_extraInitializers);
        __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: obj => "country" in obj, get: obj => obj.country, set: (obj, value) => { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
        __esDecorate(null, null, _handleAutoCompleteChange_decorators, { kind: "field", name: "handleAutoCompleteChange", static: false, private: false, access: { has: obj => "handleAutoCompleteChange" in obj, get: obj => obj.handleAutoCompleteChange, set: (obj, value) => { obj.handleAutoCompleteChange = value; } }, metadata: _metadata }, _handleAutoCompleteChange_initializers, _handleAutoCompleteChange_extraInitializers);
        __esDecorate(null, null, _handleMapZoom_decorators, { kind: "field", name: "handleMapZoom", static: false, private: false, access: { has: obj => "handleMapZoom" in obj, get: obj => obj.handleMapZoom, set: (obj, value) => { obj.handleMapZoom = value; } }, metadata: _metadata }, _handleMapZoom_initializers, _handleMapZoom_extraInitializers);
        __esDecorate(null, null, _handleMarkerDrag_decorators, { kind: "field", name: "handleMarkerDrag", static: false, private: false, access: { has: obj => "handleMarkerDrag" in obj, get: obj => obj.handleMarkerDrag, set: (obj, value) => { obj.handleMarkerDrag = value; } }, metadata: _metadata }, _handleMarkerDrag_initializers, _handleMarkerDrag_extraInitializers);
        __esDecorate(null, null, _handleMarkerDragEnd_decorators, { kind: "field", name: "handleMarkerDragEnd", static: false, private: false, access: { has: obj => "handleMarkerDragEnd" in obj, get: obj => obj.handleMarkerDragEnd, set: (obj, value) => { obj.handleMarkerDragEnd = value; } }, metadata: _metadata }, _handleMarkerDragEnd_initializers, _handleMarkerDragEnd_extraInitializers);
        __esDecorate(null, null, _handleResetLocation_decorators, { kind: "field", name: "handleResetLocation", static: false, private: false, access: { has: obj => "handleResetLocation" in obj, get: obj => obj.handleResetLocation, set: (obj, value) => { obj.handleResetLocation = value; } }, metadata: _metadata }, _handleResetLocation_initializers, _handleResetLocation_extraInitializers);
        __esDecorate(null, null, _handleTitleChange_decorators, { kind: "field", name: "handleTitleChange", static: false, private: false, access: { has: obj => "handleTitleChange" in obj, get: obj => obj.handleTitleChange, set: (obj, value) => { obj.handleTitleChange = value; } }, metadata: _metadata }, _handleTitleChange_initializers, _handleTitleChange_extraInitializers);
        __esDecorate(null, null, _handleStreetChange_decorators, { kind: "field", name: "handleStreetChange", static: false, private: false, access: { has: obj => "handleStreetChange" in obj, get: obj => obj.handleStreetChange, set: (obj, value) => { obj.handleStreetChange = value; } }, metadata: _metadata }, _handleStreetChange_initializers, _handleStreetChange_extraInitializers);
        __esDecorate(null, null, _handleNumberChange_decorators, { kind: "field", name: "handleNumberChange", static: false, private: false, access: { has: obj => "handleNumberChange" in obj, get: obj => obj.handleNumberChange, set: (obj, value) => { obj.handleNumberChange = value; } }, metadata: _metadata }, _handleNumberChange_initializers, _handleNumberChange_extraInitializers);
        __esDecorate(null, null, _handleCodeChange_decorators, { kind: "field", name: "handleCodeChange", static: false, private: false, access: { has: obj => "handleCodeChange" in obj, get: obj => obj.handleCodeChange, set: (obj, value) => { obj.handleCodeChange = value; } }, metadata: _metadata }, _handleCodeChange_initializers, _handleCodeChange_extraInitializers);
        __esDecorate(null, null, _handleTownChange_decorators, { kind: "field", name: "handleTownChange", static: false, private: false, access: { has: obj => "handleTownChange" in obj, get: obj => obj.handleTownChange, set: (obj, value) => { obj.handleTownChange = value; } }, metadata: _metadata }, _handleTownChange_initializers, _handleTownChange_extraInitializers);
        __esDecorate(null, null, _handleCountryChange_decorators, { kind: "field", name: "handleCountryChange", static: false, private: false, access: { has: obj => "handleCountryChange" in obj, get: obj => obj.handleCountryChange, set: (obj, value) => { obj.handleCountryChange = value; } }, metadata: _metadata }, _handleCountryChange_initializers, _handleCountryChange_extraInitializers);
        __esDecorate(null, null, _handleLatChange_decorators, { kind: "field", name: "handleLatChange", static: false, private: false, access: { has: obj => "handleLatChange" in obj, get: obj => obj.handleLatChange, set: (obj, value) => { obj.handleLatChange = value; } }, metadata: _metadata }, _handleLatChange_initializers, _handleLatChange_extraInitializers);
        __esDecorate(null, null, _handleLongChange_decorators, { kind: "field", name: "handleLongChange", static: false, private: false, access: { has: obj => "handleLongChange" in obj, get: obj => obj.handleLongChange, set: (obj, value) => { obj.handleLongChange = value; } }, metadata: _metadata }, _handleLongChange_initializers, _handleLongChange_extraInitializers);
        __esDecorate(null, null, _handleZoomChange_decorators, { kind: "field", name: "handleZoomChange", static: false, private: false, access: { has: obj => "handleZoomChange" in obj, get: obj => obj.handleZoomChange, set: (obj, value) => { obj.handleZoomChange = value; } }, metadata: _metadata }, _handleZoomChange_initializers, _handleZoomChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationOverlay = _classThis;
})();
exports.default = LocationOverlay;
