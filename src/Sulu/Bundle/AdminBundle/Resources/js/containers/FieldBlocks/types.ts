import type {ReactNode} from 'react';
import type {SchemaEntry} from '../Form/types';

export type BlockEntry = {
    settings?: {
        [key: string]: any
    },
    type: string
};

export type BlockPreviewTransformerMap = {
    [key: string]: BlockPreviewTransformer
};

export interface BlockPreviewTransformer {
    transform(value: any, schema: SchemaEntry): Node;
}
