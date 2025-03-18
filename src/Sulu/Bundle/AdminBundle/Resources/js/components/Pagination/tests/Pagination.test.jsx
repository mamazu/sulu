"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const Pagination_1 = __importDefault(require("../Pagination"));
jest.mock('../../../utils/Translator', () => ({
    translate(key) {
        switch (key) {
            case 'sulu_admin.page':
                return 'Page';
            case 'sulu_admin.of':
                return 'of';
            case 'sulu_admin.per_page':
                return 'Items per page';
        }
    },
}));
test('Render pagination with loader', () => {
    const { container } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} loading={true} onLimitChange={jest.fn()} onPageChange={jest.fn()} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render pagination with page numbers', () => {
    const { container } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={jest.fn()} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render disabled next link if current page is last page', () => {
    const { container } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={jest.fn()} totalPages={5}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render disabled previous link current page is first page', () => {
    const { container } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={1} onLimitChange={jest.fn()} onPageChange={jest.fn()} totalPages={5}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should call callback with updated page when initialized with an invalid page', () => {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={15} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(changeSpy).toBeCalledWith(10);
});
test('Should call callback with updated page when changing page to invalid value', () => {
    const changeSpy = jest.fn();
    const { rerender } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    rerender(<Pagination_1.default currentLimit={10} currentPage={8} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(changeSpy).not.toBeCalled();
    rerender(<Pagination_1.default currentLimit={10} currentPage={15} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(changeSpy).toBeCalledWith(10);
});
test('Should call callback with updated page when changing total number of pages to lower value', () => {
    const changeSpy = jest.fn();
    const { rerender } = (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    rerender(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={7}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(changeSpy).not.toBeCalled();
    rerender(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={3}>
            <p>Test</p>
        </Pagination_1.default>);
    expect(changeSpy).toBeCalledWith(3);
});
test('Click previous link should call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={5} onLimitChange={jest.fn()} onPageChange={clickSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-left'));
    expect(clickSpy).toBeCalledWith(4);
}));
test('Click next link should call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={jest.fn()} onPageChange={clickSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-right'));
    expect(clickSpy).toBeCalledWith(7);
}));
test('Click previous link on first page should not call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={1} onLimitChange={jest.fn()} onPageChange={clickSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-left'));
    expect(clickSpy).not.toBeCalled();
}));
test('Click next link on last page should not call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={10} onLimitChange={jest.fn()} onPageChange={clickSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-right'));
    expect(clickSpy).not.toBeCalled();
}));
test('Change limit should call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={changeSpy} onPageChange={jest.fn()} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_1.screen.queryByText('20'));
    expect(changeSpy).toBeCalledWith(20);
}));
test('Change limit to current limit should not call callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={changeSpy} onPageChange={jest.fn()} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_1.screen.queryAllByText('10')[1]);
    expect(changeSpy).not.toBeCalled();
}));
test('Change callback should be called on blur when input was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={2} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={50}>
            <p>Test</p>
        </Pagination_1.default>);
    const input = react_1.screen.queryByDisplayValue('2');
    yield user_event_1.default.type(input, '5');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.tab(); // tab away from input
    expect(changeSpy).toBeCalledWith(25);
}));
test('Change callback should be called on enter when input was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={2} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={50}>
            <p>Test</p>
        </Pagination_1.default>);
    const input = react_1.screen.queryByDisplayValue('2');
    yield user_event_1.default.type(input, '[Enter]');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(input, '5');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(input, '[Enter]');
    expect(changeSpy).toBeCalledWith(25);
}));
test('Change callback should be called with 1 if input value is lower than 1', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    const input = react_1.screen.queryByDisplayValue('6');
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, '0');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(input, '[Enter]');
    expect(changeSpy).toBeCalledWith(1);
}));
test('Change callback should be called with value of totalPages if input value is higher than total pages', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    const input = react_1.screen.queryByDisplayValue('6');
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, '12');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(input, '[Enter]');
    expect(changeSpy).toBeCalledWith(10);
}));
test('Change callback should not be called if input value is equal to currentPage', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_1.render)(<Pagination_1.default currentLimit={10} currentPage={6} onLimitChange={jest.fn()} onPageChange={changeSpy} totalPages={10}>
            <p>Test</p>
        </Pagination_1.default>);
    const input = react_1.screen.queryByDisplayValue('6');
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, '6');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(input, '[Enter]');
    expect(changeSpy).not.toBeCalled();
}));
