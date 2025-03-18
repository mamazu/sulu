import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {observer} from 'mobx-react';
import {action, observable, toJS} from 'mobx';
import equals from 'fast-deep-equal';
import SingleSelect from '../../components/SingleSelect/SingleSelect';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import linkStyles from '../Form/fields/link.scss';
import {ResourceRequester} from '../../services';
import linkTypeRegistry from './registries/linkTypeRegistry';
import type {LinkValue} from './types';
import type {IObservableValue} from 'mobx/lib/mobx';

type Props = {
    disabled?: boolean,
    enableAnchor?: boolean | null | undefined,
    enableQuery?: boolean | null | undefined,
    enableRel?: boolean | null | undefined,
    enableTarget?: boolean | null | undefined,
    enableTitle?: boolean | null | undefined,
    excludedTypes: string[],
    locale: IObservableValue<string>,
    onChange: (value: LinkValue) => void,
    onFinish: () => void,
    types?: string[],
    value: LinkValue | null | undefined
};

const DEFAULT_TARGET = '_self';

@observer
class Link extends Component<Props> {
    static defaultProps = {
        disabled: false,
        enableAnchor: false,
        enableQuery: false,
        enableRel: false,
        enableTarget: false,
        enableTitle: false,
        excludedTypes: [],
        types: [],
    };

    @observable
    openedOverlayProvider: string | null | undefined;
    @observable
    overlayHref: string | null | undefined | number;
    @observable
    overlayTitle: string | null | undefined;
    @observable
    overlayRel: string | null | undefined;
    @observable
    overlayTarget: string | null | undefined = DEFAULT_TARGET;
    @observable
    overlayAnchor: string | null | undefined;
    @observable
    overlayQuery: string | null | undefined;
    @observable
    titleParts: Array<string | number> = [];
    @observable
    titleLoading: boolean = false;

    constructor(props: Props) {
        super(props);

        this.load(this.props.value);
    }

    componentDidUpdate(prevProps: Props) {
        const prevValue = toJS(prevProps.value);
        const newValue = toJS(this.props.value);

        if (!equals(prevValue, newValue)) {
            this.load(this.props.value);
        }
    }

    @action load = (value?: LinkValue | null) => {
        if (!value) {
            this.titleParts = [];

            return;
        }

        const {href, provider} = value;
        if (!provider) {
            this.titleParts = href ? [href] : [];

            return;
        }

        const options = linkTypeRegistry.getOptions(provider);
        if (!options?.displayProperties?.length) {
            this.titleParts = href ? [href] : [];

            return;
        }

        this.titleParts = [];

        this.titleLoading = true;
        ResourceRequester.get(options.resourceKey, {
            id: value.href,
            locale: this.props.locale,
        }).then(action((data) => {
            this.titleParts = Object.keys(data)
                .filter((key) => (options.displayProperties || []).includes(key))
                .reduce<Array<any>>((titleParts, key) => {
                    titleParts.unshift(data[key]);

                    return titleParts;
                }, []);

            this.titleLoading = false;
        })).catch(action((error) => {
            if (error.status !== 404) {
                return Promise.reject(error);
            }

            this.titleParts = [];
            this.titleLoading = false;
        }));
    };

    @action handleRemoveClick = () => {
        this.changeValue(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    };

    @action handleTitleClick = () => {
        const {
            value,
        } = this.props;
        const {
            provider,
        } = value || {};

        this.openOverlay(provider);
    };

    @action handleOverlayConfirm = () => {
        if (!this.overlayHref) {
            return;
        }
        this.changeValue(
            this.openedOverlayProvider,
            this.overlayHref,
            this.overlayTitle,
            this.overlayTarget,
            this.overlayAnchor,
            this.overlayQuery,
            this.overlayRel
        );
        this.closeOverlay();
    };

    @action handleOverlayClose = () => {
        this.closeOverlay();
    };

    @action handleProviderChange = (provider: string) => {
        this.openOverlay(provider);
    };

    @action handleOverlayAnchorChange = (anchor?: string | null) => {
        this.overlayAnchor = anchor;
    };

    @action handleOverlayQueryChange = (query?: string | null) => {
        this.overlayQuery = query;
    };

    @action handleOverlayTargetChange = (target?: string | null) => {
        this.overlayTarget = target;
    };

    @action handleOverlayTitleChange = (title?: string | null) => {
        this.overlayTitle = title;
    };

    @action handleOverlayRelChange = (rel?: string | null) => {
        this.overlayRel = rel;
    };

    @action handleOverlayHrefChange = (href: string | null | undefined | number) => {
        this.overlayHref = href;
    };

    closeOverlay = () => {
        this.openedOverlayProvider = undefined;
    };

    openOverlay = (provider?: string | null) => {
        const {
            value,
        } = this.props;
        const {
            provider: currentProvider, title, href, target = DEFAULT_TARGET, anchor, query, rel,
        } = value || {};

        this.overlayHref = currentProvider === provider ? href : undefined;
        this.overlayTarget = target;
        this.overlayTitle = title;
        this.overlayAnchor = anchor;
        this.overlayQuery = query;
        this.overlayRel = rel;

        this.openedOverlayProvider = provider;
    };

    changeValue = (
        provider: string | null | undefined,
        href: string | null | undefined | number,
        title?: string | null,
        target?: string | null,
        anchor?: string | null,
        query?: string | null,
        rel?: string | null
    ) => {
        const {
            onChange, onFinish, enableTarget, enableTitle, enableAnchor, enableQuery, enableRel, locale,
        } = this.props;

        onChange(
            {
                provider,
                target: enableTarget ? target : undefined,
                anchor: enableAnchor ? anchor : undefined,
                query: enableQuery ? query : undefined,
                href,
                title: enableTitle ? title : undefined,
                rel: enableRel ? rel : undefined,
                locale: toJS(locale),
            }
        );
        onFinish();
    };

    render(): React.ReactElement {
        const {
            disabled,
            locale,
            enableAnchor,
            enableQuery,
            enableTarget,
            enableTitle,
            enableRel,
            types,
            excludedTypes,
            value,
        } = this.props;
        const {
            href, provider,
        } = value || {};

        const itemClass = classNames(
            linkStyles.item,
            {
                [linkStyles.clickable]: !disabled || !href,
                [linkStyles.disabled]: disabled,
            }
        );

        let allowedTypes = linkTypeRegistry.getKeys().filter((key) => !excludedTypes.includes(key));
        if (types !== undefined && types.length > 0) {
            allowedTypes = allowedTypes.filter((key) => types.length > 0 && types.includes(key));
        }

        return (
            <Fragment>
                <div className={linkStyles.link}>
                    <div className={linkStyles.provider}>
                        <SingleSelect
                            disabled={!!disabled}
                            onChange={this.handleProviderChange}
                            skin="flat"
                            value={provider}
                        >
                            {allowedTypes.map((key) => (
                                <SingleSelect.Option key={key} value={key}>
                                    {linkTypeRegistry.getTitle(key)}
                                </SingleSelect.Option>
                            ))}
                        </SingleSelect>
                    </div>
                    <div className={linkStyles.itemContainer}>
                        <div className={itemClass} onClick={disabled || this.handleTitleClick} role="button">
                            {this.titleLoading && '…'}
                            {!this.titleLoading && value && this.titleParts.length > 0 && (
                                <div className={linkStyles.columnList}>
                                    {this.titleParts.map((titlePart, index) => (
                                        <span
                                            className={linkStyles.itemColumn}
                                            key={index}
                                            style={{
                                                width: 100 / this.titleParts.length + '%',
                                            }}
                                        >
                                            {titlePart}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        {!this.titleLoading && !disabled
                            && <button
                                className={linkStyles.removeButton}
                                onClick={this.handleRemoveClick}
                                type="button"
                            >
                                <Icon name="su-trash-alt" />
                            </button>
                        }
                        {this.titleLoading
                            && <Loader className={linkStyles.loader} size={14} />
                        }
                    </div>
                </div>
                {linkTypeRegistry.getKeys().map((key) => {
                    const LinkOverlay = linkTypeRegistry.getOverlay(key);

                    return (
                        <LinkOverlay
                            anchor={this.overlayAnchor}
                            href={this.openedOverlayProvider === key ? this.overlayHref : undefined}
                            key={key}
                            locale={locale}
                            onAnchorChange={enableAnchor ? this.handleOverlayAnchorChange : undefined}
                            onCancel={this.handleOverlayClose}
                            onConfirm={this.handleOverlayConfirm}
                            onHrefChange={this.handleOverlayHrefChange}
                            onQueryChange={enableQuery ? this.handleOverlayQueryChange : undefined}
                            onRelChange={enableRel ? this.handleOverlayRelChange : undefined}
                            onTargetChange={enableTarget ? this.handleOverlayTargetChange : undefined}
                            onTitleChange={enableTitle ? this.handleOverlayTitleChange : undefined}
                            open={this.openedOverlayProvider === key}
                            options={linkTypeRegistry.getOptions(key)}
                            query={this.overlayQuery}
                            rel={this.overlayRel}
                            target={this.overlayTarget}
                            title={this.overlayTitle}
                        />
                    );
                })}
            </Fragment>
        );
    }
}

export default Link;
