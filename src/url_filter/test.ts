const expect = require('chai').expect;
import { filterValidLinks } from './url_filter';

describe('URL Filter', () => {
  it('filter valid urls', () => {
    const valid_links = [
      'http://www.dominio.com',
      'https://www.dominio.com',
      'www.dominio.com',
      'subdominio.dominio.com',
      'www.dominio.com.br',
      'www.dominio.com/recurso',
      'www.dominio.com/recurso-macro/recurso-especificado'
    ];

    const filtered_links = filterValidLinks(valid_links);

    expect(filtered_links).to.have.lengthOf(valid_links.length);
  });

  it('filter invalid links', () => {
    const invalid_links = [
      'dominio',
      '/recurso',
      '/recurso-macro/recurso-especificado',
      'recurso/',
      'dominio-subdominio',
      'www.domi$*&@@.com'
    ];

    const filtered_links = filterValidLinks(invalid_links);

    expect(filtered_links).to.have.lengthOf(0);
  });
});