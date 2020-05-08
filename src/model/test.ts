import chai from 'chai';
import PageDB from './page_db';
import { pipeline } from '../worker/pipeline';

const expect = chai.expect;


describe('Testing DB', () => {
  const page_db = new PageDB('meu_projeto_test');

  after(() => {
    page_db.getConnection().end();
  });

  it('Insertion on database', () => {
    expect(() => {
        page_db.insertPage('http://www.dominio.com', '<h1>Sou uma página web</h1>');
        page_db.insertPage('http://www.dominio.com', '<h1>Sou uma página web</h1>');
      }).to.not.throw();
  });

  it('Inserting a real web page', () => {
    pipeline('https://www.google.com').then((pipeline_object) => {
      const page_db = new PageDB('meu_projeto_test');
      page_db.insertPage('https://www.google.com', pipeline_object.page_text);
    });
  });
});