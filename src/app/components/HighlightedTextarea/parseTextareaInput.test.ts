import { describe, it, expect } from 'vitest';
import { parseTextareaInput } from './parseTextareaInput';

describe('parseTextareaInput', () => {
  it.each`
    input                                                                                          | resultKeys                                   | resultValues                                                            | resultOperators
    ${'(TI="Kaspersky" OR A="Avast") AND NOT (DP="2021-21-17" OR URL="*.com")'}                    | ${new Set(['TI', 'A', 'DP', 'URL'])}         | ${new Set(['Kaspersky', 'Avast', '2021-21-17', '*.com'])}               | ${new Set(['OR', 'AND', 'NOT'])}
    ${'(ti="Kaspersky" or Ab="Avast") AND nOt (DP="2021-21-17" OR URL="*.com)'}                    | ${new Set(['TI', 'AB', 'DP', 'URL'])}        | ${new Set(['Kaspersky', 'Avast', '2021-21-17'])}                        | ${new Set(['OR', 'AND', 'NOT'])}
    ${'(TI="Kaspersky= RRT= NOT and" OR AB="Avast") AND (DP="2021-21-17" OR URL="*.com")'}         | ${new Set(['TI', 'AB', 'DP', 'URL'])}        | ${new Set(['Kaspersky= RRT= NOT and', 'Avast', '2021-21-17', '*.com'])} | ${new Set(['OR', 'AND'])}
    ${'(TI="Kaspersky OR AB="Avast"") TRANDS NOT (DP="2021-21-17" ORbit URL="*.com")'}             | ${new Set(['TI', 'DP', 'URL'])}              | ${new Set(['Kaspersky OR AB=', '2021-21-17', '*.com'])}                 | ${new Set(['NOT'])}
    ${'(TI="Kaspersky= \\"escaped\\"" OR AB="Avast") AND= NOT (DP="2021-21-17" OR URL="*.com")\\'} | ${new Set(['TI', 'AB', 'AND', 'DP', 'URL'])} | ${new Set(['Kaspersky= "escaped"', 'Avast', '2021-21-17', '*.com'])}    | ${new Set(['OR', 'NOT'])}
  `(
    'parseTextareaInput($input) should return {keys: $resultKeys, values: $resultValues, operators: $resultOperators}',
    ({ input, resultKeys, resultValues, resultOperators }) => {
      expect(parseTextareaInput(input)).toEqual({
        keys: resultKeys,
        values: resultValues,
        operators: resultOperators,
      });
    }
  );
});
