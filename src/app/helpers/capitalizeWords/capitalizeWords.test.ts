import { describe, it, expect } from 'vitest';
import { capitalizeWords } from '@/app/helpers/capitalizeWords/capitalizeWords';

describe('capitalizeWords', () => {
  it('should capitalize each word in the string', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('should return an empty string when input is empty', () => {
    expect(capitalizeWords('')).toBe('');
  });

  it('should capitalize a single word', () => {
    expect(capitalizeWords('test')).toBe('Test');
  });

  it('should preserve multiple spaces between words', () => {
    expect(capitalizeWords('multiple   spaces')).toBe('Multiple   Spaces');
  });

  it('should handle words with mixed casing correctly', () => {
    expect(capitalizeWords('hElLo wOrLd')).toBe('Hello World');
  });

  it('should handle punctuation correctly', () => {
    expect(capitalizeWords('hello, world!')).toBe('Hello, World!');
  });
});
