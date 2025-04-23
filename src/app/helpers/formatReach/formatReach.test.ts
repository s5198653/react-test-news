import { describe, it, expect } from 'vitest';
import { formatReach } from './formatReach';

describe('formatReach', () => {
  it('should return the number as is if REACH is less than 1000', () => {
    expect(formatReach(0)).toBe(0);
    expect(formatReach(500)).toBe(500);
    expect(formatReach(999)).toBe(999);
  });

  it('should return a string with "K" suffix if REACH is equal to or greater than 1000', () => {
    expect(formatReach(1000)).toBe('1K');
    expect(formatReach(1500)).toBe('2K');
    expect(formatReach(1001)).toBe('1K');
    expect(formatReach(25000)).toBe('25K');
    expect(formatReach(9999)).toBe('10K');
  });

  it('should correctly handle float numbers', () => {
    expect(formatReach(1234.56)).toBe('1K');
  });

  it('should correctly handle boundary values', () => {
    expect(formatReach(999.99)).toBe(999.99);
    expect(formatReach(1000)).toBe('1K');
  });
});
