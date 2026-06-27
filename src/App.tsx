import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { CalculatorAction, Operator } from './state/types';
import { calculatorReducer } from './state/calculatorReducer';
import { initialState } from './state/types';
import { useKeyboardInput } from './hooks/useKeyboardInput';
import './App.css';

const digit = (value: string): CalculatorAction => ({ type: 'digit', value });
const op = (o: Operator): CalculatorAction => ({ type: 'operation', op: o });
const equals: CalculatorAction = { type: 'equals' };
const clear: CalculatorAction = { type: 'clear' };
const decimal: CalculatorAction = { type: 'decimal' };

const KEY_TO_BUTTON_LABEL: Record<string, string | null> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': 'Decimal point', ',': 'Decimal point',
  '+': 'Add', '-': 'Subtract', '*': 'Multiply', '/': 'Divide',
  'Enter': 'Equals', '=': 'Equals',
  'Backspace': null,
  'Escape': 'All clear',
};

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const wrappedDispatch = useCallback((action: CalculatorAction) => {
    dispatch(action);
    const key = action.type === 'digit' ? action.value
      : action.type === 'operation' ? action.op
      : action.type === 'backspace' ? 'Backspace'
      : action.type === 'decimal' ? '.'
      : action.type === 'equals' ? 'Enter'
      : action.type === 'clear' ? 'Escape'
      : null;
    if (key !== null) {
      setPressedKey(key);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setPressedKey(null), 80);
    }
  }, []);

  useKeyboardInput(wrappedDispatch);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const buttonClass = (label: string | null, base = 'btn') => {
    if (label === null || pressedKey !== label) return base;
    return `${base} btn--active`;
  };

  return (
    <section id="center">
      <div className="calculator-container">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="display" data-testid="display" aria-live="polite">{state.display}</div>
          <div className="button-grid">
            <button
              onClick={() => dispatch(clear)}
              className={buttonClass(KEY_TO_BUTTON_LABEL['Escape'], 'btn btn-special')}
              aria-label="All clear"
              title="All clear (Esc)"
            >
              AC
            </button>
            <button
              onClick={() => dispatch(op('/'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['/'], 'btn btn-operation')}
              aria-label="Divide"
              title="Divide (/)"
            >
              ÷
            </button>
            <button
              onClick={() => dispatch(op('*'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['*'], 'btn btn-operation')}
              aria-label="Multiply"
              title="Multiply (*)"
            >
              ×
            </button>
            <button
              onClick={() => dispatch(digit('7'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['7'])}
              aria-label="7"
              title="7"
            >
              7
            </button>
            <button
              onClick={() => dispatch(digit('8'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['8'])}
              aria-label="8"
              title="8"
            >
              8
            </button>
            <button
              onClick={() => dispatch(digit('9'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['9'])}
              aria-label="9"
              title="9"
            >
              9
            </button>
            <button
              onClick={() => dispatch(op('-'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['-'], 'btn btn-operation')}
              aria-label="Subtract"
              title="Subtract (-)"
            >
              −
            </button>
            <button
              onClick={() => dispatch(digit('4'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['4'])}
              aria-label="4"
              title="4"
            >
              4
            </button>
            <button
              onClick={() => dispatch(digit('5'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['5'])}
              aria-label="5"
              title="5"
            >
              5
            </button>
            <button
              onClick={() => dispatch(digit('6'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['6'])}
              aria-label="6"
              title="6"
            >
              6
            </button>
            <button
              onClick={() => dispatch(op('+'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['+'], 'btn btn-operation')}
              aria-label="Add"
              title="Add (+)"
            >
              +
            </button>
            <button
              onClick={() => dispatch(digit('1'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['1'])}
              aria-label="1"
              title="1"
            >
              1
            </button>
            <button
              onClick={() => dispatch(digit('2'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['2'])}
              aria-label="2"
              title="2"
            >
              2
            </button>
            <button
              onClick={() => dispatch(digit('3'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['3'])}
              aria-label="3"
              title="3"
            >
              3
            </button>
            <button
              onClick={() => dispatch(equals)}
              className={buttonClass(KEY_TO_BUTTON_LABEL['Enter'], 'btn btn-equals')}
              aria-label="Equals"
              title="Equals (Enter or =)"
            >
              =
            </button>
            <button
              onClick={() => dispatch(digit('0'))}
              className={buttonClass(KEY_TO_BUTTON_LABEL['0'], 'btn btn-zero')}
              aria-label="0"
              title="0"
            >
              0
            </button>
            <button
              onClick={() => dispatch(decimal)}
              className={buttonClass(KEY_TO_BUTTON_LABEL['.'])}
              aria-label="Decimal point"
              title="Decimal point (.)"
            >
              .
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
