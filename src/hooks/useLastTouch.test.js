import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useLastTouch from '@hooks/useLastTouch'

describe('useLastTouch', () => {
  const touchX = 100

  const MOCK_TOUCH_EVENT = {
    nativeEvent: {
      touches: [{ clientX: touchX }],
    },
  }

  const MOCK_MOUSE_EVENT = {
    nativeEvent: {
      clientX: touchX,
    },
  }

  test('should setLastTouch with touch event', () => {
    const { result } = renderHook(() => useLastTouch())

    act(() => {
      result.current.setLastTouch(MOCK_TOUCH_EVENT)
    })

    expect(result.current.lastTouch).toEqual(touchX)
  })

  test('should setLastTouch with mouse event (no touches)', () => {
    const { result } = renderHook(() => useLastTouch())

    act(() => {
      result.current.setLastTouch(MOCK_MOUSE_EVENT)
    })

    expect(result.current.lastTouch).toEqual(touchX)
  })

  test('should resetLastTouch', () => {
    const { result } = renderHook(() => useLastTouch())

    act(() => {
      result.current.setLastTouch(MOCK_TOUCH_EVENT)
      result.current.resetLastTouch()
    })

    expect(result.current.lastTouch).toEqual(0)
  })

  test('should getTouchDelta with touch event', () => {
    const { result } = renderHook(() => useLastTouch())

    act(() => {
      result.current.setLastTouch(MOCK_TOUCH_EVENT)
    })

    const newEvent = {
      nativeEvent: {
        touches: [{ clientX: 50 }],
      },
    }

    expect(result.current.getTouchDelta(newEvent)).toEqual(50)
  })

  test('should getTouchDelta with mouse event', () => {
    const { result } = renderHook(() => useLastTouch())

    act(() => {
      result.current.setLastTouch(MOCK_MOUSE_EVENT)
    })

    const newEvent = {
      nativeEvent: {
        clientX: 50,
      },
    }

    expect(result.current.getTouchDelta(newEvent)).toEqual(50)
  })
})
