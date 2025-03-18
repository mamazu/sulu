import React from 'react';
import {Router} from 'sulu-admin-bundle/services';
import {FormInspector, Renderer} from 'sulu-admin-bundle/containers';
import type {ErrorCollection} from 'sulu-admin-bundle/types';
import type {Schema} from 'sulu-admin-bundle/containers';

type Props = {
    data: any,
    dataPath: string,
    errors?: ErrorCollection,
    formInspector: FormInspector,
    index: number,
    onChange: (index: number, name: string, value: any) => void,
    onFieldFinish: () => void | null | undefined,
    onSuccess: () => void | null | undefined,
    router: Router | null | undefined,
    schema: Schema,
    schemaPath: string,
    showAllErrors: boolean,
    value: any
};

export default class FieldRenderer extends React.Component<Props> {
    static defaultProps = {
        showAllErrors: false,
    };

    handleChange = (name: string, value: any) => {
        const {index, onChange} = this.props;
        onChange(index, name, value);
    };

    render() {
        const {
            data,
            dataPath,
            errors,
            formInspector,
            onFieldFinish,
            onSuccess,
            router,
            schema,
            schemaPath,
            showAllErrors,
            value,
        } = this.props;

        return (
            <Renderer
                data={data}
                dataPath={dataPath}
                errors={errors}
                formInspector={formInspector}
                onChange={this.handleChange}
                onFieldFinish={onFieldFinish}
                onSuccess={onSuccess}
                router={router}
                schema={schema}
                schemaPath={schemaPath}
                showAllErrors={showAllErrors}
                value={value}
            />
        );
    }
}
