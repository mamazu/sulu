import React from 'react';
import {isArrayLike} from 'mobx';
import type {ReactNode} from 'react';
import type {BlockPreviewTransformer} from '../types';
import type {SchemaEntry} from '../../Form/types';

export default class SingleSelectBlockPreviewTransformer implements BlockPreviewTransformer {
    transform(value: any, schema: SchemaEntry): Node {
        if (!schema.options || !schema.options.values) {
            throw new Error('The "SingleSelect" field type must have a "values" schema option!');
        }

        const values = schema.options.values.value;
        if (!isArrayLike(values)) {
            throw new Error('The "SingleSelect" field type must have a "values" option defined being an array!');
        }

        const selectedValue = values.find((option) => option.name === value);

        if (!selectedValue) {
            return null;
        }

        return <p>{selectedValue.title}</p>;
    }
}
