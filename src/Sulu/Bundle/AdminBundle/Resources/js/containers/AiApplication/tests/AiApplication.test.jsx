"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const utils_1 = require("../../../utils");
const AiApplication_1 = __importDefault(require("../AiApplication"));
jest.mock('fos-jsrouting/router');
jest.mock('../../../utils');
jest.mock('../../../containers');
jest.mock('../../TextEditor/adapters/CKEditor5');
jest.mock('../../WritingAssistant');
jest.mock('../../Translator');
jest.mock('../ActionOverlay');
describe('AiApplication', () => {
    let props;
    beforeEach(() => {
        props = {
            feedback: {
                enabled: true,
                formKey: 'formKey',
                route: 'feedbackRoute',
            },
            translation: {
                enabled: true,
                route: 'translationRoute',
                sourceLanguages: [{ label: 'English', locale: 'en' }],
                targetLanguages: [{ label: 'French', locale: 'fr' }],
            },
            writingAssistant: {
                enabled: true,
                experts: {},
                route: 'writingAssistantRoute',
            },
        };
        router_1.default.generate.mockImplementation((route, params) => {
            return `${route}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;
        });
        utils_1.translate.mockImplementation((key) => key);
    });
    test('renders without crashing initially', () => {
        const { container } = (0, react_2.render)(<AiApplication_1.default {...props}/>);
        expect(container).toBeEmptyDOMElement();
    });
    test('renders FeatureBadge when hasFocus is true', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Create a mock HTMLElement
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        // Create a mock event object
        const event = new Event('sulu.focus');
        Object.defineProperty(event, 'target', {
            value: mockElement,
        });
        Object.defineProperty(event, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn(),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        // Simulate the sulu.focus event to set hasFocus to true
        (0, react_2.fireEvent)(document, event);
        // Now, hasFocus should be true and FeatureBadge should be rendered
        expect(react_2.screen.getByTitle('sulu_admin.translator')).toBeInTheDocument();
        expect(react_2.screen.getByTitle('sulu_admin.writing_assistant')).toBeInTheDocument();
    });
    test('handles scroll and resize events', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Create a mock HTMLElement
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const event = new Event('sulu.focus');
        Object.defineProperty(event, 'target', {
            value: mockElement,
        });
        Object.defineProperty(event, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn(),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, event);
        // Simulate scroll event
        react_2.fireEvent.scroll(window);
        // Check if getBoundingClientRect was called
        expect(mockElement.parentElement.getBoundingClientRect).toHaveBeenCalledTimes(2);
        // Simulate resize event
        react_2.fireEvent.resize(window);
        // Check if getBoundingClientRect was called again
        expect(mockElement.parentElement.getBoundingClientRect).toHaveBeenCalledTimes(3);
    });
    test('handles global click event', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Create a mock HTMLElement
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const focusEvent = new Event('sulu.focus');
        Object.defineProperty(focusEvent, 'target', {
            value: mockElement,
        });
        Object.defineProperty(focusEvent, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn(),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, focusEvent);
        // Create a mock click event
        const clickEvent = new Event('click');
        Object.defineProperty(clickEvent, 'target', {
            // $FlowFixMe
            value: {
                matches: jest.fn().mockReturnValue(false),
                closest: jest.fn().mockReturnValue(null),
            },
        });
        // Simulate the global click event
        (0, react_2.fireEvent)(document, clickEvent);
        // Check if hasFocus is set to false
        expect(react_2.screen.getByTitle('sulu_admin.translator')).toBeInTheDocument();
        expect(react_2.screen.getByTitle('sulu_admin.writing_assistant')).toBeInTheDocument();
    });
    test('handles writing assistant close', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        const focusEvent = new Event('sulu.focus');
        Object.defineProperty(focusEvent, 'target', {
            value: mockElement,
        });
        Object.defineProperty(focusEvent, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn().mockReturnValue('text'),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, focusEvent);
        // Simulate the writing assistant close action
        const instance = new AiApplication_1.default(props);
        instance.selectedComponent = { getValue: jest.fn().mockReturnValue('text') };
        instance.handleWritingAssistantClose();
        // Check the state changes
        expect(instance.selectedText).toBe('text');
        expect(instance.writingAssistantOpen).toBe(false);
        expect(instance.hasFocus).toBe(false);
    });
    test('handles writing assistant confirm', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        const focusEvent = new Event('sulu.focus');
        Object.defineProperty(focusEvent, 'target', {
            value: mockElement,
        });
        Object.defineProperty(focusEvent, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn(),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, focusEvent);
        // Simulate the writing assistant confirm action
        const instance = new AiApplication_1.default(props);
        instance.selectedComponent = { setValue: jest.fn() };
        instance.selectedElement = {
            focus: jest.fn(),
            selectionStart: 0,
            selectionEnd: 0,
            value: { length: 0 },
        };
        instance.handleWritingAssistantConfirm('optimizedText');
        // Check the state changes
        expect(instance.selectedComponent.setValue).toHaveBeenCalledWith('optimizedText');
        expect(instance.writingAssistantOpen).toBe(false);
        expect(instance.hasFocus).toBe(true);
    });
    test('handles translate close', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        const focusEvent = new Event('sulu.focus');
        Object.defineProperty(focusEvent, 'target', {
            value: mockElement,
        });
        Object.defineProperty(focusEvent, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn().mockReturnValue('text'),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, focusEvent);
        // Simulate the translate close action
        const instance = new AiApplication_1.default(props);
        instance.selectedComponent = { getValue: jest.fn().mockReturnValue('text') };
        instance.handleTranslateClose();
        // Check the state changes
        expect(instance.selectedText).toBe('text');
        expect(instance.translateOpen).toBe(false);
        expect(instance.hasFocus).toBe(false);
    });
    test('handles translate confirm', () => {
        (0, react_2.render)(<AiApplication_1.default {...props}/>);
        // Simulate the sulu.focus event to set hasFocus to true and select the element
        const mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'parentElement', {
            // $FlowFixMe
            value: {
                getBoundingClientRect: jest.fn().mockReturnValue({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                }),
            },
        });
        const focusEvent = new Event('sulu.focus');
        Object.defineProperty(focusEvent, 'target', {
            value: mockElement,
        });
        Object.defineProperty(focusEvent, 'detail', {
            value: {
                formInspector: { locale: { get: () => 'en' } },
                getValue: jest.fn(),
                schemaPath: 'schemaPath',
                schemaType: 'text_line',
                setValue: jest.fn(),
            },
        });
        (0, react_2.fireEvent)(document, focusEvent);
        // Simulate the translate confirm action
        const instance = new AiApplication_1.default(props);
        instance.selectedComponent = { setValue: jest.fn() };
        instance.selectedElement = {
            focus: jest.fn(),
            selectionStart: 0,
            selectionEnd: 0,
            value: { length: 0 },
        };
        instance.handleTranslateConfirm('translatedText');
        // Check the state changes
        expect(instance.selectedComponent.setValue).toHaveBeenCalledWith('translatedText');
        expect(instance.translateOpen).toBe(false);
        expect(instance.hasFocus).toBe(true);
    });
});
