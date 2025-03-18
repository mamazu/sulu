import React from 'react';
import {Checkbox} from 'sulu-admin-bundle/components';
import type {ReactNode} from 'react';
import type {FieldTransformer} from 'sulu-admin-bundle/types';

export default class CategoryKeywordsMultipleUsageTransformer implements FieldTransformer {
    transform(value: any): Node {
        return <Checkbox checked={value > 1} disabled={true} />;
    }
}
