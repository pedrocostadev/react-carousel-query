import React from 'react'

const useOffset = ({ currentIndex, itemWidth, total }) => {
  const [offset, setOffset] = React.useState(0)

  const maxOffset = (total - 1) * itemWidth

  const increaseOffset = () =>
    setOffset(currentOffset => {
      const newOffset = currentOffset + itemWidth
      if (newOffset > maxOffset) {
        return currentOffset
      }
      return currentOffset + itemWidth
    })

  const decreaseOffset = () =>
    setOffset(currentOffset => {
      if (currentOffset === 0) {
        return currentOffset
      }
      return currentOffset - itemWidth
    })

  const setNextOffset = () => setOffset((currentIndex + 1) * itemWidth)

  const setPreviousOffset = () => setOffset((currentIndex - 1) * itemWidth)

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
