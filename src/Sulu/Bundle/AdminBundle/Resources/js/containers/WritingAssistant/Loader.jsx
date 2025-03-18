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
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const loader_scss_1 = __importDefault(require("./loader.scss"));
const message_scss_1 = __importDefault(require("./message.scss"));
/**
 * @internal
 */
class Loader extends react_1.Component {
    render() {
        const { commandTitle, expert, } = this.props;
        const short = (0, classnames_1.default)(loader_scss_1.default.skeletonLoader, loader_scss_1.default.short);
        return (<react_1.default.Fragment>
                <div className={message_scss_1.default.command}>
                    {commandTitle}
                    <div className={message_scss_1.default.expert}>{expert}</div>
                </div>
                <div className={message_scss_1.default.message}>
                    <div className={loader_scss_1.default.skeletonLoader}></div>
                    <div className={loader_scss_1.default.skeletonLoader}></div>
                    <div className={loader_scss_1.default.skeletonLoader}></div>
                    <div className={short}></div>
                    <div className={loader_scss_1.default.skeletonLoader}></div>
                    <div className={short}></div>
                </div>
            </react_1.default.Fragment>);
    }
}
exports.default = Loader;
