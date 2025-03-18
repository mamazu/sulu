"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const debounce_1 = __importDefault(require("debounce"));
const Translator_1 = require("../../utils/Translator");
const Loader_1 = __importDefault(require("../Loader"));
const infiniteScroller_scss_1 = __importDefault(require("./infiniteScroller.scss"));
const THRESHOLD = 100;
class InfiniteScroller extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setRef = (ref) => {
            this.elementRef = ref;
        };
        this.scrollListener = (0, debounce_1.default)(() => {
            const { elementRef } = this;
            if (!elementRef) {
                return;
            }
            const { onPageChange, currentPage, } = this.props;
            const { bottom: scrollContainerOffsetBottom, } = this.scrollContainer.getBoundingClientRect();
            const { bottom: elementOffsetBottom, } = elementRef.getBoundingClientRect();
            if ((elementOffsetBottom - scrollContainerOffsetBottom) < THRESHOLD) {
                const nextPage = currentPage ? currentPage + 1 : 1;
                onPageChange(nextPage);
                this.unbindScrollListener();
            }
        }, 200);
    }
    componentDidMount() {
        if (this.elementRef) {
            this.scrollContainer = this.getScrollContainer(this.elementRef.parentNode);
        }
        this.bindScrollListener();
    }
    componentWillUnmount() {
        this.unbindScrollListener();
    }
    componentDidUpdate() {
        this.bindScrollListener();
    }
    getScrollContainer(parentContainer) {
        if (!parentContainer || parentContainer === window.document) {
            return window.document.body;
        }
        if (this.isScrollable(parentContainer)) {
            return parentContainer;
        }
        return this.getScrollContainer(parentContainer.parentNode);
    }
    // We have to check for the overflow property inside the styling to detect if the container is scrollable
    // otherwise (using scrollHeight) we would have issues with async content loads leading to wrong container sizes.
    isScrollable(el) {
        const overflowY = window.getComputedStyle(el)['overflow-y'];
        return overflowY === 'auto' || overflowY === 'scroll';
    }
    bindScrollListener() {
        const { currentPage, totalPages, } = this.props;
        if (!currentPage || !totalPages || currentPage >= totalPages) {
            return;
        }
        this.scrollContainer.addEventListener('resize', this.scrollListener, false);
        this.scrollContainer.addEventListener('scroll', this.scrollListener, false);
    }
    unbindScrollListener() {
        this.scrollContainer.removeEventListener('resize', this.scrollListener, false);
        this.scrollContainer.removeEventListener('scroll', this.scrollListener, false);
    }
    render() {
        const { totalPages, currentPage, loading, children, } = this.props;
        let indicator = null;
        if (loading) {
            indicator = <Loader_1.default />;
        }
        else if (currentPage === totalPages) {
            indicator = (0, Translator_1.translate)('sulu_admin.reached_end_of_list');
        }
        return (<section ref={this.setRef}>
                <div>
                    {children}
                </div>
                <div className={infiniteScroller_scss_1.default.indicator}>
                    {indicator}
                </div>
            </section>);
    }
}
InfiniteScroller.defaultProps = {
    loading: false,
};
exports.default = InfiniteScroller;
