import { describe, it, expect } from 'vitest';
import { mapKey } from './keyMap';

const ev = (overrides: Partial<KeyboardEvent>): KeyboardEvent => ({
  key: '',
  code: '',
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  isContentEditable: false,
  target: null,
  preventDefault: () => {},
  ...overrides,
} as unknown as KeyboardEvent);

describe('mapKey', () => {
  describe('digits', () => {
    for (const d of '0123456789') {
      it(`maps "${d}" to digit`, () => {
        expect(mapKey(ev({ key: d }))).toEqual({ type: 'digit', value: d });
      });
    }
  });

  describe('decimal', () => {
    it('maps "."', () => {
      expect(mapKey(ev({ key: '.' }))).toEqual({ type: 'decimal' });
    });
    it('maps ","', () => {
      expect(mapKey(ev({ key: ',' }))).toEqual({ type: 'decimal' });
    });
  });

  describe('operators', () => {
    it('maps "+"', () => {
      expect(mapKey(ev({ key: '+' }))).toEqual({ type: 'operation', op: '+' });
    });
    it('maps "=" with shift to "+"', () => {
      const result = mapKey(ev({ key: '=', shiftKey: true }));
      expect(result).toEqual({ type: 'operation', op: '+' });
    });
    it('maps "-"', () => {
      expect(mapKey(ev({ key: '-' }))).toEqual({ type: 'operation', op: '-' });
    });
    it('maps "*"', () => {
      expect(mapKey(ev({ key: '*' }))).toEqual({ type: 'operation', op: '*' });
    });
    it('maps shift+8 to "*"', () => {
      expect(mapKey(ev({ key: '8', shiftKey: true }))).toEqual({ type: 'operation', op: '*' });
    });
    it('maps NumpadMultiply', () => {
      expect(mapKey(ev({ key: '', code: 'NumpadMultiply' }))).toEqual({ type: 'operation', op: '*' });
    });
    it('maps "/"', () => {
      expect(mapKey(ev({ key: '/' }))).toEqual({ type: 'operation', op: '/' });
    });
    it('maps NumpadDivide', () => {
      expect(mapKey(ev({ key: '', code: 'NumpadDivide' }))).toEqual({ type: 'operation', op: '/' });
    });
  });

  describe('equals', () => {
    it('maps "Enter"', () => {
      expect(mapKey(ev({ key: 'Enter' }))).toEqual({ type: 'equals' });
    });
    it('maps "="', () => {
      expect(mapKey(ev({ key: '=' }))).toEqual({ type: 'equals' });
    });
    it('maps NumpadEnter', () => {
      expect(mapKey(ev({ key: '', code: 'NumpadEnter' }))).toEqual({ type: 'equals' });
    });
  });

  describe('backspace', () => {
    it('maps "Backspace"', () => {
      expect(mapKey(ev({ key: 'Backspace' }))).toEqual({ type: 'backspace' });
    });
  });

  describe('clear', () => {
    it('maps "Escape"', () => {
      expect(mapKey(ev({ key: 'Escape' }))).toEqual({ type: 'clear' });
    });
  });

  describe('modifiers return null', () => {
    it('Ctrl+Z is null (reserved for undo)', () => {
      expect(mapKey(ev({ key: 'z', ctrlKey: true }))).toBeNull();
    });
    it('Cmd+Z is null (reserved for undo)', () => {
      expect(mapKey(ev({ key: 'z', metaKey: true }))).toBeNull();
    });
    it('Ctrl+Y is null (reserved for redo)', () => {
      expect(mapKey(ev({ key: 'y', ctrlKey: true }))).toBeNull();
    });
    it('Ctrl+C is null (browser copy)', () => {
      expect(mapKey(ev({ key: 'c', ctrlKey: true }))).toBeNull();
    });
  });

  describe('invalid keys return null', () => {
    it('letter "a"', () => {
      expect(mapKey(ev({ key: 'a' }))).toBeNull();
    });
    it('F5', () => {
      expect(mapKey(ev({ key: 'F5' }))).toBeNull();
    });
    it('ArrowUp', () => {
      expect(mapKey(ev({ key: 'ArrowUp' }))).toBeNull();
    });
  });
});
