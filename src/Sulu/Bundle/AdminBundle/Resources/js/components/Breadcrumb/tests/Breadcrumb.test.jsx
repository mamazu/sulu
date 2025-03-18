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
const Breadcrumb_1 = __importDefault(require("../Breadcrumb"));
test('Render a Breadcrumb', () => {
    const clickSpy = jest.fn();
    const { container } = (0, react_1.render)(<Breadcrumb_1.default onItemClick={clickSpy}>
            <Breadcrumb_1.default.Item>
                Crumb 1
            </Breadcrumb_1.default.Item>
            <Breadcrumb_1.default.Item>
                Crumb 2
            </Breadcrumb_1.default.Item>
            <Breadcrumb_1.default.Item>
                Crumb 3
            </Breadcrumb_1.default.Item>
        </Breadcrumb_1.default>);
    expect(container).toMatchSnapshot();
});
test('Clicking on a clickable breadcrumb part should call a handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const testValue = 2;
    (0, react_1.render)(<Breadcrumb_1.default onItemClick={clickSpy}>
            <Breadcrumb_1.default.Item>
                Crumb 1
            </Breadcrumb_1.default.Item>
            <Breadcrumb_1.default.Item value={testValue}>
                Crumb 2
            </Breadcrumb_1.default.Item>
            <Breadcrumb_1.default.Item>
                Crumb 3
            </Breadcrumb_1.default.Item>
        </Breadcrumb_1.default>);
    const item = react_1.screen.queryByText('Crumb 2');
    yield user_event_1.default.click(item);
    expect(clickSpy).toHaveBeenCalledWith(testValue);
}));
