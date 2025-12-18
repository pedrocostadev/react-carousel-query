import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import useSlider from '@hooks/useSlider'

describe('useSlider', () => {
  const mockNext = vi.fn()
  const mockPrevious = vi.fn()

  const createContainerRef = (width = 300) => ({
    current: { offsetWidth: width },
  })

  const defaultProps = {
    containerRef: createContainerRef(),
    next: mockNext,
    previous: mockPrevious,
    currentIndex: 0,
    total: 5,
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('initialization', () => {
    test('should return initial values', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      expect(result.current.transitionDuration).toBe('0s')
      expect(result.current.offset).toBe(0)
      expect(result.current.events).toBeDefined()
      expect(result.current.onNext).toBeDefined()
      expect(result.current.onPrevious).toBeDefined()
    })

    test('should return all required event handlers', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      expect(result.current.events.onMouseLeave).toBeDefined()
      expect(result.current.events.onMouseMove).toBeDefined()
      expect(result.current.events.onMouseDown).toBeDefined()
      expect(result.current.events.onMouseUp).toBeDefined()
      expect(result.current.events.onTouchEnd).toBeDefined()
      expect(result.current.events.onTouchMove).toBeDefined()
      expect(result.current.events.onTouchStart).toBeDefined()
    })
  })

  describe('onNext', () => {
    test('should call next and increase offset', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.onNext()
      })

      expect(mockNext).toHaveBeenCalledTimes(1)
      expect(result.current.offset).toBe(300)
    })
  })

  describe('onPrevious', () => {
    test('should call previous and decrease offset', () => {
      const props = { ...defaultProps, currentIndex: 2 }
      const { result } = renderHook(() => useSlider(props))

      act(() => {
        result.current.onPrevious()
      })

      expect(mockPrevious).toHaveBeenCalledTimes(1)
    })
  })

  describe('touch events', () => {
    const createTouchEvent = clientX => ({
      nativeEvent: {
        touches: [{ clientX }],
      },
    })

    test('should handle onTouchStart', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
      })

      // onTouchStart should set lastTouch internally
      expect(result.current.transitionDuration).toBe('0s')
    })

    test('should handle onTouchMove and update offset', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(200))
      })

      act(() => {
        result.current.events.onTouchMove(createTouchEvent(150))
      })

      // Moving from 200 to 150 means delta of 50 (dragging right)
      expect(result.current.offset).toBe(50)
    })

    test('should not allow negative offset on touch move', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
      })

      act(() => {
        result.current.events.onTouchMove(createTouchEvent(200))
      })

      // Trying to go negative should be clamped to 0
      expect(result.current.offset).toBe(0)
    })

    test('should not allow offset beyond maxOffset', () => {
      const props = { ...defaultProps, currentIndex: 4 }
      const { result } = renderHook(() => useSlider(props))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
      })

      act(() => {
        result.current.events.onTouchMove(createTouchEvent(0))
      })

      // maxOffset for 5 items with 300px width = 1200
      expect(result.current.offset).toBeLessThanOrEqual(1200)
    })

    test('should handle onTouchEnd and reset', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
        result.current.events.onTouchEnd()
      })

      expect(result.current.transitionDuration).toBe('0.5s')

      // After timeout, transition duration should reset
      act(() => {
        vi.advanceTimersByTime(600)
      })

      expect(result.current.transitionDuration).toBe('0s')
    })

    test('should trigger next when swipe exceeds half slide width', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(300))
      })

      act(() => {
        result.current.events.onTouchMove(createTouchEvent(100))
      })

      act(() => {
        result.current.events.onTouchEnd()
      })

      expect(mockNext).toHaveBeenCalled()
    })

    test('should trigger previous when swipe back exceeds threshold', () => {
      const props = { ...defaultProps, currentIndex: 2 }
      const { result } = renderHook(() => useSlider(props))

      // Start touch
      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
      })

      // Simulate swipe to the left (previous direction)
      act(() => {
        result.current.events.onTouchMove(createTouchEvent(400))
      })

      act(() => {
        result.current.events.onTouchEnd()
      })

      expect(mockPrevious).toHaveBeenCalled()
    })

    test('should not trigger previous when at first item', () => {
      const props = { ...defaultProps, currentIndex: 0 }
      const { result } = renderHook(() => useSlider(props))

      act(() => {
        result.current.events.onTouchStart(createTouchEvent(100))
      })

      // Try to swipe to previous on first item
      act(() => {
        result.current.events.onTouchMove(createTouchEvent(400))
      })

      act(() => {
        result.current.events.onTouchEnd()
      })

      expect(mockPrevious).not.toHaveBeenCalled()
    })
  })

  describe('mouse events', () => {
    const createMouseEvent = clientX => ({
      nativeEvent: { clientX },
    })

    test('should handle onMouseDown', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseDown(createMouseEvent(100))
      })

      expect(result.current.transitionDuration).toBe('0s')
    })

    test('should not handle onMouseMove when not dragging', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseMove(createMouseEvent(50))
      })

      // Should not change offset when not dragging
      expect(result.current.offset).toBe(0)
    })

    test('should handle onMouseMove when dragging', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseDown(createMouseEvent(200))
      })

      act(() => {
        result.current.events.onMouseMove(createMouseEvent(150))
      })

      expect(result.current.offset).toBe(50)
    })

    test('should handle onMouseUp', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseDown(createMouseEvent(100))
      })

      act(() => {
        result.current.events.onMouseUp(createMouseEvent(100))
      })

      expect(result.current.transitionDuration).toBe('0.5s')
    })

    test('should handle onMouseLeave when dragging', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseDown(createMouseEvent(200))
      })

      act(() => {
        result.current.events.onMouseMove(createMouseEvent(150))
      })

      act(() => {
        result.current.events.onMouseLeave(createMouseEvent(100))
      })

      // Mouse leave while dragging should act like mouse up
      expect(result.current.transitionDuration).toBe('0.5s')
    })

    test('should not handle onMouseLeave when not dragging', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      act(() => {
        result.current.events.onMouseLeave(createMouseEvent(100))
      })

      // Should not trigger transition when not dragging
      expect(result.current.transitionDuration).toBe('0s')
    })
  })

  describe('edge cases', () => {
    test('should handle null containerRef', () => {
      const props = {
        ...defaultProps,
        containerRef: { current: null },
      }
      const { result } = renderHook(() => useSlider(props))

      expect(result.current.offset).toBe(0)
    })

    test('should snap back to current position on small drag', () => {
      const { result } = renderHook(() => useSlider(defaultProps))

      // Small drag that shouldn't trigger navigation
      act(() => {
        result.current.events.onTouchStart({ nativeEvent: { touches: [{ clientX: 100 }] } })
      })

      act(() => {
        result.current.events.onTouchMove({ nativeEvent: { touches: [{ clientX: 80 }] } })
      })

      act(() => {
        result.current.events.onTouchEnd()
      })

      // After snap back, offset should return to currentIndex * itemWidth
      act(() => {
        vi.advanceTimersByTime(600)
      })

      expect(result.current.offset).toBe(0)
    })
  })
})
