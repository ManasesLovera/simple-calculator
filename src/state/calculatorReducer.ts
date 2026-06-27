import { performCalculation } from '../utils/calculator';
import type { CalculatorAction, CalculatorState } from './types';

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case 'digit': {
      if (state.waitingForNewValue) {
        return { ...state, display: action.value, waitingForNewValue: false };
      }
      return {
        ...state,
        display: state.display === '0' ? action.value : state.display + action.value,
      };
    }

    case 'decimal': {
      if (state.waitingForNewValue) {
        return { ...state, display: '0.', waitingForNewValue: false };
      }
      if (state.display.includes('.')) {
        return state;
      }
      return { ...state, display: state.display + '.' };
    }

    case 'operation': {
      const currentValue = parseFloat(state.display);
      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: currentValue,
          operation: action.op,
          waitingForNewValue: true,
        };
      }
      if (state.operation === null) {
        return {
          ...state,
          previousValue: currentValue,
          operation: action.op,
          waitingForNewValue: true,
        };
      }
      const result = performCalculation(state.previousValue, currentValue, state.operation);
      return {
        ...state,
        previousValue: result,
        operation: action.op,
        display: String(result),
        waitingForNewValue: true,
      };
    }

    case 'equals': {
      if (state.operation === null || state.previousValue === null) {
        return state;
      }
      const result = performCalculation(state.previousValue, parseFloat(state.display), state.operation);
      return {
        display: String(result),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      };
    }

    case 'clear': {
      return {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
      };
    }

    case 'backspace': {
      if (state.waitingForNewValue) {
        return state;
      }
      if (state.display.length <= 1 || (state.display.length === 2 && state.display.startsWith('-'))) {
        return { ...state, display: '0' };
      }
      return { ...state, display: state.display.slice(0, -1) };
    }
  }
}
