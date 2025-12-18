import React from 'react'

const getLastTouchValue = ({ nativeEvent }) => {
  if (nativeEvent.touches) {
    return nativeEvent.touches[0].clientX
  }
  return nativeEvent.clientX
}

const useLastTouch = () => {
  const lastTouchRef = React.useRef(0)
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)

  const setLastTouch = React.useCallback(evt => {
    lastTouchRef.current = getLastTouchValue(evt)
    forceUpdate()
  }, [])

  const resetLastTouch = React.useCallback(() => {
    lastTouchRef.current = 0
  }, [])

  const getTouchDelta = React.useCallback(ev => lastTouchRef.current - getLastTouchValue(ev), [])

  return { lastTouch: lastTouchRef.current, setLastTouch, resetLastTouch, getTouchDelta }
}

export default useLastTouch
