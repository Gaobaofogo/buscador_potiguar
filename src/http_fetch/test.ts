const expect = require('chai').expect;
import { getPage } from './fetcher';

describe('HTTP Fetcher', () => {
  it('getting page', async () => {
    const page = await getPage('https://www.google.com/');

    expect(page).to.be.a('string');
  });
});