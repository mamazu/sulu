import React from 'react';
import stringFieldTransformerStyles from './stringFieldTransformer.scss';
import type {ReactNode} from 'react';
import type {FieldTransformer} from '../types';

export default class StringFieldTransformer implements FieldTransformer {
    transform(value: any): Node {
        if (!value) {
            return null;
        }

        return <span className={stringFieldTransformerStyles.textBox} title={value}>{value}</span>;
    }
}
