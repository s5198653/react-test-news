import { duplicatedNews } from '@/app/api/data';
import { Sorting, IData_DuplicateNews } from '@/app/types/data';
import { delay } from '@/app/helpers/delay';

const sortDuplicatedNews = (
  news: IData_DuplicateNews[],
  sorting: Sorting
): IData_DuplicateNews[] => {
  switch (sorting) {
    case Sorting.BY_DATE: {
      return news.toSorted(
        (a, b) => new Date(a.DP).getTime() - new Date(b.DP).getTime()
      );
    }
    case Sorting.BY_RELEVANCE: {
      return news.toSorted(
        (a, b) =>
          new Date(a.RELEVANCE).getTime() - new Date(b.RELEVANCE).getTime()
      );
    }
  }
};

export async function getDuplicatesNews(
  newsId: number,
  sorting: Sorting
): Promise<{
  ok: boolean;
  data: IData_DuplicateNews[];
}> {
  await delay(500);
  const filtered = duplicatedNews.filter(
    ({ ORIGINAL_ID }) => newsId === ORIGINAL_ID
  );
  const data = sortDuplicatedNews(filtered, sorting);

  const response = {
    ok: true,
    data,
  };
  return Promise.resolve(response);
}
