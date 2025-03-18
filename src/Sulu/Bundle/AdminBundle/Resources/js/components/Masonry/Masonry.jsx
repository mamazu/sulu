"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const imagesloaded_1 = __importDefault(require("imagesloaded"));
const masonry_layout_1 = __importDefault(require("masonry-layout"));
const masonry_scss_1 = __importDefault(require("./masonry.scss"));
const MASONRY_OPTIONS = {
    gutter: 30,
    transitionDuration: 250,
};
class Masonry extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setMasonryRef = (ref) => {
            this.masonryRef = ref;
        };
    }
    componentDidMount() {
        this.initMasonryLayout();
        this.handleImagesLoading();
    }
    componentWillUnmount() {
        this.layoutedChildNodes = [];
        this.destroyMasonry();
    }
    componentDidUpdate() {
        this.handleChildrenUpdates();
        this.handleImagesLoading();
    }
    getChildNodes() {
        const { masonryRef } = this;
        if (!masonryRef) {
            return [];
        }
        const childNodes = masonryRef.children;
        return Array.from(childNodes);
    }
    initMasonryLayout() {
        this.masonry = new masonry_layout_1.default(this.masonryRef, MASONRY_OPTIONS);
        this.layoutedChildNodes = this.getChildNodes();
    }
    destroyMasonry() {
        if (this.masonry) {
            this.masonry.destroy();
            this.masonry = null;
        }
    }
    cloneItems(originalItems) {
        const itemStyle = { marginBottom: MASONRY_OPTIONS.gutter };
        return react_1.default.Children.map(originalItems, (item) => (<li style={itemStyle}>
                {react_1.default.cloneElement(item, {
                key: item.key,
            })}
            </li>));
    }
    handleChildrenUpdates() {
        const currentChildNodes = this.getChildNodes();
        const knownChildNodes = currentChildNodes.filter((currentChildNode) => {
            return this.layoutedChildNodes.includes(currentChildNode);
        });
        const newChildNodes = currentChildNodes.filter((currentChildNode) => {
            return !knownChildNodes.includes(currentChildNode);
        });
        const removedChildNodes = knownChildNodes.filter((knownChildNode) => {
            return !currentChildNodes.includes(knownChildNode);
        });
        let startIndex = 0;
        const prependedChildNodes = newChildNodes.filter((newChildNode) => {
            const isPrepended = (startIndex === currentChildNodes.indexOf(newChildNode));
            if (isPrepended) {
                startIndex++;
            }
            return isPrepended;
        });
        const appendedChildNodes = newChildNodes.filter((newChildNode) => {
            return !prependedChildNodes.includes(newChildNode);
        });
        if (removedChildNodes.length > 0) {
            this.masonry.remove(removedChildNodes);
        }
        if (appendedChildNodes.length > 0) {
            this.masonry.appended(appendedChildNodes);
        }
        if (prependedChildNodes.length > 0) {
            this.masonry.prepended(prependedChildNodes);
        }
        this.layoutedChildNodes = currentChildNodes;
        if (removedChildNodes.length > 0 ||
            appendedChildNodes.length > 0 ||
            prependedChildNodes.length > 0) {
            this.masonry.reloadItems();
        }
        this.masonry.layout();
    }
    handleImagesLoading() {
        (0, imagesloaded_1.default)(this.layoutedChildNodes).once('always', () => {
            if (this.masonry) {
                this.masonry.layout();
            }
        });
    }
    render() {
        const { children, } = this.props;
        const clonedItems = this.cloneItems(children);
        return (<ul className={masonry_scss_1.default.masonry} ref={this.setMasonryRef}>
                {clonedItems}
            </ul>);
    }
}
exports.default = Masonry;
