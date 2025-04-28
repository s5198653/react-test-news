import { describe, it, expect } from 'vitest';
import { processTextToken } from './processTextToken';

describe('processTextToken', () => {
  it.each([
    { textToken: 'TI', type: 'key', expected: '<span class="key">TI</span>' },
    {
      textToken: 'Kaspersky',
      type: 'value',
      expected: '<span class="value">Kaspersky</span>',
    },
    {
      textToken: 'AND',
      type: 'operator',
      expected: '<span class="operator">AND</span>',
    },
  ])(
    '$textToken type of $type should process to $expected',
    ({ textToken, type, expected }) => {
      expect(
        processTextToken(textToken, type as 'key' | 'value' | 'operator')
      ).toBe(expected);
    }
  );
});
