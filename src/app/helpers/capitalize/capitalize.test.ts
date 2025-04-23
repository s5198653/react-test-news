import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('преобразует первую букву строчного слова в заглавную', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('не изменяет первую букву, если она уже заглавная', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('возвращает пустую строку, если входная строка пустая', () => {
    expect(capitalize('')).toBe('');
  });

  it('корректно обрабатывает строки из одного символа', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('не изменяет остальные символы строки', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });
});
