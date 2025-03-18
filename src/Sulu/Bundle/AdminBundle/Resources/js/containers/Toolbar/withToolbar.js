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
exports.default = withToolbar;
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const Router_1 = require("../../services/Router");
const react_1 = require("../../utils/react");
const toolbarStorePool_1 = __importStar(require("./stores/toolbarStorePool"));
const UPDATE_ROUTE_HOOK_PRIORITY = 1024;
function withToolbar(Component, toolbar, toolbarStoreKey = toolbarStorePool_1.DEFAULT_STORE_KEY) {
    const WithToolbarComponent = class extends Component {
        componentDidMount() {
            if (super.componentDidMount) {
                super.componentDidMount();
            }
            const { router } = this.props;
            const toolbarDisposer = (0, mobx_1.autorun)(() => {
                const toolbarConfig = toolbar.call(this);
                toolbarStorePool_1.default.setToolbarConfig(toolbarStoreKey, toolbarConfig);
                loglevel_1.default.info((WithToolbarComponent.displayName || '') + ' configured toolbar "' + toolbarStoreKey + '"', toolbarConfig);
            });
            this.updateRouteHookDisposer = router.addUpdateRouteHook((newRoute, newAttributes) => {
                const { attributes: oldAttributes, route: oldRoute } = router;
                if ((0, Router_1.getViewKeyFromRoute)(newRoute, newAttributes) !== (0, Router_1.getViewKeyFromRoute)(oldRoute, oldAttributes)) {
                    toolbarDisposer();
                }
                return true;
            }, UPDATE_ROUTE_HOOK_PRIORITY);
        }
        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }
            this.updateRouteHookDisposer();
            toolbarStorePool_1.default.setToolbarConfig(toolbarStoreKey, {});
        }
    };
    WithToolbarComponent.displayName = (0, react_1.buildHocDisplayName)('withToolbar', Component);
    return WithToolbarComponent;
}
