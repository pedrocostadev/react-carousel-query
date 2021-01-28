import React from 'react';

const useLastTouch = () => {
  const [state, setState] = React.useState(0);

  const setLastTouch = (evt) => setState(evt.nativeEvent.touches[0].clientX);

  const resetLastTouch = () => setState(0);

  return { lastTouch: state, setLastTouch, resetLastTouch };
};

export default useLastTouch;
