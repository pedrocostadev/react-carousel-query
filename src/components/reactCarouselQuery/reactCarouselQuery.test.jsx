import React from 'react'
import { render, waitFor, fireEvent, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import ReactCarouselQueryWrapper from './index.jsx'

// Mock the hooks to avoid side effects
vi.mock('@hooks/useRerenderOnWindowResize', () => ({
  default: vi.fn(),
}))

describe('<ReactCarouselQuery />', () => {
  const MOCK_ITEMS = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ]

  const createMockGetData = () =>
    vi.fn().mockResolvedValue({
      offset: 3,
      total: 3,
      items: MOCK_ITEMS,
    })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should render items from getData', async () => {
    const mockGetData = createMockGetData()
    const { getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
      />
    )

    await waitFor(() => {
      expect(getByTestId('item-1')).toBeTruthy()
      expect(getByTestId('item-2')).toBeTruthy()
      expect(getByTestId('item-3')).toBeTruthy()
    })
  })

  test('should call getData on mount', async () => {
    const mockGetData = createMockGetData()
    render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
      />
    )

    await waitFor(() => {
      expect(mockGetData).toHaveBeenCalled()
    })
  })

  test('should render with badge showing current position', async () => {
    const mockGetData = createMockGetData()
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        renderBadge={renderBadge}
      />
    )

    await waitFor(() => {
      expect(getByTestId('badge')).toBeTruthy()
      expect(getByTestId('badge').textContent).toBe('1/3')
    })
  })

  test('should hide badge when hideIndex is true', async () => {
    const mockGetData = createMockGetData()
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { queryByTestId, getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        renderBadge={renderBadge}
        hideIndex
      />
    )

    await waitFor(() => {
      expect(getByTestId('item-1')).toBeTruthy()
    })

    expect(queryByTestId('badge')).toBeFalsy()
  })

  test('should render arrows when showArrows is true', async () => {
    const mockGetData = createMockGetData()
    const { getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        showArrows
      />
    )

    await waitFor(() => {
      expect(getByTestId('item-1')).toBeTruthy()
    })

    expect(getByTestId('arrow-button-left')).toBeTruthy()
    expect(getByTestId('arrow-button-right')).toBeTruthy()
  })

  test('should navigate on arrow click', async () => {
    const mockGetData = createMockGetData()
    const renderBadge = ({ currentIndex, total }) => (
      <span data-testid="badge">{`${currentIndex}/${total}`}</span>
    )
    const { getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        showArrows
        renderBadge={renderBadge}
      />
    )

    await waitFor(() => {
      expect(getByTestId('badge').textContent).toBe('1/3')
    })

    const rightArrow = getByTestId('arrow-button-right')

    await act(async () => {
      fireEvent.click(rightArrow)
    })

    await waitFor(() => {
      expect(getByTestId('badge').textContent).toBe('2/3')
    })
  })

  test('should render with custom renderArrow', async () => {
    const mockGetData = createMockGetData()
    const customArrow = ({ variant, onClick }) => (
      <button data-testid={`custom-arrow-${variant}`} onClick={onClick}>
        {variant}
      </button>
    )
    const { getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        renderArrow={customArrow}
      />
    )

    await waitFor(() => {
      expect(getByTestId('item-1')).toBeTruthy()
    })

    expect(getByTestId('custom-arrow-left')).toBeTruthy()
    expect(getByTestId('custom-arrow-right')).toBeTruthy()
  })

  test('should use custom fetchStep', async () => {
    const getDataWithStep = vi.fn().mockResolvedValue({
      offset: 5,
      total: 10,
      items: MOCK_ITEMS,
    })

    render(
      <ReactCarouselQueryWrapper
        getData={getDataWithStep}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
        fetchStep={5}
      />
    )

    await waitFor(() => {
      expect(getDataWithStep).toHaveBeenCalledWith(expect.objectContaining({ limit: 5 }))
    })
  })

  test('should match snapshot', async () => {
    const mockGetData = createMockGetData()
    const { container, getByTestId } = render(
      <ReactCarouselQueryWrapper
        getData={mockGetData}
        renderItem={({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
      />
    )

    await waitFor(() => {
      expect(getByTestId('item-1')).toBeTruthy()
    })

    expect(container).toMatchSnapshot()
  })
})
