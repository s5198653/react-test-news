interface Item {
  index: number;
  value: string;
  type: 'key' | 'value' | 'operator';
}

export const parseTextareaInput = (text: string): Item[] => {
  const keyRegex = /^[a-zA-Z]+=/; // 'TI=”Kaspersky=” OR AB=”Avast” OR dp=”Avast” OR d=”Avast” '-> TI=, AB=, dp=, d=
  const operatorRegex = /^\b(OR|AND|NOT)\b/i; // 'OR' || 'AND' || 'NOT' || 'or' || 'and' || 'not'

  const result: Item[] = [];
  let index = 0;
  const len = text.length;

  while (index < len) {
    // Skip whitespaces
    if (/\s/.test(text[index])) {
      index++;
      continue;
    }

    const rest = text.slice(index);
    const keyMatch = rest.match(keyRegex);
    if (keyMatch) {
      const keyStart = index;
      const keyRaw = keyMatch[0];
      const key = keyRaw.slice(0, -1).toUpperCase(); //cut off equals sign
      index += keyRaw.length;

      result.push({
        index: keyStart,
        value: key,
        type: 'key',
      });

      let value = '';
      let valueStart = -1;

      if (index < len && text[index] === '"') {
        index++;
        valueStart = index;
        let escaped = false;
        while (index < len) {
          const char = text[index];
          if (escaped) {
            value += text[index - 1] + char;
            escaped = false;
          } else if (char === '\\') {
            escaped = true;
          } else if (char === '"') {
            index++;
            break;
          } else {
            value += char;
          }
          index++;
        }
      } else {
        valueStart = index;
        while (
          index < len &&
          !/\s/.test(text[index]) &&
          !operatorRegex.test(text.slice(index))
        ) {
          value += text[index];
          index++;
        }
      }

      if (value) {
        result.push({
          index: valueStart,
          value,
          type: 'value',
        });
      }

      continue;
    }

    const operatorMatch = rest.match(operatorRegex);
    if (operatorMatch) {
      const opStart = index;
      const op = operatorMatch[0].toUpperCase();
      result.push({
        index: opStart,
        value: op,
        type: 'operator',
      });
      index += operatorMatch[0].length;
      continue;
    }

    index++;
  }

  return result;
};
