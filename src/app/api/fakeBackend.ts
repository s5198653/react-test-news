import { news } from '@/app/api/data';

enum ResponseType {
  SUCCESSFUL_RESPONSE = 'successfulResponse',
  UNSUCCESSFUL_RESPONSE = 'unsuccessfulResponse',
}

export async function getNews(): Promise<{
  ok: boolean;
  data?: typeof news;
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
