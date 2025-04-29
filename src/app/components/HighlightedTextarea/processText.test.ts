import { describe, it, expect } from 'vitest';
import { processText, processTextToken } from './processText';

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

describe('processText', () => {
  it('processText should correctly parse and process text', () => {
    const result = processText('(TI="Kaspersky" OR A="Avast") AND NOT test');

    const expected = `(<span class="key">TI</span>="<span class="value">Kaspersky</span>" <span class="operator">OR</span> <span class="key">A</span>="<span class="value">Avast</span>") <span class="operator">AND</span> <span class="operator">NOT</span> test`;
    expect(result).toBe(expected);
  });
});
