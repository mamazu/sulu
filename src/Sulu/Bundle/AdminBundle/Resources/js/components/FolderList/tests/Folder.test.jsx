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
const Folder_1 = __importDefault(require("../Folder"));
test('Render a Folder component', () => {
    const { container } = (0, react_2.render)(<Folder_1.default hasPermissions={false} id="1" info="3 Objects" title="This is a folder"/>);
    expect(container).toMatchSnapshot();
});
test('Use permission icon if hasPermissions flag is set', () => {
    (0, react_2.render)(<Folder_1.default hasPermissions={true} id="1" info="3 Objects" title="This is a folder"/>);
    const icon = react_2.screen.queryByLabelText('su-folder-permission');
    expect(icon).toBeInTheDocument();
});
test('Call clickhandler when clicking on the folder', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const folderId = 1;
    (0, react_2.render)(<Folder_1.default hasPermissions={false} id={folderId} info="3 Objects" onClick={clickSpy} title="This is a folder"/>);
    const folder = react_2.screen.queryByText('This is a folder');
    yield user_event_1.default.click(folder);
    expect(clickSpy).toHaveBeenCalledWith(folderId);
}));
