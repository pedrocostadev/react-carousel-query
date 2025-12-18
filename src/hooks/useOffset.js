import React from 'react'

const useOffset = ({ currentIndex, itemWidth, total }) => {
  const [offset, setOffset] = React.useState(0)

  const maxOffset = React.useMemo(() => (total - 1) * itemWidth, [total, itemWidth])

  const increaseOffset = React.useCallback(
    () =>
      setOffset(currentOffset => {
        const newOffset = currentOffset + itemWidth
        if (newOffset > maxOffset) {
          return currentOffset
        }
        return currentOffset + itemWidth
      }),
    [itemWidth, maxOffset]
  )

  const decreaseOffset = React.useCallback(
    () =>
      setOffset(currentOffset => {
        if (currentOffset === 0) {
          return currentOffset
        }
        return currentOffset - itemWidth
      }),
    [itemWidth]
  )

  const setNextOffset = React.useCallback(
    () => setOffset((currentIndex + 1) * itemWidth),
    [currentIndex, itemWidth]
  )

  const setPreviousOffset = React.useCallback(
    () => setOffset((currentIndex - 1) * itemWidth),
    [currentIndex, itemWidth]
  )

  // When window size changes we need to react!
  React.useLayoutEffect(() => {
    setOffset(currentIndex * itemWidth)
  }, [itemWidth, currentIndex])

  return {
    offset,
    maxOffset,
    setOffset,
    increaseOffset,
    decreaseOffset,
    setNextOffset,
    setPreviousOffset,
  }
}

export default useOffset
