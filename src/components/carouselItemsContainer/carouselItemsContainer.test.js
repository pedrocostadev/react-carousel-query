/* eslint-disable react/prop-types */
import React from 'react'
import { render } from '@testing-library/react'
import CarouselItemsContainer from './carouselItemsContainer'

describe('<CarouselItemsContainer />', () => {
  const BadgeFn = ({ currentIndex, total }) => {
    return <span>{`${currentIndex}/${total}`}</span>
  }

  const props = {
    renderBadge: BadgeFn,
    currentIndex: 0,
    total: 2,
    next: jest.fn(),
    previous: jest.fn(),
  }

  const renderCarouselItemsContainer = props =>
    render(
      <CarouselItemsContainer {...props}>
        <img alt="pic1" />
        <img alt="pic2" />
      </CarouselItemsContainer>
    )

  test('It should render', () => {
    const { container, getByText } = renderCarouselItemsContainer(props)
    expect(getByText('1/2')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('It should hide index', () => {
    const { container, queryByText } = renderCarouselItemsContainer({
      ...props,
      hideIndex: true,
    })
    expect(queryByText('1/2')).toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  test('It should not render the arrows by default', () => {
    const { container, queryByTestId } = renderCarouselItemsContainer(props)

    const leftArrowButton = queryByTestId('arrow-button-left')
    const rightArrowButton = queryByTestId('arrow-button-right')

    expect(leftArrowButton).toBeFalsy()
    expect(rightArrowButton).toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  test('It should render the arrows when showArrows prop is true', () => {
    const { container, getByTestId } = renderCarouselItemsContainer({
      ...props,
      showArrows: true,
    })

    const leftArrowButton = getByTestId('arrow-button-left')
    const rightArrowButton = getByTestId('arrow-button-right')

    expect(leftArrowButton).toBeTruthy()
    expect(rightArrowButton).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
})
