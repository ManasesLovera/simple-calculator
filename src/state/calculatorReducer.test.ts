import { describe, it, expect } from 'vitest';
import { calculatorReducer } from './calculatorReducer';
import { initialState } from './types';
import type { CalculatorAction, CalculatorState } from './types';

const digit = (value: string): CalculatorAction => ({ type: 'digit', value });
const op = (o: '+' | '-' | '*' | '/'): CalculatorAction => ({ type: 'operation', op: o });
const equals: CalculatorAction = { type: 'equals' };
const decimal: CalculatorAction = { type: 'decimal' };
const clear: CalculatorAction = { type: 'clear' };

const reduce = (state: CalculatorState, actions: CalculatorAction[]) =>
  actions.reduce(calculatorReducer, state);

describe('calculatorReducer', () => {
  describe('initial state', () => {
    it('starts with display "0"', () => {
      expect(initialState.display).toBe('0');
    });
    it('starts with no previous value', () => {
      expect(initialState.previousValue).toBeNull();
    });
    it('starts with no pending operation', () => {
      expect(initialState.operation).toBeNull();
    });
    it('starts not waiting for new value', () => {
      expect(initialState.waitingForNewValue).toBe(false);
    });
  });

  describe('digit', () => {
    it('replaces "0" with single digit', () => {
      const s = calculatorReducer(initialState, digit('5'));
      expect(s.display).toBe('5');
    });
    it('appends digits to non-zero display', () => {
      const s = reduce(initialState, [digit('1'), digit('2'), digit('3')]);
      expect(s.display).toBe('123');
    });
    it('replaces display when waitingForNewValue', () => {
      const s = reduce(initialState, [op('+'), digit('7')]);
      expect(s.display).toBe('7');
      expect(s.waitingForNewValue).toBe(false);
    });
    it('does not set waitingForNewValue after a digit', () => {
      const s = calculatorReducer(initialState, digit('9'));
      expect(s.waitingForNewValue).toBe(false);
    });
  });

  describe('decimal', () => {
    it('adds a decimal point to "0"', () => {
      const s = calculatorReducer(initialState, decimal);
      expect(s.display).toBe('0.');
    });
    it('appends a decimal point to a multi-digit number', () => {
      const s = reduce(initialState, [digit('1'), digit('2'), decimal]);
      expect(s.display).toBe('12.');
    });
    it('does not add a second decimal point', () => {
      const s = reduce(initialState, [digit('1'), decimal, digit('2'), decimal, digit('3')]);
      expect(s.display).toBe('1.23');
    });
    it('starts a new "0." after an operation', () => {
      const s = reduce(initialState, [digit('5'), op('+'), decimal]);
      expect(s.display).toBe('0.');
    });
  });

  describe('operation', () => {
    it('stores the current value and operation', () => {
      const s = reduce(initialState, [digit('5'), op('+')]);
      expect(s.previousValue).toBe(5);
      expect(s.operation).toBe('+');
      expect(s.waitingForNewValue).toBe(true);
    });
    it('chains operations (left-to-right)', () => {
      const s = reduce(initialState, [digit('2'), op('+'), digit('3'), op('*')]);
      expect(s.previousValue).toBe(5);
      expect(s.operation).toBe('*');
      expect(s.display).toBe('5');
    });
    it('re-evaluates and stores the new operation when the pending op is replaced', () => {
      const s = reduce(initialState, [digit('5'), op('+'), op('-')]);
      expect(s.previousValue).toBe(10);
      expect(s.operation).toBe('-');
      expect(s.display).toBe('10');
    });
    it('works with all four operators', () => {
      expect(calculatorReducer({ ...initialState, display: '4' }, op('+')).operation).toBe('+');
      expect(calculatorReducer({ ...initialState, display: '4' }, op('-')).operation).toBe('-');
      expect(calculatorReducer({ ...initialState, display: '4' }, op('*')).operation).toBe('*');
      expect(calculatorReducer({ ...initialState, display: '4' }, op('/')).operation).toBe('/');
    });
  });

  describe('equals', () => {
    it('computes addition', () => {
      const s = reduce(initialState, [digit('2'), op('+'), digit('3'), equals]);
      expect(s.display).toBe('5');
    });
    it('computes subtraction', () => {
      const s = reduce(initialState, [digit('9'), op('-'), digit('4'), equals]);
      expect(s.display).toBe('5');
    });
    it('computes multiplication', () => {
      const s = reduce(initialState, [digit('6'), op('*'), digit('7'), equals]);
      expect(s.display).toBe('42');
    });
    it('computes division', () => {
      const s = reduce(initialState, [digit('8'), op('/'), digit('2'), equals]);
      expect(s.display).toBe('4');
    });
    it('clears pending operation after equals', () => {
      const s = reduce(initialState, [digit('2'), op('+'), digit('3'), equals]);
      expect(s.previousValue).toBeNull();
      expect(s.operation).toBeNull();
      expect(s.waitingForNewValue).toBe(true);
    });
    it('is a no-op without a pending operation', () => {
      const s = calculatorReducer(initialState, equals);
      expect(s).toBe(initialState);
    });
    it('handles decimals', () => {
      const s = reduce(initialState, [digit('1'), decimal, digit('5'), op('+'), digit('2'), decimal, digit('5'), equals]);
      expect(s.display).toBe('4');
    });
    it('handles negative results', () => {
      const s = reduce(initialState, [digit('3'), op('-'), digit('8'), equals]);
      expect(s.display).toBe('-5');
    });
  });

  describe('clear', () => {
    it('resets to initial state', () => {
      const s = reduce(initialState, [digit('9'), digit('9'), op('+'), digit('1'), clear]);
      expect(s).toEqual(initialState);
    });
  });

  describe('integration', () => {
    it('multi-step: 12 + 34 = 46', () => {
      const s = reduce(initialState, [
        digit('1'), digit('2'),
        op('+'),
        digit('3'), digit('4'),
        equals,
      ]);
      expect(s.display).toBe('46');
    });
    it('chained: 2 + 3 * 4 (left-to-right) = 20', () => {
      const s = reduce(initialState, [
        digit('2'),
        op('+'), digit('3'),
        op('*'), digit('4'),
        equals,
      ]);
      expect(s.display).toBe('20');
    });
    it('chained division: 100 / 4 / 5 = 5', () => {
      const s = reduce(initialState, [
        digit('1'), digit('0'), digit('0'),
        op('/'), digit('4'),
        op('/'), digit('5'),
        equals,
      ]);
      expect(s.display).toBe('5');
    });
    it('continues after equals with new operation', () => {
      const s = reduce(initialState, [
        digit('2'), op('+'), digit('3'), equals,
        op('*'), digit('4'), equals,
      ]);
      expect(s.display).toBe('20');
    });
    it('decimal arithmetic: 0.1 + 0.2 ≈ 0.3', () => {
      const s = reduce(initialState, [
        decimal, digit('1'),
        op('+'),
        decimal, digit('2'),
        equals,
      ]);
      expect(parseFloat(s.display)).toBeCloseTo(0.3, 10);
    });
  });
});
