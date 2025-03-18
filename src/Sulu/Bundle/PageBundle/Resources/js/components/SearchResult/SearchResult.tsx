import React from 'react';
import searchResultStyles from './searchResult.scss';

type Props = {
    description: string | null | undefined,
    title: string | null | undefined,
    url: string | null | undefined
};

export default class SearchResult extends React.Component<Props> {
    render() {
        const {description, title, url} = this.props;

        return (
            <div className={searchResultStyles.searchResult}>
                <div className={searchResultStyles.title}>{title}</div>
                <div className={searchResultStyles.url}>{url}</div>
                <div className={searchResultStyles.description}>{description}</div>
            </div>
        );
    }
}
