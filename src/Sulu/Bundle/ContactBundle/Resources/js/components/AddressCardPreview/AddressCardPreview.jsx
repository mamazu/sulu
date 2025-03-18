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
const utils_1 = require("sulu-admin-bundle/utils");
const addressCardPreview_scss_1 = __importDefault(require("./addressCardPreview.scss"));
class AddressCardPreview extends react_1.default.Component {
    render() {
        const { billingAddress, country, city, deliveryAddress, number, primaryAddress, state, street, title, type, zip, } = this.props;
        const flags = [
            type,
            primaryAddress ? (0, utils_1.translate)('sulu_contact.primary_address') : null,
            billingAddress ? (0, utils_1.translate)('sulu_contact.billing_address') : null,
            deliveryAddress ? (0, utils_1.translate)('sulu_contact.delivery_address') : null,
        ].filter((element) => element !== null);
        return (<section className={addressCardPreview_scss_1.default.addressCardPreview}>
                <div className={addressCardPreview_scss_1.default.title}>
                    <strong>{title || '\u00a0'}</strong>
                </div>

                <div className={addressCardPreview_scss_1.default.flags}>
                    {flags.join('・')}
                </div>

                {(street || number) && <react_1.Fragment>{street} {number}<br /></react_1.Fragment>}
                {(city || zip) && <react_1.Fragment>{zip} {city}<br /></react_1.Fragment>}
                {state && <react_1.Fragment>{state}<br /></react_1.Fragment>}
                {country}
            </section>);
    }
}
exports.default = AddressCardPreview;
