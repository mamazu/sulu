import React from 'react';
import Toggler from '../../../components/Toggler';
import {translate} from '../../../utils/Translator';
import AbstractFieldFilterType from './AbstractFieldFilterType';

class BooleanFieldFilterType extends AbstractFieldFilterType<boolean | null | undefined> {
    constructor(
        onChange: (value?: boolean | null | undefined) => void,
        parameters?: {
            [key: string]: unknown
        } | null,
        value?: boolean | null
    ) {
        super(onChange, parameters, value);

        if (value === undefined) {
            onChange(false);
        }
    }

    getFormNode() {
        const {onChange} = this;

        return (
            <Toggler
                checked={this.value || false}
                onChange={onChange}
            />
        );
    }

    getValueNode(value?: boolean | null) {
        if (value === undefined) {
            return Promise.resolve(null);
        }

        return Promise.resolve(translate(value ? 'sulu_admin.yes' : 'sulu_admin.no'));
    }
}

export default BooleanFieldFilterType;
