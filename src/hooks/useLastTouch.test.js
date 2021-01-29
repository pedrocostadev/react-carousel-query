import { renderHook, act } from '@testing-library/react-hooks';
import useLastTouch from '@hooks/useLastTouch';

describe('useLastTouch', () => {
  const touchX = 100;

  const MOCK_EVENT = {
    nativeEvent: {
      touches: [{ clientX: touchX }],
    },
  };

  test('should setLastTouch', () => {
    const { result } = renderHook(() => useLastTouch());

    act(() => {
      result.current.setLastTouch(MOCK_EVENT);
    });

    expect(result.current.lastTouch).toEqual(touchX);
  });

  test('should resetLastTouch', () => {
    const { result } = renderHook(() => useLastTouch());

    act(() => {
      result.current.setLastTouch(MOCK_EVENT);
      result.current.resetLastTouch();
    });

    expect(result.current.lastTouch).toEqual(0);
  });
});
