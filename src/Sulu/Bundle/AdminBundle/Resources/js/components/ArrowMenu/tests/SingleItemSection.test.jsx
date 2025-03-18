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
const SingleItemSection_1 = __importDefault(require("../SingleItemSection"));
const Item_1 = __importDefault(require("../Item"));
test('Render ItemSection', () => {
    const { container } = (0, react_2.render)(<SingleItemSection_1.default icon="fa-home" onChange={jest.fn()} title="Select your house" value={undefined}>
            <Item_1.default value="villa">Villa</Item_1.default>
            <Item_1.default value="white_house">White House</Item_1.default>
            <Item_1.default value="flat">Flat</Item_1.default>
        </SingleItemSection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render ItemSection with value', () => {
    const { container } = (0, react_2.render)(<SingleItemSection_1.default icon="fa-home" onChange={jest.fn()} title="Select your house" value="flat">
            <Item_1.default value="villa">Villa</Item_1.default>
            <Item_1.default value="white_house">White House</Item_1.default>
            <Item_1.default value="flat">Flat</Item_1.default>
        </SingleItemSection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Handle Item click', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleChange = jest.fn();
    (0, react_2.render)(<SingleItemSection_1.default icon="fa-home" onChange={handleChange} title="Select your house" value={undefined}>
            <Item_1.default value="villa">Villa</Item_1.default>
            <Item_1.default value="white_house">White House</Item_1.default>
            <Item_1.default value="flat">Flat</Item_1.default>
        </SingleItemSection_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('White House'));
    expect(handleChange).toBeCalledWith('white_house');
}));
