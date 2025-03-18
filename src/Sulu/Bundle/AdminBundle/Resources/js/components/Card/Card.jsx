"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const card_scss_1 = __importDefault(require("./card.scss"));
class Card extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleEditClick = () => {
            const { id, onEdit } = this.props;
            if (onEdit) {
                onEdit(id);
            }
        };
        this.handleRemoveClick = () => {
            const { id, onRemove } = this.props;
            if (onRemove) {
                onRemove(id);
            }
        };
    }
    render() {
        const { children, onEdit, onRemove } = this.props;
        return (<section className={card_scss_1.default.card}>
                <div className={card_scss_1.default.icons}>
                    {onEdit && <Icon_1.default name="su-pen" onClick={this.handleEditClick}/>}
                    {onRemove && <Icon_1.default name="su-trash-alt" onClick={this.handleRemoveClick}/>}
                </div>
                {children}
            </section>);
    }
}
exports.default = Card;
