import React, {Fragment} from 'react';
import {action, observable} from 'mobx';
import {Checkbox, CheckboxGroup, Input} from 'sulu-admin-bundle/components';
import {AbstractFieldFilterType} from 'sulu-admin-bundle/containers';
import countryFieldFilterTypeStyles from './countryFieldFilterType.scss';

class CountryFieldFilterType extends AbstractFieldFilterType<Array<string> | null | undefined> {
    static countries: {
        [key: string]: string
    } = {};

    @observable
    searchValue: string | null | undefined;

    @action handleSearchChange = (searchValue?: string | null) => {
        this.searchValue = searchValue;
    };

    getFormNode() {
        const {countries} = CountryFieldFilterType;
        const {onChange, searchValue, value} = this;

        return (
            <Fragment>
                <Input icon="su-search" onChange={this.handleSearchChange} value={this.searchValue} />
                <CheckboxGroup
                    className={countryFieldFilterTypeStyles.checkboxGroup}
                    onChange={onChange}
                    values={value || []}
                >
                    {Object.keys(countries)
                        .filter(
                            (key) => searchValue
                                ? countries[key].toLowerCase().startsWith(searchValue.toLowerCase())
                                : true
                        )
                        .map((key) => (
                            <Checkbox key={key} value={key}>{countries[key]}</Checkbox>
                        ))
                    }
                </CheckboxGroup>
            </Fragment>
        );
    }

    getValueNode(values?: Array<string> | null) {
        const {countries} = CountryFieldFilterType;

        return Promise.resolve(values ? values.map((value) => countries[value]).join(', ') : null);
    }
}

export default CountryFieldFilterType;
