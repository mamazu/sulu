import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import Input from '../../components/Input/Input';
import {translate} from '../../utils/Translator';

type Props = {
    onSearch: (search?: string | null | undefined) => void,
    value: string | null | undefined
};

@observer
class Search extends React.Component<Props> {
    @observable
    collapsed: boolean = true;
    @observable
    value: string | null | undefined;

    @action setCollapsed(collapsed: boolean) {
        this.collapsed = collapsed;
    }

    @action setValue(value?: string | null) {
        this.value = value;
    }

    updateValue(value?: string | null) {
        this.setValue(value);

        if (value) {
            this.setCollapsed(false);
        }
    }

    componentDidMount() {
        this.updateValue(this.props.value);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.value !== this.props.value) {
            this.updateValue(this.props.value);
        }
    }

    handleChange = (value?: string | null) => {
        this.setValue(value);
    };

    handleKeyPress = (key?: string | null) => {
        if (key === 'Enter') {
            this.search();
        }
    };

    search = () => {
        if (!this.collapsed && !this.value) {
            this.setCollapsed(true);
        }

        this.props.onSearch(this.value);
    };

    handleBlur = () => {
        this.search();
    };

    handleIconClick = () => {
        if (this.collapsed) {
            this.setCollapsed(false);
        }
    };

    handleClearClick = () => {
        this.setValue(undefined);
        this.search();
    };

    render() {
        return (
            <label aria-label={translate('sulu_admin.list_search_placeholder')}>
                <Input
                    collapsed={this.collapsed}
                    icon="su-search"
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onClearClick={this.handleClearClick}
                    onIconClick={this.handleIconClick}
                    onKeyPress={this.handleKeyPress}
                    placeholder={translate('sulu_admin.list_search_placeholder')}
                    skin="dark"
                    value={this.value}
                />
            </label>
        );
    }
}

export default Search;
