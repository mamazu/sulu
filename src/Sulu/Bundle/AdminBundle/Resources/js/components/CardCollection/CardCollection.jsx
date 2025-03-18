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
const Translator_1 = require("../../utils/Translator");
const Button_1 = __importDefault(require("../Button"));
const Card_1 = __importDefault(require("../Card"));
const cardCollection_scss_1 = __importDefault(require("./cardCollection.scss"));
class CardCollection extends react_1.default.Component {
    render() {
        const { children, onAdd, onEdit, onRemove } = this.props;
        return (<react_1.Fragment>
                <section className={cardCollection_scss_1.default.cards}>
                    {children && react_1.default.Children.map(children, (child, index) => (<div className={cardCollection_scss_1.default.card} key={index}>
                            {react_1.default.cloneElement(child, { id: index, onEdit, onRemove })}
                        </div>))}
                </section>
                <div className={cardCollection_scss_1.default.addButtonContainer}>
                    <Button_1.default icon="su-plus" onClick={onAdd} skin="secondary">
                        {(0, Translator_1.translate)('sulu_admin.add')}
                    </Button_1.default>
                </div>
            </react_1.Fragment>);
    }
}
CardCollection.Card = Card_1.default;
exports.default = CardCollection;
