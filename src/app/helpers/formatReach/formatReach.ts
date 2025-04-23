import type { IData_SnippetNews } from '@/app/types/data';

export const formatReach = (REACH: IData_SnippetNews['REACH']) => {
  if (REACH >= 1000) {
    return (REACH / 1000).toFixed(0) + 'K';
  }
  return REACH;
};
