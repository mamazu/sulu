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
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const CardCollection_1 = __importDefault(require("../CardCollection"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render empty CardCollection', () => {
    const { container } = (0, react_2.render)(<CardCollection_1.default />);
    expect(container).toMatchSnapshot();
});
test('Render passed card components', () => {
    const { container } = (0, react_2.render)(<CardCollection_1.default>
            <CardCollection_1.default.Card>
                <h1>Content 1</h1>
            </CardCollection_1.default.Card>
            <CardCollection_1.default.Card>
                <h2>Content 2</h2>
            </CardCollection_1.default.Card>
        </CardCollection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Call onAdd callback when add button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const addSpy = jest.fn();
    (0, react_2.render)(<CardCollection_1.default onAdd={addSpy}/>);
    const icon = react_2.screen.queryByLabelText('su-plus');
    yield user_event_1.default.click(icon);
    expect(addSpy).toBeCalled();
}));
test('Call onEdit callback when edit icon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const editSpy = jest.fn();
    (0, react_2.render)(<CardCollection_1.default onEdit={editSpy}>
            <CardCollection_1.default.Card>
                <h1>Content 1</h1>
            </CardCollection_1.default.Card>
            <CardCollection_1.default.Card>
                <h2>Content 2</h2>
            </CardCollection_1.default.Card>
        </CardCollection_1.default>);
    const icon = react_2.screen.queryAllByLabelText('su-pen')[1];
    yield user_event_1.default.click(icon);
    expect(editSpy).toBeCalledWith(1);
}));
test('Call onRemove callback when remove icon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const removeSpy = jest.fn();
    (0, react_2.render)(<CardCollection_1.default onRemove={removeSpy}>
            <CardCollection_1.default.Card>
                <h1>Content 1</h1>
            </CardCollection_1.default.Card>
            <CardCollection_1.default.Card>
                <h2>Content 2</h2>
            </CardCollection_1.default.Card>
        </CardCollection_1.default>);
    const icon = react_2.screen.queryAllByLabelText('su-trash-alt')[1];
    yield user_event_1.default.click(icon);
    expect(removeSpy).toBeCalledWith(1);
}));
