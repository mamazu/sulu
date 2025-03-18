import classNames from 'classnames';
import React from 'react';
import Icon from '../Icon';
import optionStyles from './option.scss';
import type {Skin} from './types';

const ICON_CHECKMARK = 'su-check';

type Props = {
    disabled?: boolean,
    label: string | number,
    onClick: (value: any) => void,
    selected?: boolean,
    size?: string,
    skin?: Skin,
    value: any
};

export default class Option extends React.PureComponent<Props> {
    handleOnClick = () => {
        const {onClick} = this.props;

        onClick(this.props.value);
    };

    render() {
        const {
            skin,
            size,
            label,
            selected,
            disabled,
        } = this.props;
        const optionClass = classNames(
            optionStyles.option,
            optionStyles[skin],
            {
                [optionStyles[size]]: size,
                [optionStyles.isSelected]: selected,
            }
        );

        return (
            <li className={optionClass}>
                <button
                    disabled={disabled}
                    onClick={this.handleOnClick}
                    type="button"
                >
                    {selected &&
                        <Icon className={optionStyles.selectedIcon} name={ICON_CHECKMARK} />
                    }
                    {label}
                </button>
            </li>
        );
    }
}
