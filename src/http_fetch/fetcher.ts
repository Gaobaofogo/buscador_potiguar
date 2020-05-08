import fetch, { Response } from 'node-fetch';

async function getPage(url: string): Promise<string>{
  const rawData: Response = await fetch(url, {timeout: 5000});
  const htmlData: string  = await rawData.text();

  return htmlData;
}

export {
  getPage
};