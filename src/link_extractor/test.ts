const expect = require('chai').expect;
import { extractAllLinks } from './extractor';


describe('Link Extractor', () => {
  it('extract links from html', () => {
    const html = '<!DOCTYPE html><html><body><a href="www.site.com">Link1</a><a href="www.anothersite.com">Link2</a></body></html>';

    expect(extractAllLinks(html)).to.have.lengthOf(2);
  })
})