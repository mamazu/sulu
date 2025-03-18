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
const utils_1 = require("../../utils");
const Button_1 = __importDefault(require("../Button"));
const BlockToolbar_1 = __importDefault(require("../BlockToolbar"));
const Icon_1 = __importDefault(require("../Icon"));
const Sticky_1 = __importDefault(require("../Sticky"));
const SortableBlockList_1 = __importDefault(require("./SortableBlockList"));
const blockCollection_scss_1 = __importDefault(require("./blockCollection.scss"));
const BLOCKS_CLIPBOARD_KEY = 'blocks';
let BlockCollection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _pasteableBlocks_decorators;
    let _pasteableBlocks_initializers = [];
    let _pasteableBlocks_extraInitializers = [];
    let _generatedBlockIds_decorators;
    let _generatedBlockIds_initializers = [];
    let _generatedBlockIds_extraInitializers = [];
    let _expandedBlocks_decorators;
    let _expandedBlocks_initializers = [];
    let _expandedBlocks_extraInitializers = [];
    let _selectedBlocks_decorators;
    let _selectedBlocks_initializers = [];
    let _selectedBlocks_extraInitializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _mode_extraInitializers = [];
    let _get_selectedBlockIndexes_decorators;
    let _handleAddBlock_decorators;
    let _handleAddBlock_initializers = [];
    let _handleAddBlock_extraInitializers = [];
    let _handlePasteBlocks_decorators;
    let _handlePasteBlocks_initializers = [];
    let _handlePasteBlocks_extraInitializers = [];
    let _removeBlocks_decorators;
    let _removeBlocks_initializers = [];
    let _removeBlocks_extraInitializers = [];
    let _duplicateBlocks_decorators;
    let _duplicateBlocks_initializers = [];
    let _duplicateBlocks_extraInitializers = [];
    let _handleSortEnd_decorators;
    let _handleSortEnd_initializers = [];
    let _handleSortEnd_extraInitializers = [];
    let _handleCollapse_decorators;
    let _handleCollapse_initializers = [];
    let _handleCollapse_extraInitializers = [];
    let _handleExpand_decorators;
    let _handleExpand_initializers = [];
    let _handleExpand_extraInitializers = [];
    let _handleSelect_decorators;
    let _handleSelect_initializers = [];
    let _handleSelect_extraInitializers = [];
    let _handleUnselect_decorators;
    let _handleUnselect_initializers = [];
    let _handleUnselect_extraInitializers = [];
    let _handleTypeChange_decorators;
    let _handleTypeChange_initializers = [];
    let _handleTypeChange_extraInitializers = [];
    let _get_hasMaximumReached_decorators;
    let _get_hasMinimumReached_decorators;
    let _get_blockActions_decorators;
    let _handleBlockToolbarCancel_decorators;
    let _handleBlockToolbarCancel_initializers = [];
    let _handleBlockToolbarCancel_extraInitializers = [];
    let _handleClickSelectMultiple_decorators;
    let _handleClickSelectMultiple_initializers = [];
    let _handleClickSelectMultiple_extraInitializers = [];
    let _handleBlockToolbarSelectAll_decorators;
    let _handleBlockToolbarSelectAll_initializers = [];
    let _handleBlockToolbarSelectAll_extraInitializers = [];
    let _handleBlockToolbarUnselectAll_decorators;
    let _handleBlockToolbarUnselectAll_initializers = [];
    let _handleBlockToolbarUnselectAll_extraInitializers = [];
    var BlockCollection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.pasteableBlocks = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _pasteableBlocks_initializers, []));
            this.generatedBlockIds = (__runInitializers(this, _pasteableBlocks_extraInitializers), __runInitializers(this, _generatedBlockIds_initializers, []));
            this.expandedBlocks = (__runInitializers(this, _generatedBlockIds_extraInitializers), __runInitializers(this, _expandedBlocks_initializers, []));
            this.selectedBlocks = (__runInitializers(this, _expandedBlocks_extraInitializers), __runInitializers(this, _selectedBlocks_initializers, []));
            this.mode = (__runInitializers(this, _selectedBlocks_extraInitializers), __runInitializers(this, _mode_initializers, 'sortable'));
            this.fillArraysDisposer = __runInitializers(this, _mode_extraInitializers);
            this.fillArrays = () => {
                const { collapsable, defaultType, onChange, minOccurs, value } = this.props;
                const { expandedBlocks, generatedBlockIds, selectedBlocks } = this;
                if (!value) {
                    return;
                }
                if (expandedBlocks.length > value.length) {
                    expandedBlocks.splice(value.length);
                }
                if (selectedBlocks.length > value.length) {
                    selectedBlocks.splice(value.length);
                }
                if (generatedBlockIds.length > value.length) {
                    generatedBlockIds.splice(value.length);
                }
                const collapsed = collapsable ? false : true;
                expandedBlocks.push(...new Array(value.length - expandedBlocks.length).fill(collapsed));
                selectedBlocks.push(...new Array(value.length - selectedBlocks.length).fill(false));
                generatedBlockIds.push(...new Array(value.length - generatedBlockIds.length).fill(false).map(() => ++BlockCollection.idCounter));
                if (minOccurs && value.length < minOccurs) {
                    expandedBlocks.push(...new Array(minOccurs - value.length).fill(true));
                    selectedBlocks.push(...new Array(minOccurs - value.length).fill(false));
                    generatedBlockIds.push(...new Array(minOccurs - value.length).fill(false).map(() => ++BlockCollection.idCounter));
                    onChange([
                        ...value,
                        ...Array.from({ length: minOccurs - value.length }, 
                        // $FlowFixMe
                        () => ({ type: defaultType })),
                    ]);
                }
            };
            this.handleAddBlock = __runInitializers(this, _handleAddBlock_initializers, (insertionIndex) => {
                const { defaultType, onChange, value } = this.props;
                if (this.hasMaximumReached) {
                    throw new Error('The maximum amount of blocks has already been reached!');
                }
                if (value) {
                    this.expandedBlocks.splice(insertionIndex, 0, true);
                    this.selectedBlocks.splice(insertionIndex, 0, false);
                    this.generatedBlockIds.splice(insertionIndex, 0, ++BlockCollection.idCounter);
                    const elementsBefore = value.slice(0, insertionIndex);
                    const elementsAfter = value.slice(insertionIndex);
                    onChange([...elementsBefore, { type: defaultType }, ...elementsAfter]);
                }
            });
            this.handlePasteBlocks = (__runInitializers(this, _handleAddBlock_extraInitializers), __runInitializers(this, _handlePasteBlocks_initializers, (insertionIndex) => {
                const { onChange, onDisplaySnackbar, value } = this.props;
                if (this.hasMaximumReached) {
                    throw new Error('The maximum amount of blocks has already been reached!');
                }
                if (!value) {
                    return;
                }
                this.expandedBlocks.splice(insertionIndex, 0, ...this.pasteableBlocks.map(() => true));
                this.selectedBlocks.splice(insertionIndex, 0, ...this.pasteableBlocks.map(() => false));
                this.generatedBlockIds.splice(insertionIndex, 0, ...this.pasteableBlocks.map(() => ++BlockCollection.idCounter));
                const newElements = this.pasteableBlocks.map((block) => {
                    var _a;
                    // paste block with default type if type of block in clipboard is not known
                    if (!((_a = this.props.types) === null || _a === void 0 ? void 0 : _a[block.type])) {
                        return Object.assign(Object.assign({}, block), { type: this.props.defaultType });
                    }
                    return block;
                });
                const elementsBefore = value.slice(0, insertionIndex);
                const elementsAfter = value.slice(insertionIndex);
                onChange([...elementsBefore, ...newElements, ...elementsAfter]);
                utils_1.clipboard.set(BLOCKS_CLIPBOARD_KEY, undefined);
                if (onDisplaySnackbar) {
                    onDisplaySnackbar({
                        type: 'info',
                        text: (0, utils_1.translate)('sulu_admin.%count%_blocks_pasted', { count: newElements.length }),
                        icon: 'su-copy',
                    });
                }
            }));
            this.handleRemoveBlock = (__runInitializers(this, _handlePasteBlocks_extraInitializers), (index) => {
                this.removeBlocks([index]);
            });
            this.handleRemoveSelectedBlocks = () => {
                this.removeBlocks(this.selectedBlockIndexes);
            };
            this.removeBlocks = __runInitializers(this, _removeBlocks_initializers, (indexes, shouldDisplaySnackbar = true) => {
                const { onChange, onDisplaySnackbar, movable, value } = this.props;
                if (!value) {
                    return;
                }
                indexes.forEach((index, count) => {
                    if (this.hasMinimumReached) {
                        // TODO throw snackbar message or maybe its not required as fillArrays already refill the array
                        throw new Error('The minimum amount of blocks has already been reached!');
                    }
                    const currentRemoveIndex = index - count;
                    this.expandedBlocks.splice(currentRemoveIndex, 1);
                    this.selectedBlocks.splice(currentRemoveIndex, 1);
                    this.generatedBlockIds.splice(currentRemoveIndex, 1);
                });
                if (this.generatedBlockIds.length < 2 && this.mode === 'selectable') {
                    this.mode = movable ? 'sortable' : 'static';
                }
                onChange(value.filter((block, index) => indexes.indexOf(index) === -1));
                if (shouldDisplaySnackbar && onDisplaySnackbar) {
                    onDisplaySnackbar({
                        type: 'info',
                        text: (0, utils_1.translate)('sulu_admin.%count%_blocks_removed', { count: indexes.length }),
                        icon: 'su-trash-alt',
                    });
                }
            });
            this.handleDuplicateSelectedBlocks = (__runInitializers(this, _removeBlocks_extraInitializers), () => {
                const { value } = this.props;
                this.duplicateBlocks(this.selectedBlockIndexes, value.length);
            });
            this.handleDuplicateBlock = (index) => {
                this.duplicateBlocks([index], index);
            };
            this.duplicateBlocks = __runInitializers(this, _duplicateBlocks_initializers, (indexes, insertAfterIndex) => {
                const { onChange, onDisplaySnackbar, value } = this.props;
                if (!value) {
                    return;
                }
                let newValue = [...value];
                indexes.forEach((index, count) => {
                    if (this.hasMaximumReached) {
                        // TODO throw snackbar message or maybe its not required as fillArrays already refill the array
                        throw new Error('The maximum amount of blocks has already been reached!');
                    }
                    const currentInsertAfterIndex = insertAfterIndex + count;
                    this.expandedBlocks.splice(currentInsertAfterIndex, 0, true);
                    this.selectedBlocks.splice(currentInsertAfterIndex, 0, false);
                    this.generatedBlockIds.splice(currentInsertAfterIndex, 0, ++BlockCollection.idCounter);
                    const elementsBefore = newValue.slice(0, currentInsertAfterIndex);
                    const elementsAfter = newValue.slice(currentInsertAfterIndex);
                    newValue = [...elementsBefore, Object.assign({}, (0, mobx_1.toJS)(newValue[index])), ...elementsAfter];
                });
                onChange(newValue);
                if (onDisplaySnackbar) {
                    onDisplaySnackbar({
                        type: 'info',
                        text: (0, utils_1.translate)('sulu_admin.%count%_blocks_duplicated', { count: indexes.length }),
                        icon: 'su-duplicate',
                    });
                }
            });
            this.handleCopySelectedBlocks = (__runInitializers(this, _duplicateBlocks_extraInitializers), () => {
                this.copyBlocks(this.selectedBlockIndexes);
            });
            this.handleCopyBlock = (index) => {
                this.copyBlocks([index]);
            };
            this.copyBlocks = (indexes, shouldDisplaySnackbar = true) => {
                const { onDisplaySnackbar, value } = this.props;
                if (!value) {
                    return;
                }
                const blocks = [];
                indexes.forEach((index) => {
                    blocks.push(Object.assign({}, (0, mobx_1.toJS)(value[index])));
                });
                utils_1.clipboard.set(BLOCKS_CLIPBOARD_KEY, blocks);
                if (shouldDisplaySnackbar && onDisplaySnackbar) {
                    onDisplaySnackbar({
                        type: 'info',
                        text: (0, utils_1.translate)('sulu_admin.%count%_blocks_copied', { count: indexes.length }),
                        icon: 'su-copy',
                    });
                }
            };
            this.handleCutSelectedBlocks = () => {
                this.cutBlocks(this.selectedBlockIndexes);
            };
            this.handleCutBlock = (index) => {
                this.cutBlocks([index]);
            };
            this.cutBlocks = (indexes) => {
                const { onDisplaySnackbar } = this.props;
                this.copyBlocks(indexes, false);
                this.removeBlocks(indexes, false);
                if (onDisplaySnackbar) {
                    onDisplaySnackbar({
                        type: 'info',
                        text: (0, utils_1.translate)('sulu_admin.%count%_blocks_cut', { count: indexes.length }),
                        icon: 'su-cut',
                    });
                }
            };
            this.handleSortEnd = __runInitializers(this, _handleSortEnd_initializers, ({ newIndex, oldIndex, }) => {
                const { onChange, onSortEnd, value } = this.props;
                this.expandedBlocks = (0, utils_1.arrayMove)(this.expandedBlocks, oldIndex, newIndex);
                this.selectedBlocks = (0, utils_1.arrayMove)(this.selectedBlocks, oldIndex, newIndex);
                this.generatedBlockIds = (0, utils_1.arrayMove)(this.generatedBlockIds, oldIndex, newIndex);
                onChange((0, utils_1.arrayMove)(value, oldIndex, newIndex));
                if (onSortEnd) {
                    onSortEnd(oldIndex, newIndex);
                }
            });
            this.handleCollapse = (__runInitializers(this, _handleSortEnd_extraInitializers), __runInitializers(this, _handleCollapse_initializers, (index) => {
                this.expandedBlocks[index] = false;
            }));
            this.handleExpand = (__runInitializers(this, _handleCollapse_extraInitializers), __runInitializers(this, _handleExpand_initializers, (index) => {
                this.expandedBlocks[index] = true;
            }));
            this.handleSelect = (__runInitializers(this, _handleExpand_extraInitializers), __runInitializers(this, _handleSelect_initializers, (index) => {
                this.selectedBlocks[index] = true;
            }));
            this.handleUnselect = (__runInitializers(this, _handleSelect_extraInitializers), __runInitializers(this, _handleUnselect_initializers, (index) => {
                this.selectedBlocks[index] = false;
            }));
            this.handleSettingsClick = (__runInitializers(this, _handleUnselect_extraInitializers), (index) => {
                const { onSettingsClick } = this.props;
                if (onSettingsClick) {
                    onSettingsClick(index);
                }
            });
            this.handleTypeChange = __runInitializers(this, _handleTypeChange_initializers, (type, index) => {
                const { onChange, value } = this.props;
                const newValue = (0, mobx_1.toJS)(value);
                newValue[index].type = type;
                onChange(newValue);
            });
            this.renderAddButton = (__runInitializers(this, _handleTypeChange_extraInitializers), (aboveBlockIndex) => {
                const { addButtonText, pasteButtonText, disabled, value } = this.props;
                const isDividerButton = aboveBlockIndex < value.length - 1;
                const containerClass = (0, classnames_1.default)(blockCollection_scss_1.default.addButtonContainer, {
                    [blockCollection_scss_1.default.addButtonDivider]: isDividerButton,
                });
                return (<div className={containerClass}>
                <Button_1.default className={blockCollection_scss_1.default.addButton} disabled={disabled || this.hasMaximumReached} icon="su-plus" onClick={this.handleAddBlock} skin="secondary" value={aboveBlockIndex + 1}>
                    {addButtonText ? addButtonText : (0, utils_1.translate)('sulu_admin.add_block')}
                </Button_1.default>
                {this.pasteableBlocks.length > 0 && (<Button_1.default className={blockCollection_scss_1.default.addButton} disabled={disabled || this.hasMaximumReached} icon="su-copy" onClick={this.handlePasteBlocks} skin="secondary" value={aboveBlockIndex + 1}>
                        {pasteButtonText
                            ? pasteButtonText
                            : (0, utils_1.translate)('sulu_admin.paste_blocks', { count: this.pasteableBlocks.length })}
                    </Button_1.default>)}
            </div>);
            });
            this.handleBlockToolbarCancel = __runInitializers(this, _handleBlockToolbarCancel_initializers, () => {
                const { movable } = this.props;
                this.mode = movable ? 'sortable' : 'static';
                this.selectedBlocks.forEach((element, index) => {
                    this.selectedBlocks[index] = false;
                });
            });
            this.handleClickSelectMultiple = (__runInitializers(this, _handleBlockToolbarCancel_extraInitializers), __runInitializers(this, _handleClickSelectMultiple_initializers, () => {
                this.mode = 'selectable';
            }));
            this.handleBlockToolbarSelectAll = (__runInitializers(this, _handleClickSelectMultiple_extraInitializers), __runInitializers(this, _handleBlockToolbarSelectAll_initializers, () => {
                this.selectedBlocks.forEach((element, index) => {
                    this.selectedBlocks[index] = true;
                });
            }));
            this.handleBlockToolbarUnselectAll = (__runInitializers(this, _handleBlockToolbarSelectAll_extraInitializers), __runInitializers(this, _handleBlockToolbarUnselectAll_initializers, () => {
                this.selectedBlocks.forEach((element, index) => {
                    this.selectedBlocks[index] = false;
                });
            }));
            this.renderBlockToolbar = (__runInitializers(this, _handleBlockToolbarUnselectAll_extraInitializers), (isSticky) => {
                const { value } = this.props;
                const selectedBlocksCount = this.selectedBlocks.filter((element) => element).length;
                return (<BlockToolbar_1.default actions={[
                        {
                            label: (0, utils_1.translate)('sulu_admin.copy'),
                            icon: 'su-copy',
                            handleClick: this.handleCopySelectedBlocks,
                        },
                        {
                            label: (0, utils_1.translate)('sulu_admin.duplicate'),
                            icon: 'su-duplicate',
                            handleClick: this.handleDuplicateSelectedBlocks,
                        },
                        {
                            label: (0, utils_1.translate)('sulu_admin.cut'),
                            icon: 'su-scissors',
                            handleClick: this.handleCutSelectedBlocks,
                        },
                        {
                            label: (0, utils_1.translate)('sulu_admin.delete'),
                            icon: 'su-trash-alt',
                            handleClick: this.handleRemoveSelectedBlocks,
                        },
                    ]} allSelected={selectedBlocksCount === value.length} mode={isSticky ? 'sticky' : 'static'} onCancel={this.handleBlockToolbarCancel} onSelectAll={this.handleBlockToolbarSelectAll} onUnselectAll={this.handleBlockToolbarUnselectAll} selectedCount={selectedBlocksCount}/>);
            });
            this.renderBlockToolbarButton = () => {
                return (<div className={blockCollection_scss_1.default.selectMultipleButtonContainer}>
                <button className={blockCollection_scss_1.default.selectMultipleButton} onClick={this.handleClickSelectMultiple} type="button">
                    <Icon_1.default aria-hidden={true} className={blockCollection_scss_1.default.selectMultipleButtonIcon} name="su-check-circle"/>
                    <span className={blockCollection_scss_1.default.selectMultipleButtonText}>
                        {(0, utils_1.translate)('sulu_admin.select_multiple_blocks')}
                    </span>
                </button>
            </div>);
            };
            this.fillArraysDisposer = (0, mobx_1.reaction)(() => this.props.value.length, this.fillArrays, { fireImmediately: true });
            this.setPasteableBlocksDisposer = utils_1.clipboard.observe(BLOCKS_CLIPBOARD_KEY, (0, mobx_1.action)((blocks) => {
                this.pasteableBlocks = blocks || [];
            }), true);
            if (props.movable === false) {
                this.mode = 'static';
            }
        }
        componentWillUnmount() {
            var _a, _b;
            (_a = this.fillArraysDisposer) === null || _a === void 0 ? void 0 : _a.call(this);
            (_b = this.setPasteableBlocksDisposer) === null || _b === void 0 ? void 0 : _b.call(this);
        }
        get selectedBlockIndexes() {
            const indexes = [];
            this.selectedBlocks.forEach((selected, index) => {
                if (selected) {
                    indexes.push(index);
                }
            });
            return indexes;
        }
        get hasMaximumReached() {
            const { maxOccurs, value } = this.props;
            return !!maxOccurs && value.length >= maxOccurs;
        }
        get hasMinimumReached() {
            const { minOccurs, value } = this.props;
            return !!minOccurs && value.length <= minOccurs;
        }
        get blockActions() {
            const blockActions = [];
            blockActions.push({
                type: 'button',
                icon: 'su-copy',
                label: (0, utils_1.translate)('sulu_admin.copy'),
                onClick: this.handleCopyBlock,
            });
            if (!this.hasMinimumReached) {
                blockActions.push({
                    type: 'button',
                    icon: 'su-scissors',
                    label: (0, utils_1.translate)('sulu_admin.cut'),
                    onClick: this.handleCutBlock,
                });
            }
            if (!this.hasMaximumReached) {
                blockActions.push({
                    type: 'button',
                    icon: 'su-duplicate',
                    label: (0, utils_1.translate)('sulu_admin.duplicate'),
                    onClick: this.handleDuplicateBlock,
                });
            }
            if (!this.hasMinimumReached) {
                if (blockActions.length > 0) {
                    blockActions.push({
                        type: 'divider',
                    });
                }
                blockActions.push({
                    type: 'button',
                    icon: 'su-trash-alt',
                    label: (0, utils_1.translate)('sulu_admin.delete'),
                    onClick: this.handleRemoveBlock,
                });
            }
            return blockActions;
        }
        render() {
            const { collapsable, disabled, icons, onSettingsClick, renderBlockContent, types, value, } = this.props;
            return (<section className={blockCollection_scss_1.default.blocks}>
                {value.length > 1 ? (this.mode === 'selectable'
                    ? <Sticky_1.default top={10}>
                                {this.renderBlockToolbar}
                            </Sticky_1.default>
                    : this.renderBlockToolbarButton()) : null}

                <div className={blockCollection_scss_1.default.spacer}/>

                <SortableBlockList_1.default blockActions={this.blockActions} disabled={disabled} expandedBlocks={this.expandedBlocks} generatedBlockIds={this.generatedBlockIds} icons={icons} lockAxis="y" mode={this.mode} onCollapse={collapsable ? this.handleCollapse : undefined} onExpand={collapsable ? this.handleExpand : undefined} onSelect={this.handleSelect} onSettingsClick={onSettingsClick ? this.handleSettingsClick : undefined} onSortEnd={this.handleSortEnd} onTypeChange={this.handleTypeChange} onUnselect={this.handleUnselect} renderBlockContent={renderBlockContent} renderDivider={this.renderAddButton} selectedBlocks={this.selectedBlocks} types={types} useDragHandle={true} value={value}/>
                {this.renderAddButton(value.length - 1)}
            </section>);
        }
    };
    __setFunctionName(_classThis, "BlockCollection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _pasteableBlocks_decorators = [mobx_1.observable];
        _generatedBlockIds_decorators = [mobx_1.observable];
        _expandedBlocks_decorators = [mobx_1.observable];
        _selectedBlocks_decorators = [mobx_1.observable];
        _mode_decorators = [mobx_1.observable];
        _get_selectedBlockIndexes_decorators = [mobx_1.computed];
        _handleAddBlock_decorators = [mobx_1.action];
        _handlePasteBlocks_decorators = [mobx_1.action];
        _removeBlocks_decorators = [mobx_1.action];
        _duplicateBlocks_decorators = [mobx_1.action];
        _handleSortEnd_decorators = [mobx_1.action];
        _handleCollapse_decorators = [mobx_1.action];
        _handleExpand_decorators = [mobx_1.action];
        _handleSelect_decorators = [mobx_1.action];
        _handleUnselect_decorators = [mobx_1.action];
        _handleTypeChange_decorators = [mobx_1.action];
        _get_hasMaximumReached_decorators = [mobx_1.computed];
        _get_hasMinimumReached_decorators = [mobx_1.computed];
        _get_blockActions_decorators = [mobx_1.computed];
        _handleBlockToolbarCancel_decorators = [mobx_1.action];
        _handleClickSelectMultiple_decorators = [mobx_1.action];
        _handleBlockToolbarSelectAll_decorators = [mobx_1.action];
        _handleBlockToolbarUnselectAll_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_selectedBlockIndexes_decorators, { kind: "getter", name: "selectedBlockIndexes", static: false, private: false, access: { has: obj => "selectedBlockIndexes" in obj, get: obj => obj.selectedBlockIndexes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasMaximumReached_decorators, { kind: "getter", name: "hasMaximumReached", static: false, private: false, access: { has: obj => "hasMaximumReached" in obj, get: obj => obj.hasMaximumReached }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasMinimumReached_decorators, { kind: "getter", name: "hasMinimumReached", static: false, private: false, access: { has: obj => "hasMinimumReached" in obj, get: obj => obj.hasMinimumReached }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_blockActions_decorators, { kind: "getter", name: "blockActions", static: false, private: false, access: { has: obj => "blockActions" in obj, get: obj => obj.blockActions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _pasteableBlocks_decorators, { kind: "field", name: "pasteableBlocks", static: false, private: false, access: { has: obj => "pasteableBlocks" in obj, get: obj => obj.pasteableBlocks, set: (obj, value) => { obj.pasteableBlocks = value; } }, metadata: _metadata }, _pasteableBlocks_initializers, _pasteableBlocks_extraInitializers);
        __esDecorate(null, null, _generatedBlockIds_decorators, { kind: "field", name: "generatedBlockIds", static: false, private: false, access: { has: obj => "generatedBlockIds" in obj, get: obj => obj.generatedBlockIds, set: (obj, value) => { obj.generatedBlockIds = value; } }, metadata: _metadata }, _generatedBlockIds_initializers, _generatedBlockIds_extraInitializers);
        __esDecorate(null, null, _expandedBlocks_decorators, { kind: "field", name: "expandedBlocks", static: false, private: false, access: { has: obj => "expandedBlocks" in obj, get: obj => obj.expandedBlocks, set: (obj, value) => { obj.expandedBlocks = value; } }, metadata: _metadata }, _expandedBlocks_initializers, _expandedBlocks_extraInitializers);
        __esDecorate(null, null, _selectedBlocks_decorators, { kind: "field", name: "selectedBlocks", static: false, private: false, access: { has: obj => "selectedBlocks" in obj, get: obj => obj.selectedBlocks, set: (obj, value) => { obj.selectedBlocks = value; } }, metadata: _metadata }, _selectedBlocks_initializers, _selectedBlocks_extraInitializers);
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
        __esDecorate(null, null, _handleAddBlock_decorators, { kind: "field", name: "handleAddBlock", static: false, private: false, access: { has: obj => "handleAddBlock" in obj, get: obj => obj.handleAddBlock, set: (obj, value) => { obj.handleAddBlock = value; } }, metadata: _metadata }, _handleAddBlock_initializers, _handleAddBlock_extraInitializers);
        __esDecorate(null, null, _handlePasteBlocks_decorators, { kind: "field", name: "handlePasteBlocks", static: false, private: false, access: { has: obj => "handlePasteBlocks" in obj, get: obj => obj.handlePasteBlocks, set: (obj, value) => { obj.handlePasteBlocks = value; } }, metadata: _metadata }, _handlePasteBlocks_initializers, _handlePasteBlocks_extraInitializers);
        __esDecorate(null, null, _removeBlocks_decorators, { kind: "field", name: "removeBlocks", static: false, private: false, access: { has: obj => "removeBlocks" in obj, get: obj => obj.removeBlocks, set: (obj, value) => { obj.removeBlocks = value; } }, metadata: _metadata }, _removeBlocks_initializers, _removeBlocks_extraInitializers);
        __esDecorate(null, null, _duplicateBlocks_decorators, { kind: "field", name: "duplicateBlocks", static: false, private: false, access: { has: obj => "duplicateBlocks" in obj, get: obj => obj.duplicateBlocks, set: (obj, value) => { obj.duplicateBlocks = value; } }, metadata: _metadata }, _duplicateBlocks_initializers, _duplicateBlocks_extraInitializers);
        __esDecorate(null, null, _handleSortEnd_decorators, { kind: "field", name: "handleSortEnd", static: false, private: false, access: { has: obj => "handleSortEnd" in obj, get: obj => obj.handleSortEnd, set: (obj, value) => { obj.handleSortEnd = value; } }, metadata: _metadata }, _handleSortEnd_initializers, _handleSortEnd_extraInitializers);
        __esDecorate(null, null, _handleCollapse_decorators, { kind: "field", name: "handleCollapse", static: false, private: false, access: { has: obj => "handleCollapse" in obj, get: obj => obj.handleCollapse, set: (obj, value) => { obj.handleCollapse = value; } }, metadata: _metadata }, _handleCollapse_initializers, _handleCollapse_extraInitializers);
        __esDecorate(null, null, _handleExpand_decorators, { kind: "field", name: "handleExpand", static: false, private: false, access: { has: obj => "handleExpand" in obj, get: obj => obj.handleExpand, set: (obj, value) => { obj.handleExpand = value; } }, metadata: _metadata }, _handleExpand_initializers, _handleExpand_extraInitializers);
        __esDecorate(null, null, _handleSelect_decorators, { kind: "field", name: "handleSelect", static: false, private: false, access: { has: obj => "handleSelect" in obj, get: obj => obj.handleSelect, set: (obj, value) => { obj.handleSelect = value; } }, metadata: _metadata }, _handleSelect_initializers, _handleSelect_extraInitializers);
        __esDecorate(null, null, _handleUnselect_decorators, { kind: "field", name: "handleUnselect", static: false, private: false, access: { has: obj => "handleUnselect" in obj, get: obj => obj.handleUnselect, set: (obj, value) => { obj.handleUnselect = value; } }, metadata: _metadata }, _handleUnselect_initializers, _handleUnselect_extraInitializers);
        __esDecorate(null, null, _handleTypeChange_decorators, { kind: "field", name: "handleTypeChange", static: false, private: false, access: { has: obj => "handleTypeChange" in obj, get: obj => obj.handleTypeChange, set: (obj, value) => { obj.handleTypeChange = value; } }, metadata: _metadata }, _handleTypeChange_initializers, _handleTypeChange_extraInitializers);
        __esDecorate(null, null, _handleBlockToolbarCancel_decorators, { kind: "field", name: "handleBlockToolbarCancel", static: false, private: false, access: { has: obj => "handleBlockToolbarCancel" in obj, get: obj => obj.handleBlockToolbarCancel, set: (obj, value) => { obj.handleBlockToolbarCancel = value; } }, metadata: _metadata }, _handleBlockToolbarCancel_initializers, _handleBlockToolbarCancel_extraInitializers);
        __esDecorate(null, null, _handleClickSelectMultiple_decorators, { kind: "field", name: "handleClickSelectMultiple", static: false, private: false, access: { has: obj => "handleClickSelectMultiple" in obj, get: obj => obj.handleClickSelectMultiple, set: (obj, value) => { obj.handleClickSelectMultiple = value; } }, metadata: _metadata }, _handleClickSelectMultiple_initializers, _handleClickSelectMultiple_extraInitializers);
        __esDecorate(null, null, _handleBlockToolbarSelectAll_decorators, { kind: "field", name: "handleBlockToolbarSelectAll", static: false, private: false, access: { has: obj => "handleBlockToolbarSelectAll" in obj, get: obj => obj.handleBlockToolbarSelectAll, set: (obj, value) => { obj.handleBlockToolbarSelectAll = value; } }, metadata: _metadata }, _handleBlockToolbarSelectAll_initializers, _handleBlockToolbarSelectAll_extraInitializers);
        __esDecorate(null, null, _handleBlockToolbarUnselectAll_decorators, { kind: "field", name: "handleBlockToolbarUnselectAll", static: false, private: false, access: { has: obj => "handleBlockToolbarUnselectAll" in obj, get: obj => obj.handleBlockToolbarUnselectAll, set: (obj, value) => { obj.handleBlockToolbarUnselectAll = value; } }, metadata: _metadata }, _handleBlockToolbarUnselectAll_initializers, _handleBlockToolbarUnselectAll_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BlockCollection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.idCounter = 0;
    _classThis.defaultProps = {
        collapsable: true,
        disabled: false,
        movable: true,
        value: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BlockCollection = _classThis;
})();
exports.default = BlockCollection;
