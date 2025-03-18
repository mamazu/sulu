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
exports.startAdmin = startAdmin;
const history_1 = require("history");
const loglevel_1 = __importDefault(require("loglevel"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const mobx_1 = require("mobx");
const resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
const Requester_1 = __importDefault(require("./services/Requester"));
const Router_1 = __importStar(require("./services/Router"));
const Application_1 = __importDefault(require("./containers/Application"));
const ViewRenderer_1 = require("./containers/ViewRenderer");
const CollaborationStore_1 = __importDefault(require("./stores/CollaborationStore"));
const localizationStore_1 = __importDefault(require("./stores/localizationStore"));
const userStore_1 = __importStar(require("./stores/userStore"));
const services_1 = require("./services");
const initializer_1 = __importDefault(require("./services/initializer"));
const utils_1 = require("./utils");
const ResourceTabs_1 = __importDefault(require("./views/ResourceTabs"));
const List_1 = __importStar(require("./views/List"));
const Tabs_1 = __importDefault(require("./views/Tabs"));
const CKEditor5_1 = __importDefault(require("./containers/TextEditor/adapters/CKEditor5"));
const List_2 = require("./containers/List");
const FieldBlocks_1 = __importStar(require("./containers/FieldBlocks"));
const Form_1 = require("./containers/Form");
const TextEditor_1 = require("./containers/TextEditor");
const Form_2 = __importStar(require("./views/Form"));
const Navigation_1 = require("./containers/Navigation");
const SmartContent_1 = require("./containers/SmartContent");
const PreviewForm_1 = __importDefault(require("./views/PreviewForm"));
const FormOverlayList_1 = __importDefault(require("./views/FormOverlayList"));
const jexl_1 = require("./utils/jexl");
const Link_1 = require("./containers/Link");
const linkTypeRegistry_1 = __importDefault(require("./containers/Link/registries/linkTypeRegistry"));
const AiApplication_1 = __importDefault(require("./containers/AiApplication"));
(0, mobx_1.configure)({ enforceActions: 'observed' });
if (!window.ResizeObserver) {
    window.ResizeObserver = resize_observer_polyfill_1.default;
}
window.log = loglevel_1.default;
loglevel_1.default.setDefaultLevel(process.env.NODE_ENV === 'production' ? loglevel_1.default.levels.WARN : loglevel_1.default.levels.TRACE);
Requester_1.default.handleResponseHooks.push(userStore_1.logoutOnUnauthorizedResponse);
(0, jexl_1.initializeJexl)();
const FIELD_TYPE_BLOCK = 'block';
const FIELD_TYPE_CHANGELOG_LINE = 'changelog_line';
const FIELD_TYPE_CHECKBOX = 'checkbox';
const FIELD_TYPE_COLOR = 'color';
const FIELD_TYPE_DATE = 'date';
const FIELD_TYPE_DATE_TIME = 'datetime';
const FIELD_TYPE_EMAIL = 'email';
const FIELD_TYPE_HEADING = 'heading';
const FIELD_TYPE_NUMBER = 'number';
const FIELD_TYPE_PASSWORD_CONFIRMATION = 'password_confirmation';
const FIELD_TYPE_PHONE = 'phone';
const FIELD_TYPE_QRCODE = 'qrcode';
const FIELD_TYPE_SELECT = 'select';
const FIELD_TYPE_SINGLE_SELECT = 'single_select';
const FIELD_TYPE_SMART_CONTENT = 'smart_content';
const FIELD_TYPE_TEXT_AREA = 'text_area';
const FIELD_TYPE_TEXT_EDITOR = 'text_editor';
const FIELD_TYPE_TEXT_LINE = 'text_line';
const FIELD_TYPE_TIME = 'time';
const FIELD_TYPE_URL = 'url';
const FIELD_TYPE_LINK = 'link';
initializer_1.default.addUpdateConfigHook('sulu_admin', (config, initialized) => {
    if (!initialized) {
        registerBlockPreviewTransformers();
        registerListAdapters();
        registerListFieldFilterTypes();
        registerListFieldTransformers();
        registerListItemActions();
        registerFieldTypes(config.fieldTypeOptions);
        registerTextEditors();
        registerInternalLinkTypes(config.internalLinkTypes);
        registerFormToolbarActions();
        registerListToolbarActions();
        registerViews();
        Form_1.conditionDataProviderRegistry.add(Form_1.bundlesConditionDataProvider);
        Form_1.conditionDataProviderRegistry.add(Form_1.localeConditionDataProvider);
        Form_1.conditionDataProviderRegistry.add(Form_1.parentConditionDataProvider);
        Form_1.conditionDataProviderRegistry.add(Form_1.userConditionDataProvider);
    }
    processConfig(config);
    userStore_1.default.setUser(config.user);
    userStore_1.default.setContact(config.contact);
    userStore_1.default.setLoggedIn(true);
});
function registerViews() {
    ViewRenderer_1.viewRegistry.add('sulu_admin.form', Form_2.default);
    ViewRenderer_1.viewRegistry.add('sulu_admin.preview_form', PreviewForm_1.default);
    ViewRenderer_1.viewRegistry.add('sulu_admin.list', List_1.default);
    ViewRenderer_1.viewRegistry.add('sulu_admin.form_overlay_list', FormOverlayList_1.default);
    ViewRenderer_1.viewRegistry.add('sulu_admin.resource_tabs', ResourceTabs_1.default, { disableDefaultSpacing: true });
    ViewRenderer_1.viewRegistry.add('sulu_admin.tabs', Tabs_1.default, { disableDefaultSpacing: true });
}
function registerListAdapters() {
    List_2.listAdapterRegistry.add('column_list', List_2.ColumnListAdapter);
    List_2.listAdapterRegistry.add('folder', List_2.FolderAdapter);
    List_2.listAdapterRegistry.add('table', List_2.TableAdapter);
    // @deprecated use adapterOptions to set the correct skin
    List_2.listAdapterRegistry.add('table_light', List_2.TableAdapter, { skin: 'light' });
    List_2.listAdapterRegistry.add('tree_table', List_2.TreeTableAdapter);
    // @deprecated use adapterOptions to set the correct skin
    List_2.listAdapterRegistry.add('tree_table_slim', List_2.TreeTableAdapter, { showHeader: false });
}
function registerListFieldFilterTypes() {
    List_2.listFieldFilterTypeRegistry.add('boolean', List_2.BooleanFieldFilterType);
    List_2.listFieldFilterTypeRegistry.add('date', List_2.DateFieldFilterType, { timeFormat: false });
    List_2.listFieldFilterTypeRegistry.add('datetime', List_2.DateFieldFilterType, { timeFormat: true });
    List_2.listFieldFilterTypeRegistry.add('select', List_2.SelectFieldFilterType);
    List_2.listFieldFilterTypeRegistry.add('number', List_2.NumberFieldFilterType);
    List_2.listFieldFilterTypeRegistry.add('selection', List_2.SelectionFieldFilterType);
    List_2.listFieldFilterTypeRegistry.add('text', List_2.TextFieldFilterType);
}
function registerListFieldTransformers() {
    List_2.listFieldTransformerRegistry.add('array', new List_2.ArrayFieldTransformer());
    List_2.listFieldTransformerRegistry.add('bytes', new List_2.BytesFieldTransformer());
    List_2.listFieldTransformerRegistry.add('date', new List_2.DateFieldTransformer());
    List_2.listFieldTransformerRegistry.add('time', new List_2.TimeFieldTransformer());
    List_2.listFieldTransformerRegistry.add('datetime', new List_2.DateTimeFieldTransformer());
    List_2.listFieldTransformerRegistry.add('number', new List_2.NumberFieldTransformer());
    List_2.listFieldTransformerRegistry.add('string', new List_2.StringFieldTransformer());
    List_2.listFieldTransformerRegistry.add('thumbnails', new List_2.ThumbnailFieldTransformer());
    List_2.listFieldTransformerRegistry.add('bool', new List_2.BoolFieldTransformer());
    List_2.listFieldTransformerRegistry.add('color', new List_2.ColorFieldTransformer());
    List_2.listFieldTransformerRegistry.add('icon', new List_2.IconFieldTransformer());
    List_2.listFieldTransformerRegistry.add('html', new List_2.HtmlFieldTransformer());
    List_2.listFieldTransformerRegistry.add('translation', new List_2.TranslationFieldTransformer());
    // TODO: Remove this type when not needed anymore
    List_2.listFieldTransformerRegistry.add('title', new List_2.StringFieldTransformer());
}
function registerListItemActions() {
    List_1.listItemActionRegistry.add('link', List_1.LinkItemAction);
    List_1.listItemActionRegistry.add('detail_link', List_1.DetailLinkItemAction);
}
function registerFieldTypes(fieldTypeOptions) {
    Form_1.fieldRegistry.add(FIELD_TYPE_BLOCK, FieldBlocks_1.default);
    Form_1.fieldRegistry.add(FIELD_TYPE_CHANGELOG_LINE, Form_1.ChangelogLine);
    Form_1.fieldRegistry.add(FIELD_TYPE_CHECKBOX, Form_1.Checkbox);
    Form_1.fieldRegistry.add(FIELD_TYPE_COLOR, Form_1.ColorPicker);
    Form_1.fieldRegistry.add(FIELD_TYPE_DATE, Form_1.DatePicker, { dateFormat: true, timeFormat: false });
    Form_1.fieldRegistry.add(FIELD_TYPE_DATE_TIME, Form_1.DatePicker, { dateFormat: true, timeFormat: true });
    Form_1.fieldRegistry.add(FIELD_TYPE_EMAIL, Form_1.Email);
    Form_1.fieldRegistry.add(FIELD_TYPE_HEADING, Form_1.Heading);
    Form_1.fieldRegistry.add(FIELD_TYPE_SELECT, Form_1.Select);
    Form_1.fieldRegistry.add(FIELD_TYPE_NUMBER, Form_1.Number);
    Form_1.fieldRegistry.add(FIELD_TYPE_PASSWORD_CONFIRMATION, Form_1.PasswordConfirmation);
    Form_1.fieldRegistry.add(FIELD_TYPE_PHONE, Form_1.Phone);
    Form_1.fieldRegistry.add(FIELD_TYPE_QRCODE, Form_1.QRCode);
    Form_1.fieldRegistry.add(FIELD_TYPE_SMART_CONTENT, Form_1.SmartContent);
    Form_1.fieldRegistry.add(FIELD_TYPE_SINGLE_SELECT, Form_1.SingleSelect);
    Form_1.fieldRegistry.add(FIELD_TYPE_TEXT_AREA, Form_1.TextArea);
    Form_1.fieldRegistry.add(FIELD_TYPE_TEXT_EDITOR, Form_1.TextEditor);
    Form_1.fieldRegistry.add(FIELD_TYPE_TEXT_LINE, Form_1.Input);
    Form_1.fieldRegistry.add(FIELD_TYPE_TIME, Form_1.DatePicker, { dateFormat: false, timeFormat: true });
    Form_1.fieldRegistry.add(FIELD_TYPE_URL, Form_1.Url);
    Form_1.fieldRegistry.add(FIELD_TYPE_LINK, Form_1.Link);
    registerFieldTypesWithOptions(fieldTypeOptions['selection'], Form_1.Selection);
    registerFieldTypesWithOptions(fieldTypeOptions['single_selection'], Form_1.SingleSelection);
}
function registerFieldTypesWithOptions(fieldTypeOptions, Component) {
    if (fieldTypeOptions) {
        for (const fieldTypeKey in fieldTypeOptions) {
            Form_1.fieldRegistry.add(fieldTypeKey, Component, fieldTypeOptions[fieldTypeKey]);
        }
    }
}
function registerBlockPreviewTransformers() {
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_COLOR, new FieldBlocks_1.StringBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_DATE, new FieldBlocks_1.DateTimeBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_DATE_TIME, new FieldBlocks_1.DateTimeBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_EMAIL, new FieldBlocks_1.StringBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_NUMBER, new FieldBlocks_1.StringBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_PHONE, new FieldBlocks_1.StringBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_SELECT, new FieldBlocks_1.SelectBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_SINGLE_SELECT, new FieldBlocks_1.SingleSelectBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_SMART_CONTENT, new FieldBlocks_1.SmartContentBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_TEXT_AREA, new FieldBlocks_1.StringBlockPreviewTransformer(), 512);
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_TEXT_EDITOR, new FieldBlocks_1.StripHtmlBlockPreviewTransformer(), 512);
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_TEXT_LINE, new FieldBlocks_1.StringBlockPreviewTransformer(), 1024);
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_TIME, new FieldBlocks_1.TimeBlockPreviewTransformer());
    FieldBlocks_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_URL, new FieldBlocks_1.StringBlockPreviewTransformer());
}
function registerTextEditors() {
    TextEditor_1.textEditorRegistry.add('ckeditor5', CKEditor5_1.default);
}
function registerInternalLinkTypes(internalLinkTypes) {
    for (const internalLinkTypeKey in internalLinkTypes) {
        const internalLinkType = internalLinkTypes[internalLinkTypeKey];
        linkTypeRegistry_1.default.add(internalLinkTypeKey, Link_1.LinkTypeOverlay, internalLinkType.title, {
            displayProperties: internalLinkType.displayProperties,
            emptyText: internalLinkType.emptyText,
            icon: internalLinkType.icon,
            listAdapter: internalLinkType.listAdapter,
            overlayTitle: internalLinkType.overlayTitle,
            resourceKey: internalLinkType.resourceKey,
        });
    }
    // Add external LinkType
    linkTypeRegistry_1.default.add('external', Link_1.ExternalLinkTypeOverlay, (0, utils_1.translate)('sulu_admin.external_link'), undefined);
}
function registerFormToolbarActions() {
    Form_2.formToolbarActionRegistry.add('sulu_admin.copy', Form_2.CopyToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.copy_locale', Form_2.CopyLocaleToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.delete', Form_2.DeleteToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.delete_draft', Form_2.DeleteDraftToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.dropdown', Form_2.DropdownToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.save_with_publishing', Form_2.SaveWithPublishingToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.save', Form_2.SaveToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.publish', Form_2.PublishToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.save_with_form_dialog', Form_2.SaveWithFormDialogToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.set_unpublished', Form_2.SetUnpublishedToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.type', Form_2.TypeToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.toggler', Form_2.TogglerToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.update_form_store', Form_2.UpdateFormStoreToolbarAction);
    Form_2.formToolbarActionRegistry.add('sulu_admin.reload_form_store', Form_2.ReloadFormStoreToolbarAction);
}
function registerListToolbarActions() {
    List_1.listToolbarActionRegistry.add('sulu_admin.add', List_1.AddToolbarAction);
    List_1.listToolbarActionRegistry.add('sulu_admin.delete', List_1.DeleteToolbarAction);
    List_1.listToolbarActionRegistry.add('sulu_admin.move', List_1.MoveToolbarAction);
    List_1.listToolbarActionRegistry.add('sulu_admin.export', List_1.ExportToolbarAction);
    List_1.listToolbarActionRegistry.add('sulu_admin.upload', List_1.UploadToolbarAction);
}
function processConfig(config) {
    Router_1.routeRegistry.clear();
    Router_1.resourceViewRegistry.clear();
    Navigation_1.navigationRegistry.clear();
    services_1.resourceRouteRegistry.clear();
    Router_1.routeRegistry.addCollection(config.routes);
    Router_1.resourceViewRegistry.addResourceViews(config.resources);
    localizationStore_1.default.setLocalizations(config.localizations);
    Navigation_1.navigationRegistry.set(config.navigation);
    services_1.resourceRouteRegistry.setEndpoints(config.resources);
    SmartContent_1.smartContentConfigStore.setConfig(config.smartContent);
    CollaborationStore_1.default.enabled = config.collaborationEnabled;
    CollaborationStore_1.default.interval = config.collaborationInterval;
}
function startAdmin() {
    // eslint-disable-next-line no-console
    console.log('%cWelcome to Sulu CMS 👋' + '\n' +
        '%c\n' +
        'The Symfony based content management platform.' + '\n' +
        '\n' +
        '📖 Developer documentation: %chttps://docs.sulu.io/%c,' +
        ' %chttps://jsdocs.sulu.io/%c and %chttps://symfony.com/doc%c' + '\n' +
        '🤝 Contribute to Sulu: %chttps://github.com/sulu/sulu%c' + '\n' +
        '🔎 Create a new issue: %chttps://github.com/sulu/sulu/issues%c' + '\n' +
        '🪜 Implementation examples: %chttps://github.com/sulu/sulu-demo%c' +
        ' and %chttps://github.com/sulu/sulu-workshop%c' + '\n' +
        '\n' +
        'If you like Sulu – give it a ⭐ on Github: %chttps://github.com/sulu/sulu%c', 'font-family: monospace; font-size: 24px; font-weight: bold;', 'font-family: monospace; font-size: 10px;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;', 'font-family: monospace; font-size: 10px; text-decoration: underline;', 'font-family: monospace; font-size: 10px; text-decoration: none;');
    const id = 'application';
    const applicationElement = document.getElementById(id);
    if (!applicationElement) {
        throw new Error(`DOM element with ID "${id}" was not found!`);
    }
    if (!('config' in applicationElement.dataset)) {
        throw new Error(`Attribute "data-config" not found on element with ID "${id}"!`);
    }
    Object.assign(services_1.Config, JSON.parse(applicationElement.dataset.config));
    Object.freeze(services_1.Config);
    if (services_1.Config.suluVersion !== SULU_ADMIN_BUILD_VERSION) {
        loglevel_1.default.error('Sulu administration interface: JavaScript build version mismatch' +
            '\nJavaScript build of the Sulu administration interface does not match the version of the Sulu backend.' +
            '\nBackend version: ' + services_1.Config.suluVersion + ', JavaScript build version: ' + SULU_ADMIN_BUILD_VERSION +
            '\n\nHave you forgotten to update the build while upgrading your application?' + '' +
            '\nhttps://docs.sulu.io/en/latest/upgrades/upgrade-2.x.html');
    }
    const router = new Router_1.default((0, history_1.createHashHistory)());
    router.addUpdateAttributesHook(ViewRenderer_1.updateRouterAttributesFromView);
    router.addUpdateAttributesHook(userStore_1.updateRouterAttributesFromUserStoreContentLocale);
    router.addUpdateRouteHook(userStore_1.updateUserStoreContentLocaleFromRouterAttributes, -1024);
    initializer_1.default.initialize(services_1.Config.initialLoginState).then(() => {
        router.reload();
    });
    (0, react_dom_1.render)(<Application_1.default appVersion={services_1.Config.appVersion} router={router} suluVersion={services_1.Config.suluVersion}/>, applicationElement);
}
initializer_1.default.addUpdateConfigHook('sulu_ai', (config, initialized) => {
    var _a, _b, _c, _d;
    if (initialized) {
        return;
    }
    if (undefined === config) {
        return;
    }
    const div = document.createElement('div');
    div.id = 'su-ai-application';
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.appendChild(div);
    if (!((_b = config['writing_assistant']) === null || _b === void 0 ? void 0 : _b.enabled) && !((_c = config['translation']) === null || _c === void 0 ? void 0 : _c.enabled) && !((_d = config['feedback']) === null || _d === void 0 ? void 0 : _d.enabled)) {
        return;
    }
    (0, react_dom_1.render)(<AiApplication_1.default feedback={config['feedback']} translation={config['translation']} writingAssistant={config['writing_assistant']}/>, div);
});
