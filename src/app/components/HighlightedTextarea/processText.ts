import { parseTextareaInput } from './parseTextareaInput';

export const processTextToken = (
  token: string,
  type: 'key' | 'value' | 'operator'
): string => {
  return `<span class="${type}">${token}</span>`;
};

export const processText = (text: string): string => {
  const parsedText = parseTextareaInput(text);

  const sortedItems = Object.values(parsedText).sort(
    (a, b) => a.index - b.index
  );

  let result = '';
  let cursor = 0;

  for (const { index, value, type } of sortedItems) {
    if (cursor < index) {
      result += text.slice(cursor, index);
    }

    const processed = processTextToken(value, type);

    result += processed;
    cursor = index + value.length;
  }

  if (cursor < text.length) {
    result += text.slice(cursor);
  }

  return result;
};
