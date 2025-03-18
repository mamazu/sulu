"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadResourceLocatorInputTypeByWebspace_1 = __importDefault(require("../loadResourceLocatorInputTypeByWebspace"));
const webspaceStore_1 = __importDefault(require("../../../stores/webspaceStore"));
jest.mock('../../../stores/webspaceStore', () => ({
    getWebspace: jest.fn(),
}));
test.each(['sulu', 'example'])('Load input type for resource locator by webspace', (webspaceKey) => {
    webspaceStore_1.default.getWebspace.mockReturnValue({ resourceLocatorStrategy: { inputType: 'leaf' } });
    const inputType = (0, loadResourceLocatorInputTypeByWebspace_1.default)(webspaceKey);
    expect(inputType).toEqual(inputType);
    expect(webspaceStore_1.default.getWebspace).toBeCalledWith(webspaceKey);
});
