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
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const ruleRegistry_1 = __importDefault(require("./registries/ruleRegistry"));
const RuleOverlay_1 = __importDefault(require("./RuleOverlay"));
const targetGroupRules_scss_1 = __importDefault(require("./targetGroupRules.scss"));
const utils_2 = require("./utils");
let TargetGroupRules = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _showOverlay_decorators;
    let _showOverlay_initializers = [];
    let _showOverlay_extraInitializers = [];
    let _ruleIndex_decorators;
    let _ruleIndex_initializers = [];
    let _ruleIndex_extraInitializers = [];
    let _selectedIndices_decorators;
    let _selectedIndices_initializers = [];
    let _selectedIndices_extraInitializers = [];
    let _handlePlusButtonClick_decorators;
    let _handlePlusButtonClick_initializers = [];
    let _handlePlusButtonClick_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleRemoveButtonClick_decorators;
    let _handleRemoveButtonClick_initializers = [];
    let _handleRemoveButtonClick_extraInitializers = [];
    let _handleAllSelectionChange_decorators;
    let _handleAllSelectionChange_initializers = [];
    let _handleAllSelectionChange_extraInitializers = [];
    let _handleSelectionChange_decorators;
    let _handleSelectionChange_initializers = [];
    let _handleSelectionChange_extraInitializers = [];
    let _handleEditClick_decorators;
    let _handleEditClick_initializers = [];
    let _handleEditClick_extraInitializers = [];
    var TargetGroupRules = _classThis = class extends _classSuper {
        render() {
            const { ruleIndex } = this;
            const { value } = this.props;
            return (<react_1.Fragment>
                <div className={targetGroupRules_scss_1.default.buttons}>
                    <components_1.ButtonGroup>
                        <components_1.Button icon="su-plus" onClick={this.handlePlusButtonClick}/>
                        <components_1.Button disabled={this.selectedIndices.length === 0} icon="su-trash-alt" onClick={this.handleRemoveButtonClick}/>
                    </components_1.ButtonGroup>
                </div>
                <components_1.Table buttons={[
                    { icon: 'su-pen', onClick: this.handleEditClick },
                ]} onAllSelectionChange={this.handleAllSelectionChange} onRowSelectionChange={this.handleSelectionChange} selectMode="multiple">
                    <components_1.Table.Header>
                        <components_1.Table.HeaderCell>
                            {(0, utils_1.translate)('sulu_admin.title')}
                        </components_1.Table.HeaderCell>
                        <components_1.Table.HeaderCell>
                            {(0, utils_1.translate)('sulu_audience_targeting.assigned_at')}
                        </components_1.Table.HeaderCell>
                        <components_1.Table.HeaderCell>
                            {(0, utils_1.translate)('sulu_audience_targeting.conditions')}
                        </components_1.Table.HeaderCell>
                    </components_1.Table.Header>
                    <components_1.Table.Body>
                        {value.map((rule, index) => (<components_1.Table.Row key={index} selected={this.selectedIndices.includes(index)}>
                                <components_1.Table.Cell>{rule.title}</components_1.Table.Cell>
                                <components_1.Table.Cell>{(0, utils_2.getFrequencyTranslation)(rule.frequency)}</components_1.Table.Cell>
                                <components_1.Table.Cell>
                                    {rule.conditions
                        .map((condition) => condition.type
                        ? ruleRegistry_1.default.get(condition.type).name
                        : undefined)
                        .filter((conditionType) => conditionType)
                        .join(' & ')}
                                </components_1.Table.Cell>
                            </components_1.Table.Row>))}
                    </components_1.Table.Body>
                </components_1.Table>
                <RuleOverlay_1.default onClose={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} open={this.showOverlay} value={ruleIndex !== undefined ? value[ruleIndex] : undefined}/>
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.showOverlay = __runInitializers(this, _showOverlay_initializers, false);
            this.ruleIndex = (__runInitializers(this, _showOverlay_extraInitializers), __runInitializers(this, _ruleIndex_initializers, undefined));
            this.selectedIndices = (__runInitializers(this, _ruleIndex_extraInitializers), __runInitializers(this, _selectedIndices_initializers, []));
            this.handlePlusButtonClick = (__runInitializers(this, _selectedIndices_extraInitializers), __runInitializers(this, _handlePlusButtonClick_initializers, () => {
                this.showOverlay = true;
                this.ruleIndex = undefined;
            }));
            this.handleOverlayClose = (__runInitializers(this, _handlePlusButtonClick_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.showOverlay = false;
                this.ruleIndex = undefined;
            }));
            this.handleOverlayConfirm = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleOverlayConfirm_initializers, (rule) => {
                const { onChange, value = [] } = this.props;
                if (this.ruleIndex === undefined) {
                    onChange([...value, rule]);
                }
                else {
                    const newValue = [...value];
                    newValue.splice(this.ruleIndex, 1, rule);
                    onChange(newValue);
                }
                this.showOverlay = false;
                this.ruleIndex = undefined;
            }));
            this.handleRemoveButtonClick = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleRemoveButtonClick_initializers, () => {
                const { onChange, value = [] } = this.props;
                onChange(value.filter((rule, index) => !this.selectedIndices.includes(index)));
                this.selectedIndices.splice(0, this.selectedIndices.length);
            }));
            this.handleAllSelectionChange = (__runInitializers(this, _handleRemoveButtonClick_extraInitializers), __runInitializers(this, _handleAllSelectionChange_initializers, (checked) => {
                if (!checked) {
                    this.selectedIndices.splice(0, this.selectedIndices.length);
                }
                else {
                    const { value } = this.props;
                    value.forEach((rule, index) => {
                        if (!this.selectedIndices.includes(index)) {
                            this.selectedIndices.push(index);
                        }
                    });
                }
            }));
            this.handleSelectionChange = (__runInitializers(this, _handleAllSelectionChange_extraInitializers), __runInitializers(this, _handleSelectionChange_initializers, (id, checked) => {
                if (checked && !this.selectedIndices.includes(id)) {
                    this.selectedIndices.push(id);
                }
                if (!checked && this.selectedIndices.includes(id)) {
                    this.selectedIndices.splice(this.selectedIndices.findIndex((value) => value === id), 1);
                }
            }));
            this.handleEditClick = (__runInitializers(this, _handleSelectionChange_extraInitializers), __runInitializers(this, _handleEditClick_initializers, (rowId, index) => {
                this.ruleIndex = index;
                this.showOverlay = true;
            }));
            __runInitializers(this, _handleEditClick_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TargetGroupRules");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showOverlay_decorators = [mobx_1.observable];
        _ruleIndex_decorators = [mobx_1.observable];
        _selectedIndices_decorators = [mobx_1.observable];
        _handlePlusButtonClick_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        _handleOverlayConfirm_decorators = [mobx_1.action];
        _handleRemoveButtonClick_decorators = [mobx_1.action];
        _handleAllSelectionChange_decorators = [mobx_1.action];
        _handleSelectionChange_decorators = [mobx_1.action];
        _handleEditClick_decorators = [mobx_1.action];
        __esDecorate(null, null, _showOverlay_decorators, { kind: "field", name: "showOverlay", static: false, private: false, access: { has: obj => "showOverlay" in obj, get: obj => obj.showOverlay, set: (obj, value) => { obj.showOverlay = value; } }, metadata: _metadata }, _showOverlay_initializers, _showOverlay_extraInitializers);
        __esDecorate(null, null, _ruleIndex_decorators, { kind: "field", name: "ruleIndex", static: false, private: false, access: { has: obj => "ruleIndex" in obj, get: obj => obj.ruleIndex, set: (obj, value) => { obj.ruleIndex = value; } }, metadata: _metadata }, _ruleIndex_initializers, _ruleIndex_extraInitializers);
        __esDecorate(null, null, _selectedIndices_decorators, { kind: "field", name: "selectedIndices", static: false, private: false, access: { has: obj => "selectedIndices" in obj, get: obj => obj.selectedIndices, set: (obj, value) => { obj.selectedIndices = value; } }, metadata: _metadata }, _selectedIndices_initializers, _selectedIndices_extraInitializers);
        __esDecorate(null, null, _handlePlusButtonClick_decorators, { kind: "field", name: "handlePlusButtonClick", static: false, private: false, access: { has: obj => "handlePlusButtonClick" in obj, get: obj => obj.handlePlusButtonClick, set: (obj, value) => { obj.handlePlusButtonClick = value; } }, metadata: _metadata }, _handlePlusButtonClick_initializers, _handlePlusButtonClick_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleRemoveButtonClick_decorators, { kind: "field", name: "handleRemoveButtonClick", static: false, private: false, access: { has: obj => "handleRemoveButtonClick" in obj, get: obj => obj.handleRemoveButtonClick, set: (obj, value) => { obj.handleRemoveButtonClick = value; } }, metadata: _metadata }, _handleRemoveButtonClick_initializers, _handleRemoveButtonClick_extraInitializers);
        __esDecorate(null, null, _handleAllSelectionChange_decorators, { kind: "field", name: "handleAllSelectionChange", static: false, private: false, access: { has: obj => "handleAllSelectionChange" in obj, get: obj => obj.handleAllSelectionChange, set: (obj, value) => { obj.handleAllSelectionChange = value; } }, metadata: _metadata }, _handleAllSelectionChange_initializers, _handleAllSelectionChange_extraInitializers);
        __esDecorate(null, null, _handleSelectionChange_decorators, { kind: "field", name: "handleSelectionChange", static: false, private: false, access: { has: obj => "handleSelectionChange" in obj, get: obj => obj.handleSelectionChange, set: (obj, value) => { obj.handleSelectionChange = value; } }, metadata: _metadata }, _handleSelectionChange_initializers, _handleSelectionChange_extraInitializers);
        __esDecorate(null, null, _handleEditClick_decorators, { kind: "field", name: "handleEditClick", static: false, private: false, access: { has: obj => "handleEditClick" in obj, get: obj => obj.handleEditClick, set: (obj, value) => { obj.handleEditClick = value; } }, metadata: _metadata }, _handleEditClick_initializers, _handleEditClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TargetGroupRules = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TargetGroupRules = _classThis;
})();
exports.default = TargetGroupRules;
