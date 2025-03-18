"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../../../components/Icon"));
const iconFieldTransformer_scss_1 = __importDefault(require("./iconFieldTransformer.scss"));
class IconFieldTransformer {
    transform(value, parameters) {
        if (!value) {
            return value;
        }
        const { mapping, default: defaultIcon, skin = 'default', } = parameters;
        if (!mapping) {
            return value;
        }
        if (typeof mapping !== 'object') {
            loglevel_1.default.error('Transformer parameter "mapping" needs to be of type collection.');
            return null;
        }
        let iconConfig = mapping[value];
        if (!iconConfig) {
            if (!defaultIcon) {
                loglevel_1.default.warn(`There was no icon specified in the "mapping" transformer parameter for the value "${value}".`);
                return value;
            }
            if (typeof defaultIcon !== 'string' && typeof defaultIcon !== 'object') {
                loglevel_1.default.warn('Transformer parameter "default" needs to be of type string or collection, ' +
                    `${typeof defaultIcon} given.`);
                return value;
            }
            iconConfig = defaultIcon;
        }
        if (skin && typeof skin !== 'string') {
            loglevel_1.default.error(`Transformer parameter "skin" needs to be of type string, ${typeof skin} given.`);
            return null;
        }
        if (typeof iconConfig === 'object') {
            return this.transformObjectConfig(value, iconConfig, skin);
        }
        if (typeof iconConfig === 'string') {
            return this.transformStringConfig(iconConfig, skin);
        }
        loglevel_1.default.error(`Transformer parameter "mapping/${value}" needs to be either of type string or collection.`);
        return null;
    }
    transformObjectConfig(value, iconConfig, skin) {
        const { icon, color } = iconConfig;
        if (!icon || typeof icon !== 'string') {
            loglevel_1.default.error(`Transformer parameter "mapping/${value}/icon" needs to be of type string.`);
            return null;
        }
        if (color !== undefined && typeof color !== 'string') {
            loglevel_1.default.error(`Transformer parameter "mapping/${value}/color" needs to be of type string.`);
            return null;
        }
        const style = {};
        if (color) {
            style.color = color;
        }
        return (<Icon_1.default className={this.getClassName(skin)} name={icon} style={style}/>);
    }
    transformStringConfig(iconConfig, skin) {
        return (<Icon_1.default className={this.getClassName(skin)} name={iconConfig}/>);
    }
    getClassName(skin) {
        return (0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default[skin]);
    }
}
exports.default = IconFieldTransformer;
