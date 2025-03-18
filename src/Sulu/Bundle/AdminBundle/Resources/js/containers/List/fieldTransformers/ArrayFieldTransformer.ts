import type {ReactNode} from 'react';
import type {FieldTransformer} from '../types';

export default class ArrayFieldTransformer implements FieldTransformer {
    transform(value: any): Node {
        if (!value) {
            return null;
        }

        return value.join(', ');
    }
}
