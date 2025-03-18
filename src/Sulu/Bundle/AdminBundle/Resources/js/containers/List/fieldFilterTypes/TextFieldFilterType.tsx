import React from 'react';
import Input from '../../../components/Input';
import AbstractFieldFilterType from './AbstractFieldFilterType';
import type {ElementRef} from 'react';

class TextFieldFilterType extends AbstractFieldFilterType<{
    eq: string
} | null | undefined> {
    handleChange = (value?: string | null) => {
        const {onChange} = this;
        onChange(value ? {eq: value} : undefined);
    };

    setInputRef(ref?: ElementRef<'input'> | null) {
        if (ref) {
            ref.focus();
        }
    }

    getFormNode() {
        const {value} = this;

        return (
            <Input
                inputRef={this.setInputRef}
                onChange={this.handleChange}
                value={value ? value.eq : undefined}
            />
        );
    }

    getValueNode(value?: {
        eq: string
    } | null) {
        return Promise.resolve(value ? value.eq : null);
    }
}

export default TextFieldFilterType;
