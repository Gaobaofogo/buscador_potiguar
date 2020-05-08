create database meu_projeto_test;
use meu_projeto_test;

CREATE TABLE page (
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL,
  body LONGTEXT NOT NULL,
  PRIMARY KEY (id)
) CHARACTER SET utf8mb4;