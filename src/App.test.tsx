import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the initial display of 0', () => {
    render(<App />);
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  it('renders all 17 buttons with accessible names', () => {
    render(<App />);
    const all = screen.getAllByRole('button');
    expect(all).toHaveLength(17);
    for (const name of ['All clear', 'Divide', 'Multiply', 'Subtract', 'Add', 'Equals', 'Decimal point']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    for (const n of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      expect(screen.getByRole('button', { name: n })).toBeInTheDocument();
    }
  });

  it('updates the display when digits are clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByTestId('display')).toHaveTextContent('123');
  });

  it('performs addition: 2 + 3 = 5', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  it('performs subtraction: 9 - 4 = 5', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'Subtract' }));
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  it('performs multiplication: 6 × 7 = 42', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '6' }));
    await user.click(screen.getByRole('button', { name: 'Multiply' }));
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    expect(screen.getByTestId('display')).toHaveTextContent('42');
  });

  it('performs division: 8 ÷ 2 = 4', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: 'Divide' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    expect(screen.getByTestId('display')).toHaveTextContent('4');
  });

  it('handles decimal numbers: 1.5 + 2.5 = 4', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'Decimal point' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Decimal point' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    expect(screen.getByTestId('display')).toHaveTextContent('4');
  });

  it('does not allow a second decimal point', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'Decimal point' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'Decimal point' }));
    expect(screen.getByTestId('display')).toHaveTextContent('1.5');
  });

  it('resets on All Clear', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'All clear' }));
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });
});
