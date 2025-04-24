import { news, duplicatedNews } from '@/app/api/data';
import {
  Sorting,
  IData_DuplicateNews,
  IData_SnippetNews,
} from '@/app/types/data';

enum ResponseType {
  SUCCESSFUL_RESPONSE = 'successfulResponse',
  UNSUCCESSFUL_RESPONSE = 'unsuccessfulResponse',
}

export async function getNews(): Promise<{
  ok: boolean;
  data?: IData_SnippetNews[];
  error?: string;
}> {
  await delay(500);
  const randomIndex = Math.floor(Math.random() * 5);

  if (randomIndex % 3 === 0) {
    return Promise.reject(getResponse(ResponseType.UNSUCCESSFUL_RESPONSE));
  } else {
    return Promise.resolve(getResponse(ResponseType.SUCCESSFUL_RESPONSE));
  }
}

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getResponse(type: ResponseType) {
  const response = {
    successfulResponse: { ok: true, data: news },
    unsuccessfulResponse: {
      ok: false,
      error: 'Internal Server Error: Unable to process the request.',
    },
  };
  return response[type];
}
