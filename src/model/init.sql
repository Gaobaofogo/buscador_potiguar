/* 
Encontrei um erro ao tentar salvar alguns caracteres especiais no banco de dados e
por isso troquei o tipo de caracteres para suportar utf-8 com 4 bytes já que aparentemente
o default do mysql é armazenar utf-8 de 3 bytes. (WTF????)

- https://stackoverflow.com/questions/10957238/incorrect-string-value-when-trying-to-insert-utf-8-into-mysql-via-jdbc
- https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html
*/

create database meu_projeto;
use meu_projeto;

CREATE TABLE page (
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL,
  body LONGTEXT NOT NULL,
  PRIMARY KEY (id)
) CHARACTER SET utf8mb4;