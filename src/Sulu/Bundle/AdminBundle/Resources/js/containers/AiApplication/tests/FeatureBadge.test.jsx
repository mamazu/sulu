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
const FeatureBadge_1 = __importDefault(require("../FeatureBadge"));
describe('FeatureBadge', () => {
    const defaultProps = {
        messages: {
            translate: 'Translate',
            writingAssistant: 'Writing Assistant',
        },
        skin: 'white',
    };
    it('renders without crashing', () => {
        (0, react_2.render)(<FeatureBadge_1.default {...defaultProps}/>);
        expect(react_2.screen.getByRole('button')).toBeInTheDocument();
    });
    it('renders with white skin class', () => {
        const { container } = (0, react_2.render)(<FeatureBadge_1.default {...defaultProps}/>);
        expect(container.firstChild.firstChild).toHaveClass('contentWhite');
    });
    it('renders with gray skin class', () => {
        const { container } = (0, react_2.render)(<FeatureBadge_1.default {...defaultProps} skin="gray"/>);
        expect(container.firstChild.firstChild).toHaveClass('contentGray');
    });
    it('calls onWritingAssistantClick when WritingAssistantIcon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        const handleWritingAssistantClick = jest.fn();
        (0, react_2.render)(<FeatureBadge_1.default {...defaultProps} onWritingAssistantClick={handleWritingAssistantClick}/>);
        yield user_event_1.default.click(react_2.screen.getByTitle('Writing Assistant'));
        expect(handleWritingAssistantClick).toHaveBeenCalled();
    }));
    it('calls onTranslateClick when TranslateIcon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        const handleTranslateClick = jest.fn();
        (0, react_2.render)(<FeatureBadge_1.default {...defaultProps} onTranslateClick={handleTranslateClick}/>);
        yield user_event_1.default.click(react_2.screen.getByTitle('Translate'));
        expect(handleTranslateClick).toHaveBeenCalled();
    }));
    it('does not render WritingAssistantIcon if onWritingAssistantClick is not provided', () => {
        (0, react_2.render)(<FeatureBadge_1.default {...defaultProps}/>);
        expect(react_2.screen.queryByTitle('Writing Assistant')).not.toBeInTheDocument();
    });
    it('does not render TranslateIcon if onTranslateClick is not provided', () => {
        (0, react_2.render)(<FeatureBadge_1.default {...defaultProps}/>);
        expect(react_2.screen.queryByTitle('Translate')).not.toBeInTheDocument();
    });
});
