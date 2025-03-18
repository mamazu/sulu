"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Divider_1 = __importDefault(require("../Divider"));
const Grid_1 = __importDefault(require("../Grid"));
const grid_scss_1 = __importDefault(require("./grid.scss"));
class Section extends react_1.default.Component {
    render() {
        const { children, label, colSpan } = this.props;
        const fields = react_1.default.Children.toArray(children);
        if (label || colSpan === 12) {
            fields.unshift(<Grid_1.default.Item className={grid_scss_1.default.dividerContainer} colSpan={12} key={fields.length}>
                    <Divider_1.default>
                        {label}
                    </Divider_1.default>
                </Grid_1.default.Item>);
        }
        return (<Grid_1.default.Section className={grid_scss_1.default.gridSection} colSpan={colSpan}>
                {fields}
            </Grid_1.default.Section>);
    }
}
Section.defaultProps = {
    colSpan: 12,
};
exports.default = Section;
