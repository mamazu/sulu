"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const containers_1 = require("sulu-admin-bundle/containers");
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore"));
class SingleSelection extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (id) => {
            const { onChange, options: { name, }, } = this.props;
            onChange({ [name]: id });
        };
    }
    render() {
        const { options: { adapter, displayProperties, emptyText, icon, name, overlayTitle, resourceKey, }, value, } = this.props;
        return (<containers_1.SingleSelection adapter={adapter} displayProperties={displayProperties} emptyText={emptyText} icon={icon} listKey={resourceKey} locale={mobx_1.observable.box(userStore_1.default.contentLocale)} onChange={this.handleChange} overlayTitle={overlayTitle} resourceKey={resourceKey} value={value[name]}/>);
    }
}
exports.default = SingleSelection;
