"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = withSidebar;
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const Router_1 = require("../../services/Router");
const react_1 = require("../../utils/react");
const sidebarStore_1 = __importDefault(require("./stores/sidebarStore"));
const UPDATE_ROUTE_HOOK_PRIORITY = 1024;
function withSidebar(Component, sidebar) {
    const WithSidebarComponent = class extends Component {
        componentDidMount() {
            if (super.componentDidMount) {
                super.componentDidMount();
            }
            const { router } = this.props;
            const sidebarDisposer = (0, mobx_1.autorun)(() => {
                const sidebarConfig = sidebar.call(this);
                if (!sidebarConfig) {
                    sidebarStore_1.default.clearConfig();
                    return;
                }
                sidebarStore_1.default.setConfig(sidebarConfig);
                loglevel_1.default.info((WithSidebarComponent.displayName || '') + ' configured sidebar', sidebarConfig);
            });
            this.updateRouteHookDisposer = router.addUpdateRouteHook((newRoute, newAttributes) => {
                const { attributes: oldAttributes, route: oldRoute } = router;
                if ((0, Router_1.getViewKeyFromRoute)(newRoute, newAttributes) !== (0, Router_1.getViewKeyFromRoute)(oldRoute, oldAttributes)) {
                    sidebarDisposer();
                }
                return true;
            }, UPDATE_ROUTE_HOOK_PRIORITY);
        }
        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }
            this.updateRouteHookDisposer();
            sidebarStore_1.default.clearConfig();
        }
    };
    WithSidebarComponent.displayName = (0, react_1.buildHocDisplayName)('withSidebar', Component);
    return WithSidebarComponent;
}
