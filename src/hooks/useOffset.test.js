import { renderHook, act } from '@testing-library/react-hooks'
import useOffset from '@hooks/useOffset'

import { callTimes } from '@utils/'

describe('useOffset', () => {
  const props = {
    currentIndex: 1,
    itemWidth: 300,
    total: 5,
  }

  const MAX_OFFSET = props.itemWidth * (props.total - 1)

  test('should return the right offset value', () => {
    const { result } = renderHook(() => useOffset(props))
    expect(result.current.offset).toEqual(props.itemWidth)
  })

  test('should return the right maxOffset value', () => {
    const { result } = renderHook(() => useOffset(props))
    expect(result.current.maxOffset).toEqual(MAX_OFFSET)
  })

  test('should increase offset', () => {
    const { result } = renderHook(() => useOffset(props))
    act(() => {
      result.current.increaseOffset()
    })
    expect(result.current.offset).toEqual(props.itemWidth * 2)
  })

  test('should not increase more than max', () => {
    const { result } = renderHook(() => useOffset(props))

    callTimes(6, () => {
      act(() => {
        result.current.increaseOffset()
      })
    })

    expect(result.current.offset).toEqual(MAX_OFFSET)
  })

  test('should decrease offset', () => {
    const { result } = renderHook(() => useOffset(props))
    act(() => {
      result.current.increaseOffset()
      result.current.increaseOffset()
      result.current.decreaseOffset()
    })
    expect(result.current.offset).toEqual(props.itemWidth * 2)
  })

  test('should not decrease offset more than min', () => {
    const { result } = renderHook(() => useOffset(props))
    callTimes(2, () => {
      act(() => {
        result.current.decreaseOffset()
      })
    })
    expect(result.current.offset).toEqual(0)
  })

  test('should setPreviousOffset', () => {
    const { result } = renderHook(() => useOffset({ currentIndex: 3, total: 5, itemWidth: 300 }))
    act(() => {
      result.current.increaseOffset()
      result.current.increaseOffset()
      result.current.setPreviousOffset()
    })
    expect(result.current.offset).toEqual(props.itemWidth * 2)
  })

  test('should setNextOffset', () => {
    const { result } = renderHook(() => useOffset({ currentIndex: 1, total: 5, itemWidth: 300 }))
    act(() => {
      result.current.setNextOffset()
    })
    expect(result.current.offset).toEqual(props.itemWidth * 2)
  })
})
