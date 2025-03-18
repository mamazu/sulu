import React from 'react';
import {isArrayLike} from 'mobx';
import type {ReactNode} from 'react';
import type {BlockPreviewTransformer} from '../types';
import type {SchemaEntry} from '../../Form/types';

export default class SelectBlockPreviewTransformer implements BlockPreviewTransformer {
    transform(value: any, schema: SchemaEntry): Node {
        if (!isArrayLike(value)) {
            return null;
        }

        if (!schema.options || !schema.options.values) {
            throw new Error('The "Select" field type must have a "values" schema option!');
        }

        const values = schema.options.values.value;
        if (!isArrayLike(values)) {
            throw new Error('The "SingleSelect" field type must have a "values" option defined being an array!');
        }

        const selectedValues = values.filter((option) => value.includes(option.name));

        if (!selectedValues) {
            return null;
        }

        return <p>{selectedValues.map((selectedValue) => selectedValue.title).join(', ')}</p>;
    }
}
