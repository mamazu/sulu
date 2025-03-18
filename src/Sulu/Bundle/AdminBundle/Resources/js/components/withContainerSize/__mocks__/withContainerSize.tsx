import React from 'react';
import type {ComponentType} from 'react';

export default function withContainerSize(Component: ComponentType<any>) {
    class withContainerSizeComponent extends React.Component<any> {
        component: any;

        componentDidMount() {
            if (this.component.containerDidMount) {
                this.component.containerDidMount();
            }
            if (this.props.mountSpy) {
                Promise.resolve().then(this.props.mountSpy);
            }
        }

        setComponent = (c: any) => this.component = c;

        render() {
            const props = {
                ...this.props,
                containerWidth: 640,
                containerHeight: 360,
                ref: this.setComponent,
            } as const;

            return <Component {...props} />;
        }
    }

    return withContainerSizeComponent;
}
