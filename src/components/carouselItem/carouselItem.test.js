import React from 'react';
import { render } from '@testing-library/react';
import CarouselItem from './carouselItem';

describe('<CarouselItem />', () => {
  const item = { id: '1', description: 'testItem' };

  test('It should render', () => {
    const renderFn = jest.fn(() => <p>test</p>);
    render(<CarouselItem item={item} renderItem={renderFn} />);
    expect(renderFn).toHaveBeenCalledWith({ item });
  });
});
