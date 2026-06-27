export type Operator = '+' | '-' | '*' | '/';

export type CalculatorState = {
  display: string;
  previousValue: number | null;
  operation: Operator | null;
  waitingForNewValue: boolean;
};

export type CalculatorAction =
  | { type: 'digit'; value: string }
  | { type: 'decimal' }
  | { type: 'operation'; op: Operator }
  | { type: 'equals' }
  | { type: 'clear' };

export const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
};
