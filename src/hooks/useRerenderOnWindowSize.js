import React from 'react';

const useRerenderOnWindowSize = () => {
  // Force component to re render. We don't need the window size
  // value, just that component re renders.
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, []);

  return forceUpdate;
};

export default useRerenderOnWindowSize;
