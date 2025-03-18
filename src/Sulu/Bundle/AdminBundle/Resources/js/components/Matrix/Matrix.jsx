"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Row_1 = __importDefault(require("./Row"));
const Item_1 = __importDefault(require("./Item"));
const matrix_scss_1 = __importDefault(require("./matrix.scss"));
class Matrix extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (rowName, rowValues) => {
            const { onChange, values, } = this.props;
            const newValues = Object.assign({}, values);
            newValues[rowName] = rowValues;
            onChange(newValues);
        };
        this.cloneRows = (originalRows) => {
            const { disabled, values } = this.props;
            return react_1.default.Children.map(originalRows, (row, index) => react_1.default.cloneElement(row, Object.assign(Object.assign({}, row.props), { disabled, key: `matrix-row-${index}`, onChange: this.handleChange, values: values.hasOwnProperty(row.props.name) ? values[row.props.name] : {} })));
        };
    }
    render() {
        const { children, className, disabled, } = this.props;
        const matrixClass = (0, classnames_1.default)(matrix_scss_1.default.matrix, className, {
            [matrix_scss_1.default.disabled]: disabled,
        });
        return (<table className={matrixClass}>
                <tbody>
                    {this.cloneRows(children)}
                </tbody>
            </table>);
    }
}
Matrix.defaultProps = {
    disabled: false,
    values: {},
};
Matrix.Row = Row_1.default;
Matrix.Item = Item_1.default;
exports.default = Matrix;
