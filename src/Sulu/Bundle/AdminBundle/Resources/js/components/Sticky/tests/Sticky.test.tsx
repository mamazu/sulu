import {render} from 'enzyme';
import React from 'react';
import Sticky from '../Sticky.js';

test('The component should render', () => {
    const component = render(
        <Sticky>{
            (isSticky: any) => <span>{isSticky ? 'Stick' : 'Unsticky'}</span>
        }</Sticky>
    );

    expect(component).toMatchSnapshot();
});
