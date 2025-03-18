"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const containers_1 = require("sulu-admin-bundle/containers");
const views_1 = require("sulu-admin-bundle/views");
const webspaceConditionDataProvider_1 = __importDefault(require("./containers/Form/conditionDataProviders/webspaceConditionDataProvider"));
const SearchResult_1 = __importDefault(require("./containers/Form/fields/SearchResult"));
const SegmentSelect_1 = __importDefault(require("./containers/Form/fields/SegmentSelect"));
const TeaserSelection_1 = __importDefault(require("./containers/Form/fields/TeaserSelection"));
const TeaserSelection_2 = require("./containers/TeaserSelection");
const PageSettingsNavigationSelect_1 = __importDefault(require("./containers/Form/fields/PageSettingsNavigationSelect"));
const PageSettingsShadowLocaleSelect_1 = __importDefault(require("./containers/Form/fields/PageSettingsShadowLocaleSelect"));
const SettingsVersions_1 = __importDefault(require("./containers/Form/fields/SettingsVersions"));
const webspaceStore_1 = __importDefault(require("./stores/webspaceStore"));
const Webspace_1 = require("./utils/Webspace");
const PageTabs_1 = __importDefault(require("./views/PageTabs"));
const PageList_1 = __importDefault(require("./views/PageList"));
const WebspaceTabs_1 = __importDefault(require("./views/WebspaceTabs"));
const RestoreVersionItemAction_1 = __importDefault(require("./views/List/itemActions/RestoreVersionItemAction"));
services_1.initializer.addUpdateConfigHook('sulu_page', (config, initialized) => {
    webspaceStore_1.default.setWebspaces(Object.values(config.webspaces));
    if (initialized) {
        return;
    }
    containers_1.viewRegistry.add('sulu_page.page_tabs', PageTabs_1.default, { disableDefaultSpacing: true });
    containers_1.viewRegistry.add('sulu_page.page_list', PageList_1.default);
    containers_1.viewRegistry.add('sulu_page.webspace_tabs', WebspaceTabs_1.default, { disableDefaultSpacing: true });
    containers_1.fieldRegistry.add('page_settings_navigation_select', PageSettingsNavigationSelect_1.default);
    containers_1.fieldRegistry.add('page_settings_shadow_locale_select', PageSettingsShadowLocaleSelect_1.default);
    containers_1.fieldRegistry.add('search_result', SearchResult_1.default);
    containers_1.fieldRegistry.add('segment_select', SegmentSelect_1.default);
    containers_1.fieldRegistry.add('teaser_selection', TeaserSelection_1.default);
    containers_1.conditionDataProviderRegistry.add(webspaceConditionDataProvider_1.default);
    containers_1.fieldRegistry.add('resource_locator', containers_1.ResourceLocator, {
        modeResolver: (props) => (0, Webspace_1.loadResourceLocatorInputTypeByWebspace)(props.formInspector.options.webspace),
        generationUrl: services_1.Config.endpoints.generateUrl,
        historyResourceKey: 'page_resourcelocators',
        resourceStorePropertiesToRequest: {
            parentUuid: 'parentId',
        },
    });
    views_1.listItemActionRegistry.add('restore_version', RestoreVersionItemAction_1.default);
    if (config.versioning) {
        containers_1.fieldRegistry.add('settings_versions', SettingsVersions_1.default);
    }
    for (const teaserProviderKey in config.teaser) {
        TeaserSelection_2.teaserProviderRegistry.add(teaserProviderKey, config.teaser[teaserProviderKey]);
    }
});
