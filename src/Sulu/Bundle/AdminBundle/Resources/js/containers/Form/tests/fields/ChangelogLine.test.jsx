"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const ResourceRequester_1 = __importDefault(require("../../../../services/ResourceRequester"));
const ChangelogLine_1 = __importDefault(require("../../fields/ChangelogLine"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const Translator_1 = require("../../../../utils/Translator");
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn(function () {
    this.getValueByPath = jest.fn();
}));
jest.mock('../../../../services/ResourceRequester', () => ({}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
beforeEach(() => {
    ResourceRequester_1.default.get = jest.fn();
});
test('Render loader if changer and creator are not loaded yet', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    expect((0, enzyme_1.render)(<ChangelogLine_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>)).toMatchSnapshot();
});
test('Render with loaded changer and creator', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/creator':
                return 1;
            case '/changer':
                return 2;
            case '/created':
                return '2018-09-27T08:22:00';
            case '/changed':
                return '2018-10-04T10:57:00';
        }
    });
    const creatorPromise = Promise.resolve({
        fullName: 'Max Mustermann',
    });
    const changerPromise = Promise.resolve({
        fullName: 'Erika Mustermann',
    });
    ResourceRequester_1.default.get.mockImplementation((resourceKey, { id, }) => {
        switch (id) {
            case 1:
                return creatorPromise;
            case 2:
                return changerPromise;
        }
    });
    const changelogLine = (0, enzyme_1.mount)(<ChangelogLine_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>);
    expect(ResourceRequester_1.default.get).toHaveBeenCalledTimes(2);
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 1 });
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 2 });
    return Promise.all([creatorPromise, changerPromise]).then(() => {
        changelogLine.update();
        expect(changelogLine.find('p')).toHaveLength(2);
        expect(changelogLine.find('p').at(0).text()).toEqual('sulu_admin.changelog_line_changer');
        expect(changelogLine.find('p').at(1).text()).toEqual('sulu_admin.changelog_line_creator');
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_creator', { created: '9/27/2018, 8:22:00 AM', creator: 'Max Mustermann' });
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_changer', { changed: '10/4/2018, 10:57:00 AM', changer: 'Erika Mustermann' });
    });
});
test('Render with no changer and creator', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/created':
                return '2018-09-27T08:22:00';
            case '/changed':
                return '2018-10-04T10:57:00';
        }
    });
    const changelogLine = (0, enzyme_1.mount)(<ChangelogLine_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>);
    expect(ResourceRequester_1.default.get).not.toBeCalled();
    expect(changelogLine.find('p')).toHaveLength(2);
    expect(changelogLine.find('p').at(0).text()).toEqual('sulu_admin.changelog_line_changer');
    expect(changelogLine.find('p').at(1).text()).toEqual('sulu_admin.changelog_line_creator');
    expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_creator', { created: '9/27/2018, 8:22:00 AM', creator: 'undefined' });
    expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_changer', { changed: '10/4/2018, 10:57:00 AM', changer: 'undefined' });
});
test('Render with deleted changer and existing creator', (done) => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/creator':
                return 1;
            case '/changer':
                return 2;
            case '/created':
                return '2018-09-27T08:22:00';
            case '/changed':
                return '2018-10-04T10:57:00';
        }
    });
    const creatorPromise = Promise.reject({
        status: 404,
    });
    const changerPromise = Promise.resolve({
        fullName: 'Erika Mustermann',
    });
    ResourceRequester_1.default.get.mockImplementation((resourceKey, { id, }) => {
        switch (id) {
            case 1:
                return creatorPromise;
            case 2:
                return changerPromise;
        }
    });
    const changelogLine = (0, enzyme_1.mount)(<ChangelogLine_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>);
    expect(ResourceRequester_1.default.get).toHaveBeenCalledTimes(2);
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 1 });
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 2 });
    setTimeout(() => {
        changelogLine.update();
        expect(changelogLine.find('p')).toHaveLength(2);
        expect(changelogLine.find('p').at(0).text()).toEqual('sulu_admin.changelog_line_changer');
        expect(changelogLine.find('p').at(1).text()).toEqual('sulu_admin.changelog_line_creator');
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_creator', { created: '9/27/2018, 8:22:00 AM', creator: 'undefined' });
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_changer', { changed: '10/4/2018, 10:57:00 AM', changer: 'Erika Mustermann' });
        done();
    });
});
test('Render with existing changer and deleted creator', (done) => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/creator':
                return 1;
            case '/changer':
                return 2;
            case '/created':
                return '2018-09-27T08:22:00';
            case '/changed':
                return '2018-10-04T10:57:00';
        }
    });
    const creatorPromise = Promise.resolve({
        fullName: 'Max Mustermann',
    });
    const changerPromise = Promise.reject({
        status: 404,
    });
    ResourceRequester_1.default.get.mockImplementation((resourceKey, { id, }) => {
        switch (id) {
            case 1:
                return creatorPromise;
            case 2:
                return changerPromise;
        }
    });
    const changelogLine = (0, enzyme_1.mount)(<ChangelogLine_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>);
    expect(ResourceRequester_1.default.get).toHaveBeenCalledTimes(2);
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 1 });
    expect(ResourceRequester_1.default.get).toBeCalledWith('users', { id: 2 });
    setTimeout(() => {
        changelogLine.update();
        expect(changelogLine.find('p')).toHaveLength(2);
        expect(changelogLine.find('p').at(0).text()).toEqual('sulu_admin.changelog_line_changer');
        expect(changelogLine.find('p').at(1).text()).toEqual('sulu_admin.changelog_line_creator');
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_creator', { created: '9/27/2018, 8:22:00 AM', creator: 'Max Mustermann' });
        expect(Translator_1.translate).toBeCalledWith('sulu_admin.changelog_line_changer', { changed: '10/4/2018, 10:57:00 AM', changer: 'undefined' });
        done();
    });
});
