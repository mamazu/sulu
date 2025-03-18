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
const Button_1 = __importDefault(require("../../components/Button"));
const Toggler_1 = __importDefault(require("../../components/Toggler"));
const Number_1 = __importDefault(require("../../components/Number"));
const SingleSelect_1 = __importDefault(require("../../components/SingleSelect"));
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const MultiListOverlay_1 = __importDefault(require("../../containers/MultiListOverlay"));
const SingleListOverlay_1 = __importDefault(require("../../containers/SingleListOverlay"));
const MultiAutoComplete_1 = __importDefault(require("../../containers/MultiAutoComplete"));
const MultiSelectionStore_1 = __importDefault(require("../../stores/MultiSelectionStore"));
const Translator_1 = require("../../utils/Translator");
const MultiSelect_1 = __importDefault(require("../../components/MultiSelect"));
const filterOverlay_scss_1 = __importDefault(require("./filterOverlay.scss"));
let FilterOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _dataSource_decorators;
    let _dataSource_initializers = [];
    let _dataSource_extraInitializers = [];
    let _includeSubElements_decorators;
    let _includeSubElements_initializers = [];
    let _includeSubElements_extraInitializers = [];
    let _categories_decorators;
    let _categories_initializers = [];
    let _categories_extraInitializers = [];
    let _categoryOperator_decorators;
    let _categoryOperator_initializers = [];
    let _categoryOperator_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _tagOperator_decorators;
    let _tagOperator_initializers = [];
    let _tagOperator_extraInitializers = [];
    let _types_decorators;
    let _types_initializers = [];
    let _types_extraInitializers = [];
    let _audienceTargeting_decorators;
    let _audienceTargeting_initializers = [];
    let _audienceTargeting_extraInitializers = [];
    let _sortBy_decorators;
    let _sortBy_initializers = [];
    let _sortBy_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _presentation_decorators;
    let _presentation_initializers = [];
    let _presentation_extraInitializers = [];
    let _showDataSourceDialog_decorators;
    let _showDataSourceDialog_initializers = [];
    let _showDataSourceDialog_extraInitializers = [];
    let _showCategoryDialog_decorators;
    let _showCategoryDialog_initializers = [];
    let _showCategoryDialog_extraInitializers = [];
    let _updateFilterCriteria_decorators;
    let _updateFilterCriteria_initializers = [];
    let _updateFilterCriteria_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _resetFilterCriteria_decorators;
    let _resetFilterCriteria_initializers = [];
    let _resetFilterCriteria_extraInitializers = [];
    let _handleConfirmDataSourceDialog_decorators;
    let _handleConfirmDataSourceDialog_initializers = [];
    let _handleConfirmDataSourceDialog_extraInitializers = [];
    let _handleDataSourceButtonClick_decorators;
    let _handleDataSourceButtonClick_initializers = [];
    let _handleDataSourceButtonClick_extraInitializers = [];
    let _handleCloseDataSourceDialog_decorators;
    let _handleCloseDataSourceDialog_initializers = [];
    let _handleCloseDataSourceDialog_extraInitializers = [];
    let _handleCategoryButtonClick_decorators;
    let _handleCategoryButtonClick_initializers = [];
    let _handleCategoryButtonClick_extraInitializers = [];
    let _handleCloseCategoryDialog_decorators;
    let _handleCloseCategoryDialog_initializers = [];
    let _handleCloseCategoryDialog_extraInitializers = [];
    let _handleIncludeSubElementsChange_decorators;
    let _handleIncludeSubElementsChange_initializers = [];
    let _handleIncludeSubElementsChange_extraInitializers = [];
    let _handleConfirmCategoryDialog_decorators;
    let _handleConfirmCategoryDialog_initializers = [];
    let _handleConfirmCategoryDialog_extraInitializers = [];
    let _handleCategoryOperatorChange_decorators;
    let _handleCategoryOperatorChange_initializers = [];
    let _handleCategoryOperatorChange_extraInitializers = [];
    let _handleTagOperatorChange_decorators;
    let _handleTagOperatorChange_initializers = [];
    let _handleTagOperatorChange_extraInitializers = [];
    let _handleTypesChange_decorators;
    let _handleTypesChange_initializers = [];
    let _handleTypesChange_extraInitializers = [];
    let _handleAudienceTargetingChange_decorators;
    let _handleAudienceTargetingChange_initializers = [];
    let _handleAudienceTargetingChange_extraInitializers = [];
    let _handleSortByChange_decorators;
    let _handleSortByChange_initializers = [];
    let _handleSortByChange_extraInitializers = [];
    let _handleSortOrderChange_decorators;
    let _handleSortOrderChange_initializers = [];
    let _handleSortOrderChange_extraInitializers = [];
    let _handlePresentationChange_decorators;
    let _handlePresentationChange_initializers = [];
    let _handlePresentationChange_extraInitializers = [];
    let _handleLimitChange_decorators;
    let _handleLimitChange_initializers = [];
    let _handleLimitChange_extraInitializers = [];
    var FilterOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.dataSource = __runInitializers(this, _dataSource_initializers, void 0);
            this.includeSubElements = (__runInitializers(this, _dataSource_extraInitializers), __runInitializers(this, _includeSubElements_initializers, void 0));
            this.categories = (__runInitializers(this, _includeSubElements_extraInitializers), __runInitializers(this, _categories_initializers, void 0));
            this.categoryOperator = (__runInitializers(this, _categories_extraInitializers), __runInitializers(this, _categoryOperator_initializers, void 0));
            this.tags = (__runInitializers(this, _categoryOperator_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.tagOperator = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _tagOperator_initializers, void 0));
            this.types = (__runInitializers(this, _tagOperator_extraInitializers), __runInitializers(this, _types_initializers, void 0));
            this.audienceTargeting = (__runInitializers(this, _types_extraInitializers), __runInitializers(this, _audienceTargeting_initializers, void 0));
            this.sortBy = (__runInitializers(this, _audienceTargeting_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
            this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
            this.limit = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
            this.presentation = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _presentation_initializers, void 0));
            this.showDataSourceDialog = (__runInitializers(this, _presentation_extraInitializers), __runInitializers(this, _showDataSourceDialog_initializers, false));
            this.showCategoryDialog = (__runInitializers(this, _showDataSourceDialog_extraInitializers), __runInitializers(this, _showCategoryDialog_initializers, false));
            this.updateFilterCriteriaDisposer = __runInitializers(this, _showCategoryDialog_extraInitializers);
            this.updateFilterCriteria = __runInitializers(this, _updateFilterCriteria_initializers, (smartContentStore) => {
                this.dataSource = smartContentStore.dataSource;
                this.includeSubElements = smartContentStore.includeSubElements;
                this.categories = smartContentStore.categories;
                this.categoryOperator = smartContentStore.categoryOperator;
                this.tags = smartContentStore.tags;
                this.types = smartContentStore.types;
                this.tagOperator = smartContentStore.tagOperator;
                this.audienceTargeting = smartContentStore.audienceTargeting;
                this.sortBy = smartContentStore.sortBy;
                this.sortOrder = smartContentStore.sortOrder;
                this.presentation = smartContentStore.presentation;
                this.limit = smartContentStore.limit;
            });
            this.handleConfirm = (__runInitializers(this, _updateFilterCriteria_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                const { onClose, smartContentStore } = this.props;
                smartContentStore.audienceTargeting = this.audienceTargeting;
                smartContentStore.categories = this.categories;
                smartContentStore.categoryOperator = this.categoryOperator;
                smartContentStore.dataSource = this.dataSource;
                smartContentStore.includeSubElements = this.includeSubElements;
                smartContentStore.limit = this.limit;
                smartContentStore.sortBy = this.sortBy;
                smartContentStore.sortOrder = this.sortOrder;
                smartContentStore.tagOperator = this.tagOperator;
                smartContentStore.tags = this.tags;
                smartContentStore.types = this.types;
                smartContentStore.presentation = this.presentation;
                onClose();
            }));
            this.resetFilterCriteria = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _resetFilterCriteria_initializers, () => {
                const { defaultValue } = this.props;
                this.dataSource = defaultValue.dataSource;
                this.includeSubElements = defaultValue.includeSubFolders;
                this.categories = defaultValue.categories;
                this.categoryOperator = defaultValue.categoryOperator;
                this.tags = defaultValue.tags;
                this.types = defaultValue.types;
                this.tagOperator = defaultValue.tagOperator;
                this.audienceTargeting = defaultValue.audienceTargeting;
                this.sortBy = defaultValue.sortBy;
                this.sortOrder = defaultValue.sortMethod;
                this.presentation = defaultValue.presentAs;
                this.limit = defaultValue.limitResult;
            }));
            this.handleConfirmDataSourceDialog = (__runInitializers(this, _resetFilterCriteria_extraInitializers), __runInitializers(this, _handleConfirmDataSourceDialog_initializers, (dataSource) => {
                this.dataSource = dataSource;
                this.showDataSourceDialog = false;
            }));
            this.handleDataSourceButtonClick = (__runInitializers(this, _handleConfirmDataSourceDialog_extraInitializers), __runInitializers(this, _handleDataSourceButtonClick_initializers, () => {
                this.showDataSourceDialog = true;
            }));
            this.handleCloseDataSourceDialog = (__runInitializers(this, _handleDataSourceButtonClick_extraInitializers), __runInitializers(this, _handleCloseDataSourceDialog_initializers, () => {
                this.showDataSourceDialog = false;
            }));
            this.handleCategoryButtonClick = (__runInitializers(this, _handleCloseDataSourceDialog_extraInitializers), __runInitializers(this, _handleCategoryButtonClick_initializers, () => {
                this.showCategoryDialog = true;
            }));
            this.handleCloseCategoryDialog = (__runInitializers(this, _handleCategoryButtonClick_extraInitializers), __runInitializers(this, _handleCloseCategoryDialog_initializers, () => {
                this.showCategoryDialog = false;
            }));
            this.handleIncludeSubElementsChange = (__runInitializers(this, _handleCloseCategoryDialog_extraInitializers), __runInitializers(this, _handleIncludeSubElementsChange_initializers, (includeSubElementsChange) => {
                this.includeSubElements = includeSubElementsChange;
            }));
            this.handleConfirmCategoryDialog = (__runInitializers(this, _handleIncludeSubElementsChange_extraInitializers), __runInitializers(this, _handleConfirmCategoryDialog_initializers, (categories) => {
                this.categories = categories;
                this.showCategoryDialog = false;
            }));
            this.handleCategoryOperatorChange = (__runInitializers(this, _handleConfirmCategoryDialog_extraInitializers), __runInitializers(this, _handleCategoryOperatorChange_initializers, (categoryOperator) => {
                if (categoryOperator !== 'or' && categoryOperator !== 'and') {
                    throw new Error('The tag operator must either be "or" or "and", but "' + categoryOperator + '" was given.'
                        + ' This should not happen and is likely a bug.');
                }
                this.categoryOperator = categoryOperator;
            }));
            this.handleTagOperatorChange = (__runInitializers(this, _handleCategoryOperatorChange_extraInitializers), __runInitializers(this, _handleTagOperatorChange_initializers, (tagOperator) => {
                if (tagOperator !== 'or' && tagOperator !== 'and') {
                    throw new Error('The tag operator must either be "or" or "and", but "' + tagOperator + '" was given.'
                        + ' This should not happen and is likely a bug.');
                }
                this.tagOperator = tagOperator;
            }));
            this.handleTypesChange = (__runInitializers(this, _handleTagOperatorChange_extraInitializers), __runInitializers(this, _handleTypesChange_initializers, (type) => {
                this.types = type;
            }));
            this.handleAudienceTargetingChange = (__runInitializers(this, _handleTypesChange_extraInitializers), __runInitializers(this, _handleAudienceTargetingChange_initializers, (audienceTargeting) => {
                this.audienceTargeting = audienceTargeting;
            }));
            this.handleSortByChange = (__runInitializers(this, _handleAudienceTargetingChange_extraInitializers), __runInitializers(this, _handleSortByChange_initializers, (sortBy) => {
                if (sortBy !== undefined && typeof sortBy !== 'string') {
                    throw new Error('The field for sorting must be a string or undefined, but "' + sortBy + '" was given.'
                        + ' This should not happen and is likely a bug.');
                }
                this.sortBy = sortBy;
            }));
            this.handleSortOrderChange = (__runInitializers(this, _handleSortByChange_extraInitializers), __runInitializers(this, _handleSortOrderChange_initializers, (sortOrder) => {
                if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                    throw new Error('The sort order is only allowed to be "asc" or "desc", but "' + sortOrder + '" was given.'
                        + ' This should not happen and is likely a bug.');
                }
                this.sortOrder = sortOrder;
            }));
            this.handlePresentationChange = (__runInitializers(this, _handleSortOrderChange_extraInitializers), __runInitializers(this, _handlePresentationChange_initializers, (presentation) => {
                if (typeof presentation !== 'string') {
                    throw new Error('The presentation must be represented as a string, but "' + presentation + '" was given.'
                        + ' This should not happen and is likely a bug.');
                }
                this.presentation = presentation;
            }));
            this.handleLimitChange = (__runInitializers(this, _handlePresentationChange_extraInitializers), __runInitializers(this, _handleLimitChange_initializers, (limit) => {
                this.limit = limit;
            }));
            __runInitializers(this, _handleLimitChange_extraInitializers);
            this.updateFilterCriteriaDisposer = (0, mobx_1.autorun)(() => this.updateFilterCriteria(this.props.smartContentStore));
            this.tagSelectionStore = new MultiSelectionStore_1.default('tags', this.tags || [], undefined, 'names');
            this.tagSelectionStoreDisposer = (0, mobx_1.autorun)(() => {
                this.tags = this.tagSelectionStore.items.map((item) => item.name);
            });
        }
        componentWillUnmount() {
            this.updateFilterCriteriaDisposer();
            this.tagSelectionStoreDisposer();
        }
        render() {
            const { categoryRootKey, dataSourceAdapter, dataSourceListKey, dataSourceResourceKey, onClose, open, presentations, sections, smartContentStore, sortings, title, types, } = this.props;
            return (<react_1.Fragment>
                <Overlay_1.default actions={[
                    {
                        title: (0, Translator_1.translate)('sulu_admin.reset'),
                        onClick: this.resetFilterCriteria,
                    },
                ]} confirmText={(0, Translator_1.translate)('sulu_admin.confirm')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={title}>
                    <div className={filterOverlay_scss_1.default.content}>
                        {sections.includes('datasource') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.data_source')}</h3>
                                <div className={filterOverlay_scss_1.default.source}>
                                    <Button_1.default className={filterOverlay_scss_1.default.sourceButton} onClick={this.handleDataSourceButtonClick}>
                                        {(0, Translator_1.translate)('sulu_admin.choose_data_source')}
                                    </Button_1.default>
                                    <Toggler_1.default checked={this.includeSubElements || false} onChange={this.handleIncludeSubElementsChange}>
                                        {(0, Translator_1.translate)('sulu_admin.include_sub_elements')}
                                    </Toggler_1.default>
                                </div>
                                <label className={filterOverlay_scss_1.default.description}>
                                    {/* TODO do not hardcode "title" */}
                                    {(0, Translator_1.translate)('sulu_admin.data_source')}: {this.dataSource && this.dataSource.title}
                                </label>
                            </section>}

                        {sections.includes('categories') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.filter_by_categories')}</h3>
                                <div className={filterOverlay_scss_1.default.categories}>
                                    <Button_1.default onClick={this.handleCategoryButtonClick}>
                                        {(0, Translator_1.translate)('sulu_admin.choose_categories')}
                                    </Button_1.default>
                                    <div className={filterOverlay_scss_1.default.categoriesSelect}>
                                        <SingleSelect_1.default onChange={this.handleCategoryOperatorChange} value={this.categoryOperator}>
                                            <SingleSelect_1.default.Option value="or">
                                                {(0, Translator_1.translate)('sulu_admin.any_category_description')}
                                            </SingleSelect_1.default.Option>
                                            <SingleSelect_1.default.Option value="and">
                                                {(0, Translator_1.translate)('sulu_admin.all_categories_description')}
                                            </SingleSelect_1.default.Option>
                                        </SingleSelect_1.default>
                                    </div>
                                </div>
                                <label className={filterOverlay_scss_1.default.description}>
                                    {(0, Translator_1.translate)('sulu_category.categories')}: {this.categories &&
                            this.categories.map((category) => category.name).join(', ')}
                                </label>
                            </section>}

                        {sections.includes('tags') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.filter_by_tags')}</h3>
                                <div className={filterOverlay_scss_1.default.tags}>
                                    <div className={filterOverlay_scss_1.default.tagsAutoComplete}>
                                        <MultiAutoComplete_1.default displayProperty="name" idProperty="name" searchProperties={['name']} selectionStore={this.tagSelectionStore}/>
                                    </div>
                                    <div className={filterOverlay_scss_1.default.tagsSelect}>
                                        <SingleSelect_1.default onChange={this.handleTagOperatorChange} value={this.tagOperator}>
                                            <SingleSelect_1.default.Option value="or">
                                                {(0, Translator_1.translate)('sulu_admin.any_tag_description')}
                                            </SingleSelect_1.default.Option>
                                            <SingleSelect_1.default.Option value="and">
                                                {(0, Translator_1.translate)('sulu_admin.all_tags_description')}
                                            </SingleSelect_1.default.Option>
                                        </SingleSelect_1.default>
                                    </div>
                                </div>
                            </section>}

                        {sections.includes('types') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.filter_by_types')}</h3>
                                <div className={filterOverlay_scss_1.default.types}>
                                    <MultiSelect_1.default allSelectedText={(0, Translator_1.translate)('sulu_admin.all_types')} noneSelectedText={(0, Translator_1.translate)('sulu_admin.no_types')} onChange={this.handleTypesChange} values={this.types || []}>
                                        {types.map((type) => (<MultiSelect_1.default.Option key={type.value} value={type.value}>
                                                {type.name}
                                            </MultiSelect_1.default.Option>))}
                                    </MultiSelect_1.default>
                                </div>
                            </section>}

                        {sections.includes('audienceTargeting') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.target_groups')}</h3>
                                <Toggler_1.default checked={this.audienceTargeting || false} onChange={this.handleAudienceTargetingChange}>
                                    {(0, Translator_1.translate)('sulu_admin.use_target_groups')}
                                </Toggler_1.default>
                            </section>}

                        {sections.includes('sorting') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.sort_by')}</h3>
                                <div className={filterOverlay_scss_1.default.sorting}>
                                    <div className={filterOverlay_scss_1.default.sortColumn}>
                                        <SingleSelect_1.default onChange={this.handleSortByChange} value={this.sortBy}>
                                            {sortings.map((sorting, index) => (<SingleSelect_1.default.Option key={index} value={sorting.name}>
                                                    {(0, Translator_1.translate)(sorting.value)}
                                                </SingleSelect_1.default.Option>))}
                                        </SingleSelect_1.default>
                                    </div>
                                    <div className={filterOverlay_scss_1.default.sortOrder}>
                                        <SingleSelect_1.default onChange={this.handleSortOrderChange} value={this.sortOrder}>
                                            <SingleSelect_1.default.Option value="asc">
                                                {(0, Translator_1.translate)('sulu_admin.ascending')}
                                            </SingleSelect_1.default.Option>
                                            <SingleSelect_1.default.Option value="desc">
                                                {(0, Translator_1.translate)('sulu_admin.descending')}
                                            </SingleSelect_1.default.Option>
                                        </SingleSelect_1.default>
                                    </div>
                                </div>
                            </section>}

                        {sections.includes('presentation') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.present_as')}</h3>
                                <div className={filterOverlay_scss_1.default.presentation}>
                                    <SingleSelect_1.default onChange={this.handlePresentationChange} value={this.presentation}>
                                        {Object.keys(presentations).map((presentationKey) => (<SingleSelect_1.default.Option key={presentationKey} value={presentationKey}>
                                                {presentations[presentationKey]}
                                            </SingleSelect_1.default.Option>))}
                                    </SingleSelect_1.default>
                                </div>
                            </section>}

                        {sections.includes('limit') &&
                    <section className={filterOverlay_scss_1.default.section}>
                                <h3>{(0, Translator_1.translate)('sulu_admin.limit_result_to')}</h3>
                                <div className={filterOverlay_scss_1.default.limit}>
                                    <Number_1.default onChange={this.handleLimitChange} value={this.limit}/>
                                </div>
                            </section>}
                    </div>
                </Overlay_1.default>
                {!smartContentStore.loading && dataSourceAdapter && dataSourceResourceKey && dataSourceListKey &&
                    <SingleListOverlay_1.default adapter={dataSourceAdapter} clearSelectionOnClose={false} listKey={dataSourceListKey} locale={smartContentStore.locale} onClose={this.handleCloseDataSourceDialog} onConfirm={this.handleConfirmDataSourceDialog} open={this.showDataSourceDialog} overlayType="dialog" preSelectedItem={this.dataSource} resourceKey={dataSourceResourceKey} title={(0, Translator_1.translate)('sulu_admin.choose_data_source')}/>}
                {!smartContentStore.loading &&
                    <MultiListOverlay_1.default adapter="tree_table" clearSelectionOnClose={false} listKey="categories" locale={smartContentStore.locale} onClose={this.handleCloseCategoryDialog} onConfirm={this.handleConfirmCategoryDialog} open={this.showCategoryDialog} options={{ rootKey: categoryRootKey }} overlayType="dialog" preSelectedItems={this.categories || []} resourceKey="categories" title={(0, Translator_1.translate)('sulu_admin.choose_categories')}/>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "FilterOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _dataSource_decorators = [mobx_1.observable];
        _includeSubElements_decorators = [mobx_1.observable];
        _categories_decorators = [mobx_1.observable];
        _categoryOperator_decorators = [mobx_1.observable];
        _tags_decorators = [mobx_1.observable];
        _tagOperator_decorators = [mobx_1.observable];
        _types_decorators = [mobx_1.observable];
        _audienceTargeting_decorators = [mobx_1.observable];
        _sortBy_decorators = [mobx_1.observable];
        _sortOrder_decorators = [mobx_1.observable];
        _limit_decorators = [mobx_1.observable];
        _presentation_decorators = [mobx_1.observable];
        _showDataSourceDialog_decorators = [mobx_1.observable];
        _showCategoryDialog_decorators = [mobx_1.observable];
        _updateFilterCriteria_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _resetFilterCriteria_decorators = [mobx_1.action];
        _handleConfirmDataSourceDialog_decorators = [mobx_1.action];
        _handleDataSourceButtonClick_decorators = [mobx_1.action];
        _handleCloseDataSourceDialog_decorators = [mobx_1.action];
        _handleCategoryButtonClick_decorators = [mobx_1.action];
        _handleCloseCategoryDialog_decorators = [mobx_1.action];
        _handleIncludeSubElementsChange_decorators = [mobx_1.action];
        _handleConfirmCategoryDialog_decorators = [mobx_1.action];
        _handleCategoryOperatorChange_decorators = [mobx_1.action];
        _handleTagOperatorChange_decorators = [mobx_1.action];
        _handleTypesChange_decorators = [mobx_1.action];
        _handleAudienceTargetingChange_decorators = [mobx_1.action];
        _handleSortByChange_decorators = [mobx_1.action];
        _handleSortOrderChange_decorators = [mobx_1.action];
        _handlePresentationChange_decorators = [mobx_1.action];
        _handleLimitChange_decorators = [mobx_1.action];
        __esDecorate(null, null, _dataSource_decorators, { kind: "field", name: "dataSource", static: false, private: false, access: { has: obj => "dataSource" in obj, get: obj => obj.dataSource, set: (obj, value) => { obj.dataSource = value; } }, metadata: _metadata }, _dataSource_initializers, _dataSource_extraInitializers);
        __esDecorate(null, null, _includeSubElements_decorators, { kind: "field", name: "includeSubElements", static: false, private: false, access: { has: obj => "includeSubElements" in obj, get: obj => obj.includeSubElements, set: (obj, value) => { obj.includeSubElements = value; } }, metadata: _metadata }, _includeSubElements_initializers, _includeSubElements_extraInitializers);
        __esDecorate(null, null, _categories_decorators, { kind: "field", name: "categories", static: false, private: false, access: { has: obj => "categories" in obj, get: obj => obj.categories, set: (obj, value) => { obj.categories = value; } }, metadata: _metadata }, _categories_initializers, _categories_extraInitializers);
        __esDecorate(null, null, _categoryOperator_decorators, { kind: "field", name: "categoryOperator", static: false, private: false, access: { has: obj => "categoryOperator" in obj, get: obj => obj.categoryOperator, set: (obj, value) => { obj.categoryOperator = value; } }, metadata: _metadata }, _categoryOperator_initializers, _categoryOperator_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _tagOperator_decorators, { kind: "field", name: "tagOperator", static: false, private: false, access: { has: obj => "tagOperator" in obj, get: obj => obj.tagOperator, set: (obj, value) => { obj.tagOperator = value; } }, metadata: _metadata }, _tagOperator_initializers, _tagOperator_extraInitializers);
        __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types, set: (obj, value) => { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
        __esDecorate(null, null, _audienceTargeting_decorators, { kind: "field", name: "audienceTargeting", static: false, private: false, access: { has: obj => "audienceTargeting" in obj, get: obj => obj.audienceTargeting, set: (obj, value) => { obj.audienceTargeting = value; } }, metadata: _metadata }, _audienceTargeting_initializers, _audienceTargeting_extraInitializers);
        __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: obj => "sortBy" in obj, get: obj => obj.sortBy, set: (obj, value) => { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
        __esDecorate(null, null, _presentation_decorators, { kind: "field", name: "presentation", static: false, private: false, access: { has: obj => "presentation" in obj, get: obj => obj.presentation, set: (obj, value) => { obj.presentation = value; } }, metadata: _metadata }, _presentation_initializers, _presentation_extraInitializers);
        __esDecorate(null, null, _showDataSourceDialog_decorators, { kind: "field", name: "showDataSourceDialog", static: false, private: false, access: { has: obj => "showDataSourceDialog" in obj, get: obj => obj.showDataSourceDialog, set: (obj, value) => { obj.showDataSourceDialog = value; } }, metadata: _metadata }, _showDataSourceDialog_initializers, _showDataSourceDialog_extraInitializers);
        __esDecorate(null, null, _showCategoryDialog_decorators, { kind: "field", name: "showCategoryDialog", static: false, private: false, access: { has: obj => "showCategoryDialog" in obj, get: obj => obj.showCategoryDialog, set: (obj, value) => { obj.showCategoryDialog = value; } }, metadata: _metadata }, _showCategoryDialog_initializers, _showCategoryDialog_extraInitializers);
        __esDecorate(null, null, _updateFilterCriteria_decorators, { kind: "field", name: "updateFilterCriteria", static: false, private: false, access: { has: obj => "updateFilterCriteria" in obj, get: obj => obj.updateFilterCriteria, set: (obj, value) => { obj.updateFilterCriteria = value; } }, metadata: _metadata }, _updateFilterCriteria_initializers, _updateFilterCriteria_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _resetFilterCriteria_decorators, { kind: "field", name: "resetFilterCriteria", static: false, private: false, access: { has: obj => "resetFilterCriteria" in obj, get: obj => obj.resetFilterCriteria, set: (obj, value) => { obj.resetFilterCriteria = value; } }, metadata: _metadata }, _resetFilterCriteria_initializers, _resetFilterCriteria_extraInitializers);
        __esDecorate(null, null, _handleConfirmDataSourceDialog_decorators, { kind: "field", name: "handleConfirmDataSourceDialog", static: false, private: false, access: { has: obj => "handleConfirmDataSourceDialog" in obj, get: obj => obj.handleConfirmDataSourceDialog, set: (obj, value) => { obj.handleConfirmDataSourceDialog = value; } }, metadata: _metadata }, _handleConfirmDataSourceDialog_initializers, _handleConfirmDataSourceDialog_extraInitializers);
        __esDecorate(null, null, _handleDataSourceButtonClick_decorators, { kind: "field", name: "handleDataSourceButtonClick", static: false, private: false, access: { has: obj => "handleDataSourceButtonClick" in obj, get: obj => obj.handleDataSourceButtonClick, set: (obj, value) => { obj.handleDataSourceButtonClick = value; } }, metadata: _metadata }, _handleDataSourceButtonClick_initializers, _handleDataSourceButtonClick_extraInitializers);
        __esDecorate(null, null, _handleCloseDataSourceDialog_decorators, { kind: "field", name: "handleCloseDataSourceDialog", static: false, private: false, access: { has: obj => "handleCloseDataSourceDialog" in obj, get: obj => obj.handleCloseDataSourceDialog, set: (obj, value) => { obj.handleCloseDataSourceDialog = value; } }, metadata: _metadata }, _handleCloseDataSourceDialog_initializers, _handleCloseDataSourceDialog_extraInitializers);
        __esDecorate(null, null, _handleCategoryButtonClick_decorators, { kind: "field", name: "handleCategoryButtonClick", static: false, private: false, access: { has: obj => "handleCategoryButtonClick" in obj, get: obj => obj.handleCategoryButtonClick, set: (obj, value) => { obj.handleCategoryButtonClick = value; } }, metadata: _metadata }, _handleCategoryButtonClick_initializers, _handleCategoryButtonClick_extraInitializers);
        __esDecorate(null, null, _handleCloseCategoryDialog_decorators, { kind: "field", name: "handleCloseCategoryDialog", static: false, private: false, access: { has: obj => "handleCloseCategoryDialog" in obj, get: obj => obj.handleCloseCategoryDialog, set: (obj, value) => { obj.handleCloseCategoryDialog = value; } }, metadata: _metadata }, _handleCloseCategoryDialog_initializers, _handleCloseCategoryDialog_extraInitializers);
        __esDecorate(null, null, _handleIncludeSubElementsChange_decorators, { kind: "field", name: "handleIncludeSubElementsChange", static: false, private: false, access: { has: obj => "handleIncludeSubElementsChange" in obj, get: obj => obj.handleIncludeSubElementsChange, set: (obj, value) => { obj.handleIncludeSubElementsChange = value; } }, metadata: _metadata }, _handleIncludeSubElementsChange_initializers, _handleIncludeSubElementsChange_extraInitializers);
        __esDecorate(null, null, _handleConfirmCategoryDialog_decorators, { kind: "field", name: "handleConfirmCategoryDialog", static: false, private: false, access: { has: obj => "handleConfirmCategoryDialog" in obj, get: obj => obj.handleConfirmCategoryDialog, set: (obj, value) => { obj.handleConfirmCategoryDialog = value; } }, metadata: _metadata }, _handleConfirmCategoryDialog_initializers, _handleConfirmCategoryDialog_extraInitializers);
        __esDecorate(null, null, _handleCategoryOperatorChange_decorators, { kind: "field", name: "handleCategoryOperatorChange", static: false, private: false, access: { has: obj => "handleCategoryOperatorChange" in obj, get: obj => obj.handleCategoryOperatorChange, set: (obj, value) => { obj.handleCategoryOperatorChange = value; } }, metadata: _metadata }, _handleCategoryOperatorChange_initializers, _handleCategoryOperatorChange_extraInitializers);
        __esDecorate(null, null, _handleTagOperatorChange_decorators, { kind: "field", name: "handleTagOperatorChange", static: false, private: false, access: { has: obj => "handleTagOperatorChange" in obj, get: obj => obj.handleTagOperatorChange, set: (obj, value) => { obj.handleTagOperatorChange = value; } }, metadata: _metadata }, _handleTagOperatorChange_initializers, _handleTagOperatorChange_extraInitializers);
        __esDecorate(null, null, _handleTypesChange_decorators, { kind: "field", name: "handleTypesChange", static: false, private: false, access: { has: obj => "handleTypesChange" in obj, get: obj => obj.handleTypesChange, set: (obj, value) => { obj.handleTypesChange = value; } }, metadata: _metadata }, _handleTypesChange_initializers, _handleTypesChange_extraInitializers);
        __esDecorate(null, null, _handleAudienceTargetingChange_decorators, { kind: "field", name: "handleAudienceTargetingChange", static: false, private: false, access: { has: obj => "handleAudienceTargetingChange" in obj, get: obj => obj.handleAudienceTargetingChange, set: (obj, value) => { obj.handleAudienceTargetingChange = value; } }, metadata: _metadata }, _handleAudienceTargetingChange_initializers, _handleAudienceTargetingChange_extraInitializers);
        __esDecorate(null, null, _handleSortByChange_decorators, { kind: "field", name: "handleSortByChange", static: false, private: false, access: { has: obj => "handleSortByChange" in obj, get: obj => obj.handleSortByChange, set: (obj, value) => { obj.handleSortByChange = value; } }, metadata: _metadata }, _handleSortByChange_initializers, _handleSortByChange_extraInitializers);
        __esDecorate(null, null, _handleSortOrderChange_decorators, { kind: "field", name: "handleSortOrderChange", static: false, private: false, access: { has: obj => "handleSortOrderChange" in obj, get: obj => obj.handleSortOrderChange, set: (obj, value) => { obj.handleSortOrderChange = value; } }, metadata: _metadata }, _handleSortOrderChange_initializers, _handleSortOrderChange_extraInitializers);
        __esDecorate(null, null, _handlePresentationChange_decorators, { kind: "field", name: "handlePresentationChange", static: false, private: false, access: { has: obj => "handlePresentationChange" in obj, get: obj => obj.handlePresentationChange, set: (obj, value) => { obj.handlePresentationChange = value; } }, metadata: _metadata }, _handlePresentationChange_initializers, _handlePresentationChange_extraInitializers);
        __esDecorate(null, null, _handleLimitChange_decorators, { kind: "field", name: "handleLimitChange", static: false, private: false, access: { has: obj => "handleLimitChange" in obj, get: obj => obj.handleLimitChange, set: (obj, value) => { obj.handleLimitChange = value; } }, metadata: _metadata }, _handleLimitChange_initializers, _handleLimitChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FilterOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FilterOverlay = _classThis;
})();
exports.default = FilterOverlay;
