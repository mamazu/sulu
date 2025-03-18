import React from 'react';
import {render} from 'enzyme';
import SmartContentItem from '../SmartContentItem';

test('Render item with only title', () => {
    const item = {title: 'Only title'} as const;
    expect(render(<SmartContentItem item={item} />)).toMatchSnapshot();
});

test('Render item with title and draft with published state', () => {
    const item = {title: 'Draft and published', publishedState: false, published: new Date()} as const;
    expect(render(<SmartContentItem item={item} />)).toMatchSnapshot();
});

test('Render item with title and published state', () => {
    const item = {title: 'Published', publishedState: true, published: new Date()} as const;
    expect(render(<SmartContentItem item={item} />)).toMatchSnapshot();
});

test('Render item with title and image', () => {
    const item = {image: 'image.jpg', title: 'Image'} as const;
    expect(render(<SmartContentItem item={item} />)).toMatchSnapshot();
});

test('Render item with additional columns except for id', () => {
    const item = {id: 4, title: 'Title with URL', url: '/url', value: 'Test'} as const;
    expect(render(<SmartContentItem item={item} />)).toMatchSnapshot();
});
