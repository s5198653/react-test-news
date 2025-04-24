import { capitalize } from '@/app/helpers/capitalize/capitalize';

export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};
