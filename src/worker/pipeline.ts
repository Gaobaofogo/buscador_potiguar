import { getPage } from '../http_fetch/fetcher';
import { extractAllLinks } from '../link_extractor/extractor';
import { filterValidLinks } from '../url_filter/url_filter';

interface PipelineObject {
  valid_links: string[],
  page_text: string
}

/** Realizará a tarefa ge requisitar a página e extrair todos os links validos */
async function pipeline(url: string): Promise<PipelineObject> {
  try {
    console.log(`Requisiting ${url}`);

    const page_text_promise: Promise<string> = getPage(url);
    const page_text: string = await page_text_promise;
    const links: string[] = extractAllLinks(page_text);
    const valid_links: string[] = filterValidLinks(links);

    return { valid_links, page_text };
  } catch(error) {
    // Não sei ainda como tratar esse erro
    return { valid_links: [], page_text: '' };
  }
}

export {
  pipeline,
  PipelineObject
}