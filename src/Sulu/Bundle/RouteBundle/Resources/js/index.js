"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceRequester_1 = require("sulu-admin-bundle/services/ResourceRequester");
const containers_1 = require("sulu-admin-bundle/containers");
const initializer_1 = __importDefault(require("sulu-admin-bundle/services/initializer"));
const PageTreeRoute_1 = __importDefault(require("./containers/Form/fields/PageTreeRoute"));
initializer_1.default.addUpdateConfigHook('sulu_admin', (config, initialized) => {
    if (initialized) {
        return;
    }
    const routeGenerationUrl = ResourceRequester_1.resourceRouteRegistry.getUrl('list', 'routes', { action: 'generate' });
    containers_1.fieldRegistry.add('route', containers_1.ResourceLocator, {
        historyResourceKey: 'routes',
        modeResolver: (props) => {
            const { schemaOptions: { mode: { value: mode = 'full', } = {}, }, } = props;
            return Promise.resolve(mode);
        },
        generationUrl: routeGenerationUrl,
        options: { history: true },
    });
    containers_1.fieldRegistry.add('page_tree_route', PageTreeRoute_1.default, {
        modeResolver: () => {
            return Promise.resolve('leaf');
        },
    });
});
