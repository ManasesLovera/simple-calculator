export const performCalculation = (prev: number, current: number, operation: string): number => {
  switch (operation) {
    case '+':
      return prev + current
    case '-':
      return prev - current
    case '*':
      return prev * current
    case '/':
      return prev / current
    default:
      return current
  }
}
