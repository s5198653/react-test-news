import { describe, it, expect } from 'vitest';
import { formatCountry } from './formatCountry';

describe('formatCountry', () => {
  it('должен вернуть исходное значение, если CNTR пустое', () => {
    expect(formatCountry('')).toBe('');
  });

  it('должен вернуть исходное значение, если CNTR содержит одно слово', () => {
    expect(formatCountry('Russia')).toBe('Russia');
    expect(formatCountry('usa')).toBe('usa');
  });

  it('должен вернуть конкатенацию первых букв слов, начинающихся с заглавной буквы', () => {
    expect(formatCountry('United States of America')).toBe('USA');
    expect(formatCountry('South Africa')).toBe('SA');
    expect(formatCountry('New Zealand')).toBe('NZ');
    expect(formatCountry('United Kingdom')).toBe('UK');
  });

  it('должен корректно обрабатывать строки с лишними пробелами', () => {
    expect(formatCountry('  United   States   of  America  ')).toBe('USA');
  });

  it('должен вернуть пустую строку, если нет слов с заглавной буквы', () => {
    expect(formatCountry('of the and')).toBe('');
    expect(formatCountry('lowercase words only')).toBe('');
  });
});
