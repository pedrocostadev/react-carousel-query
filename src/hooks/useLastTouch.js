import React from 'react'

const getLastTouchValue = ({ nativeEvent }) => {
  if (nativeEvent.touches) {
    return nativeEvent.touches[0].clientX
  }
  return nativeEvent.clientX
}

const useLastTouch = () => {
  const [lastTouch, setState] = React.useState(0)

  const setLastTouch = evt => setState(getLastTouchValue(evt))

  const resetLastTouch = () => setState(0)

  const getTouchDelta = ev => lastTouch - getLastTouchValue(ev)

  return { lastTouch, setLastTouch, resetLastTouch, getTouchDelta }
}

export default useLastTouch
