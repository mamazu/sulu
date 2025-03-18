import React from 'react';
import dividerStyles from './divider.scss';

export default class Divider extends React.PureComponent<Record<any, any>> {
    render() {
        return <li className={dividerStyles.divider} />;
    }
}
