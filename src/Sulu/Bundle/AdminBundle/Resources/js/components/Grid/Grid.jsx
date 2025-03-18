"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Item_1 = __importDefault(require("./Item"));
const Section_1 = __importDefault(require("./Section"));
const grid_scss_1 = __importDefault(require("./grid.scss"));
class Grid extends react_1.default.PureComponent {
    render() {
        const { children, className } = this.props;
        const gridClass = (0, classnames_1.default)([
            grid_scss_1.default.grid,
            className,
        ]);
        return (<div className={gridClass}>
                {children}
            </div>);
    }
}
Grid.Item = Item_1.default;
Grid.Section = Section_1.default;
exports.default = Grid;
