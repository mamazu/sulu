"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const TeaserSelection_1 = __importDefault(require("../TeaserSelection"));
const TeaserStore_1 = __importDefault(require("../stores/TeaserStore"));
const Item_1 = __importDefault(require("../Item"));
jest.mock('sulu-media-bundle/containers/SingleMediaSelectionOverlay', () => jest.fn(() => null));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/MultiListOverlay', () => jest.fn(() => null));
jest.mock('sulu-admin-bundle/containers/TextEditor', () => jest.fn(({ value, }) => (<textarea onChange={jest.fn()} value={value}/>)));
jest.mock('../stores/TeaserStore', () => jest.fn());
jest.mock('../registries/teaserProviderRegistry', () => ({
    keys: ['pages', 'articles'],
    get: jest.fn((key) => {
        switch (key) {
            case 'pages':
                return { title: 'Pages' };
            case 'articles':
                return { title: 'Articles' };
            case 'contacts':
                return { title: 'Contacts' };
        }
    }),
}));
beforeEach(() => {
    TeaserSelection_1.default.Item.mediaUrl = '/admin/media/:id?format=sulu-25x25';
});
test('Render loading teaser selection', () => {
    const value = {
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
        ],
        presentAs: '',
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
        this.loading = true;
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={value}/>);
    teaserSelection.update();
    expect(teaserSelection.render()).toMatchSnapshot();
});
test('Render teaser selection with presentations', () => {
    const value = {
        presentAs: 'test-2',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
        ],
    };
    const presentations = [
        {
            label: 'Test 1',
            value: 'test-1',
        },
        {
            label: 'Test 2',
            value: 'test-2',
        },
    ];
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} presentations={presentations} value={value}/>);
    teaserSelection.update();
    expect(teaserSelection.render()).toMatchSnapshot();
});
test('Render teaser selection with data', () => {
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={value}/>);
    teaserSelection.instance().teaserStore.loading = false;
    teaserSelection.update();
    expect(teaserSelection.render()).toMatchSnapshot();
});
test('Render MultiItemSelection disabled when disabled flag is set', () => {
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default disabled={true} locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>);
    expect(teaserSelection.find('MultiItemSelection').prop('disabled')).toEqual(true);
});
test('Avoid that MultiListOverlay loads the preSelectedItems from start', () => {
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default disabled={true} locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>);
    expect(teaserSelection.find(containers_1.MultiListOverlay)).toHaveLength(2);
    expect(teaserSelection.find(containers_1.MultiListOverlay).at(0).prop('preloadSelectedItems')).toEqual(false);
    expect(teaserSelection.find(containers_1.MultiListOverlay).at(1).prop('preloadSelectedItems')).toEqual(false);
});
test('Call onChange when presentation is changed', () => {
    const changeSpy = jest.fn();
    const presentations = [
        {
            label: 'Test 1',
            value: 'test-1',
        },
        {
            label: 'Test 2',
            value: 'test-2',
        },
    ];
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} presentations={presentations} value={undefined}/>);
    teaserSelection.find('Button[icon="su-eye"]').simulate('click');
    teaserSelection.find('Action[value="test-2"]').simulate('click');
    expect(changeSpy).toBeCalledWith({
        presentAs: 'test-2',
        items: [],
    });
});
test('Add passed data to TeaserStore', () => {
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Description 1',
                id: 2,
                title: 'Title 1',
                type: 'pages',
            },
            {
                description: 'Description 2',
                id: 3,
                title: 'Title 2',
                type: 'contacts',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={value}/>);
    expect(teaserSelection.instance().teaserStore.add).toBeCalledTimes(2);
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 2);
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('contacts', 3);
});
test('Load combined data from TeaserStore and props', () => {
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Edited Page Description',
                id: 2,
                title: 'Edited Page Title',
                type: 'pages',
            },
            {
                description: undefined,
                id: 3,
                title: undefined,
                type: 'contacts',
            },
            {
                id: 4,
                type: 'contacts',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn((type, id) => {
            if (type === 'pages' && id === 2) {
                return {
                    description: 'Page Description',
                    id: 2,
                    mediaId: 8,
                    title: 'Page',
                    type: 'pages',
                };
            }
            if (type === 'contacts' && id === 3) {
                return {
                    description: 'Contact Description 1',
                    id: 3,
                    title: 'Contact 1',
                    type: 'contacts',
                };
            }
            if (type === 'contacts' && id === 4) {
                return {
                    description: 'Contact Description 2',
                    id: 4,
                    title: 'Contact 2',
                    type: 'contacts',
                };
            }
            throw new Error('This case should not happen!');
        });
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={value}/>);
    teaserSelection.update();
    expect(teaserSelection.render()).toMatchSnapshot();
});
test('Opening different adding overlays and close them without any action', () => {
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={undefined}/>);
    expect(teaserSelection.find('MultiItemSelection').prop('leftButton').options).toEqual([
        { label: 'Pages', value: 'pages' },
        { label: 'Articles', value: 'articles' },
    ]);
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(false);
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('open')).toEqual(false);
    teaserSelection.find('MultiItemSelection').prop('leftButton').onClick('articles');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(false);
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('open')).toEqual(true);
    teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('onClose')();
    teaserSelection.find('MultiItemSelection').prop('leftButton').onClick('pages');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(true);
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('open')).toEqual(false);
});
test('Adding a teaser element', () => {
    const changeSpy = jest.fn();
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={undefined}/>);
    teaserSelection.find('Button[icon="su-plus-circle"]').simulate('click');
    teaserSelection.find('Action[value="pages"]').simulate('click');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(true);
    teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('onConfirm')([{ id: 6 }, { id: 5 }]);
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith({
        presentAs: undefined,
        items: [{ id: 6, type: 'pages' }, { id: 5, type: 'pages' }],
    });
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 6);
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 5);
});
test('Adding two different kind of teasers', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
            { id: 8, type: 'pages' },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Button[icon="su-plus-circle"]').simulate('click');
    teaserSelection.find('Action[value="articles"]').simulate('click');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('open')).toEqual(true);
    teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('onConfirm')([{ id: 6 }]);
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="articles"]').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith({
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
            { id: 8, type: 'pages' },
            { id: 6, type: 'articles' },
        ],
    });
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('articles', 6);
});
test('Adding a teaser item along with other teaser items which has already been added', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Button[icon="su-plus-circle"]').simulate('click');
    teaserSelection.find('Action[value="pages"]').simulate('click');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(true);
    teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('onConfirm')([{ id: 5 }, { id: 6 }]);
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith({
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
            { id: 6, type: 'pages' },
        ],
    });
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 6);
});
test('Removing by unselecting element in teaser selection', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
            { id: 8, type: 'pages' },
            { id: 5, type: 'articles' },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Button[icon="su-plus-circle"]').simulate('click');
    teaserSelection.find('Action[value="pages"]').simulate('click');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(true);
    teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('onConfirm')([{ id: 6 }]);
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith({
        presentAs: undefined,
        items: [{ id: 5, type: 'articles' }, { id: 6, type: 'pages' }],
    });
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 6);
    expect(teaserSelection.instance().teaserStore.add).toBeCalledWith('pages', 5);
});
test('Preselecting correct items', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: undefined,
        items: [
            { id: 5, type: 'pages' },
            { id: 8, type: 'pages' },
            { id: 5, type: 'articles' },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Button[icon="su-plus-circle"]').simulate('click');
    teaserSelection.find('Action[value="pages"]').simulate('click');
    teaserSelection.update();
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('open')).toEqual(true);
    expect(teaserSelection.find(containers_1.MultiListOverlay).find('[resourceKey="pages"]').prop('preSelectedItems'))
        .toEqual([{ id: 5, type: 'pages' }, { id: 8, type: 'pages' }]);
});
test('Open and close items when clicking on the pen icon', () => {
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
            {
                description: 'Description 2',
                id: 6,
                title: 'Title 2',
                type: 'pages',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} value={value}/>);
    expect(teaserSelection.find(Item_1.default).at(0).prop('editing')).toEqual(false);
    expect(teaserSelection.find(Item_1.default).at(1).prop('editing')).toEqual(false);
    teaserSelection.find('Icon[name="su-pen"]').at(0).parent().prop('onClick')();
    teaserSelection.update();
    expect(teaserSelection.find(Item_1.default).at(0).prop('editing')).toEqual(true);
    expect(teaserSelection.find(Item_1.default).at(1).prop('editing')).toEqual(false);
    teaserSelection.find('Icon[name="su-pen"]').at(1).parent().prop('onClick')();
    teaserSelection.update();
    expect(teaserSelection.find(Item_1.default).at(0).prop('editing')).toEqual(true);
    expect(teaserSelection.find(Item_1.default).at(1).prop('editing')).toEqual(true);
    teaserSelection.find('Button[children="sulu_admin.cancel"]').at(0).prop('onClick')();
    teaserSelection.update();
    expect(teaserSelection.find(Item_1.default).at(0).prop('editing')).toEqual(false);
    expect(teaserSelection.find(Item_1.default).at(1).prop('editing')).toEqual(true);
});
test('Call onChange with new values when apply button is clicked', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
            {
                description: 'Description 2',
                id: 6,
                title: 'Title 2',
                type: 'pages',
            },
            {
                description: 'Description 3',
                id: 6,
                title: 'Title 3',
                type: 'contacts',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Icon[name="su-pen"]').at(1).parent().prop('onClick')();
    teaserSelection.update();
    teaserSelection.find('Input').prop('onChange')('Edited Title 2');
    teaserSelection.find(containers_1.TextEditor).prop('onChange')('Edited Description 2');
    teaserSelection.find('Button[children="sulu_admin.apply"]').prop('onClick')();
    expect(changeSpy).toBeCalledWith({
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
            {
                description: 'Edited Description 2',
                id: 6,
                title: 'Edited Title 2',
                type: 'pages',
            },
            {
                description: 'Description 3',
                id: 6,
                title: 'Title 3',
                type: 'contacts',
            },
        ],
    });
});
test('Call onChange with new values after one item is removed', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Contact',
                id: 6,
                title: 'Contact',
                type: 'contacts',
            },
            {
                description: 'Description 2',
                id: 6,
                title: 'Title 2',
                type: 'pages',
            },
            {
                description: 'Description 3',
                id: 7,
                title: 'Title 3',
                type: 'pages',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('Icon[name="su-trash-alt"]').at(1).parent().prop('onClick')();
    expect(changeSpy).toBeCalledWith({
        presentAs: '',
        items: [
            {
                description: 'Contact',
                id: 6,
                title: 'Contact',
                type: 'contacts',
            },
            {
                description: 'Description 3',
                id: 7,
                title: 'Title 3',
                type: 'pages',
            },
        ],
    });
});
test('Call onChange with new values after items are sorted', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
            {
                description: 'Description 2',
                id: 6,
                title: 'Title 2',
                type: 'pages',
            },
            {
                description: 'Description 3',
                id: 9,
                title: 'Title 3',
                type: 'pages',
            },
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={changeSpy} value={value}/>);
    teaserSelection.find('MultiItemSelection').prop('onItemsSorted')(2, 1);
    expect(changeSpy).toBeCalledWith({
        presentAs: '',
        items: [
            {
                description: 'Description',
                id: 2,
                title: 'Title',
                type: 'pages',
            },
            {
                description: 'Description 3',
                id: 9,
                title: 'Title 3',
                type: 'pages',
            },
            {
                description: 'Description 2',
                id: 6,
                title: 'Title 2',
                type: 'pages',
            },
        ],
    });
});
test('Call onItemClick when an item is clicked', () => {
    const itemClickSpy = jest.fn();
    const item1 = {
        description: 'Description',
        edited: true,
        id: 2,
        title: 'Title',
        type: 'pages',
    };
    const item2 = {
        description: 'Description 2',
        edited: true,
        id: 6,
        title: 'Title 2',
        type: 'pages',
    };
    const value = {
        presentAs: '',
        items: [
            item1,
            item2,
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} onItemClick={itemClickSpy} value={value}/>);
    teaserSelection.find('MultiItemSelection .content.clickable').at(0).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith('pages;2', item1);
    teaserSelection.find('MultiItemSelection .content.clickable').at(1).simulate('click');
    expect(itemClickSpy).toHaveBeenLastCalledWith('pages;6', item2);
});
test('Call not onItemClick when an item is clicked in edit mode', () => {
    const itemClickSpy = jest.fn();
    const item1 = {
        description: 'Description',
        edited: true,
        id: 2,
        title: 'Title',
        type: 'pages',
    };
    const item2 = {
        description: 'Description 2',
        edited: true,
        id: 6,
        title: 'Title 2',
        type: 'pages',
    };
    const value = {
        presentAs: '',
        items: [
            item1,
            item2,
        ],
    };
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()} onItemClick={itemClickSpy} value={value}/>);
    teaserSelection.find('Icon[name="su-pen"]').at(0).parent().prop('onClick')();
    teaserSelection.update();
    expect(teaserSelection.find(Item_1.default).at(0).prop('editing')).toEqual(true);
    teaserSelection.find('MultiItemSelection .content').at(0).simulate('click');
    expect(itemClickSpy).toHaveBeenCalledTimes(0);
});
test('Call destroy of TeaserStore when unmounted', () => {
    TeaserStore_1.default.mockImplementation(function () {
        this.destroy = jest.fn();
    });
    const teaserSelection = (0, enzyme_1.mount)(<TeaserSelection_1.default locale={mobx_1.observable.box('en')} onChange={jest.fn()}/>);
    const teaserStore = teaserSelection.instance().teaserStore;
    teaserSelection.unmount();
    expect(teaserStore.destroy).toBeCalledWith();
});
