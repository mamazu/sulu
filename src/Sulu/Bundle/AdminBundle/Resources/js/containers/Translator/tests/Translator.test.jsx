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
const Requester_1 = __importDefault(require("../../../services/Requester"));
const Translator_1 = __importDefault(require("../Translator"));
jest.mock('../../../services/Requester');
jest.mock('debounce', () => jest.fn((fn) => fn));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
const mockProps = {
    locale: 'en',
    value: 'Hallo',
    onConfirm: jest.fn(),
    onDialogClose: jest.fn(),
    type: 'text_line',
    url: '/api/translate',
    messages: {
        title: 'Translate',
        insert: 'Insert',
        detected: 'Detected',
        errorTranslatingText: 'Error translating text',
    },
    sourceLanguages: [
        { locale: 'en', label: 'English' },
        { locale: 'de', label: 'German' },
    ],
    targetLanguages: [
        { locale: 'fr', label: 'French' },
        { locale: 'es', label: 'Spanish' },
    ],
};
describe('Translator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with initial props', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hello', sourceLanguage: undefined, targetLanguage: 'en' },
        });
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        expect(react_2.screen.getByText('Translate')).toBeInTheDocument();
        expect(react_2.screen.getByText('Insert')).toBeInTheDocument();
        expect(react_2.screen.getByDisplayValue('Hallo')).toBeInTheDocument();
        yield (0, react_2.waitFor)(() => {
            expect(Requester_1.default.post).toHaveBeenCalledWith('/api/translate', {
                text: 'Hallo',
                sourceLanguage: undefined,
                targetLanguage: 'en',
            });
        });
        expect(react_2.screen.getByDisplayValue('Hello')).toBeInTheDocument();
    }));
    test('translates text when source text changes', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hello', sourceLanguage: undefined, targetLanguage: 'en' },
        });
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Bye', sourceLanguage: undefined, targetLanguage: 'en' },
        });
        const sourceInput = react_2.screen.getByDisplayValue('Hallo');
        yield user_event_1.default.clear(sourceInput);
        yield user_event_1.default.type(sourceInput, 'Auf wiedersehen');
        yield (0, react_2.waitFor)(() => {
            expect(Requester_1.default.post).toHaveBeenCalledWith('/api/translate', {
                text: 'Auf wiedersehen',
                sourceLanguage: undefined,
                targetLanguage: 'en',
            });
        });
        expect(react_2.screen.getByDisplayValue('Bye')).toBeInTheDocument();
    }));
    test('changes source language', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hello', sourceLanguage: undefined, targetLanguage: 'en' },
        });
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Hello')).toBeInTheDocument();
        });
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hello', sourceLanguage: 'de', targetLanguage: 'en' },
        });
        yield user_event_1.default.click(react_2.screen.getAllByTitle('sulu_admin.please_choose')[0]);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('German')).toBeInTheDocument();
        });
        yield user_event_1.default.click(react_2.screen.getByText('German'));
        yield (0, react_2.waitFor)(() => {
            expect(Requester_1.default.post).toHaveBeenCalledWith('/api/translate', {
                text: 'Hallo',
                sourceLanguage: 'de',
                targetLanguage: 'en',
            });
        });
    }));
    test('changes target language', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hello', sourceLanguage: undefined, targetLanguage: 'en' },
        });
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Hello')).toBeInTheDocument();
        });
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Hola', sourceLanguage: undefined, targetLanguage: 'fr' },
        });
        yield user_event_1.default.click(react_2.screen.getAllByTitle('sulu_admin.please_choose')[1]);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('French')).toBeInTheDocument();
        });
        yield user_event_1.default.click(react_2.screen.getByText('French'));
        yield (0, react_2.waitFor)(() => {
            expect(Requester_1.default.post).toHaveBeenCalledWith('/api/translate', {
                text: 'Hallo',
                sourceLanguage: undefined,
                targetLanguage: 'fr',
            });
        });
        expect(react_2.screen.getByDisplayValue('Hola')).toBeInTheDocument();
    }));
    test('handles translation error', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockRejectedValue(new Error('Error translating text'));
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        yield (0, react_2.waitFor)(() => {
            const errorElement = react_2.screen.getAllByText((content, element) => {
                return element.textContent.includes('Error translating text');
            })[0];
            expect(errorElement).toBeInTheDocument();
        });
    }));
    test('calls onConfirm with translated text', () => __awaiter(void 0, void 0, void 0, function* () {
        Requester_1.default.post.mockResolvedValue({
            response: { text: 'Bonjour', sourceLanguage: 'EN', targetLanguage: 'FR' },
        });
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByDisplayValue('Bonjour')).toBeInTheDocument();
        });
        yield user_event_1.default.click(react_2.screen.getByText('Insert'));
        expect(mockProps.onConfirm).toHaveBeenCalledWith('Bonjour');
    }));
    test('calls onDialogClose when closing', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<Translator_1.default {...mockProps}/>);
        const closeButton = react_2.screen.getAllByRole('button', { name: /su-times/i })[0];
        yield user_event_1.default.click(closeButton);
        expect(mockProps.onDialogClose).toHaveBeenCalled();
    }));
    test('calls action prop with correct parameters when translation occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAction = jest.fn(() => <div>Test Action</div>);
        const props = Object.assign(Object.assign({}, mockProps), { 
            // $FlowFixMe
            action: mockAction });
        Requester_1.default.post.mockResolvedValue({
            response: {
                text: 'Bonjour',
                sourceLanguage: 'EN',
                targetLanguage: 'FR',
            },
        });
        (0, react_2.render)(<Translator_1.default {...props}/>);
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Test Action')).toBeInTheDocument();
        });
        expect(mockAction).toHaveBeenCalledTimes(3);
        expect(mockAction).toHaveBeenNthCalledWith(3, {
            source: 'translator',
            context: {
                response: {
                    text: 'Bonjour',
                    sourceLanguage: 'EN',
                    targetLanguage: 'FR',
                },
            },
        }, {});
    }));
});
