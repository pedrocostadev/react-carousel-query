import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { QueryManagerProvider } from './QueryManagerProvider'
import { useQueryManager } from './useQueryManager'

describe('<QueryManagerProvider />', () => {
  const MOCK_ITEMS = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
  ]

  const mockGetData = vi.fn(() => ({
    offset: 2,
    total: 2,
    items: MOCK_ITEMS,
  }))

  // Consumer component that uses the context
  const TestConsumer = () => {
    const { items, total, currentIndex, offset } = useQueryManager()
    return (
      <div>
        <span data-testid="items-count">{items.length}</span>
        <span data-testid="total">{total}</span>
        <span data-testid="current-index">{currentIndex}</span>
        <span data-testid="offset">{offset}</span>
      </div>
    )
  }

  test('should provide query manager context to children', async () => {
    const { getByTestId } = render(
      <QueryManagerProvider getData={mockGetData}>
        <TestConsumer />
      </QueryManagerProvider>
    )

    await waitFor(() => {
      expect(getByTestId('items-count').textContent).toBe('2')
    })

    expect(getByTestId('total').textContent).toBe('2')
    expect(getByTestId('current-index').textContent).toBe('0')
  })

  test('should call getData on mount', async () => {
    render(
      <QueryManagerProvider getData={mockGetData}>
        <TestConsumer />
      </QueryManagerProvider>
    )

    await waitFor(() => {
      expect(mockGetData).toHaveBeenCalled()
    })
  })

  test('should pass fetchStep to getData', async () => {
    const getDataWithStep = vi.fn(() => ({
      offset: 5,
      total: 10,
      items: MOCK_ITEMS,
    }))

    render(
      <QueryManagerProvider getData={getDataWithStep} fetchStep={5}>
        <TestConsumer />
      </QueryManagerProvider>
    )

    await waitFor(() => {
      expect(getDataWithStep).toHaveBeenCalledWith(expect.objectContaining({ limit: 5 }))
    })
  })

  test('should use default fetchStep of 3', async () => {
    render(
      <QueryManagerProvider getData={mockGetData}>
        <TestConsumer />
      </QueryManagerProvider>
    )

    await waitFor(() => {
      expect(mockGetData).toHaveBeenCalledWith(expect.objectContaining({ limit: 3 }))
    })
  })

  test('should render children correctly', () => {
    const { getByTestId } = render(
      <QueryManagerProvider getData={mockGetData}>
        <div data-testid="child">Child Content</div>
      </QueryManagerProvider>
    )

    expect(getByTestId('child')).toBeTruthy()
    expect(getByTestId('child').textContent).toBe('Child Content')
  })
})
