import React from 'react';
import {computed} from 'mobx';
import Input from '../../../components/Input';
import SingleSelect from '../../../components/SingleSelect';
import AbstractFieldFilterType from './AbstractFieldFilterType';
import numberFieldFilterTypeStyles from './numberFieldFilterType.scss';
import type {ElementRef} from 'react';

const operatorMapping = {
    lt: '<',
    eq: '=',
    gt: '>',
} as const;

function getOperatorFromValue(value?: {
    [key: string]: number | null | undefined
} | null) {
    const valueKeys = value ? Object.keys(value) : [];

    if (valueKeys.length > 1) {
        throw new Error('The "NumberFilterFieldType" only accepts an array with exactly one key!');
    }

    return valueKeys[0];
}

function getNumberFromValue(value?: {
    [key: string]: number | null | undefined
} | null) {
    if (!value) {
        return undefined;
    }

    return value[getOperatorFromValue(value)];
}

class NumberFieldFilterType extends AbstractFieldFilterType<{
    [key: string]: number | null | undefined
} | null | undefined> {
    constructor(
        onChange: (
            value?: {
                [key: string]: number | null | undefined
            } | null | undefined,
        ) => void,
        parameters?: {
            [key: string]: unknown
        } | null,
        value?: {
            [key: string]: number | null | undefined
        } | null
    ) {
        super(onChange, parameters, value);

        if (value === undefined) {
            onChange({eq: undefined});
        }
    }

    @computed get operator() {
        return getOperatorFromValue(this.value);
    }

    @computed get number() {
        return getNumberFromValue(this.value);
    }

    setInputRef(ref?: ElementRef<'input'> | null) {
        if (ref) {
            ref.focus();
        }
    }

    handleOperatorChange = (operatorValue?: string | null) => {
        if (!operatorValue) {
            throw new Error('The operator cannot be changed to undefined! This should not happen and is likely a bug.');
        }

        const {onChange} = this;
        onChange({[operatorValue]: this.number});
    };

    handleInputChange = (inputValue?: string | null) => {
        const {onChange} = this;
        onChange({[this.operator]: inputValue});
    };

    getFormNode() {
        return (
            <div className={numberFieldFilterTypeStyles.numberFieldFilterType}>
                <SingleSelect onChange={this.handleOperatorChange} value={this.operator}>
                    <SingleSelect.Option value="lt">{operatorMapping.lt}</SingleSelect.Option>
                    <SingleSelect.Option value="eq">{operatorMapping.eq}</SingleSelect.Option>
                    <SingleSelect.Option value="gt">{operatorMapping.gt}</SingleSelect.Option>
                </SingleSelect>
                <Input
                    inputRef={this.setInputRef}
                    onChange={this.handleInputChange}
                    type="number"
                    value={this.number}
                />
            </div>
        );
    }

    getValueNode(value?: {
        [key: string]: number | null | undefined
    } | null) {
        return Promise.resolve(
            (operatorMapping[getOperatorFromValue(value)] || '') + ' ' + (getNumberFromValue(value) || '')
        );
    }
}

export default NumberFieldFilterType;
