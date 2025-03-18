"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const WebspaceSelect_1 = __importDefault(require("../WebspaceSelect"));
test('Render WebspaceSelect closed', () => {
    const arrowMenu = (0, enzyme_1.mount)(<WebspaceSelect_1.default onChange={jest.fn()} value="sulu">
            <WebspaceSelect_1.default.Item value="sulu">Sulu</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_blog">Sulu Blog</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_doc">Sulu Doc</WebspaceSelect_1.default.Item>
        </WebspaceSelect_1.default>);
    expect(arrowMenu.render()).toMatchSnapshot();
});
test('Render WebspaceSelect opened', () => {
    const arrowMenu = (0, enzyme_1.mount)(<WebspaceSelect_1.default onChange={jest.fn()} value="sulu">
            <WebspaceSelect_1.default.Item value="sulu">Sulu</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_blog">Sulu Blog</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_doc">Sulu Doc</WebspaceSelect_1.default.Item>
        </WebspaceSelect_1.default>);
    expect(arrowMenu.instance().open).toBe(false);
    // click button to open webspace select
    arrowMenu.find('WebspaceSelect button').simulate('click');
    expect(arrowMenu.instance().open).toBe(true);
});
test('Change event should be called correctly', () => {
    const handleChange = jest.fn();
    const value = 'sulu';
    const webspaceSelect = (0, enzyme_1.mount)(<WebspaceSelect_1.default onChange={handleChange} value={value}>
            <WebspaceSelect_1.default.Item value="sulu">Sulu</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_blog">Sulu Blog</WebspaceSelect_1.default.Item>
            <WebspaceSelect_1.default.Item value="sulu_doc">Sulu Doc</WebspaceSelect_1.default.Item>
        </WebspaceSelect_1.default>);
    expect(webspaceSelect.instance().open).toBe(false);
    // click button to open webspace select
    webspaceSelect.find('WebspaceSelect button').simulate('click');
    expect(webspaceSelect.instance().open).toBe(true);
    // click second item to fire change event
    webspaceSelect.find('Item').at(1).simulate('click');
    expect(handleChange).toBeCalledWith('sulu_blog');
});
