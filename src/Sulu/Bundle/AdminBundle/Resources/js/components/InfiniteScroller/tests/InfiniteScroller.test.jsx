"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const InfiniteScroller_1 = __importDefault(require("../InfiniteScroller"));
window.getComputedStyle = jest.fn();
jest.mock('../../../utils/Translator', () => ({
    translate(key) {
        switch (key) {
            case 'sulu_admin.reached_end_of_list':
                return 'Last page reached';
        }
    },
}));
test('InfiniteScroller traverses the dom upwards until it finds a scroll container', () => {
    window.getComputedStyle.mockReturnValue({
        'overflow-y': 'auto',
    });
    const loadSpy = jest.fn();
    const infiniteScrollerWrapper = (0, enzyme_1.mount)(<div id="scrollable">
            <InfiniteScroller_1.default currentPage={1} loading={false} onPageChange={loadSpy} totalPages={10}>
                <div />
            </InfiniteScroller_1.default>
        </div>);
    expect(infiniteScrollerWrapper.find('InfiniteScroller').instance().scrollContainer.id).toBe('scrollable');
});
test('InfiniteScroller should call onPageChange if the the bottom of the content is reached', (done) => {
    window.getComputedStyle.mockReturnValue({
        'overflow-y': 'auto',
    });
    const loadSpy = jest.fn();
    const infiniteScrollerWrapper = (0, enzyme_1.mount)(<div id="scrollable">
            <InfiniteScroller_1.default currentPage={1} loading={false} onPageChange={loadSpy} totalPages={10}>
                <div />
            </InfiniteScroller_1.default>
        </div>);
    const infiniteScroller = infiniteScrollerWrapper.find('InfiniteScroller').instance();
    infiniteScroller.scrollContainer = {
        getBoundingClientRect: () => ({
            bottom: 260,
        }),
        removeEventListener: jest.fn(),
    };
    infiniteScroller.elementRef = {
        getBoundingClientRect: () => ({
            bottom: 300,
        }),
    };
    infiniteScroller.scrollListener();
    setTimeout(() => {
        expect(loadSpy).toBeCalledWith(2);
        done();
    }, 250);
});
test('InfiniteScroller should unbind scroll and resize event on unmount', () => {
    window.getComputedStyle.mockReturnValue({
        'overflow-y': 'auto',
    });
    const loadSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();
    const infiniteScrollerWrapper = (0, enzyme_1.mount)(<div id="scrollable">
            <InfiniteScroller_1.default currentPage={1} loading={false} onPageChange={loadSpy} totalPages={10}>
                <div />
            </InfiniteScroller_1.default>
        </div>);
    const infiniteScroller = infiniteScrollerWrapper.find('InfiniteScroller').instance();
    infiniteScroller.scrollContainer = {
        removeEventListener: removeEventListenerSpy,
    };
    infiniteScrollerWrapper.unmount();
    expect(removeEventListenerSpy).toBeCalledWith('resize', infiniteScroller.scrollListener, false);
    expect(removeEventListenerSpy).toBeCalledWith('scroll', infiniteScroller.scrollListener, false);
});
test('InfiniteScroller should show a loader when the loading prop is set to true', () => {
    window.getComputedStyle.mockReturnValue({
        'overflow-y': 'auto',
    });
    const loadSpy = jest.fn();
    expect((0, enzyme_1.render)(<div id="scrollable">
            <InfiniteScroller_1.default currentPage={1} loading={true} onPageChange={loadSpy} totalPages={10}>
                <div />
            </InfiniteScroller_1.default>
        </div>)).toMatchSnapshot();
});
test('InfiniteScroller should show an info message when the last page has been reached', () => {
    window.getComputedStyle.mockReturnValue({
        'overflow-y': 'auto',
    });
    const loadSpy = jest.fn();
    expect((0, enzyme_1.render)(<div id="scrollable">
            <InfiniteScroller_1.default currentPage={10} loading={false} onPageChange={loadSpy} totalPages={10}>
                <div />
            </InfiniteScroller_1.default>
        </div>)).toMatchSnapshot();
});
