import { describe, it, expect } from 'vitest';
import { formatCountry } from './formatCountry';

describe('formatCountry', () => {
  it('should return the original value if CNTR is empty', () => {
    expect(formatCountry('')).toBe('');
  });

  it('should return the original value if CNTR contains a single word', () => {
    expect(formatCountry('Russia')).toBe('Russia');
    expect(formatCountry('usa')).toBe('usa');
  });

  it('should return the concatenation of the first letters of words starting with uppercase letters', () => {
    expect(formatCountry('United States of America')).toBe('USA');
    expect(formatCountry('South Africa')).toBe('SA');
    expect(formatCountry('New Zealand')).toBe('NZ');
    expect(formatCountry('United Kingdom')).toBe('UK');
  });

  it('should correctly handle strings with extra spaces', () => {
    expect(formatCountry('  United   States   of  America  ')).toBe('USA');
  });

  it('should return an empty string if there are no words starting with uppercase letters', () => {
    expect(formatCountry('of the and')).toBe('');
    expect(formatCountry('lowercase words only')).toBe('');
  });
});
