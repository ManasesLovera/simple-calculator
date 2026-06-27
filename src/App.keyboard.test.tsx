import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App keyboard input (F1)', () => {
  async function setupUser() {
    const user = userEvent.setup();
    render(<App />);
    return user;
  }

  it('types 12+34= and shows 46', async () => {
    const user = await setupUser();
    await user.keyboard('1');
    await user.keyboard('2');
    await user.keyboard('+');
    await user.keyboard('3');
    await user.keyboard('4');
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('display')).toHaveTextContent('46');
  });

  it('Escape clears the display', async () => {
    const user = await setupUser();
    await user.keyboard('9');
    await user.keyboard('9');
    await user.keyboard('{Escape}');
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  it('Backspace deletes the last digit', async () => {
    const user = await setupUser();
    await user.keyboard('1');
    await user.keyboard('2');
    await user.keyboard('3');
    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('display')).toHaveTextContent('12');
  });

  it('Backspace down to empty resets to 0', async () => {
    const user = await setupUser();
    await user.keyboard('5');
    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  it('"=" key triggers equals', async () => {
    const user = await setupUser();
    await user.keyboard('7');
    await user.keyboard('+');
    await user.keyboard('8');
    await user.keyboard('=');
    expect(screen.getByTestId('display')).toHaveTextContent('15');
  });

  it('Shift+=" produces +', async () => {
    const user = await setupUser();
    await user.keyboard('4');
    await user.keyboard('{Shift>}{=}{/Shift}');
    await user.keyboard('6');
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  it('"/" key triggers division', async () => {
    const user = await setupUser();
    await user.keyboard('8');
    await user.keyboard('/');
    await user.keyboard('2');
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('display')).toHaveTextContent('4');
  });

  it('"*" key triggers multiplication', async () => {
    const user = await setupUser();
    await user.keyboard('6');
    await user.keyboard('*');
    await user.keyboard('7');
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('display')).toHaveTextContent('42');
  });

  it('"." key enters decimal', async () => {
    const user = await setupUser();
    await user.keyboard('1');
    await user.keyboard('.');
    await user.keyboard('5');
    expect(screen.getByTestId('display')).toHaveTextContent('1.5');
  });

  it('"junk" keys are ignored', async () => {
    const user = await setupUser();
    await user.keyboard('a');
    await user.keyboard('F5');
    await user.keyboard('5');
    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  it('is a no-op when an input has focus', async () => {
    render(
      <>
        <input data-testid="trap" />
        <App />
      </>
    );
    const trap = screen.getByTestId('trap') as HTMLInputElement;
    await act(async () => {
      trap.focus();
    });
    fireEvent.keyDown(trap, { key: '9' });
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  it('highlights the pressed key button for 80ms', async () => {
    const user = await setupUser();
    await user.keyboard('7');
    const btn = screen.getByRole('button', { name: '7' });
    expect(btn.className).toMatch(/btn--active/);
  });
});
