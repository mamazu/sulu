"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const Translator_1 = require("../../utils/Translator");
const Hint_1 = __importDefault(require("../Hint"));
class PermissionHint extends react_1.default.Component {
    constructor(props) {
        super(props);
        loglevel_1.default.warn('The "PermissionHint" component is deprecated since 3.0 and will ' +
            'be removed. Use the "Hint" component instead.');
    }
    render() {
        return (<Hint_1.default icon="su-lock" title={(0, Translator_1.translate)('sulu_admin.no_permissions')}/>);
    }
}
exports.default = PermissionHint;
