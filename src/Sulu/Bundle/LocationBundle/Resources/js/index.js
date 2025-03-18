"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const leaflet_1 = __importDefault(require("leaflet"));
const marker_icon_png_1 = __importDefault(require("leaflet/dist/images/marker-icon.png"));
const marker_icon_2x_png_1 = __importDefault(require("leaflet/dist/images/marker-icon-2x.png"));
const marker_shadow_png_1 = __importDefault(require("leaflet/dist/images/marker-shadow.png"));
const Form_1 = require("./containers/Form");
// fix marker image urls of leaflet to display markers on maps
// https://github.com/PaulLeCam/react-leaflet/issues/453
delete leaflet_1.default.Icon.Default.prototype._getIconUrl;
leaflet_1.default.Icon.Default.mergeOptions({
    iconUrl: marker_icon_png_1.default,
    iconRetinaUrl: marker_icon_2x_png_1.default,
    shadowUrl: marker_shadow_png_1.default,
});
containers_1.fieldRegistry.add('location', Form_1.Location);
