import { news } from '@/app/api/data';
import { IData_SnippetNews } from '@/app/types/data';
import { delay } from '@/app/helpers/delay';

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

  if (randomIndex % 5 === 0) {
    return Promise.reject(getResponse(ResponseType.UNSUCCESSFUL_RESPONSE));
  } else {
    return Promise.resolve(getResponse(ResponseType.SUCCESSFUL_RESPONSE));
  }
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
