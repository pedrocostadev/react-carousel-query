/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import CarouselItemsContainer from './carouselItemsContainer';

jest.mock('@hooks/useQueryManager', () => ({
  useQueryManager: () => ({
    currentIndex: 0,
    total: 2,
    items: [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
    ],
    next: jest.fn(),
    previous: jest.fn(),
  }),
}));

describe('<CarouselItemsContainer />', () => {
  const ItemFn = ({ item }) => <p>{item.name}</p>;
  const BadgeFn = ({ currentIndex, total }) => {
    return <span>{`${currentIndex}/${total}`}</span>;
  };

  const props = {
    renderItem: ItemFn,
    renderBadge: BadgeFn,
  };

  test('It should render', () => {
    const { container, getByText } = render(
      <CarouselItemsContainer {...props} />,
    );
    expect(getByText('1/2')).toBeTruthy();
    expect(getByText('first')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('It should hide index', () => {
    const { container, getByText, queryByText } = render(
      <CarouselItemsContainer hideIndex {...props} />,
    );
    expect(queryByText('1/2')).toBeFalsy();
    expect(getByText('first')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
