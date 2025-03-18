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
const Navigation_1 = __importDefault(require("../Navigation"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render and handle clicks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleNavigationClick = jest.fn();
    const handleLogoutClick = jest.fn();
    const handleProfileClick = jest.fn();
    const { container } = (0, react_1.render)(<Navigation_1.default onItemClick={jest.fn()} onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" title="sulu.io" username="John Terence Maximilian Travolta">
            <Navigation_1.default.Item icon="su-search" onClick={handleNavigationClick} title="Search" value="search"/>
            <Navigation_1.default.Item icon="fa-bullseye" onClick={handleNavigationClick} title="Webspaces" value="webspaces"/>
        </Navigation_1.default>);
    expect(container).toMatchSnapshot();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.edit_profile/));
    expect(handleProfileClick).toBeCalled();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.logout/));
    expect(handleLogoutClick).toBeCalled();
}));
test('The component should render with all available props and handle clicks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleNavigationClick = jest.fn();
    const handleLogoutClick = jest.fn();
    const handlePinClick = jest.fn();
    const handleProfileClick = jest.fn();
    const { container } = (0, react_1.render)(<Navigation_1.default appVersion="1.0.0" appVersionLink="http://link.com" onItemClick={handleNavigationClick} onLogoutClick={handleLogoutClick} onPinToggle={handlePinClick} onProfileClick={handleProfileClick} pinned={false} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" title="sulu.io" userImage="http://lorempixel.com/200/200" username="John Travolta">
            <Navigation_1.default.Item icon="su-search" title="Search" value="search"/>
            <Navigation_1.default.Item icon="su-webspace" title="Webspaces" value="webspaces"/>
            <Navigation_1.default.Item icon="fa-image" title="Media" value="media"/>
            <Navigation_1.default.Item icon="fa-newspaper-o" title="Article" value="articles"/>
            <Navigation_1.default.Item icon="fa-sticky-note-o" title="Snippets" value="snippets"/>
            <Navigation_1.default.Item icon="su-user-1" title="Contact" value="contact">
                <Navigation_1.default.Item title="Contact 1" value="contact_1"/>
                <Navigation_1.default.Item active={true} title="Contact 2" value="contact_2"/>
                <Navigation_1.default.Item title="Contact 3" value="contact_3"/>
            </Navigation_1.default.Item>
            <Navigation_1.default.Item icon="fa-gear" title="Settings" value="settings">
                <Navigation_1.default.Item title="Setting 1" value="setting_1"/>
                <Navigation_1.default.Item title="Setting 2" value="setting_2"/>
                <Navigation_1.default.Item title="Setting 3" value="setting_3"/>
            </Navigation_1.default.Item>
        </Navigation_1.default>);
    expect(container).toMatchSnapshot();
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-stick-right'));
    expect(handlePinClick).toBeCalled();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.edit_profile/));
    expect(handleProfileClick).toBeCalled();
    yield user_event_1.default.click(react_1.screen.queryByText(/sulu_admin.logout/));
    expect(handleLogoutClick).toBeCalled();
}));
test('The expanded prop should be set correct automatically', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleNavigationClick = jest.fn();
    const handleLogoutClick = jest.fn();
    const handleProfileClick = jest.fn();
    (0, react_1.render)(<Navigation_1.default appVersion="1.0.0" appVersionLink="http://link.com" onItemClick={handleNavigationClick} onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" title="sulu.io" userImage="http://lorempixel.com/200/200" username="John Travolta">
            <Navigation_1.default.Item icon="su-user-1" title="Contact" value="contact">
                <Navigation_1.default.Item title="Contact 1" value="contact_1"/>
                <Navigation_1.default.Item active={true} title="Contact 2" value="contact_2"/>
                <Navigation_1.default.Item title="Contact 3" value="contact_3"/>
            </Navigation_1.default.Item>
            <Navigation_1.default.Item icon="fa-gear" title="Settings" value="settings">
                <Navigation_1.default.Item title="Setting 1" value="setting_1"/>
                <Navigation_1.default.Item title="Setting 2" value="setting_2"/>
                <Navigation_1.default.Item title="Setting 3" value="setting_3"/>
            </Navigation_1.default.Item>
        </Navigation_1.default>);
    expect(react_1.screen.getByText(/Contact 1/)).toBeInTheDocument();
    expect(react_1.screen.queryByText(/Setting 1/)).not.toBeInTheDocument();
    yield user_event_1.default.click(react_1.screen.queryByText(/Settings/));
    expect(react_1.screen.queryByText(/Contact 1/)).not.toBeInTheDocument();
    expect(react_1.screen.getByText(/Setting 1/)).toBeInTheDocument();
}));
test('The expanded prop should be set correct automatically when children change', () => {
    const handleNavigationClick = jest.fn();
    const handleLogoutClick = jest.fn();
    const handleProfileClick = jest.fn();
    const { rerender } = (0, react_1.render)(<Navigation_1.default appVersion="1.0.0" appVersionLink="http://link.com" onItemClick={handleNavigationClick} onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" title="sulu.io" userImage="http://lorempixel.com/200/200" username="John Travolta">
            <Navigation_1.default.Item icon="su-user-1" title="Contact" value="contact">
                <Navigation_1.default.Item title="Contact 1" value="contact_1"/>
                <Navigation_1.default.Item active={true} title="Contact 2" value="contact_2"/>
                <Navigation_1.default.Item title="Contact 3" value="contact_3"/>
            </Navigation_1.default.Item>
            <Navigation_1.default.Item icon="fa-gear" title="Settings" value="settings">
                <Navigation_1.default.Item title="Setting 1" value="setting_1"/>
                <Navigation_1.default.Item title="Setting 2" value="setting_2"/>
                <Navigation_1.default.Item title="Setting 3" value="setting_3"/>
            </Navigation_1.default.Item>
        </Navigation_1.default>);
    expect(react_1.screen.getByText(/Contact 1/)).toBeInTheDocument();
    expect(react_1.screen.queryByText(/Setting 1/)).not.toBeInTheDocument();
    rerender(<Navigation_1.default appVersion="1.0.0" appVersionLink="http://link.com" onItemClick={handleNavigationClick} onLogoutClick={handleLogoutClick} onProfileClick={handleProfileClick} suluVersion="2.0.0-RC1" suluVersionLink="http://link.com" title="sulu.io" userImage="http://lorempixel.com/200/200" username="John Travolta">
            <Navigation_1.default.Item icon="su-user-1" title="Contact" value="contact">
                <Navigation_1.default.Item title="Contact 1" value="contact_1"/>
                <Navigation_1.default.Item title="Contact 2" value="contact_2"/>
                <Navigation_1.default.Item title="Contact 3" value="contact_3"/>
            </Navigation_1.default.Item>
            <Navigation_1.default.Item icon="fa-gear" title="Settings" value="settings">
                <Navigation_1.default.Item title="Setting 1" value="setting_1"/>
                <Navigation_1.default.Item active={true} title="Setting 2" value="setting_2"/>
                <Navigation_1.default.Item title="Setting 3" value="setting_3"/>
            </Navigation_1.default.Item>
        </Navigation_1.default>);
    expect(react_1.screen.queryByText(/Contact 1/)).not.toBeInTheDocument();
    expect(react_1.screen.getByText(/Setting 1/)).toBeInTheDocument();
});
