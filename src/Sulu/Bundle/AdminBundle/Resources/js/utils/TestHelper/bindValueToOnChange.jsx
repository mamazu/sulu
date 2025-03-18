"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const WrapperComponent = (props) => {
    const component = react_1.default.Children.only(props.children);
    const [boundValue, setBoundValue] = react_1.default.useState(component.props.value);
    const wrappedOnChange = (newValue, ...remainingParameters) => {
        setBoundValue(newValue);
        component.props.onChange(newValue, ...remainingParameters);
    };
    return react_1.default.cloneElement(component, { value: boundValue, onChange: wrappedOnChange });
};
const bindValueToOnChange = (element) => {
    return <WrapperComponent>{element}</WrapperComponent>;
};
// our form components are implemented as controlled components. to test them with @testing-library/react, we
// need to update the "value" that is passed to the controlled component when its "onChange" callback is fired.
// if we dont do this, the component will read the old "value" when multiple events are triggered. for example,
// "userEvent.type()" will trigger an event for each keystroke.
// https://github.com/testing-library/user-event/issues/549
exports.default = bindValueToOnChange;
