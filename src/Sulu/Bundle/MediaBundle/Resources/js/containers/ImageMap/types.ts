import type {ReactNode} from 'react';

export type Hotspot = {
    hotspot: {
        type: string
    },
    type: string
};

export type Value = {
    hotspots: Array<Hotspot>,
    imageId: number | null | undefined
};

export type RenderHotspotFormCallback = (value: any, type: string, index: number) => Node;
