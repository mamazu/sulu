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
const UserSection_1 = __importDefault(require("../UserSection"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render with all available props and handle clicks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleLogoutClick = jest.fn();
    const handleProfileClick = jest.fn();
    const { container } = (0, react_1.render)(<UserSection_1.default onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" userImage="http://lorempixel.com/200/200" username="John Travolta"/>);
    expect(container).toMatchSnapshot();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.edit_profile/));
    expect(handleProfileClick).toBeCalled();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.logout/));
    expect(handleLogoutClick).toBeCalled();
}));
