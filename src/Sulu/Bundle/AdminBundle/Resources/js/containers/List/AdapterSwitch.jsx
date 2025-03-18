"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ButtonGroup_1 = __importDefault(require("../../components/ButtonGroup"));
const Button_1 = __importDefault(require("../../components/Button"));
const listAdapterRegistry_1 = __importDefault(require("./registries/listAdapterRegistry"));
class AdapterSwitch extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleAdapterChange = (adapter) => {
            if (!adapter || this.props.currentAdapter === adapter) {
                return;
            }
            this.props.onAdapterChange(adapter);
        };
    }
    render() {
        const { currentAdapter, adapters, } = this.props;
        if (adapters.length < 2) {
            return null;
        }
        return (<ButtonGroup_1.default>
                {adapters.map((adapter, index) => {
                const Adapter = listAdapterRegistry_1.default.get(adapter);
                return (<Button_1.default active={adapter === currentAdapter} icon={Adapter.icon} key={index} onClick={this.handleAdapterChange} value={adapter}/>);
            })}
            </ButtonGroup_1.default>);
    }
}
exports.default = AdapterSwitch;
