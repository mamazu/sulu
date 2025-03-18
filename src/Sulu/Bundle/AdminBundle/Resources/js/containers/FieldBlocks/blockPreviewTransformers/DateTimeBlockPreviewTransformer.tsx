import React from 'react';
import moment from 'moment';
import log from 'loglevel';
import type {ReactNode} from 'react';
import type {BlockPreviewTransformer} from '../types';

const format = 'YYYY-MM-DD';

export default class DateTimeBlockPreviewTransformer implements BlockPreviewTransformer {
    transform(value: any): Node {
        if (typeof value !== 'string') {
            return null;
        }

        const momentObject = moment(value, format);

        if (!momentObject.isValid()) {
            log.error('Invalid date given: "' + value + '". Format needs to be "' + format + '"');

            return null;
        }

        return <p>{momentObject.format('L')}</p>;
    }
}
