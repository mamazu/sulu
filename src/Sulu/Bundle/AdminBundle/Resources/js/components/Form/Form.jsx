"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("../Grid"));
const Field_1 = __importDefault(require("./Field"));
const Section_1 = __importDefault(require("./Section"));
const grid_scss_1 = __importDefault(require("./grid.scss"));
class Form extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.cloneChildren = () => {
            const { children, skin } = this.props;
            return react_1.default.Children.map(children, (child) => {
                if (!child) {
                    return null;
                }
                return react_1.default.cloneElement(child, {
                    skin,
                });
            });
        };
    }
    render() {
        return (<Grid_1.default className={grid_scss_1.default.grid}>
                {this.cloneChildren()}
            </Grid_1.default>);
    }
}
Form.Field = Field_1.default;
Form.Section = Section_1.default;
exports.default = Form;
