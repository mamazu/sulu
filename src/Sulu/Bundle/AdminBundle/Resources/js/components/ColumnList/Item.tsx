import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import Input from '../Input';
import CroppedText from '../CroppedText';
import Icon from '../Icon';
import ItemButton from './ItemButton';
import itemStyles from './item.scss';
import type {ItemButtonConfig} from './types';
import type {Element, ReactNode} from 'react';

type Props = {
    active: boolean,
    buttons?: Array<ItemButtonConfig>,
    children: string,
    disabled: boolean,
    hasChildren: boolean,
    id: string | number,
    indicators?: Array<Node>,
    onClick?: (id: string | number) => void | null | undefined,
    onDoubleClick?: (id: string | number) => void | null | undefined,
    onOrderChange?: (id: string | number, order: number) => Promise<boolean> | null | undefined,
    order?: number,
    selected: boolean,
    showOrderField: boolean
};

@observer
class Item extends React.Component<Props> {
    static defaultProps = {
        active: false,
        disabled: false,
        hasChildren: false,
        selected: false,
        showOrderField: false,
    };

    @observable
    order: number | null | undefined;

    constructor(props: Props) {
        super(props);
        this.order = this.props.order;
    }

    @action componentDidUpdate(prevProps: Props) {
        const {order} = this.props;
        if (prevProps.order !== order) {
            this.order = order;
        }
    }

    handleClick = () => {
        const {onClick, id} = this.props;

        if (onClick) {
            onClick(id);
        }
    };

    handleDoubleClick = () => {
        const {onDoubleClick, id, showOrderField} = this.props;

        if (showOrderField) {
            return;
        }

        if (onDoubleClick) {
            onDoubleClick(id);
        }
    };

    @action handleOrderChange = (order?: string | null) => {
        if (!order) {
            this.order = undefined;
        }

        const numericOrder = parseInt(order);
        if (isNaN(numericOrder)) {
            return;
        }

        this.order = numericOrder;
    };

    handleOrderBlur = () => {
        const {id, onOrderChange, order} = this.props;

        if (onOrderChange && this.order && order !== this.order) {
            onOrderChange(id, this.order).then(action((ordered) => {
                if (!ordered) {
                    this.order = this.props.order;
                }
            }));
        }
    };

    handleOrderKeyPress = (key: string | null | undefined, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter') {
            event.currentTarget.blur();
        }
    };

    renderButtons = (): Array<Element<typeof ItemButton>> | null | undefined => {
        const {buttons, id} = this.props;

        if (!buttons) {
            return null;
        }

        return buttons.map((button: ItemButtonConfig, index: number) => {
            const key = `button-${index}`;

            return (
                <ItemButton {...button} id={id} key={key} />
            );
        });
    };

    render() {
        const {active, children, disabled, hasChildren, indicators, showOrderField, selected} = this.props;

        const itemClass = classNames(
            itemStyles.item,
            {
                [itemStyles.active]: active,
                [itemStyles.disabled]: disabled,
                [itemStyles.selected]: selected,
                [itemStyles.orderFieldShown]: showOrderField,
            }
        );

        return (
            <div
                className={itemClass}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                role="button"
            >
                {!showOrderField &&
                    <span className={itemStyles.buttons}>
                        {this.renderButtons()}
                    </span>
                }
                {showOrderField &&
                    <div className={itemStyles.orderInput}>
                        <Input
                            alignment="center"
                            onBlur={this.handleOrderBlur}
                            onChange={this.handleOrderChange}
                            onKeyPress={this.handleOrderKeyPress}
                            value={this.order}
                        />
                    </div>
                }
                <span className={itemStyles.text}>
                    <CroppedText>{children}</CroppedText>
                </span>
                {indicators && indicators.map((indicator, index) => (
                    <span className={itemStyles.indicator} key={index}>
                        {indicator}
                    </span>
                ))}
                <span className={itemStyles.children}>
                    {hasChildren &&
                        <Icon name="su-angle-right" />
                    }
                </span>
            </div>
        );
    }
}

export default Item;
