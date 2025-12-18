import React from 'react'

const DEFAULT_STEP = 3

export const UseQueryManagerContext = React.createContext({})

export const useQueryManager = () => React.useContext(UseQueryManagerContext)

export const useQueryManagerProvider = ({ getData, fetchStep = DEFAULT_STEP }) => {
  const [state, setState] = React.useState({
    offset: 0,
    total: 0,
    items: [],
    currentIndex: 0,
  })

  React.useEffect(() => {
    const isLastItem = state.currentIndex + 1 === state.total
    const isLastItemFetched = state.currentIndex + 1 >= state.offset

    const setData = data => {
      const { offset: newOffset, items, total } = data
      setState(currentState => ({
        ...currentState,
        offset: newOffset + fetchStep,
        total,
        items: state.items.concat(items),
      }))
    }
    const fetchData = async () => {
      if (!isLastItemFetched || isLastItem) {
        return
      }
      const data = await getData({ offset: state.offset, limit: fetchStep })
      setData(data)
    }
    fetchData()
  }, [fetchStep, getData, state.offset, state.total, state.currentIndex, state.items])

  const setCurrentIndex = React.useCallback(currentIndex => {
    setState(currentState => ({ ...currentState, currentIndex }))
  }, [])

  const next = React.useCallback(() => {
    setState(currentState => ({
      ...currentState,
      currentIndex:
        currentState.currentIndex + 1 === currentState.total
          ? currentState.currentIndex
          : currentState.currentIndex + 1,
    }))
  }, [])

  const previous = React.useCallback(() => {
    setState(currentState => ({
      ...currentState,
      currentIndex:
        currentState.currentIndex <= 0 ? currentState.currentIndex : currentState.currentIndex - 1,
    }))
  }, [])

  return React.useMemo(
    () => ({
      ...state,
      setCurrentIndex,
      next,
      previous,
    }),
    [state, setCurrentIndex, next, previous]
  )
}
