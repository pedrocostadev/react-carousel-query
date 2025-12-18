import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { useQueryManagerProvider } from '@hooks/useQueryManager'

import { callTimes } from '@utils/'

describe('useQueryManager', () => {
  const MOCK_ITEMS = [
    { id: '1', name: 'first' },
    { id: '2', name: 'second' },
  ]

  const OFFSET = 3
  const TOTAL = 6

  const props = {
    getData: () => ({ offset: OFFSET, total: TOTAL, items: MOCK_ITEMS }),
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
      expect(result.current.offset).toEqual(OFFSET * 2)
    })
  })

  test('should concat items', async () => {
    const getData = vi.fn(() => {
      return { offset: 2, total: 6, items: MOCK_ITEMS }
    })

    const { result } = renderHook(() =>
      useQueryManagerProvider({
        getData,
      })
    )

    await waitFor(() => {
      expect(result.current.items.length).toBeGreaterThan(0)
    })

    callTimes(5, () => {
      act(() => {
        result.current.next()
      })
    })

    await waitFor(() => {
      expect(result.current.items).toEqual(MOCK_ITEMS.concat(MOCK_ITEMS))
    })
    expect(getData).toBeCalledTimes(2)
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
