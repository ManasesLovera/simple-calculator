import { useEffect, useRef } from 'react';
import type { CalculatorAction } from '../state/types';
import { mapKey } from '../utils/keyMap';

export function useKeyboardInput(
  dispatch: (action: CalculatorAction) => void,
  enabled: boolean = true
): void {
  const dispatchRef = useRef(dispatch);
  useEffect(() => {
    dispatchRef.current = dispatch;
  });

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
      }
      const action = mapKey(event);
      if (action === null) return;
      event.preventDefault();
      dispatchRef.current(action);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled]);
}
