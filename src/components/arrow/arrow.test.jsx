import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Arrow from './arrow'

describe('<Arrow />', () => {
  const onClick = vi.fn()

  test('It should render', () => {
    const button = render(<Arrow variant="left" onClick={onClick} />)
    expect(button).toMatchSnapshot()
  })

  test('It should render using custom render function', () => {
    const getCustomArrowId = variant => `${variant}-custom-arrow`
    const renderArrow = ({ variant }) => <p data-testid={getCustomArrowId(variant)}>{variant}</p>

    const { container, getByTestId } = render(
      <Arrow variant="left" onClick={onClick} renderArrow={renderArrow} />
    )
    expect(getByTestId(getCustomArrowId('left'))).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('It should call onClick', () => {
    const { getByTestId } = render(
      <Arrow data-testid="arrow-left" variant="left" onClick={onClick} />
    )
    const arrowButton = getByTestId('arrow-left')
    fireEvent.click(arrowButton)
    expect(onClick).toBeCalledTimes(1)
  })

  test('It should have LEFT classe when variant is left', () => {
    const { getByTestId } = render(
      <Arrow data-testid="arrow-left" variant="left" onClick={onClick} />
    )
    const arrowButton = getByTestId('arrow-left')
    expect(arrowButton.classList.contains('left')).toBe(true)
  })

  test('It should have RIGHT classe when variant is right', () => {
    const { getByTestId } = render(
      <Arrow data-testid="arrowRight" variant="right" onClick={onClick} />
    )
    const arrowButton = getByTestId('arrowRight')
    expect(arrowButton.classList.contains('right')).toBe(true)
  })
})
