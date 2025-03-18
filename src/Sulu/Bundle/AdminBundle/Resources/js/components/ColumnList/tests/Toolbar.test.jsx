"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Toolbar_1 = __importDefault(require("../Toolbar"));
const ToolbarDropdown_1 = __importDefault(require("../ToolbarDropdown"));
test('Should render with active', () => {
    const toolbarItems = [
        {
            icon: 'fa-plus',
            type: 'button',
            onClick: jest.fn(),
        },
        {
            icon: 'fa-gear',
            type: 'dropdown',
            options: [
                {
                    label: 'Option1',
                    onClick: jest.fn(),
                },
                {
                    disabled: true,
                    label: 'Option1',
                    onClick: jest.fn(),
                },
            ],
        },
    ];
    const toolbar = (0, enzyme_1.mount)(<Toolbar_1.default toolbarItems={toolbarItems}/>);
    expect(toolbar.find(ToolbarDropdown_1.default).length).toBe(1);
    toolbar.find('.fa-plus').simulate('click');
    expect(toolbarItems[0].onClick).toBeCalledWith();
    // check for opened dropdown in body
    toolbar.find(ToolbarDropdown_1.default).find('button').simulate('click');
    toolbar.update();
    expect(toolbar.render()).toMatchSnapshot();
    expect(toolbar.find('ArrowMenu').render()).toMatchSnapshot();
});
test('Should close dropdown when item is clicked', () => {
    const toolbarItems = [
        {
            icon: 'fa-gear',
            type: 'dropdown',
            options: [
                {
                    label: 'Option1',
                    onClick: jest.fn(),
                },
                {
                    label: 'Option2',
                    onClick: jest.fn(),
                },
            ],
        },
    ];
    const toolbar = (0, enzyme_1.mount)(<Toolbar_1.default toolbarItems={toolbarItems}/>);
    expect(toolbar.find('ToolbarDropdown').find('Action')).toHaveLength(0);
    toolbar.find(ToolbarDropdown_1.default).find('button').simulate('click');
    expect(toolbar.find('ToolbarDropdown').find('Action')).toHaveLength(2);
    toolbar.find('ToolbarDropdown Action[children="Option1"]').simulate('click');
    expect(toolbar.find('ToolbarDropdown').find('Action')).toHaveLength(0);
});
