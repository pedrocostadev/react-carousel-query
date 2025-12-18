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

describe('useQueryManager - cursor pagination', () => {
  const FETCH_STEP = 3

  test('should use cursor from response for subsequent fetches', async () => {
    const getData = vi
      .fn()
      .mockResolvedValueOnce({
        items: [{ id: '1' }, { id: '2' }, { id: '3' }],
        nextCursor: 'cursor_page_2',
      })
      .mockResolvedValueOnce({
        items: [{ id: '4' }, { id: '5' }, { id: '6' }],
        nextCursor: 'cursor_page_3',
      })

    const { result } = renderHook(() => useQueryManagerProvider({ getData, fetchStep: FETCH_STEP }))

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })
    expect(getData).toHaveBeenCalledWith({ offset: 0, cursor: null, limit: FETCH_STEP })
    expect(result.current.cursor).toBe('cursor_page_2')
    expect(result.current.hasMore).toBe(true)

    // Navigate to trigger second fetch
    act(() => {
      result.current.next()
      result.current.next()
    })

    await waitFor(() => {
      expect(result.current.items.length).toBe(6)
    })
    expect(getData).toHaveBeenCalledWith({ offset: 3, cursor: 'cursor_page_2', limit: FETCH_STEP })
    expect(result.current.cursor).toBe('cursor_page_3')
  })

  test('should set hasMore to false when nextCursor is null', async () => {
    const getData = vi
      .fn()
      .mockResolvedValueOnce({
        items: [{ id: '1' }, { id: '2' }, { id: '3' }],
        nextCursor: 'cursor_page_2',
      })
      .mockResolvedValueOnce({
        items: [{ id: '4' }, { id: '5' }],
        nextCursor: null,
      })

    const { result } = renderHook(() => useQueryManagerProvider({ getData, fetchStep: FETCH_STEP }))

    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })
    expect(result.current.hasMore).toBe(true)

    act(() => {
      result.current.next()
      result.current.next()
    })

    await waitFor(() => {
      expect(result.current.items.length).toBe(5)
    })
    expect(result.current.hasMore).toBe(false)
  })

  test('should infer total from items when not provided in cursor mode', async () => {
    const getData = vi.fn().mockResolvedValueOnce({
      items: [{ id: '1' }, { id: '2' }, { id: '3' }],
      nextCursor: null,
    })

    const { result } = renderHook(() => useQueryManagerProvider({ getData, fetchStep: FETCH_STEP }))

    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })
    expect(result.current.total).toBe(3)
  })

  test('should use provided total in cursor mode when available', async () => {
    const getData = vi.fn().mockResolvedValueOnce({
      items: [{ id: '1' }, { id: '2' }, { id: '3' }],
      total: 10,
      nextCursor: 'next',
    })

    const { result } = renderHook(() => useQueryManagerProvider({ getData, fetchStep: FETCH_STEP }))

    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })
    expect(result.current.total).toBe(10)
  })

  test('should not fetch more when hasMore is false in cursor mode', async () => {
    const getData = vi.fn().mockResolvedValueOnce({
      items: [{ id: '1' }, { id: '2' }, { id: '3' }],
      nextCursor: null,
    })

    const { result } = renderHook(() => useQueryManagerProvider({ getData, fetchStep: FETCH_STEP }))

    await waitFor(() => {
      expect(result.current.items.length).toBe(3)
    })

    act(() => {
      result.current.next()
      result.current.next()
    })

    // Should not trigger another fetch since hasMore is false
    await waitFor(() => {
      expect(getData).toHaveBeenCalledTimes(1)
    })
  })
})
