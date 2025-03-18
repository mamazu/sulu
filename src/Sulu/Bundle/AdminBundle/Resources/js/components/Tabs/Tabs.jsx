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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const classnames_1 = __importDefault(require("classnames"));
const debounce_1 = __importDefault(require("debounce"));
const Popover_1 = __importDefault(require("../Popover"));
const Icon_1 = __importDefault(require("../Icon"));
const Tab_1 = __importDefault(require("./Tab"));
const CollapsedTabList_1 = __importDefault(require("./CollapsedTabList"));
const CollapsedTab_1 = __importDefault(require("./CollapsedTab"));
const tabs_scss_1 = __importDefault(require("./tabs.scss"));
const DEBOUNCE_TIME = 200;
let Tabs = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _tabsWidth_decorators;
    let _tabsWidth_initializers = [];
    let _tabsWidth_extraInitializers = [];
    let _tabsContainerWrapperWidth_decorators;
    let _tabsContainerWrapperWidth_initializers = [];
    let _tabsContainerWrapperWidth_extraInitializers = [];
    let _tabsContainerWidth_decorators;
    let _tabsContainerWidth_initializers = [];
    let _tabsContainerWidth_extraInitializers = [];
    let _tabWidths_decorators;
    let _tabWidths_initializers = [];
    let _tabWidths_extraInitializers = [];
    let _tabRefs_decorators;
    let _tabRefs_initializers = [];
    let _tabRefs_extraInitializers = [];
    let _dropdownOpen_decorators;
    let _dropdownOpen_initializers = [];
    let _dropdownOpen_extraInitializers = [];
    let _lastSelectedIndex_decorators;
    let _lastSelectedIndex_initializers = [];
    let _lastSelectedIndex_extraInitializers = [];
    let _setTabsWidth_decorators;
    let _setTabsWidth_initializers = [];
    let _setTabsWidth_extraInitializers = [];
    let _setTabsContainerWrapperWidth_decorators;
    let _setTabsContainerWrapperWidth_initializers = [];
    let _setTabsContainerWrapperWidth_extraInitializers = [];
    let _setTabsContainerWidth_decorators;
    let _setTabsContainerWidth_initializers = [];
    let _setTabsContainerWidth_extraInitializers = [];
    let _updateTabWidths_decorators;
    let _updateTabWidths_initializers = [];
    let _updateTabWidths_extraInitializers = [];
    let _setTabRef_decorators;
    let _setTabRef_initializers = [];
    let _setTabRef_extraInitializers = [];
    let _handleDropdownToggle_decorators;
    let _handleDropdownToggle_initializers = [];
    let _handleDropdownToggle_extraInitializers = [];
    let _handleDropdownClose_decorators;
    let _handleDropdownClose_initializers = [];
    let _handleDropdownClose_extraInitializers = [];
    let _handleCollapsedTabClick_decorators;
    let _handleCollapsedTabClick_initializers = [];
    let _handleCollapsedTabClick_extraInitializers = [];
    let _get_visibleTabIndices_decorators;
    let _get_collapsedTabIndices_decorators;
    let _get_hasCollapsedTabs_decorators;
    var Tabs = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.tabsWidth = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _tabsWidth_initializers, 0));
            this.tabsContainerWrapperWidth = (__runInitializers(this, _tabsWidth_extraInitializers), __runInitializers(this, _tabsContainerWrapperWidth_initializers, 0));
            this.tabsContainerWidth = (__runInitializers(this, _tabsContainerWrapperWidth_extraInitializers), __runInitializers(this, _tabsContainerWidth_initializers, 0));
            this.tabWidths = (__runInitializers(this, _tabsContainerWidth_extraInitializers), __runInitializers(this, _tabWidths_initializers, new Map()));
            this.tabRefs = (__runInitializers(this, _tabWidths_extraInitializers), __runInitializers(this, _tabRefs_initializers, new Map()));
            this.dropdownOpen = (__runInitializers(this, _tabRefs_extraInitializers), __runInitializers(this, _dropdownOpen_initializers, false));
            this.lastSelectedIndex = (__runInitializers(this, _dropdownOpen_extraInitializers), __runInitializers(this, _lastSelectedIndex_initializers, void 0));
            this.resizeObserver = __runInitializers(this, _lastSelectedIndex_extraInitializers);
            this.setTabsRef = (ref) => {
                this.tabsRef = ref;
            };
            this.setTabsContainerWrapperRef = (ref) => {
                this.tabsContainerWrapperRef = ref;
            };
            this.setTabsContainerRef = (ref) => {
                this.tabsContainerRef = ref;
            };
            this.setDropdownButtonRef = (ref) => {
                this.dropdownButtonRef = ref;
            };
            this.setTabsWidth = __runInitializers(this, _setTabsWidth_initializers, () => {
                if (!this.tabsRef) {
                    return;
                }
                const width = this.tabsRef.offsetWidth;
                const style = window.getComputedStyle(this.tabsRef);
                if (this.tabsWidth !== width) {
                    this.tabsWidth = width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
                }
            });
            this.setTabsContainerWrapperWidth = (__runInitializers(this, _setTabsWidth_extraInitializers), __runInitializers(this, _setTabsContainerWrapperWidth_initializers, () => {
                if (!this.tabsContainerWrapperRef) {
                    return;
                }
                const width = this.tabsContainerWrapperRef.offsetWidth;
                if (this.tabsContainerWrapperWidth !== width) {
                    this.tabsContainerWrapperWidth = width;
                }
            }));
            this.setTabsContainerWidth = (__runInitializers(this, _setTabsContainerWrapperWidth_extraInitializers), __runInitializers(this, _setTabsContainerWidth_initializers, () => {
                if (!this.tabsContainerRef) {
                    return;
                }
                const width = this.tabsContainerRef.offsetWidth;
                if (this.tabsContainerWidth !== width) {
                    this.tabsContainerWidth = width;
                }
            }));
            this.updateTabWidths = (__runInitializers(this, _setTabsContainerWidth_extraInitializers), __runInitializers(this, _updateTabWidths_initializers, () => {
                this.tabRefs.forEach((ref, key) => {
                    if (!ref) {
                        return;
                    }
                    const width = ref.offsetWidth;
                    if (this.tabWidths.get(key) !== width) {
                        this.tabWidths.set(key, width);
                    }
                });
            }));
            this.setDimensions = (__runInitializers(this, _updateTabWidths_extraInitializers), () => {
                this.setTabsWidth();
                this.setTabsContainerWrapperWidth();
                this.setTabsContainerWidth();
                this.updateTabWidths();
            });
            this.setTabRef = __runInitializers(this, _setTabRef_initializers, (index, ref) => {
                if (this.tabRefs.get(index) !== ref) {
                    this.tabRefs.set(index, ref);
                }
            });
            this.handleDropdownToggle = (__runInitializers(this, _setTabRef_extraInitializers), __runInitializers(this, _handleDropdownToggle_initializers, () => {
                this.dropdownOpen = !this.dropdownOpen;
            }));
            this.handleDropdownClose = (__runInitializers(this, _handleDropdownToggle_extraInitializers), __runInitializers(this, _handleDropdownClose_initializers, () => {
                this.dropdownOpen = false;
            }));
            this.changeTab = (__runInitializers(this, _handleDropdownClose_extraInitializers), (selectedTabIndex) => {
                if (selectedTabIndex !== undefined && selectedTabIndex !== null) {
                    this.props.onSelect(selectedTabIndex);
                }
            });
            this.handleTabClick = (selectedTabIndex) => {
                this.changeTab(selectedTabIndex);
            };
            this.handleCollapsedTabClick = __runInitializers(this, _handleCollapsedTabClick_initializers, (selectedTabIndex) => {
                this.dropdownOpen = false;
                this.lastSelectedIndex = selectedTabIndex;
                this.changeTab(selectedTabIndex);
            });
            this.createTabs = (__runInitializers(this, _handleCollapsedTabClick_extraInitializers), () => {
                const { children } = this.props;
                const { visibleTabIndices, collapsedTabIndices } = this;
                return [
                    ...this.createTabItems(react_1.default.Children.toArray(children).filter((child, index) => visibleTabIndices.includes(index)), visibleTabIndices, false),
                    ...this.createTabItems(react_1.default.Children.toArray(children).filter((child, index) => collapsedTabIndices.includes(index)), collapsedTabIndices, true),
                ];
            });
            this.createCollapsedTabs = () => {
                const { children } = this.props;
                const { collapsedTabIndices } = this;
                return this.createCollapsedTabItems(react_1.default.Children.toArray(children).filter((child, index) => collapsedTabIndices.includes(index)), collapsedTabIndices);
            };
        }
        componentDidMount() {
            this.setDimensions();
            this.resizeObserver = new ResizeObserver((0, debounce_1.default)(this.setDimensions, DEBOUNCE_TIME));
            if (this.tabsContainerWrapperRef) {
                this.resizeObserver.observe(this.tabsContainerWrapperRef);
            }
            if (this.tabsContainerRef) {
                this.resizeObserver.observe(this.tabsContainerRef);
            }
        }
        componentWillUnmount() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        }
        isSelected(tabIndex) {
            return tabIndex === this.props.selectedIndex;
        }
        get childIndices() {
            const { children } = this.props;
            return react_1.default.Children.map(children, (child, index) => index);
        }
        get visibleTabIndices() {
            if (this.tabsContainerWidth <= this.tabsWidth) {
                return this.childIndices;
            }
            const { selectedIndex } = this.props;
            let visibleWidth = 0;
            let visibleTabIndices = [];
            const childIndices = this.childIndices;
            // Sorts childIndices in it's natural order, except that the element with selectedIndex is positioned at the
            // first place and the element with lastSelectedIndex is positioned at the second place.
            // This ensures that those two elements will always be visible.
            childIndices.sort((a, b) => {
                if (a === selectedIndex) {
                    return -1;
                }
                if (b === selectedIndex) {
                    return 1;
                }
                if (a === this.lastSelectedIndex) {
                    return -1;
                }
                if (b === this.lastSelectedIndex) {
                    return 1;
                }
                return a - b;
            });
            for (const index of childIndices) {
                const nextWidth = this.tabWidths.get(index);
                if (undefined === nextWidth) {
                    if (visibleTabIndices.length > 0) {
                        break;
                    }
                    return this.childIndices;
                }
                if (visibleWidth + nextWidth > this.tabsContainerWrapperWidth) {
                    break;
                }
                visibleWidth += nextWidth;
                visibleTabIndices = [...visibleTabIndices, index];
            }
            // Since visibleTabIndices contains only the indices of the elements that can be fully shown and both,
            // selectedIndex and lastSelectedIndex are still positioned at the very beginning of the array, we need to reset
            // the sorting so the elements have the correct order again.
            visibleTabIndices.sort((a, b) => a - b);
            return visibleTabIndices;
        }
        get collapsedTabIndices() {
            const visibleTabIndices = this.visibleTabIndices;
            return this.childIndices.filter((index) => !visibleTabIndices.includes(index));
        }
        get hasCollapsedTabs() {
            return this.collapsedTabIndices.length > 0;
        }
        createTabItems(tabs, indices, hidden) {
            const { type } = this.props;
            return react_1.default.Children.map(tabs, (tab, localIndex) => {
                const index = indices[localIndex];
                if (!tab) {
                    return null;
                }
                const selected = this.isSelected(index);
                return react_1.default.cloneElement(tab, Object.assign(Object.assign({}, tab.props), { hidden,
                    index,
                    selected,
                    type, onClick: this.handleTabClick, tabRef: this.setTabRef }));
            });
        }
        createCollapsedTabItems(tabs, indices) {
            return react_1.default.Children.map(tabs, (tab, localIndex) => {
                const index = indices[localIndex];
                if (!tab) {
                    return null;
                }
                return (<CollapsedTab_1.default index={index} key={index} onClick={this.handleCollapsedTabClick}>
                    {tab.props.children}
                </CollapsedTab_1.default>);
            });
        }
        render() {
            const { type, className, } = this.props;
            const tabsClass = (0, classnames_1.default)(tabs_scss_1.default.tabs, tabs_scss_1.default[type], className);
            return (<div className={tabsClass} ref={this.setTabsRef}>
                <div className={tabs_scss_1.default.tabsContainerWrapper} ref={this.setTabsContainerWrapperRef}>
                    <ul className={tabs_scss_1.default.tabsContainer} ref={this.setTabsContainerRef}>
                        {this.createTabs()}
                    </ul>
                </div>

                {this.hasCollapsedTabs &&
                    <react_1.default.Fragment>
                        <button className={tabs_scss_1.default.button} onClick={this.handleDropdownToggle} ref={this.setDropdownButtonRef} type="button">
                            <Icon_1.default name="su-more-horizontal"/>
                        </button>

                        <Popover_1.default anchorElement={this.dropdownButtonRef || undefined} onClose={this.handleDropdownClose} open={this.dropdownOpen}>
                            {(setPopoverRef, styles) => (<div ref={setPopoverRef} style={styles}>
                                        <CollapsedTabList_1.default type={type}>
                                            {this.createCollapsedTabs()}
                                        </CollapsedTabList_1.default>
                                    </div>)}
                        </Popover_1.default>
                    </react_1.default.Fragment>}
            </div>);
        }
    };
    __setFunctionName(_classThis, "Tabs");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _tabsWidth_decorators = [mobx_1.observable];
        _tabsContainerWrapperWidth_decorators = [mobx_1.observable];
        _tabsContainerWidth_decorators = [mobx_1.observable];
        _tabWidths_decorators = [mobx_1.observable];
        _tabRefs_decorators = [mobx_1.observable];
        _dropdownOpen_decorators = [mobx_1.observable];
        _lastSelectedIndex_decorators = [mobx_1.observable];
        _setTabsWidth_decorators = [mobx_1.action];
        _setTabsContainerWrapperWidth_decorators = [mobx_1.action];
        _setTabsContainerWidth_decorators = [mobx_1.action];
        _updateTabWidths_decorators = [mobx_1.action];
        _setTabRef_decorators = [mobx_1.action];
        _handleDropdownToggle_decorators = [mobx_1.action];
        _handleDropdownClose_decorators = [mobx_1.action];
        _handleCollapsedTabClick_decorators = [mobx_1.action];
        _get_visibleTabIndices_decorators = [mobx_1.computed];
        _get_collapsedTabIndices_decorators = [mobx_1.computed];
        _get_hasCollapsedTabs_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_visibleTabIndices_decorators, { kind: "getter", name: "visibleTabIndices", static: false, private: false, access: { has: obj => "visibleTabIndices" in obj, get: obj => obj.visibleTabIndices }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_collapsedTabIndices_decorators, { kind: "getter", name: "collapsedTabIndices", static: false, private: false, access: { has: obj => "collapsedTabIndices" in obj, get: obj => obj.collapsedTabIndices }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasCollapsedTabs_decorators, { kind: "getter", name: "hasCollapsedTabs", static: false, private: false, access: { has: obj => "hasCollapsedTabs" in obj, get: obj => obj.hasCollapsedTabs }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _tabsWidth_decorators, { kind: "field", name: "tabsWidth", static: false, private: false, access: { has: obj => "tabsWidth" in obj, get: obj => obj.tabsWidth, set: (obj, value) => { obj.tabsWidth = value; } }, metadata: _metadata }, _tabsWidth_initializers, _tabsWidth_extraInitializers);
        __esDecorate(null, null, _tabsContainerWrapperWidth_decorators, { kind: "field", name: "tabsContainerWrapperWidth", static: false, private: false, access: { has: obj => "tabsContainerWrapperWidth" in obj, get: obj => obj.tabsContainerWrapperWidth, set: (obj, value) => { obj.tabsContainerWrapperWidth = value; } }, metadata: _metadata }, _tabsContainerWrapperWidth_initializers, _tabsContainerWrapperWidth_extraInitializers);
        __esDecorate(null, null, _tabsContainerWidth_decorators, { kind: "field", name: "tabsContainerWidth", static: false, private: false, access: { has: obj => "tabsContainerWidth" in obj, get: obj => obj.tabsContainerWidth, set: (obj, value) => { obj.tabsContainerWidth = value; } }, metadata: _metadata }, _tabsContainerWidth_initializers, _tabsContainerWidth_extraInitializers);
        __esDecorate(null, null, _tabWidths_decorators, { kind: "field", name: "tabWidths", static: false, private: false, access: { has: obj => "tabWidths" in obj, get: obj => obj.tabWidths, set: (obj, value) => { obj.tabWidths = value; } }, metadata: _metadata }, _tabWidths_initializers, _tabWidths_extraInitializers);
        __esDecorate(null, null, _tabRefs_decorators, { kind: "field", name: "tabRefs", static: false, private: false, access: { has: obj => "tabRefs" in obj, get: obj => obj.tabRefs, set: (obj, value) => { obj.tabRefs = value; } }, metadata: _metadata }, _tabRefs_initializers, _tabRefs_extraInitializers);
        __esDecorate(null, null, _dropdownOpen_decorators, { kind: "field", name: "dropdownOpen", static: false, private: false, access: { has: obj => "dropdownOpen" in obj, get: obj => obj.dropdownOpen, set: (obj, value) => { obj.dropdownOpen = value; } }, metadata: _metadata }, _dropdownOpen_initializers, _dropdownOpen_extraInitializers);
        __esDecorate(null, null, _lastSelectedIndex_decorators, { kind: "field", name: "lastSelectedIndex", static: false, private: false, access: { has: obj => "lastSelectedIndex" in obj, get: obj => obj.lastSelectedIndex, set: (obj, value) => { obj.lastSelectedIndex = value; } }, metadata: _metadata }, _lastSelectedIndex_initializers, _lastSelectedIndex_extraInitializers);
        __esDecorate(null, null, _setTabsWidth_decorators, { kind: "field", name: "setTabsWidth", static: false, private: false, access: { has: obj => "setTabsWidth" in obj, get: obj => obj.setTabsWidth, set: (obj, value) => { obj.setTabsWidth = value; } }, metadata: _metadata }, _setTabsWidth_initializers, _setTabsWidth_extraInitializers);
        __esDecorate(null, null, _setTabsContainerWrapperWidth_decorators, { kind: "field", name: "setTabsContainerWrapperWidth", static: false, private: false, access: { has: obj => "setTabsContainerWrapperWidth" in obj, get: obj => obj.setTabsContainerWrapperWidth, set: (obj, value) => { obj.setTabsContainerWrapperWidth = value; } }, metadata: _metadata }, _setTabsContainerWrapperWidth_initializers, _setTabsContainerWrapperWidth_extraInitializers);
        __esDecorate(null, null, _setTabsContainerWidth_decorators, { kind: "field", name: "setTabsContainerWidth", static: false, private: false, access: { has: obj => "setTabsContainerWidth" in obj, get: obj => obj.setTabsContainerWidth, set: (obj, value) => { obj.setTabsContainerWidth = value; } }, metadata: _metadata }, _setTabsContainerWidth_initializers, _setTabsContainerWidth_extraInitializers);
        __esDecorate(null, null, _updateTabWidths_decorators, { kind: "field", name: "updateTabWidths", static: false, private: false, access: { has: obj => "updateTabWidths" in obj, get: obj => obj.updateTabWidths, set: (obj, value) => { obj.updateTabWidths = value; } }, metadata: _metadata }, _updateTabWidths_initializers, _updateTabWidths_extraInitializers);
        __esDecorate(null, null, _setTabRef_decorators, { kind: "field", name: "setTabRef", static: false, private: false, access: { has: obj => "setTabRef" in obj, get: obj => obj.setTabRef, set: (obj, value) => { obj.setTabRef = value; } }, metadata: _metadata }, _setTabRef_initializers, _setTabRef_extraInitializers);
        __esDecorate(null, null, _handleDropdownToggle_decorators, { kind: "field", name: "handleDropdownToggle", static: false, private: false, access: { has: obj => "handleDropdownToggle" in obj, get: obj => obj.handleDropdownToggle, set: (obj, value) => { obj.handleDropdownToggle = value; } }, metadata: _metadata }, _handleDropdownToggle_initializers, _handleDropdownToggle_extraInitializers);
        __esDecorate(null, null, _handleDropdownClose_decorators, { kind: "field", name: "handleDropdownClose", static: false, private: false, access: { has: obj => "handleDropdownClose" in obj, get: obj => obj.handleDropdownClose, set: (obj, value) => { obj.handleDropdownClose = value; } }, metadata: _metadata }, _handleDropdownClose_initializers, _handleDropdownClose_extraInitializers);
        __esDecorate(null, null, _handleCollapsedTabClick_decorators, { kind: "field", name: "handleCollapsedTabClick", static: false, private: false, access: { has: obj => "handleCollapsedTabClick" in obj, get: obj => obj.handleCollapsedTabClick, set: (obj, value) => { obj.handleCollapsedTabClick = value; } }, metadata: _metadata }, _handleCollapsedTabClick_initializers, _handleCollapsedTabClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Tab = Tab_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tabs = _classThis;
})();
exports.default = Tabs;
