import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_STEP = 3;

export const UseQueryManagerContext = React.createContext({});

export const useQueryManager = () => React.useContext(UseQueryManagerContext);

export const useQueryManagerProvider = ({
  getData,
  fetchStep = DEFAULT_STEP,
}) => {
  const [state, setState] = React.useState({
    offset: 0,
    total: undefined,
    items: [],
    currentIndex: 0,
  });

  const setData = (data) => {
    const { offset: newOffset, items, total } = data;
    setState((currentState) => ({
      ...currentState,
      offset: newOffset + fetchStep,
      total,
      items: state.items.concat(items),
    }));
  };

  const isLastItem = state.currentIndex + 1 === state.total;
  const isLastItemFetched = state.currentIndex + 1 >= state.offset;

  const fetchData = async () => {
    if (!isLastItemFetched || isLastItem) {
      return;
    }
    const data = await getData({ offset: state.offset, limit: fetchStep });
    setData(data);
  };

  const setCurrentIndex = (currentIndex) => {
    setState((currentState) => ({ ...currentState, currentIndex }));
  };

  const next = () => {
    setState((currentState) => ({
      ...currentState,
      currentIndex:
        state.currentIndex + 1 === state.total
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

  React.useEffect(() => {
    fetchData();
  }, [state.currentIndex]);

  return {
    ...state,
    setCurrentIndex,
    next,
    previous,
  };
};

export const QueryManagerProvider = ({ children, getData, fetchStep }) => {
  const queryManager = useQueryManagerProvider({ getData, fetchStep });
  return (
    <UseQueryManagerContext.Provider value={queryManager}>
      {children}
    </UseQueryManagerContext.Provider>
  );
};

QueryManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
};
