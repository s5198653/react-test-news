import type { IData_SnippetNews } from '@/app/types/data';

export const formatCountry = (CNTR: IData_SnippetNews['CNTR']) => {
  if (!CNTR) return CNTR;

  const words = CNTR.trim().split(/\s+/);

  if (words.length <= 1) {
    return CNTR;
  } else {
    const filtered = words.filter((word) => /^[A-Z]/.test(word.charAt(0)));
    return filtered.map((word) => word.charAt(0)).join('');
  }
};
