import React from 'react';
import Input from '../Input';
import type {ElementRef} from 'react';
import type {InputProps} from '../Input';

type Props = {
    alignment: 'left' | 'center' | 'right',
    collapsed?: boolean,
    disabled: boolean,
    icon?: string,
    iconClassName?: string,
    iconStyle?: any,
    id?: string,
    inputContainerRef?: (ref?: ElementRef<'*'> | null | undefined) => void,
    inputRef?: (ref?: ElementRef<'input'> | null | undefined) => void,
    loading?: boolean,
    max?: number | null | undefined,
    min?: number | null | undefined,
    name?: string,
    onBlur?: () => void,
    onChange: (
        value: number | null | undefined,
        event: React.SyntheticEvent<HTMLInputElement>,
    ) => void,
    onIconClick?: () => void,
    placeholder?: string,
    skin?: 'default' | 'dark',
    step?: number | null | undefined,
    valid: boolean,
    value: number | null | undefined
};

export default class Number extends React.PureComponent<Props> {
    static defaultProps = {
        alignment: 'left',
        disabled: false,
        valid: true,
    };

    handleChange = (value: string | null | undefined, event: React.SyntheticEvent<HTMLInputElement>) => {
        let number = undefined;

        if (value) {
            number = parseFloat(value);

            if (isNaN(number)) {
                number = undefined;
            }
        }

        this.props.onChange(number, event);
    };

    render() {
        const inputProps: InputProps<number> = {
            alignment: this.props.alignment,
            collapsed: this.props.collapsed,
            name: this.props.name,
            icon: this.props.icon,
            id: this.props.id,
            loading: this.props.loading,
            placeholder: this.props.placeholder,
            inputContainerRef: this.props.inputContainerRef,
            inputRef: this.props.inputRef,
            valid: this.props.valid,
            disabled: this.props.disabled,
            value: this.props.value,
            onBlur: this.props.onBlur,
            onIconClick: this.props.onIconClick,
            iconStyle: this.props.iconStyle,
            iconClassName: this.props.iconClassName,
            onChange: this.handleChange,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            skin: this.props.skin,
            type: 'number',
        };

        return <Input {...inputProps} />;
    }
}
