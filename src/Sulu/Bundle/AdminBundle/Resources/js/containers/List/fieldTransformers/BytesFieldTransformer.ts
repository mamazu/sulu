import {transformBytesToReadableString} from '../../../utils';
import type {ReactNode} from 'react';
import type {FieldTransformer} from '../types';

export default class BytesFieldTransformer implements FieldTransformer {
    transform(value: any): Node {
        if (value === undefined) {
            return null;
        }

        return transformBytesToReadableString(value);
    }
}
