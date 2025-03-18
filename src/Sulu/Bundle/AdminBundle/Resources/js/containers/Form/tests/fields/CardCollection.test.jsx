"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const CardCollection_1 = __importDefault(require("../../fields/CardCollection"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/MemoryFormStore', () => jest.fn(function (data, schema) {
    this.data = data;
    this.schema = schema;
    this.change = jest.fn().mockImplementation((name, value) => {
        this.data[name] = value;
    });
    this.validate = jest.fn().mockReturnValue(true);
    this.destroy = jest.fn();
    this.types = {};
}));
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn(function () {
    this.isFieldModified = jest.fn();
}));
jest.mock('../../registries/fieldRegistry', () => ({
    get: jest.fn((type) => {
        switch (type) {
            case 'text_line':
                return require('../../../../components/Input').default;
        }
    }),
    getOptions: jest.fn(),
}));
test('Render a CardCollection', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {},
    };
    const value = [
        {
            firstName: 'Max', lastName: 'Mustermann',
        },
        {
            firstName: 'Erika',
            lastName: 'Mustermann',
        },
    ];
    expect((0, enzyme_1.render)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value={value}/>)).toMatchSnapshot();
});
test('Close the overlay when its close button is clicked', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const fieldTypeOptions = {
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {
            firstName: {
                name: 'firstName',
                type: 'text_line',
            },
            lastName: {
                name: 'lastName',
                type: 'text_line',
            },
        },
    };
    const value = [
        {
            firstName: 'Max',
            lastName: 'Mustermann',
        },
        {
            firstName: 'Erika',
            lastName: 'Mustermann',
        },
    ];
    const cardCollection = (0, enzyme_1.mount)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    cardCollection.find('.addButtonContainer button').simulate('click');
    expect(cardCollection.find('Overlay').prop('open')).toEqual(true);
    cardCollection.find('Icon[name="su-times"]').simulate('click');
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    expect(changeSpy).not.toBeCalled();
});
test('Add a new card using the overlay', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const fieldTypeOptions = {
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {
            firstName: {
                name: 'firstName',
                type: 'text_line',
            },
            lastName: {
                name: 'lastName',
                type: 'text_line',
            },
        },
    };
    const value = [
        {
            firstName: 'Max',
            lastName: 'Mustermann',
        },
        {
            firstName: 'Erika',
            lastName: 'Mustermann',
        },
    ];
    const cardCollection = (0, enzyme_1.mount)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    cardCollection.find('.addButtonContainer button').simulate('click');
    expect(cardCollection.find('Overlay').prop('open')).toEqual(true);
    cardCollection.find('Input[dataPath="/firstName"]').prop('onChange')('John');
    cardCollection.find('Input[dataPath="/lastName"]').prop('onChange')('Doe');
    cardCollection.find('Overlay').prop('onConfirm')();
    cardCollection.update();
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith([...value, { firstName: 'John', lastName: 'Doe' }]);
});
test('Do not add a new card if validation fails', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const fieldTypeOptions = {
        jsonSchema: {
            required: ['firstName', 'lastName'],
        },
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {
            firstName: {
                name: 'firstName',
                type: 'text_line',
            },
            lastName: {
                name: 'lastName',
                type: 'text_line',
            },
        },
    };
    const value = [];
    const cardCollection = (0, enzyme_1.mount)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    cardCollection.find('.addButtonContainer button').simulate('click');
    expect(cardCollection.find('Overlay').prop('open')).toEqual(true);
    cardCollection.instance().formStore.validate.mockReturnValue(false);
    cardCollection.find('Input[dataPath="/firstName"]').prop('onChange')('John');
    cardCollection.find('Overlay').prop('onConfirm')();
    cardCollection.update();
    expect(cardCollection.find('Overlay').prop('open')).toEqual(true);
    expect(changeSpy).not.toBeCalled();
});
test('Edit an existing card using the overlay', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const fieldTypeOptions = {
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {
            firstName: {
                name: 'firstName',
                type: 'text_line',
            },
            lastName: {
                name: 'lastName',
                type: 'text_line',
            },
        },
    };
    const value = [
        {
            firstName: 'Max',
            lastName: 'Mustermann',
        },
        {
            firstName: 'Erika',
            lastName: 'Mustermann',
        },
    ];
    const cardCollection = (0, enzyme_1.mount)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    cardCollection.find('Icon[name="su-pen"]').at(0).simulate('click');
    expect(cardCollection.find('Overlay').prop('open')).toEqual(true);
    cardCollection.find('Input[dataPath="/firstName"]').prop('onChange')('John');
    cardCollection.find('Input[dataPath="/lastName"]').prop('onChange')('Doe');
    cardCollection.find('Overlay').prop('onConfirm')();
    cardCollection.update();
    expect(cardCollection.find('Overlay').prop('open')).toEqual(false);
    expect(changeSpy).toBeCalledWith([{ firstName: 'John', lastName: 'Doe' }, value[1]]);
});
test('Edit an existing card using the overlay', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const fieldTypeOptions = {
        renderCardContent: jest.fn((card) => card.firstName + ' ' + card.lastName),
        schema: {
            firstName: {
                name: 'firstName',
                type: 'text_line',
            },
            lastName: {
                name: 'lastName',
                type: 'text_line',
            },
        },
    };
    const value = [
        {
            firstName: 'Max',
            lastName: 'Mustermann',
        },
        {
            firstName: 'Erika',
            lastName: 'Mustermann',
        },
    ];
    const cardCollection = (0, enzyme_1.mount)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    cardCollection.find('Icon[name="su-trash-alt"]').at(1).simulate('click');
    expect(changeSpy).toBeCalledWith([value[0]]);
});
test('Throw error when no renderCardContent function is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    expect(() => (0, enzyme_1.shallow)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>)).toThrow(/"renderCardContent"/);
});
test('Throw error when no schema function is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const fieldTypeOptions = {
        renderCardContent: jest.fn(),
    };
    expect(() => (0, enzyme_1.shallow)(<CardCollection_1.default {...fieldTypeDefaultProps_1.default} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector}/>)).toThrow(/"schema"/);
});
