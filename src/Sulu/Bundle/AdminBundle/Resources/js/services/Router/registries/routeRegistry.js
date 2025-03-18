"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../Route"));
class RouteRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.routes = {};
    }
    addCollection(routeConfigs) {
        routeConfigs.forEach((routeConfig) => {
            if (routeConfig.name in this.routes) {
                throw new Error('The name "' + routeConfig.name + '" has already been used for another route');
            }
            const route = new Route_1.default(routeConfig);
            this.routes[route.name] = route;
        });
        routeConfigs.forEach((routeConfig) => {
            const routeParent = routeConfig.parent;
            if (!routeParent) {
                return;
            }
            this.routes[routeConfig.name].parent = this.routes[routeParent];
            this.routes[routeParent].children.push(this.routes[routeConfig.name]);
        });
    }
    get(name) {
        if (!(name in this.routes)) {
            throw new Error('The route with the name "' + name + '" does not exist.' +
                '\n\nRegistered names: ' + Object.keys(this.routes).sort().join(', '));
        }
        return this.routes[name];
    }
    getAll() {
        return this.routes;
    }
}
exports.default = new RouteRegistry();
