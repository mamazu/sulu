"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const webspaceStore_1 = __importDefault(require("../../../../stores/webspaceStore"));
const SegmentSelect_1 = __importDefault(require("../../fields/SegmentSelect"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (formStore) {
        this.options = formStore.options;
        this.metadataOptions = formStore.metadataOptions;
    }),
    ResourceFormStore: jest.fn(function (resourceStore, formKey, options, metadataOptions) {
        this.options = options;
        this.metadataOptions = metadataOptions;
    }),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../stores/webspaceStore', () => ({
    getWebspace: jest.fn(),
    grantedWebspaces: [
        {
            name: 'Webspace One',
            key: 'webspace-1',
            segments: [
                { key: 'w', title: 'Winter' },
                { key: 's', title: 'Summer' },
            ],
        },
        {
            name: 'Webspace Two',
            key: 'webspace-2',
            segments: [],
        },
        {
            name: 'Webspace Three',
            key: 'webspace-3',
            segments: [
                { key: 'a', title: 'Autumn' },
                { key: 'p', title: 'Spring' },
            ],
        },
    ],
}));
test('Pass correct props to SegmentSelect', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }, { webspace: 'sulu_io' }));
    const webspace = {
        name: 'Webspace One',
        key: 'webspace-1',
        segments: [
            { key: 'w', title: 'Winter' },
            { key: 's', title: 'Summer' },
        ],
    };
    webspaceStore_1.default.getWebspace.mockReturnValue(webspace);
    const segmentSelect = (0, enzyme_1.shallow)(<SegmentSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value={{}}/>);
    expect(segmentSelect.find('SegmentSelect').prop('disabled')).toEqual(true);
    expect(segmentSelect.find('SegmentSelect').prop('value')).toEqual({});
    expect(segmentSelect.find('SegmentSelect').prop('webspace')).toEqual('sulu_io');
});
test('Call onChange and onBlur if the value is changed', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const segmentSelect = (0, enzyme_1.shallow)(<SegmentSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={{
            'webspace-1': 's',
        }}/>);
    segmentSelect.find('SegmentSelect').prop('onChange')({
        'webspace-1': 's',
        'webspace-3': 'a',
    });
    expect(changeSpy).toBeCalledWith({
        'webspace-1': 's',
        'webspace-3': 'a',
    });
    expect(finishSpy).toBeCalledWith();
});
