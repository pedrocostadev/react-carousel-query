import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { useQueryManagerProvider } from '@hooks/useQueryManager'

describe('useQueryManager', () => {
  const MOCK_ITEMS = [
    { id: '1', name: 'first' },
    { id: '2', name: 'second' },
  ]

  const TOTAL = 6
  const FETCH_STEP = 3

  const props = {
    getData: () => ({ total: TOTAL, items: MOCK_ITEMS }),
  }

  test('should save the items and total', async () => {
    const { result } = renderHook(() => useQueryManagerProvider(props))

    await waitFor(() => {
      expect(result.current.items).toEqual(MOCK_ITEMS)
    })
    expect(result.current.total).toEqual(TOTAL)
  })

  test('should update offset', async () => {
    const { result } = renderHook(() => useQueryManagerProvider(props))

    await waitFor(() => {
      expect(result.current.offset).toEqual(FETCH_STEP)
    })
  })

  test('should concat items', async () => {
    const BATCH_ITEMS = [
      { id: '1', name: 'first' },
      { id: '2', name: 'second' },
      { id: '3', name: 'third' },
    ]
    const getData = vi.fn(() => {
      return { total: 6, items: BATCH_ITEMS }
    })

    const { result } = renderHook(() =>
      useQueryManagerProvider({
        getData,
      })
    )

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })
    expect(getData).toHaveBeenCalledTimes(1)

    // Navigate to trigger second fetch (at index 2, we need more data)
    act(() => {
      result.current.next() // index 1
      result.current.next() // index 2 - triggers fetch
    })

    await waitFor(() => {
      expect(result.current.items.length).toBe(6)
    })
    expect(getData).toHaveBeenCalledTimes(2)
    expect(result.current.items).toEqual(BATCH_ITEMS.concat(BATCH_ITEMS))
  })

  test('should update currentIndex on next', async () => {
    const { result } = renderHook(() => useQueryManagerProvider(props))

    await waitFor(() => {
      expect(result.current.items.length).toBeGreaterThan(0)
    })

    act(() => {
      result.current.next()
    })

    expect(result.current.currentIndex).toEqual(1)
  })

  test('should update currentIndex on previous', async () => {
    const { result } = renderHook(() => useQueryManagerProvider(props))

    await waitFor(() => {
      expect(result.current.items.length).toBeGreaterThan(0)
    })

    act(() => {
      result.current.next()
      result.current.previous()
    })
    expect(result.current.currentIndex).toEqual(0)
  })

  test('should setCurrentIndex', async () => {
    const { result } = renderHook(() => useQueryManagerProvider(props))

    await waitFor(() => {
      expect(result.current.items.length).toBeGreaterThan(0)
    })

    act(() => {
      result.current.setCurrentIndex(2)
    })
    expect(result.current.currentIndex).toEqual(2)
  })
})
