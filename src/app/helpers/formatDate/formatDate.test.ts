import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should correctly format date into [day, month, year]', () => {
    const result = formatDate('2025-01-01T00:00:00Z');

    expect(result).toEqual(['01', 'January', '2025']);
  });

  it('should correctly format date with two-digit day', () => {
    const result = formatDate('2025-12-31T00:00:00Z');

    expect(result).toEqual(['31', 'December', '2025']);
  });

  it('should correctly handle Date object input', () => {
    const inputDate = new Date('2025-05-15T00:00:00Z');

    const result = formatDate(inputDate.toISOString());

    expect(result).toEqual(['15', 'May', '2025']);
  });
});
