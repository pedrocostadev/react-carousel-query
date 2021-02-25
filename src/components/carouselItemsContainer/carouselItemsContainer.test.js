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

  test('It should not render the arrows by default', () => {
    const { container, queryByTestId } = render(
      <CarouselItemsContainer {...props} />,
    );

    const leftArrowButton = queryByTestId('arrow-button-left');
    const rightArrowButton = queryByTestId('arrow-button-right');

    expect(leftArrowButton).toBeFalsy();
    expect(rightArrowButton).toBeFalsy();
    expect(container).toMatchSnapshot();
  });

  test('It should render the arrows when showArrows prop is true', () => {
    const { container, getByTestId } = render(
      <CarouselItemsContainer showArrows {...props} />,
    );

    const leftArrowButton = getByTestId('arrow-button-left');
    const rightArrowButton = getByTestId('arrow-button-right');

    expect(leftArrowButton).toBeTruthy();
    expect(rightArrowButton).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
