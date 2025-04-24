import { news } from '@/app/api/data';
import { IData_SnippetNews } from '@/app/types/data';
import { delay } from '@/app/helpers/delay';

export async function getNewsById(newsId: number): Promise<{
  ok: boolean;
  data: IData_SnippetNews;
}> {
  await delay(500);
  const data = news.find(({ ID }) => ID === newsId);

  if (!data) {
    throw new Error(`News with ID ${newsId} not found`);
  }

  const response = {
    ok: true,
    data,
  };
  return Promise.resolve(response);
}
