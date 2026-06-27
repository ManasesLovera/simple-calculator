import { useReducer } from 'react';
import type { CalculatorAction, Operator } from './state/types';
import { calculatorReducer } from './state/calculatorReducer';
import { initialState } from './state/types';
import './App.css';

const digit = (value: string): CalculatorAction => ({ type: 'digit', value });
const op = (o: Operator): CalculatorAction => ({ type: 'operation', op: o });
const equals: CalculatorAction = { type: 'equals' };
const clear: CalculatorAction = { type: 'clear' };
const decimal: CalculatorAction = { type: 'decimal' };

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <section id="center">
      <div className="calculator-container">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="display" data-testid="display" aria-live="polite">{state.display}</div>
          <div className="button-grid">
            <button onClick={() => dispatch(clear)} className="btn btn-special" aria-label="All clear">AC</button>
            <button onClick={() => dispatch(op('/'))} className="btn btn-operation" aria-label="Divide">÷</button>
            <button onClick={() => dispatch(op('*'))} className="btn btn-operation" aria-label="Multiply">×</button>
            <button onClick={() => dispatch(digit('7'))} className="btn" aria-label="7">7</button>
            <button onClick={() => dispatch(digit('8'))} className="btn" aria-label="8">8</button>
            <button onClick={() => dispatch(digit('9'))} className="btn" aria-label="9">9</button>
            <button onClick={() => dispatch(op('-'))} className="btn btn-operation" aria-label="Subtract">−</button>
            <button onClick={() => dispatch(digit('4'))} className="btn" aria-label="4">4</button>
            <button onClick={() => dispatch(digit('5'))} className="btn" aria-label="5">5</button>
            <button onClick={() => dispatch(digit('6'))} className="btn" aria-label="6">6</button>
            <button onClick={() => dispatch(op('+'))} className="btn btn-operation" aria-label="Add">+</button>
            <button onClick={() => dispatch(digit('1'))} className="btn" aria-label="1">1</button>
            <button onClick={() => dispatch(digit('2'))} className="btn" aria-label="2">2</button>
            <button onClick={() => dispatch(digit('3'))} className="btn" aria-label="3">3</button>
            <button onClick={() => dispatch(equals)} className="btn btn-equals" aria-label="Equals">=</button>
            <button onClick={() => dispatch(digit('0'))} className="btn btn-zero" aria-label="0">0</button>
            <button onClick={() => dispatch(decimal)} className="btn" aria-label="Decimal point">.</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
