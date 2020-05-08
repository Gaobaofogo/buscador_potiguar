/*
HTML puro não consegue ser salvo no banco de dados. É necessário
retirar os caracteres especiais para poder salvar como texto puro
no banco. A biblioteca html-entities faz justamente esse trabalho
de pegar os caracteres especiais e converter para texto e vice-versa.

- https://stackoverflow.com/a/31264728

Alguns caracteres especiais não estavam conseguindo ser inseridos mesmo com
alteração do tipo de caracter salvo no banco. O jeito foi retirar esses caracteres
especiais do texto.

- https://stackoverflow.com/a/31699900
*/

import mysql from 'mysql';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


class PageDB {
  private host: string;
  private user: string;
  private password: string;
  private database: string;
  private table: string;
  private connection: mysql.Connection;

  constructor(database: string = 'meu_projeto', host: string = 'localhost', user: string = 'root', password: string = 'senha') {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.table = 'page';
    this.connection = mysql.createConnection({
      host     : this.host,
      user     : this.user,
      password : this.password,
      database : this.database
    });
  }

  getConnection(): mysql.Connection {
    return this.connection;
  }

  searchPage(text: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT url FROM page WHERE body LIKE '%${text}%'`, (err, results, field) => {
        const response: string[] = results.map((result: any) => {
          return result.url;
        });

        resolve(response);
      });
    });
  }

  insertPage(url: string, body: string): void {
    const body_encoded = entities.encode(body);
    const body_encoded_without_trucated_values = body_encoded.replace(/[\u0800-\uFFFF]/g, '');

    this.connection.query(`INSERT INTO ${this.table} (url, body) VALUES (?, ?);`, [url, body_encoded_without_trucated_values], (err, results, fields) => {
      if (err) {
        throw err;
      }

    });
    // this.connection.end();
  }
}

export default PageDB;