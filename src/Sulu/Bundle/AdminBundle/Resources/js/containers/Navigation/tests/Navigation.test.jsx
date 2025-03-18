"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Navigation_1 = __importDefault(require("../Navigation"));
const Router_1 = __importStar(require("../../../services/Router"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../services/Router/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('../registries/navigationRegistry', () => ({
    get: jest.fn().mockReturnValue({
        id: '111-111',
        title: 'Test Navigation',
        label: '',
        icon: 'su-options',
        view: 'returned_main_route',
        visible: true,
    }),
    getAll: jest.fn().mockReturnValue([
        {
            id: '111-111',
            title: 'Test Navigation',
            label: '',
            icon: 'su-options',
            view: 'sulu_admin.form_tab',
            visible: true,
        },
        {
            id: '222-222',
            title: 'Test Navigation 2',
            label: '',
            icon: 'su-article',
            view: 'sulu_article.list',
            childViews: ['sulu_article.form', 'sulu_article.form'],
            visible: true,
        },
        {
            id: '111-222',
            title: 'Hidden Navigation Item',
            label: '',
            icon: 'su-options',
            view: 'sulu_admin.form_tab',
            visible: false,
        },
        {
            id: '333-333',
            title: 'Test Navigation with Children',
            label: '',
            icon: 'su-options',
            visible: true,
            items: [
                {
                    id: '333-child1',
                    title: 'Test Navigation Child 1',
                    label: '',
                    icon: 'su-options',
                    view: 'sulu_admin.form_tab',
                    visible: true,
                },
                {
                    id: '333-child2',
                    title: 'Test Navigation Child 2',
                    label: '',
                    icon: 'su-article',
                    view: 'sulu_article.list',
                    childViews: ['sulu_article.form', 'sulu_article.form'],
                    visible: true,
                },
                {
                    id: '333-child3',
                    title: 'Test Navigation Child 1',
                    label: '',
                    icon: 'su-options',
                    view: 'sulu_admin.form_tab',
                    visible: false,
                },
            ],
        },
    ]),
}));
test('Should render navigation', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'sulu_admin.form_tab',
        path: '/form',
        type: 'form_tab',
    });
    const navigation = (0, enzyme_1.render)(<Navigation_1.default appVersion="666" onLogout={jest.fn()} onNavigate={jest.fn()} onPinToggle={jest.fn()} onProfileClick={jest.fn()} pinned={false} router={router} suluVersion="2.0.0-RC1"/>);
    expect(navigation).toMatchSnapshot();
});
test('Should render navigation without appVersion', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'sulu_admin.form_tab',
        path: '/form',
        type: 'form_tab',
    });
    const navigation = (0, enzyme_1.render)(<Navigation_1.default appVersion={null} onLogout={jest.fn()} onNavigate={jest.fn()} onPinToggle={jest.fn()} onProfileClick={jest.fn()} pinned={false} router={router} suluVersion="2.0.0-RC1"/>);
    expect(navigation).toMatchSnapshot();
});
test('Should call the navigation callback, pin callback and router navigate', () => {
    const router = new Router_1.default({});
    router.route = new Router_1.Route({
        name: 'sulu_admin.form_tab',
        path: '/form',
        type: 'form_tab',
    });
    const handleNavigate = jest.fn();
    const handlePin = jest.fn();
    const navigation = (0, enzyme_1.mount)(<Navigation_1.default appVersion={null} onLogout={jest.fn()} onNavigate={handleNavigate} onPinToggle={handlePin} onProfileClick={jest.fn()} pinned={false} router={router} suluVersion="2.0.0-RC1"/>);
    navigation.find('Item').at(4).find('.title').simulate('click');
    expect(router.navigate).toHaveBeenCalledWith('returned_main_route');
    expect(handleNavigate).toHaveBeenCalledWith('returned_main_route');
    navigation.find('.pin').simulate('click');
    expect(handlePin).toBeCalled();
});
