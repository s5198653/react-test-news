import { describe, it, expect } from 'vitest';
import { formatReach } from './formatReach';

describe('formatReach', () => {
  it('должен вернуть число как есть, если REACH меньше 1000', () => {
    expect(formatReach(0)).toBe(0);
    expect(formatReach(500)).toBe(500);
    expect(formatReach(999)).toBe(999);
  });

  it('должен вернуть строку с суффиксом "K", если REACH равен или больше 1000', () => {
    expect(formatReach(1000)).toBe('1K');
    expect(formatReach(1500)).toBe('2K');
    expect(formatReach(1001)).toBe('1K');
    expect(formatReach(25000)).toBe('25K');
    expect(formatReach(9999)).toBe('10K');
  });

  it('должен корректно работать с числом типа float', () => {
    expect(formatReach(1234.56)).toBe('1K');
  });

  it('должен корректно работать с граничными значениями', () => {
    expect(formatReach(999.99)).toBe(999.99);
    expect(formatReach(1000)).toBe('1K');
  });
});
