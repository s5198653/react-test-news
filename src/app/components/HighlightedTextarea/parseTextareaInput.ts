interface Result {
  keys: Set<string>;
  values: Set<string>;
  operators: Set<'OR' | 'AND' | 'NOT'>;
}

export const parseTextareaInput = (text: string): Result => {
  const keys = new Set<string>();
  const values = new Set<string>();
  const operators = new Set<string>();

  const keyRegex = /^[a-zA-Z]+=/; // 'TI=”Kaspersky=” OR AB=”Avast” OR dp=”Avast” OR d=”Avast” '-> TI=, AB=, dp=, d=
  const operatorRegex = /^\b(OR|AND|NOT)\b/i; // 'OR' || 'AND' || 'NOT' || 'or' || 'and' || 'not'

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
      const key = keyMatch[0].slice(0, -1); //cut off equals sign
      keys.add(key.toUpperCase());
      index += keyMatch[0].length;

      if (text[index] === '"') {
        index++;
        let value = '';
        let escaped = false;
        let closed = false;

        while (index < len) {
          const char = text[index];
          if (escaped) {
            value += char;
            escaped = false;
          } else if (char === '\\') {
            escaped = true;
          } else if (char === '"') {
            closed = true;
            index++;
            break;
          } else {
            value += char;
          }
          index++;
        }
        if (closed) {
          values.add(value);
        }
      } else {
        while (
          index < len &&
          !/\s/.test(text[index]) &&
          !text.slice(index).match(operatorRegex)
        ) {
          index++;
        }
      }
      continue;
    }

    const operatorMatch = rest.match(operatorRegex);
    if (operatorMatch) {
      operators.add(operatorMatch[0].toUpperCase());
      index += operatorMatch[0].length;
      continue;
    }

    index++;
  }

  return { keys, values, operators: operators as Set<'OR' | 'AND' | 'NOT'> };
};
