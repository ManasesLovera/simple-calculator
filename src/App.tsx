import { useState } from 'react'
import { performCalculation } from './utils/calculator'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }


  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = performCalculation(previousValue, parseFloat(display), operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  return (
    <>
      <section id="center">
        <div className="calculator-container">
          <h1>Calculator</h1>
          <div className="calculator">
            <div className="display">{display}</div>
            <div className="button-grid">
              <button onClick={handleClear} className="btn btn-special">
                AC
              </button>
              <button onClick={() => handleOperation('/')} className="btn btn-operation">
                ÷
              </button>
              <button onClick={() => handleOperation('*')} className="btn btn-operation">
                ×
              </button>
              <button onClick={() => handleNumber('7')} className="btn">
                7
              </button>
              <button onClick={() => handleNumber('8')} className="btn">
                8
              </button>
              <button onClick={() => handleNumber('9')} className="btn">
                9
              </button>
              <button onClick={() => handleOperation('-')} className="btn btn-operation">
                −
              </button>
              <button onClick={() => handleNumber('4')} className="btn">
                4
              </button>
              <button onClick={() => handleNumber('5')} className="btn">
                5
              </button>
              <button onClick={() => handleNumber('6')} className="btn">
                6
              </button>
              <button onClick={() => handleOperation('+')} className="btn btn-operation">
                +
              </button>
              <button onClick={() => handleNumber('1')} className="btn">
                1
              </button>
              <button onClick={() => handleNumber('2')} className="btn">
                2
              </button>
              <button onClick={() => handleNumber('3')} className="btn">
                3
              </button>
              <button onClick={handleEquals} className="btn btn-equals">
                =
              </button>
              <button onClick={() => handleNumber('0')} className="btn btn-zero">
                0
              </button>
              <button onClick={handleDecimal} className="btn">
                .
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
