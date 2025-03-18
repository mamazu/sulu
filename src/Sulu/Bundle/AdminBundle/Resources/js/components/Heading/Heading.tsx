import React, {Fragment} from 'react';
import Icon from '../Icon';
import headingStyles from './heading.scss';
import type {ReactNode} from 'react';

type Props = {
    children?: Node,
    description?: string | null | undefined,
    icon?: string | null | undefined,
    label?: string | null | undefined
};

export default class Heading extends React.Component<Props> {
    render() {
        const {children, description, icon, label} = this.props;
        return (
            <Fragment>
                <div className={headingStyles.line}>
                    {icon && <Icon className={headingStyles.icon} name={icon} />}
                    {label && <div className={headingStyles.label}>{label}</div>}
                    {children}
                </div>
                {description &&
                    <div className={headingStyles.description}>
                        {description}
                    </div>
                }
            </Fragment>
        );
    }
}
