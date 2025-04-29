import { describe, it, expect } from 'vitest';
import { parseTextareaInput } from './parseTextareaInput';

describe('parseTextareaInput', () => {
  it.each`
    input                                                                                          | result
    ${'(TI="Kaspersky" OR A="Avast") AND NOT (DP="2021-21-17" OR URL="*.com")'}                    | ${[{ index: 1, value: 'TI', type: 'key' }, { index: 5, value: 'Kaspersky', type: 'value' }, { index: 16, value: 'OR', type: 'operator' }, { index: 19, value: 'A', type: 'key' }, { index: 22, value: 'Avast', type: 'value' }, { index: 30, value: 'AND', type: 'operator' }, { index: 34, value: 'NOT', type: 'operator' }, { index: 39, value: 'DP', type: 'key' }, { index: 43, value: '2021-21-17', type: 'value' }, { index: 55, value: 'OR', type: 'operator' }, { index: 58, value: 'URL', type: 'key' }, { index: 63, value: '*.com', type: 'value' }]}
    ${'(ti="Kaspersky" or Ab="Avast") AND nOt (DP="2021-21-17" OR URL="*.com")'}                   | ${[{ index: 1, value: 'TI', type: 'key' }, { index: 5, value: 'Kaspersky', type: 'value' }, { index: 16, value: 'OR', type: 'operator' }, { index: 19, value: 'AB', type: 'key' }, { index: 23, value: 'Avast', type: 'value' }, { index: 31, value: 'AND', type: 'operator' }, { index: 35, value: 'NOT', type: 'operator' }, { index: 40, value: 'DP', type: 'key' }, { index: 44, value: '2021-21-17', type: 'value' }, { index: 56, value: 'OR', type: 'operator' }, { index: 59, value: 'URL', type: 'key' }, { index: 64, value: '*.com', type: 'value' }]}
    ${'(TI="Kaspersky= RRT= NOT and" OR AB="Avast") AND (DP="2021-21-17" OR URL="*.com")'}         | ${[{ index: 1, value: 'TI', type: 'key' }, { index: 5, value: 'Kaspersky= RRT= NOT and', type: 'value' }, { index: 30, value: 'OR', type: 'operator' }, { index: 33, value: 'AB', type: 'key' }, { index: 37, value: 'Avast', type: 'value' }, { index: 45, value: 'AND', type: 'operator' }, { index: 50, value: 'DP', type: 'key' }, { index: 54, value: '2021-21-17', type: 'value' }, { index: 66, value: 'OR', type: 'operator' }, { index: 69, value: 'URL', type: 'key' }, { index: 74, value: '*.com', type: 'value' }]}
    ${'(TI="Kaspersky OR AB="Avast"") TRANDS NOT (DP="2021-21-17" ORbit URL="*.com")'}             | ${[{ index: 1, value: 'TI', type: 'key' }, { index: 5, value: 'Kaspersky OR AB=', type: 'value' }, { index: 38, value: 'NOT', type: 'operator' }, { index: 43, value: 'DP', type: 'key' }, { index: 47, value: '2021-21-17', type: 'value' }, { index: 65, value: 'URL', type: 'key' }, { index: 70, value: '*.com', type: 'value' }]}
    ${'(TI="Kaspersky= \\"escaped AND \\"" OR AB="Avast") NOT (DP="2021-21-17" OR URL="*.com")\\'} | ${[{ index: 1, value: 'TI', type: 'key' }, { index: 5, value: 'Kaspersky= \\"escaped AND \\"', type: 'value' }, { index: 34, value: 'OR', type: 'operator' }, { index: 37, value: 'AB', type: 'key' }, { index: 41, value: 'Avast', type: 'value' }, { index: 49, value: 'NOT', type: 'operator' }, { index: 54, value: 'DP', type: 'key' }, { index: 58, value: '2021-21-17', type: 'value' }, { index: 70, value: 'OR', type: 'operator' }, { index: 73, value: 'URL', type: 'key' }, { index: 78, value: '*.com', type: 'value' }]}
  `('parseTextareaInput($input) should return $result', ({ input, result }) => {
    const parsed = parseTextareaInput(input);

    expect(parsed).toEqual(result);
  });
});
