"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = withContainerSize;
const react_1 = __importDefault(require("react"));
function withContainerSize(Component) {
    class withContainerSizeComponent extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.setComponent = (c) => this.component = c;
        }
        componentDidMount() {
            if (this.component.containerDidMount) {
                this.component.containerDidMount();
            }
            if (this.props.mountSpy) {
                Promise.resolve().then(this.props.mountSpy);
            }
        }
        render() {
            const props = Object.assign(Object.assign({}, this.props), { containerWidth: 640, containerHeight: 360, ref: this.setComponent });
            return <Component {...props}/>;
        }
    }
    return withContainerSizeComponent;
}
