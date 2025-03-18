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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Condition_1 = __importDefault(require("./Condition"));
class ConditionList extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleAddClick = () => {
            const { onChange, value } = this.props;
            onChange([...value, { condition: {}, type: undefined }]);
        };
        this.handleChange = (condition, index) => {
            const { onChange, value } = this.props;
            const newValue = [...value];
            newValue[index] = condition;
            onChange(newValue);
        };
        this.handleRemove = (removeIndex) => {
            const { onChange, value } = this.props;
            onChange(value.filter((condition, index) => index !== removeIndex));
        };
    }
    render() {
        const { value } = this.props;
        return (<react_1.Fragment>
                {value.map((condition, index) => (<Condition_1.default index={index} key={index} onChange={this.handleChange} onRemove={this.handleRemove} value={value[index]}/>))}
                <components_1.Button icon="su-plus" onClick={this.handleAddClick} skin="secondary">
                    {(0, utils_1.translate)('sulu_audience_targeting.add_condition')}
                </components_1.Button>
            </react_1.Fragment>);
    }
}
exports.default = ConditionList;
