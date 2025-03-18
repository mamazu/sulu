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
const ActionButton_1 = __importDefault(require("../ActionButton"));
describe('ActionButton', () => {
    const defaultProps = {
        messages: {
            title: 'Action',
        },
        onClick: jest.fn(),
    };
    it('renders without crashing', () => {
        (0, react_2.render)(<ActionButton_1.default {...defaultProps}/>);
        expect(react_2.screen.getByRole('button')).toBeInTheDocument();
    });
    it('renders the title message', () => {
        (0, react_2.render)(<ActionButton_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText('Action')).toBeInTheDocument();
    });
    it('calls onClick when the button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<ActionButton_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByRole('button'));
        expect(defaultProps.onClick).toHaveBeenCalled();
    }));
    it('applies the correct class names', () => {
        const { container } = (0, react_2.render)(<ActionButton_1.default {...defaultProps}/>);
        expect(container.firstChild).toHaveClass('feedbackContainer');
        expect(react_2.screen.getByRole('button')).toHaveClass('feedbackTab');
        expect(react_2.screen.getByRole('button').firstChild).toHaveClass('feedbackIcon');
    });
});
