import type { CalculatorAction, Operator } from '../state/types';

export function mapKey(event: KeyboardEvent): CalculatorAction | null {
  const { key, code } = event;
  const isMod = event.ctrlKey || event.metaKey;
  const isShift = event.shiftKey;

  if (isMod) {
    if (key === 'z' || key === 'Z') {
      return null;
    }
    if (key === 'y' || key === 'Y') {
      return null;
    }
    if (key === 'c' || key === 'C') {
      return null;
    }
    return null;
  }

  if (key === 'Escape') {
    return { type: 'clear' };
  }
  if (key === 'Delete') {
    return null;
  }
  if (key === 'Backspace') {
    return { type: 'backspace' };
  }
  if (key === 'Enter' || code === 'NumpadEnter') {
    return { type: 'equals' };
  }
  if (key === '.' || key === ',') {
    return { type: 'decimal' };
  }
  if (isShift && key === '=') {
    return { type: 'operation', op: '+' };
  }
  if (key === '=') {
    return { type: 'equals' };
  }
  if (key === '+') {
    return { type: 'operation', op: '+' };
  }
  if (key === '-') {
    return { type: 'operation', op: '-' };
  }
  if (key === '*' || (isShift && key === '8') || code === 'NumpadMultiply') {
    return { type: 'operation', op: '*' };
  }
  if (key === '/' || code === 'NumpadDivide') {
    return { type: 'operation', op: '/' };
  }
  if (key === '%') {
    return null;
  }
  if (key === '_') {
    return null;
  }
  if (/^[0-9]$/.test(key)) {
    return { type: 'digit', value: key };
  }
  return null;
}

export function isNumpadDigit(code: string): boolean {
  return /^Numpad[0-9]$/.test(code);
}

export type { Operator };
