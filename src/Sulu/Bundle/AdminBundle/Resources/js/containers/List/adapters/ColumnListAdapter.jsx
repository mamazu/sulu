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
const ColumnList_1 = __importDefault(require("../../../components/ColumnList"));
const GhostIndicator_1 = __importDefault(require("../../../components/GhostIndicator"));
const Icon_1 = __importDefault(require("../../../components/Icon"));
const PublishIndicator_1 = __importDefault(require("../../../components/PublishIndicator"));
const Translator_1 = require("../../../utils/Translator");
const DefaultLoadingStrategy_1 = __importDefault(require("../loadingStrategies/DefaultLoadingStrategy"));
const ColumnStructureStrategy_1 = __importDefault(require("../structureStrategies/ColumnStructureStrategy"));
const AbstractAdapter_1 = __importDefault(require("./AbstractAdapter"));
const columnListAdapter_scss_1 = __importDefault(require("./columnListAdapter.scss"));
let ColumnListAdapter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractAdapter_1.default;
    let _orderColumn_decorators;
    let _orderColumn_initializers = [];
    let _orderColumn_extraInitializers = [];
    let _handleItemClick_decorators;
    let _handleItemClick_initializers = [];
    let _handleItemClick_extraInitializers = [];
    let _handleItemDoubleClick_decorators;
    let _handleItemDoubleClick_initializers = [];
    let _handleItemDoubleClick_extraInitializers = [];
    var ColumnListAdapter = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.orderColumn = __runInitializers(this, _orderColumn_initializers, undefined);
            this.handleItemClick = (__runInitializers(this, _orderColumn_extraInitializers), __runInitializers(this, _handleItemClick_initializers, (id) => {
                const { data, onItemActivate } = this.props;
                // TODO: Don't access id directly but use some kind of metadata instead
                if (this.orderColumn !== undefined
                    && this.orderColumn !== null
                    && data[this.orderColumn].some((item) => item.id === id)) {
                    return;
                }
                if (onItemActivate) {
                    onItemActivate(id);
                    this.orderColumn = undefined;
                }
            }));
            this.handleItemDoubleClick = (__runInitializers(this, _handleItemClick_extraInitializers), __runInitializers(this, _handleItemDoubleClick_initializers, (id) => {
                const { data, onItemClick, } = this.props;
                // TODO: Don't access id directly but use some kind of metadata instead
                const clickedItem = data.map((column) => (0, mobx_1.toJS)(column)).flat().find((item) => item.id === id) || {};
                const { _permissions: { view: viewPermission = true, } = {}, } = clickedItem;
                if (onItemClick && viewPermission) {
                    onItemClick(id);
                }
            }));
            this.handleItemSelectionChange = (__runInitializers(this, _handleItemDoubleClick_extraInitializers), (id) => {
                const { onItemSelectionChange, selections } = this.props;
                if (onItemSelectionChange) {
                    onItemSelectionChange(id, !selections.includes(id));
                }
            });
            this.handleOrderChange = (id, order) => {
                const { data, onRequestItemOrder } = this.props;
                if (!onRequestItemOrder) {
                    throw new Error('Items were tried to order although there is no onRequestItemOrder callback available.'
                        + ' This should not happen and is likely a bug.');
                }
                if (this.orderColumn === undefined || this.orderColumn === null) {
                    throw new Error('Ordering can only be changed if a column has been selected to be ordered.'
                        + ' This should not happen and is likely a bug.');
                }
                const column = data[this.orderColumn];
                const itemsCount = column.length;
                if (order > itemsCount) {
                    order = itemsCount;
                }
                return onRequestItemOrder(id, order).then(({ ordered }) => ordered);
            };
            this.getIndicators = (item) => {
                if (item.ghostLocale) {
                    return [<GhostIndicator_1.default key="ghost" locale={item.ghostLocale}/>];
                }
                const indicators = [];
                if (item._hasPermissions) {
                    indicators.push(<Icon_1.default key="permissions" name="su-permissions"/>);
                }
                if (item.linked === 'internal') {
                    indicators.push(<Icon_1.default key="internal" name="su-link2"/>);
                }
                else if (item.linked === 'external') {
                    indicators.push(<Icon_1.default key="external" name="su-link"/>);
                }
                else if (item.shadowLocale) {
                    indicators.push(<Icon_1.default key="shadow" name="su-shadow-page"/>);
                }
                if (item.publishedState !== undefined || item.published !== undefined) {
                    const draft = !item.publishedState;
                    const published = !!item.published;
                    if (draft || !published) {
                        indicators.push(<PublishIndicator_1.default draft={draft} key="publish" published={published}/>);
                    }
                }
                const { adapterOptions: { get_indicators: getAdapterOptionsIndicators, } = {}, } = this.props;
                if (getAdapterOptionsIndicators) {
                    if (typeof getAdapterOptionsIndicators !== 'function') {
                        throw new Error('The "get_indicators" option of the ColumnListAdapter must be a function!');
                    }
                    indicators.push(...getAdapterOptionsIndicators(item));
                }
                return indicators;
            };
            this.getButtons = (item) => {
                const { onItemClick, onItemSelectionChange } = this.props;
                const isGhost = !!item.ghostLocale;
                const buttons = [];
                const { _permissions: { view: viewPermission = true, edit: editPermission = true, } = {}, } = item;
                if (onItemClick) {
                    const itemIcon = isGhost
                        ? 'su-plus-circle'
                        : editPermission
                            ? 'su-pen'
                            : 'su-eye';
                    buttons.push({
                        icon: itemIcon,
                        onClick: onItemClick,
                        visible: viewPermission,
                    });
                }
                if (onItemSelectionChange) {
                    const checkButton = {
                        icon: 'su-check',
                        onClick: this.handleItemSelectionChange,
                    };
                    buttons.push(checkButton);
                }
                return buttons;
            };
            this.getToolbarItems = (index) => {
                const { activeItems, adapterOptions: { display_root_level_toolbar: displayRootLevelToolbar = true, } = {}, data, onItemAdd, onRequestItemCopy, onRequestItemDelete, onRequestItemMove, onRequestItemOrder, } = this.props;
                if (!activeItems) {
                    throw new Error('The ColumnListAdapter does not work without activeItems. '
                        + 'This error should not happen and is likely a bug.');
                }
                if (!displayRootLevelToolbar && !activeItems[index]) {
                    return [];
                }
                if (this.orderColumn === index) {
                    return [
                        {
                            icon: 'su-times',
                            type: 'button',
                            onClick: (0, mobx_1.action)(() => {
                                this.orderColumn = undefined;
                            }),
                        },
                    ];
                }
                const toolbarItems = [];
                const parentColumn = data[index - 1];
                const parentItem = parentColumn ? parentColumn.find((item) => item.id === activeItems[index]) : undefined;
                const { _permissions: { add: parentAddPermission = true, edit: parentEditPermission = true, } = {}, } = parentItem || {};
                if (onItemAdd && parentAddPermission) {
                    toolbarItems.push({
                        icon: 'su-plus-circle',
                        type: 'button',
                        onClick: () => {
                            onItemAdd(activeItems[index]);
                        },
                    });
                }
                const hasActiveItem = activeItems[index + 1] !== undefined;
                const column = data[index];
                const item = column ? column.find((item) => item.id === activeItems[index + 1]) : undefined;
                const { _permissions: { delete: deletePermission = true, edit: editPermission = true, } = {}, } = item || {};
                const settingOptions = [];
                if (onRequestItemDelete) {
                    settingOptions.push({
                        disabled: !hasActiveItem || !deletePermission,
                        label: (0, Translator_1.translate)('sulu_admin.delete'),
                        onClick: () => {
                            const itemId = activeItems[index + 1];
                            if (!itemId) {
                                throw new Error('An undefined itemId cannot be deleted! This should not happen and is likely a bug.');
                            }
                            onRequestItemDelete(itemId);
                        },
                    });
                }
                if (onRequestItemMove) {
                    settingOptions.push({
                        disabled: !hasActiveItem || !editPermission,
                        label: (0, Translator_1.translate)('sulu_admin.move'),
                        onClick: () => {
                            const itemId = activeItems[index + 1];
                            if (!itemId) {
                                throw new Error('An undefined itemId cannot be deleted! This should not happen and is likely a bug.');
                            }
                            onRequestItemMove(itemId);
                        },
                    });
                }
                if (onRequestItemCopy) {
                    settingOptions.push({
                        disabled: !hasActiveItem || !editPermission,
                        label: (0, Translator_1.translate)('sulu_admin.copy'),
                        onClick: () => {
                            const itemId = activeItems[index + 1];
                            if (!itemId) {
                                throw new Error('An undefined itemId cannot be deleted! This should not happen and is likely a bug.');
                            }
                            onRequestItemCopy(itemId);
                        },
                    });
                }
                if (onRequestItemOrder) {
                    settingOptions.push({
                        disabled: !parentEditPermission,
                        label: (0, Translator_1.translate)('sulu_admin.order'),
                        onClick: (0, mobx_1.action)(() => {
                            this.orderColumn = index;
                        }),
                    });
                }
                if (settingOptions.length > 0) {
                    toolbarItems.push({
                        icon: 'su-cog',
                        type: 'dropdown',
                        options: settingOptions,
                    });
                }
                return toolbarItems.length > 0 ? toolbarItems : undefined;
            };
        }
        render() {
            const { activeItems, disabledIds, loading, selections, } = this.props;
            return (<div className={columnListAdapter_scss_1.default.columnListAdapter}>
                <ColumnList_1.default onItemClick={this.handleItemClick} onItemDoubleClick={this.handleItemDoubleClick} toolbarItemsProvider={this.getToolbarItems}>
                    {this.props.data.map((items, index) => (<ColumnList_1.default.Column key={index} loading={index >= this.props.data.length - 1 && loading}>
                            {items.map((item, itemIndex) => (
                    // TODO: Don't access hasChildren, published, publishedState, title or type directly
                    <ColumnList_1.default.Item active={activeItems ? activeItems.includes(item.id) : undefined} buttons={this.getButtons(item)} disabled={disabledIds.includes(item.id)} hasChildren={item.hasChildren} id={item.id} indicators={this.getIndicators(item)} key={item.id} onOrderChange={this.handleOrderChange} order={itemIndex + 1} selected={selections.includes(item.id)} showOrderField={this.orderColumn === index}>
                                    {item.title || item.name}
                                </ColumnList_1.default.Item>))}
                        </ColumnList_1.default.Column>))}
                </ColumnList_1.default>
            </div>);
        }
    };
    __setFunctionName(_classThis, "ColumnListAdapter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _orderColumn_decorators = [mobx_1.observable];
        _handleItemClick_decorators = [mobx_1.action];
        _handleItemDoubleClick_decorators = [mobx_1.action];
        __esDecorate(null, null, _orderColumn_decorators, { kind: "field", name: "orderColumn", static: false, private: false, access: { has: obj => "orderColumn" in obj, get: obj => obj.orderColumn, set: (obj, value) => { obj.orderColumn = value; } }, metadata: _metadata }, _orderColumn_initializers, _orderColumn_extraInitializers);
        __esDecorate(null, null, _handleItemClick_decorators, { kind: "field", name: "handleItemClick", static: false, private: false, access: { has: obj => "handleItemClick" in obj, get: obj => obj.handleItemClick, set: (obj, value) => { obj.handleItemClick = value; } }, metadata: _metadata }, _handleItemClick_initializers, _handleItemClick_extraInitializers);
        __esDecorate(null, null, _handleItemDoubleClick_decorators, { kind: "field", name: "handleItemDoubleClick", static: false, private: false, access: { has: obj => "handleItemDoubleClick" in obj, get: obj => obj.handleItemDoubleClick, set: (obj, value) => { obj.handleItemDoubleClick = value; } }, metadata: _metadata }, _handleItemDoubleClick_initializers, _handleItemDoubleClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColumnListAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.LoadingStrategy = DefaultLoadingStrategy_1.default;
    _classThis.StructureStrategy = ColumnStructureStrategy_1.default;
    _classThis.icon = 'su-columns';
    _classThis.searchable = false;
    _classThis.paginatable = false;
    _classThis.defaultProps = {
        data: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColumnListAdapter = _classThis;
})();
exports.default = ColumnListAdapter;
