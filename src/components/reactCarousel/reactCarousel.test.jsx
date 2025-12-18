import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import ReactCarousel from './reactCarousel'

// Mock the hooks to avoid side effects
vi.mock('@hooks/useRerenderOnWindowResize', () => ({
  default: vi.fn(),
}))

describe('<ReactCarousel />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  const renderReactCarousel = props =>
    render(
      <ReactCarousel {...props}>
        <div data-testid="slide-1">Slide 1</div>
        <div data-testid="slide-2">Slide 2</div>
        <div data-testid="slide-3">Slide 3</div>
      </ReactCarousel>
    )

  test('should render all children as slides', () => {
    const { getByTestId } = renderReactCarousel({})

    expect(getByTestId('slide-1')).toBeTruthy()
    expect(getByTestId('slide-2')).toBeTruthy()
    expect(getByTestId('slide-3')).toBeTruthy()
  })

  test('should render with badge by default', () => {
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { getByTestId } = renderReactCarousel({ renderBadge })

    expect(getByTestId('badge')).toBeTruthy()
    expect(getByTestId('badge').textContent).toBe('1/3')
  })

  test('should hide badge when hideIndex is true', () => {
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { queryByTestId } = renderReactCarousel({ renderBadge, hideIndex: true })

    expect(queryByTestId('badge')).toBeFalsy()
  })

  test('should render arrows when showArrows is true', () => {
    const { getByTestId } = renderReactCarousel({ showArrows: true })

    expect(getByTestId('arrow-button-left')).toBeTruthy()
    expect(getByTestId('arrow-button-right')).toBeTruthy()
  })

  test('should navigate to next slide on arrow click', () => {
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { getByTestId } = renderReactCarousel({ showArrows: true, renderBadge })

    const rightArrow = getByTestId('arrow-button-right')
    fireEvent.click(rightArrow)

    expect(getByTestId('badge').textContent).toBe('2/3')
  })

  test('should navigate to previous slide on arrow click', () => {
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { getByTestId } = renderReactCarousel({ showArrows: true, renderBadge })

    // Go to second slide first
    const rightArrow = getByTestId('arrow-button-right')
    fireEvent.click(rightArrow)

    // Then go back
    const leftArrow = getByTestId('arrow-button-left')
    fireEvent.click(leftArrow)

    expect(getByTestId('badge').textContent).toBe('1/3')
  })

  test('should render with custom arrow', () => {
    const customArrow = ({ variant, onClick }) => (
      <button data-testid={`custom-arrow-${variant}`} onClick={onClick}>
        {variant}
      </button>
    )
    const { getByTestId } = renderReactCarousel({ renderArrow: customArrow })

    expect(getByTestId('custom-arrow-left')).toBeTruthy()
    expect(getByTestId('custom-arrow-right')).toBeTruthy()
  })

  test('should match snapshot', () => {
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { container } = renderReactCarousel({ renderBadge })

    expect(container).toMatchSnapshot()
  })
})
