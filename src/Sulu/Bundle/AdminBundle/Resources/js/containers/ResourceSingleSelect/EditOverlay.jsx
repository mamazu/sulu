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
const Button_1 = __importDefault(require("../../components/Button"));
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const Translator_1 = require("../../utils/Translator");
const EditLine_1 = __importDefault(require("./EditLine"));
const editOverlay_scss_1 = __importDefault(require("./editOverlay.scss"));
let EditOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _updateData_decorators;
    let _updateData_initializers = [];
    let _updateData_extraInitializers = [];
    let _handleEditLineChange_decorators;
    let _handleEditLineChange_initializers = [];
    let _handleEditLineChange_extraInitializers = [];
    let _handleEditLineRemove_decorators;
    let _handleEditLineRemove_initializers = [];
    let _handleEditLineRemove_extraInitializers = [];
    let _handleEditLineAdd_decorators;
    let _handleEditLineAdd_initializers = [];
    let _handleEditLineAdd_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    var EditOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.data = __runInitializers(this, _data_initializers, void 0);
            this.updateDataDisposer = __runInitializers(this, _data_extraInitializers);
            this.setInputRef = (inputRef) => {
                if (inputRef) {
                    inputRef.focus();
                }
            };
            this.updateData = __runInitializers(this, _updateData_initializers, (data) => {
                this.data = (0, mobx_1.toJS)(data);
            });
            this.handleEditLineChange = (__runInitializers(this, _updateData_extraInitializers), __runInitializers(this, _handleEditLineChange_initializers, (index, value) => {
                const { displayProperty } = this.props;
                this.data[index][displayProperty] = value;
            }));
            this.handleEditLineRemove = (__runInitializers(this, _handleEditLineChange_extraInitializers), __runInitializers(this, _handleEditLineRemove_initializers, (index) => {
                this.data.splice(index, 1);
            }));
            this.handleEditLineAdd = (__runInitializers(this, _handleEditLineRemove_extraInitializers), __runInitializers(this, _handleEditLineAdd_initializers, () => {
                const { displayProperty } = this.props;
                this.data.push({ [displayProperty]: undefined });
            }));
            this.handleConfirm = (__runInitializers(this, _handleEditLineAdd_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                const { displayProperty, idProperty, onClose, resourceListStore } = this.props;
                const { data } = this;
                const entriesToAdd = data
                    .filter((entry, index) => {
                    return data.findIndex((dataEntry) => dataEntry[displayProperty] == entry[displayProperty]) === index;
                })
                    .filter((entry) => !entry[idProperty]);
                const entriesToDelete = resourceListStore.data
                    .filter((entry) => !data.some((dataEntry) => dataEntry[idProperty] === entry[idProperty]));
                const entriesToUpdate = data.filter((dataEntry) => {
                    const entry = resourceListStore.data.find((entry) => dataEntry[idProperty] === entry[idProperty]);
                    return entry && entry[displayProperty] !== dataEntry[displayProperty];
                });
                if (entriesToDelete.length > 0) {
                    resourceListStore.deleteList(entriesToDelete.map((entry) => entry[idProperty]));
                }
                if (entriesToAdd.length > 0 || entriesToUpdate.length > 0) {
                    const patchEntries = [...entriesToAdd, ...entriesToUpdate].filter((entry) => entry[displayProperty]);
                    resourceListStore.patchList(patchEntries);
                }
                onClose();
            }));
            __runInitializers(this, _handleConfirm_extraInitializers);
            this.updateDataDisposer = (0, mobx_1.autorun)(() => this.updateData(this.props.resourceListStore.data));
        }
        componentWillUnmount() {
            this.updateDataDisposer();
        }
        render() {
            const { displayProperty, onClose, open, resourceListStore, title } = this.props;
            return (<Overlay_1.default confirmLoading={resourceListStore.loading} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={title || (0, Translator_1.translate)('sulu_admin.edit_entries')}>
                <div className={editOverlay_scss_1.default.overlay}>
                    {this.data.map((object, index) => (<EditLine_1.default id={index} inputRef={this.setInputRef} key={index} onChange={this.handleEditLineChange} onRemove={this.handleEditLineRemove} value={object[displayProperty]}/>))}
                    <Button_1.default icon="su-plus" onClick={this.handleEditLineAdd} skin="secondary">
                        {(0, Translator_1.translate)('sulu_admin.add')}
                    </Button_1.default>
                </div>
            </Overlay_1.default>);
        }
    };
    __setFunctionName(_classThis, "EditOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _data_decorators = [mobx_1.observable];
        _updateData_decorators = [mobx_1.action];
        _handleEditLineChange_decorators = [mobx_1.action];
        _handleEditLineRemove_decorators = [mobx_1.action];
        _handleEditLineAdd_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
        __esDecorate(null, null, _updateData_decorators, { kind: "field", name: "updateData", static: false, private: false, access: { has: obj => "updateData" in obj, get: obj => obj.updateData, set: (obj, value) => { obj.updateData = value; } }, metadata: _metadata }, _updateData_initializers, _updateData_extraInitializers);
        __esDecorate(null, null, _handleEditLineChange_decorators, { kind: "field", name: "handleEditLineChange", static: false, private: false, access: { has: obj => "handleEditLineChange" in obj, get: obj => obj.handleEditLineChange, set: (obj, value) => { obj.handleEditLineChange = value; } }, metadata: _metadata }, _handleEditLineChange_initializers, _handleEditLineChange_extraInitializers);
        __esDecorate(null, null, _handleEditLineRemove_decorators, { kind: "field", name: "handleEditLineRemove", static: false, private: false, access: { has: obj => "handleEditLineRemove" in obj, get: obj => obj.handleEditLineRemove, set: (obj, value) => { obj.handleEditLineRemove = value; } }, metadata: _metadata }, _handleEditLineRemove_initializers, _handleEditLineRemove_extraInitializers);
        __esDecorate(null, null, _handleEditLineAdd_decorators, { kind: "field", name: "handleEditLineAdd", static: false, private: false, access: { has: obj => "handleEditLineAdd" in obj, get: obj => obj.handleEditLineAdd, set: (obj, value) => { obj.handleEditLineAdd = value; } }, metadata: _metadata }, _handleEditLineAdd_initializers, _handleEditLineAdd_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EditOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EditOverlay = _classThis;
})();
exports.default = EditOverlay;
