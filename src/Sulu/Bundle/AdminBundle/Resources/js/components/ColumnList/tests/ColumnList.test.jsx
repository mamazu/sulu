"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ColumnList_1 = __importDefault(require("../ColumnList"));
const Column_1 = __importDefault(require("../Column"));
const Item_1 = __importDefault(require("../Item"));
jest.mock('../columnList.scss', () => new Proxy({}, {
    get(target, key) {
        if (key === '__esModule') {
            return false;
        }
        if (key === 'columnWidth') {
            return '270px';
        }
        return key;
    },
}));
test('The ColumnList component should render in a non-scrolling container', () => {
    const onItemClick = jest.fn();
    const toolbarItemsProvider = jest.fn(() => undefined);
    expect((0, enzyme_1.render)(<ColumnList_1.default onItemClick={onItemClick} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default>
                <Item_1.default id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1">Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1-1">Item 1</Item_1.default>
                <Item_1.default id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default loading={true}/>
        </ColumnList_1.default>)).toMatchSnapshot();
});
test('The ColumnList component should render without ', () => {
    const onItemClick = jest.fn();
    const buttonsConfig = [
        {
            icon: 'fa-heart',
            onClick: () => { },
        },
        {
            icon: 'fa-pencil',
            onClick: () => { },
            visible: false,
        },
    ];
    const toolbarItemsProvider = jest.fn(() => [
        {
            index: 0,
            icon: 'fa-plus',
            type: 'button',
            onClick: () => { },
        },
        {
            index: 0,
            icon: 'fa-search',
            type: 'button',
            onClick: () => { },
        },
        {
            index: 0,
            icon: 'fa-gear',
            type: 'dropdown',
            options: [
                {
                    label: 'Option1 ',
                    onClick: () => { },
                },
                {
                    label: 'Option2 ',
                    onClick: () => { },
                },
            ],
        },
    ]);
    expect((0, enzyme_1.render)(<ColumnList_1.default onItemClick={onItemClick} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default>
                <Item_1.default buttons={buttonsConfig} id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default buttons={buttonsConfig} hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default buttons={buttonsConfig} id="1-1">Item 1</Item_1.default>
                <Item_1.default buttons={buttonsConfig} hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default buttons={buttonsConfig} id="1-1-1">Item 1</Item_1.default>
                <Item_1.default buttons={buttonsConfig} id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default loading={true}/>
        </ColumnList_1.default>)).toMatchSnapshot();
});
test('The ColumnList component should render in a scrolling container', () => {
    const onItemClick = jest.fn();
    const toolbarItemsProvider = jest.fn(() => [
        {
            index: 0,
            icon: 'fa-plus',
            type: 'button',
            onClick: () => { },
        },
    ]);
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={onItemClick} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default>
                <Item_1.default id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1">Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1-1">Item 1</Item_1.default>
                <Item_1.default id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default loading={true}/>
        </ColumnList_1.default>);
    columnList.instance().container = {
        clientWidth: 500,
        scrollWidth: 600,
    };
    columnList.instance().activeColumnIndex = 2;
    columnList.instance().scrollPosition = 20;
    columnList.update();
    expect(columnList.render()).toMatchSnapshot();
});
test('The ColumnList component should trigger the given onItemClick callback', () => {
    const onItemClick = jest.fn();
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={onItemClick} toolbarItemsProvider={jest.fn(() => [])}>
            <Column_1.default>
                <Item_1.default id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1">Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1-1">Item 1</Item_1.default>
                <Item_1.default id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
        </ColumnList_1.default>);
    const columns = columnList.find(Column_1.default);
    expect(columns.length).toBe(3);
    columns.first().find(Item_1.default).first().simulate('click');
    columns.first().find(Item_1.default).at(2).simulate('click');
    columns.at(1).find(Item_1.default).first().simulate('click');
    expect(onItemClick.mock.calls.length).toBe(3);
    expect(onItemClick.mock.calls[0][0]).toBe('1');
    expect(onItemClick.mock.calls[1][0]).toBe('3');
    expect(onItemClick.mock.calls[2][0]).toBe('1-1');
});
test('The ColumnList component should trigger the given onItemDoubleClick callback', () => {
    const onItemDoubleClickSpy = jest.fn();
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} onItemDoubleClick={onItemDoubleClickSpy} toolbarItemsProvider={jest.fn(() => [])}>
            <Column_1.default>
                <Item_1.default id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1">Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1-1">Item 1</Item_1.default>
                <Item_1.default id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
        </ColumnList_1.default>);
    const columns = columnList.find(Column_1.default);
    expect(columns.length).toBe(3);
    columns.first().find(Item_1.default).first().simulate('dblclick');
    columns.first().find(Item_1.default).at(2).simulate('dblclick');
    columns.at(1).find(Item_1.default).first().simulate('dblclick');
    expect(onItemDoubleClickSpy.mock.calls.length).toBe(3);
    expect(onItemDoubleClickSpy.mock.calls[0][0]).toBe('1');
    expect(onItemDoubleClickSpy.mock.calls[1][0]).toBe('3');
    expect(onItemDoubleClickSpy.mock.calls[2][0]).toBe('1-1');
});
test('The ColumnList component should handle which toolbar is active on mouse enter event', () => {
    const buttonClickSpy = jest.fn();
    const toolbarItemsProvider = jest.fn(() => [
        {
            icon: 'fa-plus',
            type: 'button',
            onClick: buttonClickSpy,
        },
    ]);
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default>
                <Item_1.default id="1" selected={true}>Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="2">Item 1</Item_1.default>
                <Item_1.default id="3">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1">Item 1</Item_1.default>
                <Item_1.default hasChildren={true} id="1-2">Item 1</Item_1.default>
            </Column_1.default>
            <Column_1.default>
                <Item_1.default id="1-1-1">Item 1</Item_1.default>
                <Item_1.default id="1-1-2">Item 1</Item_1.default>
            </Column_1.default>
        </ColumnList_1.default>);
    const columns = columnList.find(Column_1.default);
    expect(toolbarItemsProvider).toHaveBeenLastCalledWith(0);
    columnList.find('.fa-plus').simulate('click');
    expect(buttonClickSpy).toHaveBeenCalledWith();
    columns.at(1).simulate('mouseEnter');
    expect(toolbarItemsProvider).toHaveBeenLastCalledWith(1);
    columnList.find('.fa-plus').simulate('click');
    expect(buttonClickSpy).toHaveBeenLastCalledWith();
    columns.at(2).simulate('mouseEnter');
    expect(toolbarItemsProvider).toHaveBeenLastCalledWith(2);
    columnList.find('.fa-plus').simulate('click');
    expect(buttonClickSpy).toHaveBeenLastCalledWith();
});
test('Should move the toolbar container to the beginning if active column does not exist anymore', () => {
    const toolbarItemsProvider = jest.fn(() => [
        {
            icon: 'fa-plus',
            type: 'button',
            onClick: jest.fn(),
        },
    ]);
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default />
            <Column_1.default />
        </ColumnList_1.default>);
    columnList.instance().activeColumnIndex = 2;
    expect(columnList.instance().activeColumnIndex).toEqual(0);
});
test('Should move the toolbar container to the correct position', () => {
    const toolbarItemsProvider = jest.fn(() => [
        {
            icon: 'fa-plus',
            type: 'button',
            onClick: jest.fn(),
        },
    ]);
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={toolbarItemsProvider}>
            <Column_1.default />
            <Column_1.default />
            <Column_1.default />
        </ColumnList_1.default>);
    expect(columnList.find('Toolbar').parent().prop('style')).toEqual({ marginLeft: 0 });
    columnList.instance().scrollPosition = 35;
    columnList.instance().activeColumnIndex = 2;
    columnList.update();
    expect(columnList.find('Toolbar').parent().prop('style')).toEqual({ marginLeft: 505 });
});
test('Should set classes if the toolbar is active on the first or last visible column', () => {
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={jest.fn(() => [])}>
            <Column_1.default />
            <Column_1.default />
            <Column_1.default />
        </ColumnList_1.default>);
    columnList.update();
    expect(columnList.find('.columnListContainer').prop('className'))
        .toEqual(expect.stringContaining('firstVisibleColumnActive'));
    expect(columnList.find('.columnListContainer').prop('className'))
        .toEqual(expect.stringContaining('lastVisibleColumnActive'));
    columnList.instance().container = {
        clientWidth: 500,
    };
    columnList.instance().activeColumnIndex = 0;
    columnList.instance().scrollPosition = 20;
    columnList.update();
    expect(columnList.find('.columnListContainer').prop('className'))
        .toEqual(expect.stringContaining('firstVisibleColumnActive'));
    expect(columnList.find('.columnListContainer').prop('className'))
        .not.toEqual(expect.stringContaining('lastVisibleColumnActive'));
    columnList.instance().activeColumnIndex = 2;
    columnList.instance().scrollPosition = 20;
    columnList.update();
    expect(columnList.find('.columnListContainer').prop('className'))
        .not.toEqual(expect.stringContaining('firstVisibleColumnActive'));
    expect(columnList.find('.columnListContainer').prop('className'))
        .toEqual(expect.stringContaining('lastVisibleColumnActive'));
});
test('Should scroll to the last column when new column is loaded', () => {
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={jest.fn(() => [])}>
            <Column_1.default />
        </ColumnList_1.default>);
    columnList.instance().container = {
        clientWidth: 500,
    };
    columnList.setProps({
        children: [
            <Column_1.default key={1}/>,
            <Column_1.default key={2}/>,
            <Column_1.default key={3}/>,
        ],
    });
    columnList.update();
    expect(columnList.instance().container.scrollLeft).toEqual(540);
});
test('Should not scroll to the last column when other props are updated', () => {
    const children = [
        <Column_1.default key={1}/>,
    ];
    const columnList = (0, enzyme_1.mount)(<ColumnList_1.default onItemClick={jest.fn()} toolbarItemsProvider={jest.fn(() => [])}>
            {children}
        </ColumnList_1.default>);
    columnList.instance().toolbar = {
        clientWidth: 271,
    };
    columnList.instance().container = {
        clientWidth: 500,
        scrollLeft: 10,
    };
    columnList.setProps({
        children,
    });
    columnList.update();
    expect(columnList.instance().container.scrollLeft).toEqual(10);
});
