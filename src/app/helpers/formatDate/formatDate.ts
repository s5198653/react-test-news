import type { IData_SnippetNews } from '@/app/types/data';

export const formatDate = (DP: IData_SnippetNews['DP']) => {
  const date = new Date(DP);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDateEn = date
    .toLocaleDateString('en-US', options)
    .replace(',', '')
    .split(' ');
  const [month, day, year] = formattedDateEn;
  return [day, month, year];
};
