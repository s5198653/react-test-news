import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('converts the first letter of a lowercase word to uppercase', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('does not change the first letter if it is already uppercase', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('returns an empty string if the input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('correctly handles single-character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('does not change the rest of the characters in the string', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });
});
