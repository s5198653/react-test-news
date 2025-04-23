import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('должен корректно форматировать дату в [day, month, year]', () => {
    const inputDate = '2025-01-01T00:00:00Z';
    const result = formatDate(inputDate);
    expect(result).toEqual(['01', 'January', '2025']);
  });

  it('должен корректно форматировать дату с двузначным днем', () => {
    const inputDate = '2025-12-31T00:00:00Z';
    const result = formatDate(inputDate);
    expect(result).toEqual(['31', 'December', '2025']);
  });

  it('должен корректно работать с объектом Date', () => {
    const inputDate = new Date('2025-05-15T00:00:00Z');
    const result = formatDate(inputDate.toISOString());
    expect(result).toEqual(['15', 'May', '2025']);
  });
});
