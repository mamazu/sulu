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
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const Matrix_1 = __importDefault(require("../Matrix"));
const Row_1 = __importDefault(require("../Row"));
const Item_1 = __importDefault(require("../Item"));
afterEach(() => {
    if (document.body) {
        document.body.innerHTML = '';
    }
});
jest.mock('../../../utils/Translator', () => ({
    translate(key) {
        switch (key) {
            case 'sulu_admin.activate_all':
                return 'Activate all';
            case 'sulu_admin.deactivate_all':
                return 'Deactivate all';
        }
    },
}));
test('Render the Matrix component', () => {
    const handleChange = jest.fn();
    const { container } = (0, react_1.render)(<Matrix_1.default className="test" onChange={handleChange}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render the Matrix component with values', () => {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    const { container } = (0, react_1.render)(<Matrix_1.default onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render the Matrix component with values in disabled state', () => {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    const { container } = (0, react_1.render)(<Matrix_1.default disabled={true} onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    expect(container).toMatchSnapshot();
});
test('Changing a value should call onChange ', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    (0, react_1.render)(<Matrix_1.default onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    const expectedValues = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': false,
        },
        'global.redirects': {
            'view': false,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    const item = react_1.screen.queryAllByLabelText('su-pen')[1].parentElement;
    yield user_event_1.default.click(item);
    expect(handleChange).toHaveBeenCalledWith(expectedValues);
}));
test('Deactivate all button should call onChange', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    (0, react_1.render)(<Matrix_1.default onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    const expectedValues = {
        'global.articles': {
            'view': false,
            'edit': false,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    const disableRowButton = react_1.screen.queryAllByText('Deactivate all')[0];
    yield user_event_1.default.click(disableRowButton);
    expect(handleChange).toHaveBeenCalledWith(expectedValues);
}));
test('Activate all button should call onChange', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': false,
            'edit': false,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    (0, react_1.render)(<Matrix_1.default onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    const expectedValues = {
        'global.articles': {
            'view': true,
            'edit': true,
            'delete': true,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': false,
        },
    };
    const activateRowButton = react_1.screen.queryAllByText('Activate all')[0];
    yield user_event_1.default.click(activateRowButton);
    expect(handleChange).toHaveBeenCalledWith(expectedValues);
}));
test('Activate all button should call onChange with all values, even when the value does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleChange = jest.fn();
    const values = {
        'global.articles': {
            'view': false,
            'edit': false,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
    };
    (0, react_1.render)(<Matrix_1.default onChange={handleChange} values={values}>
            <Row_1.default name="global.articles" title="articles">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
                <Item_1.default icon="su-trash-alt" name="delete"/>
            </Row_1.default>
            <Row_1.default name="global.redirects" title="redirects">
                <Item_1.default icon="su-pen" name="view"/>
            </Row_1.default>
            <Row_1.default name="global.settings" title="settings">
                <Item_1.default icon="su-pen" name="view"/>
                <Item_1.default icon="su-plus" name="edit"/>
            </Row_1.default>
        </Matrix_1.default>);
    const expectedValues = {
        'global.articles': {
            'view': false,
            'edit': false,
            'delete': false,
        },
        'global.redirects': {
            'view': true,
        },
        'global.settings': {
            'view': true,
            'edit': true,
        },
    };
    const activateRowButton = react_1.screen.queryAllByText('Activate all')[1];
    yield user_event_1.default.click(activateRowButton);
    expect(handleChange).toHaveBeenCalledWith(expectedValues);
}));
