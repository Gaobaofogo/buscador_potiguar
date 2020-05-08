import { JSDOM } from 'jsdom';


function extractAllLinks(htmlString: string) {
  const dom = new JSDOM(htmlString);
  const domLinks = dom.window.document.querySelectorAll('a');

  let links: string[] = new Array(domLinks.length);

  for (let i = 0; i < domLinks.length; ++i) {
    links[i] = domLinks[i].href;
  }

  return links;
}


export {
  extractAllLinks
};