import React from 'react';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import NumberComponent from '../../../components/Number';
import type {FieldTypeProps} from '../types';

@observer
class Number extends React.Component<FieldTypeProps<number | null | undefined>> {
    @computed
    get min(): number | null | undefined {
        const {schemaOptions} = this.props;
        return schemaOptions.min ? parseFloat(schemaOptions.min.value) : undefined;
    }

    @computed
    get max(): number | null | undefined {
        const {schemaOptions} = this.props;
        return schemaOptions.max ? parseFloat(schemaOptions.max.value) : undefined;
    }

    @computed
    get step(): number | null | undefined {
        const {schemaOptions} = this.props;
        return schemaOptions.step ? parseFloat(schemaOptions.step.value) : undefined;
    }

    handleBlur = () => {
        this.props.onFinish();
    };

    render() {
        const {dataPath, disabled, error, onChange, value} = this.props;

        return (
            <NumberComponent
                disabled={!!disabled}
                id={dataPath}
                max={this.max}
                min={this.min}
                onBlur={this.handleBlur}
                onChange={onChange}
                step={this.step}
                valid={!error}
                value={value}
            />
        );
    }
}

export default Number;
