import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  offset: 0,
  limit: 3,
  total: undefined,
  items: [],
  isLoading: false,
  currentIndex: 0,
};

const DEFAULT_STEP = 3;

export const UseQueryManagerContext = React.createContext(initialState);

export const useQueryManager = () => {
  return React.useContext(UseQueryManagerContext);
};

export const useQueryManagerProvider = ({ getUrl, getData }) => {
  const [state, setState] = React.useState({
    currentOffset: 0,
    nextOffset: 0,
    limit: 3,
    total: undefined,
    items: [],
    isLoading: true,
    currentIndex: 0,
  });

  const setData = (data) => {
    const { offset, items, total } = getData(data);
    setState((currentState) => ({
      ...currentState,
      currentOffset: offset,
      nextOffset: offset + DEFAULT_STEP,
      total,
      items: state.items.concat(items),
      isLoading: false,
    }));
  };

  const setLoading = (isLoading) =>
    setState((currentState) => ({ ...currentState, isLoading: isLoading }));

  const fetchData = async () => {
    if (
      state.currentIndex + 1 < state.nextOffset ||
      state.currentIndex + 1 < state.items.length
    ) {
      return;
    }

    setLoading(true);
    const url = getUrl(state.nextOffset, DEFAULT_STEP);
    const { data } = await (await fetch(url)).json();
    setData(data);
  };

  const setCurrentIndex = (currentIndex) => {
    setState((currentState) => ({ ...currentState, currentIndex }));
  };

  const next = () => {
    setState((currentState) => ({
      ...currentState,
      currentIndex:
        state.currentIndex === state.total
          ? state.currentIndex
          : state.currentIndex + 1,
    }));
  };

  const previous = () => {
    setState((currentState) => ({
      ...currentState,
      currentIndex:
        state.currentIndex <= 0 ? state.currentIndex : state.currentIndex - 1,
    }));
  };

  React.useEffect(fetchData, [state.currentIndex]);

  return {
    ...state,
    setCurrentIndex,
    next,
    previous,
  };
};

export const QueryManagerProvider = ({ children, getUrl, getData }) => {
  const queryManager = useQueryManagerProvider({ getUrl, getData });
  return (
    <UseQueryManagerContext.Provider value={queryManager}>
      {children}
    </UseQueryManagerContext.Provider>
  );
};

QueryManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  getUrl: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
