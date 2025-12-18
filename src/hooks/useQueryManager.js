import React from 'react'

const DEFAULT_STEP = 3

export const UseQueryManagerContext = React.createContext({})

export const useQueryManager = () => React.useContext(UseQueryManagerContext)

export const useQueryManagerProvider = ({ getData, fetchStep = DEFAULT_STEP }) => {
  const [state, setState] = React.useState({
    offset: 0,
    cursor: null,
    total: 0,
    items: [],
    currentIndex: 0,
    hasMore: true,
  })

  React.useEffect(() => {
    const needsMoreItems = state.currentIndex + 1 >= state.offset
    const canFetchMore = state.hasMore

    const setData = data => {
      const { items, total, nextCursor } = data
      const useCursorMode = nextCursor !== undefined

      setState(currentState => {
        const newItemsCount = currentState.items.length + items.length
        const newTotal = total ?? newItemsCount
        const newOffset = currentState.offset + fetchStep

        // Determine if there's more data to fetch
        let hasMoreData
        if (useCursorMode) {
          // Cursor mode: hasMore is true if nextCursor is not null/undefined
          hasMoreData = nextCursor != null
        } else {
          // Offset mode: hasMore is true if we haven't reached total
          hasMoreData = newOffset < newTotal
        }

        return {
          ...currentState,
          offset: newOffset,
          cursor: nextCursor ?? null,
          total: newTotal,
          items: currentState.items.concat(items),
          hasMore: hasMoreData,
        }
      })
    }

    const fetchData = async () => {
      if (!needsMoreItems || !canFetchMore) {
        return
      }
      const data = await getData({
        offset: state.offset,
        cursor: state.cursor,
        limit: fetchStep,
      })
      setData(data)
    }
    fetchData()
  }, [
    fetchStep,
    getData,
    state.offset,
    state.total,
    state.currentIndex,
    state.items,
    state.hasMore,
    state.cursor,
  ])

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
