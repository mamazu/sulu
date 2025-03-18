import React from 'react';
import {Input} from 'sulu-admin-bundle/components';

type Props = {
    index: number,
    onBlur?: () => void,
    onChange: (value: string | null | undefined, index: number) => void,
    value: string | null | undefined
};

export default class EditableCustomUrlPart extends React.Component<Props> {
    handleChange = (value?: string | null) => {
        const {index, onChange} = this.props;

        onChange(value, index);
    };

    render() {
        const {onBlur, value} = this.props;

        return <Input onBlur={onBlur} onChange={this.handleChange} value={value} />;
    }
}
