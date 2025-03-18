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
const Field_1 = __importDefault(require("../Field"));
test('Display a field with label', () => {
    const { container } = (0, react_2.render)(<Field_1.default label="Test" skin="dark">
            <p>Test</p>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field with label and type', () => {
    const types = [
        { label: 'Work', value: 1 },
        { label: 'Private', value: 2 },
    ];
    const { container } = (0, react_2.render)(<Field_1.default label="Test" type={1} types={types}>
            <p>Test</p>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field without label', () => {
    const { container } = (0, react_2.render)(<Field_1.default>
            <p>Test</p>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field with colSpan and after space', () => {
    const { container } = (0, react_2.render)(<Field_1.default colSpan={7} spaceAfter={5}>
            <div>Test</div>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field with description', () => {
    const { container } = (0, react_2.render)(<Field_1.default description="Testdescription">
            <div>Test</div>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field with a required label', () => {
    const { container } = (0, react_2.render)(<Field_1.default label="Testlabel" required={true}>
            <div>Test</div>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Display a field with an error', () => {
    const { container } = (0, react_2.render)(<Field_1.default error="Error! Help!" label="Testlabel">
            <div>Test</div>
        </Field_1.default>);
    expect(container).toMatchSnapshot();
});
test('Change type of field', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeChangeSpy = jest.fn();
    const types = [
        { label: 'Work', value: 1 },
        { label: 'Private', value: 2 },
    ];
    (0, react_2.render)(<Field_1.default label="Test" onTypeChange={typeChangeSpy} type={1} types={types}>
            <p>Test</p>
        </Field_1.default>);
    const field = react_2.screen.queryByText('Work');
    expect(react_2.screen.queryByTestId('backdrop')).not.toBeInTheDocument();
    yield user_event_1.default.click(field);
    expect(react_2.screen.getByTestId('backdrop')).toBeInTheDocument();
    const changeItem = react_2.screen.queryByText('Private');
    yield user_event_1.default.click(changeItem);
    expect(typeChangeSpy).toBeCalledWith(2);
    expect(react_2.screen.queryByTestId('backdrop')).not.toBeInTheDocument();
}));
