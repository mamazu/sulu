"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const bankCardPreview_scss_1 = __importDefault(require("./bankCardPreview.scss"));
class BankCardPreview extends react_1.default.Component {
    render() {
        const { bankName, bic, iban } = this.props;
        return (<section className={bankCardPreview_scss_1.default.bankCardPreview}>
                <div className={bankCardPreview_scss_1.default.bankName}>
                    <strong>{bankName || '\u00a0'}</strong>
                </div>

                {iban}<br />
                {bic}
            </section>);
    }
}
exports.default = BankCardPreview;
