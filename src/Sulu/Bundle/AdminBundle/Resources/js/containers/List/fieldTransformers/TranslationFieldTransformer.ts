import {translate} from '../../../utils';
import type {ReactNode} from 'react';
import type {FieldTransformer} from '../types';

export default class TranslationFieldTransformer implements FieldTransformer {
    transform(
        value: any,
        parameters: {
            [key: string]: any
        },
    ): Node {
        if (value === undefined) {
            return null;
        }

        const {prefix = ''} = parameters;

        return translate(prefix + value);
    }
}
