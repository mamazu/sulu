"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const services_1 = require("sulu-admin-bundle/services");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const containers_2 = require("sulu-page-bundle/containers");
const linkTypeRegistry_1 = __importDefault(require("sulu-admin-bundle/containers/Link/registries/linkTypeRegistry"));
const List_1 = require("./containers/List");
const Form_1 = require("./containers/Form");
const FieldBlocks_1 = require("./containers/FieldBlocks");
const MediaCollection_1 = __importDefault(require("./containers/MediaCollection"));
const MediaOverview_1 = __importDefault(require("./views/MediaOverview"));
const MediaHistory_1 = __importDefault(require("./views/MediaHistory"));
const MediaFormats_1 = __importDefault(require("./views/MediaFormats"));
const Link_1 = require("./containers/Link");
const FIELD_TYPE_MEDIA_SELECTION = 'media_selection';
const FIELD_TYPE_SINGLE_MEDIA_SELECTION = 'single_media_selection';
services_1.initializer.addUpdateConfigHook('sulu_media', (config, initialized) => {
    const { media_permissions: mediaPermissions } = config;
    MediaCollection_1.default.addable = mediaPermissions.add;
    MediaCollection_1.default.deletable = mediaPermissions.delete;
    MediaCollection_1.default.editable = mediaPermissions.edit;
    MediaCollection_1.default.securable = mediaPermissions.security;
    if (initialized) {
        return;
    }
    containers_1.viewRegistry.add('sulu_media.overview', MediaOverview_1.default);
    containers_1.viewRegistry.add('sulu_media.formats', MediaFormats_1.default);
    containers_1.viewRegistry.add('sulu_media.history', MediaHistory_1.default);
    containers_1.listAdapterRegistry.add('media_card_overview', List_1.MediaCardOverviewAdapter);
    containers_1.listAdapterRegistry.add('media_card_selection', List_1.MediaCardSelectionAdapter);
    containers_1.fieldRegistry.add(FIELD_TYPE_MEDIA_SELECTION, Form_1.MediaSelection);
    containers_1.fieldRegistry.add(FIELD_TYPE_SINGLE_MEDIA_SELECTION, Form_1.SingleMediaSelection);
    containers_1.fieldRegistry.add('single_media_upload', Form_1.SingleMediaUpload);
    containers_1.fieldRegistry.add('media_version_upload', Form_1.MediaVersionUpload);
    containers_1.fieldRegistry.add('image_map', Form_1.ImageMap);
    const imageFormatUrl = config.endpoints.image_format;
    containers_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_MEDIA_SELECTION, new FieldBlocks_1.MediaSelectionBlockPreviewTransformer(imageFormatUrl), 2048);
    containers_1.blockPreviewTransformerRegistry.add(FIELD_TYPE_SINGLE_MEDIA_SELECTION, new FieldBlocks_1.SingleMediaSelectionBlockPreviewTransformer(imageFormatUrl), 2048);
    containers_2.TeaserSelection.Item.mediaUrl = imageFormatUrl + '?locale=en&format=sulu-25x25';
    (0, mobx_1.when)(() => !!services_1.initializer.initializedTranslationsLocale, () => {
        linkTypeRegistry_1.default.add('media', Link_1.MediaLinkTypeOverlay, (0, utils_1.translate)('sulu_media.media'), {
            resourceKey: 'media',
            displayProperties: ['title'],
        });
    });
});
