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
require("@testing-library/jest-dom/extend-expect");
const memoryFormStoreFactory_1 = __importDefault(require("../../Form/stores/memoryFormStoreFactory"));
const ActionOverlay_1 = __importDefault(require("../ActionOverlay"));
// Mock the Requester and MemoryFormStoreFactory
jest.mock('../../../services', () => ({
    Requester: {
        post: jest.fn(() => Promise.resolve()),
    },
}));
jest.mock('../../Form/stores/memoryFormStoreFactory', () => ({
    createFromFormKey: jest.fn(() => ({
        data: {},
        dirty: true,
        validate: jest.fn(() => true),
        hasInvalidType: false,
        types: {},
        isFieldModified: jest.fn(() => false),
        change: jest.fn(),
        schema: {
            subject: {
                label: 'Betreff',
                disabledCondition: null,
                visibleCondition: null,
                description: '',
                type: 'text_line',
                colSpan: 12,
                options: [],
                types: [],
                defaultType: null,
                required: true,
                spaceAfter: null,
                minOccurs: null,
                maxOccurs: null,
                onInvalid: null,
                tags: [],
            },
        },
    })),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
jest.mock('../../Form/registries/fieldRegistry', () => ({
    get: jest.fn((type) => {
        switch (type) {
            case 'text_line':
                return require('../../../components/Input').default;
        }
    }),
    getOptions: jest.fn().mockReturnValue({}),
}));
describe('ActionOverlay', () => {
    const defaultProps = {
        formKey: 'testFormKey',
        source: 'testSource',
        url: 'testUrl',
    };
    it('renders without crashing', () => {
        (0, react_2.render)(<ActionOverlay_1.default {...defaultProps}/>);
        expect(react_2.screen.getByRole('button')).toBeInTheDocument();
    });
    it('renders the button with the correct title', () => {
        (0, react_2.render)(<ActionOverlay_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText('sulu_admin.feedback')).toBeInTheDocument();
    });
    it('opens the form overlay when the button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<ActionOverlay_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByRole('button'));
        expect(memoryFormStoreFactory_1.default.createFromFormKey).toHaveBeenCalledWith('testFormKey');
        expect(react_2.screen.getByText('sulu_admin.send_feedback')).toBeInTheDocument();
    }));
    it('handles form close', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<ActionOverlay_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByRole('button'));
        yield user_event_1.default.click(react_2.screen.getAllByRole('button', { name: /su-times/i })[0]);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText('Form Title')).not.toBeInTheDocument();
        });
    }));
});
