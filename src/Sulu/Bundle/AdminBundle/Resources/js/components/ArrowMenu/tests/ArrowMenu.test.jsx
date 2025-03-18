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
const ArrowMenu_1 = __importDefault(require("../ArrowMenu"));
test('Render ArrowMenu closed', () => {
    const handleClose = jest.fn();
    const handleChangeSection1 = jest.fn();
    const handleChangeSection2 = jest.fn();
    (0, react_2.render)(<ArrowMenu_1.default anchorElement={<button type="button">Nice button</button>} onClose={handleClose} open={false}>
            <ArrowMenu_1.default.Section title="Search Section">
                <input type="text"/>
            </ArrowMenu_1.default.Section>
            <ArrowMenu_1.default.SingleItemSection icon="su-webspace" onChange={handleChangeSection1} title="Webspaces" value="sulu">
                <ArrowMenu_1.default.Item value="sulu">Sulu</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_blog">Sulu Blog</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_doc">Sulu Doc</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.SingleItemSection icon="su-check" onChange={handleChangeSection2} title="Columns" value={undefined}>
                <ArrowMenu_1.default.Item value="title">Title</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="description">Description</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.Section>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 1</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 2</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 3</ArrowMenu_1.default.Action>
            </ArrowMenu_1.default.Section>
        </ArrowMenu_1.default>);
    const anchorButton = react_2.screen.getByText('Nice button');
    expect(anchorButton).toBeInTheDocument();
    const menuSection = react_2.screen.queryByText('Webspaces');
    expect(menuSection).not.toBeInTheDocument();
});
test('Render ArrowMenu with non-HTML element as anchor', () => {
    class Button extends react_1.default.Component {
        render() {
            return <button ref={this.props.buttonRef} type="button"/>;
        }
    }
    const { baseElement } = (0, react_2.render)(<ArrowMenu_1.default anchorElement={<Button />} open={true} refProp="buttonRef">
            <ArrowMenu_1.default.Item value="title">Title</ArrowMenu_1.default.Item>
        </ArrowMenu_1.default>);
    expect(baseElement).toMatchSnapshot();
});
test('Render ArrowMenu open', () => {
    const handleClose = jest.fn();
    const handleChangeSection1 = jest.fn();
    const handleChangeSection2 = jest.fn();
    const { baseElement } = (0, react_2.render)(<ArrowMenu_1.default anchorElement={<button type="button">Nice button</button>} onClose={handleClose} open={true}>
            <ArrowMenu_1.default.Section title="Search Section">
                <input type="text"/>
            </ArrowMenu_1.default.Section>
            <ArrowMenu_1.default.SingleItemSection icon="su-webspace" onChange={handleChangeSection1} title="Webspaces" value="sulu">
                <ArrowMenu_1.default.Item value="sulu">Sulu</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_blog">Sulu Blog</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_doc">Sulu Doc</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.SingleItemSection icon="su-check" onChange={handleChangeSection2} title="Columns" value={undefined}>
                <ArrowMenu_1.default.Item value="title">Title</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="description">Description</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.Section>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 1</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 2</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 3</ArrowMenu_1.default.Action>
            </ArrowMenu_1.default.Section>
        </ArrowMenu_1.default>);
    const anchorButton = react_2.screen.getByText('Nice button');
    expect(anchorButton).toBeInTheDocument();
    const menuSection = react_2.screen.queryByText('Webspaces');
    expect(menuSection).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
});
test('Render ArrowMenu open with falsy values', () => {
    const handleClose = jest.fn();
    const handleChangeSection1 = jest.fn();
    const handleChangeSection2 = jest.fn();
    const { baseElement } = (0, react_2.render)(<ArrowMenu_1.default anchorElement={<button type="button">Nice button</button>} onClose={handleClose} open={true}>
            <ArrowMenu_1.default.Section title="Search Section">
                <input type="text"/>
                {false}
            </ArrowMenu_1.default.Section>
            <ArrowMenu_1.default.SingleItemSection icon="su-webspace" onChange={handleChangeSection1} title="Webspaces" value="sulu">
                <ArrowMenu_1.default.Item value="sulu">Sulu</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_blog">Sulu Blog</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_doc">Sulu Doc</ArrowMenu_1.default.Item>
                {false}
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.SingleItemSection icon="su-check" onChange={handleChangeSection2} title="Columns" value={undefined}>
                <ArrowMenu_1.default.Item value="title">Title</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="description">Description</ArrowMenu_1.default.Item>
                {false}
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.Section>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 1</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 2</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={jest.fn()}>Test Action 3</ArrowMenu_1.default.Action>
                {false}
            </ArrowMenu_1.default.Section>
            {false}
        </ArrowMenu_1.default>);
    const anchorButton = react_2.screen.getByText('Nice button');
    expect(anchorButton).toBeInTheDocument();
    const menuSection = react_2.screen.queryByText('Webspaces');
    expect(menuSection).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
});
test('Events should be called correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleClose = jest.fn();
    const handleChangeSection1 = jest.fn();
    const handleChangeSection2 = jest.fn();
    const handleActionClick1 = jest.fn();
    const handleActionClick2 = jest.fn();
    const handleActionClick3 = jest.fn();
    (0, react_2.render)(<ArrowMenu_1.default anchorElement={<button type="button">Nice button</button>} onClose={handleClose} open={true}>
            <ArrowMenu_1.default.Section title="Search Section">
                <input type="text"/>
            </ArrowMenu_1.default.Section>
            <ArrowMenu_1.default.SingleItemSection icon="su-webspace" onChange={handleChangeSection1} title="Webspaces" value="sulu">
                <ArrowMenu_1.default.Item value="sulu">Sulu</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_blog">Sulu Blog</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="sulu_doc">Sulu Doc</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.SingleItemSection icon="check" onChange={handleChangeSection2} title="Columns" value={undefined}>
                <ArrowMenu_1.default.Item value="title">Title</ArrowMenu_1.default.Item>
                <ArrowMenu_1.default.Item value="description">Description</ArrowMenu_1.default.Item>
            </ArrowMenu_1.default.SingleItemSection>
            <ArrowMenu_1.default.Section>
                <ArrowMenu_1.default.Action onClick={handleActionClick1}>Test Action 1</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={handleActionClick2}>Test Action 2</ArrowMenu_1.default.Action>
                <ArrowMenu_1.default.Action onClick={handleActionClick3}>Test Action 3</ArrowMenu_1.default.Action>
            </ArrowMenu_1.default.Section>
        </ArrowMenu_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('Sulu Blog'));
    expect(handleChangeSection1).toBeCalledWith('sulu_blog');
    yield user.click(react_2.screen.getByText('Test Action 2'));
    expect(handleActionClick2).toBeCalled();
    expect(handleClose).toBeCalledTimes(1);
    yield user.click(react_2.screen.getByText('Title'));
    expect(handleChangeSection2).toBeCalledWith('title');
    yield user.click(react_2.screen.getByTestId('backdrop'));
    expect(handleClose).toBeCalledTimes(2);
}));
