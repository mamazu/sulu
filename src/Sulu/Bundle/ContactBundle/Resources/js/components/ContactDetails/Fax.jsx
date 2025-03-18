"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Field_1 = __importDefault(require("./Field"));
class Fax extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleFaxChange = (fax) => {
            const { index, onFaxChange } = this.props;
            onFaxChange(index, fax);
        };
    }
    render() {
        const { fax, index, onBlur, onRemove, onTypeChange, type } = this.props;
        return (<Field_1.default index={index} label={(0, utils_1.translate)('sulu_contact.fax')} onRemove={onRemove} onTypeChange={onTypeChange} type={type} types={Fax.types}>
                <components_1.Phone onBlur={onBlur} onChange={this.handleFaxChange} value={fax}/>
            </Field_1.default>);
    }
}
exports.default = Fax;
