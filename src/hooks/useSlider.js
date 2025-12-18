import React from 'react'

import useOffset from '@hooks/useOffset'
import useLastTouch from '@hooks/useLastTouch'

const HALF_SECOND = 500
const TRANSITON_SNAP_DURATION = HALF_SECOND + 100

const useSlider = ({ containerRef, next, previous, currentIndex, total }) => {
  const itemWidth = containerRef.current && containerRef.current.offsetWidth

  const {
    offset,
    maxOffset,
    setOffset,
    setNextOffset,
    setPreviousOffset,
    decreaseOffset,
    increaseOffset,
  } = useOffset({
    currentIndex,
    itemWidth,
    total,
  })

  const { setLastTouch, resetLastTouch, getTouchDelta } = useLastTouch()

  const [transitionDuration, setTransitionDuration] = React.useState('0s')

  const resetTransitionDuration = React.useCallback(
    () => setTimeout(() => setTransitionDuration('0s'), TRANSITON_SNAP_DURATION),
    []
  )

  const onMovement = React.useCallback(
    delta => {
      setOffset(currentOffset => {
        const nextOffset = currentOffset + delta
        const isNegativeOffset = nextOffset < 0
        const isInvalidOffset = nextOffset > maxOffset

        if (isNegativeOffset) {
          return 0
        }

        if (isInvalidOffset) {
          return maxOffset
        }

        return nextOffset
      })
    },
    [maxOffset, setOffset]
  )

  const onMovementEnd = React.useCallback(() => {
    const endPosition = offset / itemWidth
    const endPartial = endPosition % 1

    setTransitionDuration('0.5s')

    const isSwipeNext = endPosition - currentIndex > 0.5
    if (isSwipeNext) {
      setNextOffset(currentIndex)
      next()
      resetTransitionDuration()
      return
    }

    const endingIndex = endPosition - endPartial
    const deltaInteger = endingIndex - currentIndex
    const isSwipePrevious = deltaInteger === -1
    const isFirstItem = currentIndex === 0

    if (isSwipePrevious && !isFirstItem) {
      setPreviousOffset(currentIndex)
      previous()
      resetTransitionDuration()
      return
    }

    setOffset(() => currentIndex * itemWidth)
    resetTransitionDuration()
  }, [
    offset,
    itemWidth,
    currentIndex,
    setNextOffset,
    next,
    resetTransitionDuration,
    setPreviousOffset,
    previous,
    setOffset,
  ])

  const onTouchStart = React.useCallback(
    evt => {
      setLastTouch(evt)
    },
    [setLastTouch]
  )

  const onTouchMove = React.useCallback(
    evt => {
      const delta = getTouchDelta(evt)
      setLastTouch(evt)
      onMovement(delta)
    },
    [getTouchDelta, setLastTouch, onMovement]
  )

  const onTouchEnd = React.useCallback(() => {
    onMovementEnd()
    resetLastTouch()
  }, [onMovementEnd, resetLastTouch])

  const onNext = React.useCallback(() => {
    next()
    increaseOffset()
  }, [next, increaseOffset])

  const onPrevious = React.useCallback(() => {
    previous()
    decreaseOffset()
  }, [previous, decreaseOffset])

  const [isDragging, setIsDragging] = React.useState(false)

  const onMouseDown = React.useCallback(
    evt => {
      setIsDragging(true)
      onTouchStart(evt)
    },
    [onTouchStart]
  )

  const onMouseUp = React.useCallback(
    evt => {
      setIsDragging(false)
      onTouchEnd(evt)
    },
    [onTouchEnd]
  )

  const onMouseMove = React.useCallback(
    evt => {
      if (!isDragging) {
        return
      }
      onTouchMove(evt)
    },
    [isDragging, onTouchMove]
  )

  const onMouseLeave = React.useCallback(
    evt => {
      if (!isDragging) {
        return
      }
      onMouseUp(evt)
    },
    [isDragging, onMouseUp]
  )

  const events = React.useMemo(
    () => ({
      onMouseLeave,
      onMouseMove,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
    }),
    [onMouseLeave, onMouseMove, onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  )

  const onKeyDown = React.useCallback(
    evt => {
      if (evt.key === 'ArrowLeft') {
        evt.preventDefault()
        onPrevious()
      } else if (evt.key === 'ArrowRight') {
        evt.preventDefault()
        onNext()
      }
    },
    [onNext, onPrevious]
  )

  return React.useMemo(
    () => ({
      transitionDuration,
      offset,
      events,
      onNext,
      onPrevious,
      onKeyDown,
    }),
    [transitionDuration, offset, events, onNext, onPrevious, onKeyDown]
  )
}

export default useSlider
