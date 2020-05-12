# Crawler Potiguar
### Um projeto para aprender como o google iniciou e virou um monstro de tecnologia nos dias atuais


Eu sempre fui curioso a respeito de como funcionava os buscadores da web e aproveitei o momento de quarentena para me focar
nessa tecnologia. Meu motivador de criar esse tutorial foi de procurar na web sobre como desenvolver buscadores mas o máximo
que encontrei foi ensinando como fazer um crawler muito básico.

Vou deixar o máximo de links e artigos que usei para estudar para disseminar o conhecimento.

## Tabela de conteúdos
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Premisas do software](#premisas-de-software)
* [Conceito e arquitetura](#conceito-e-arquitetura)

## Tecnologias utilizadas

O projeto é feito com:

* Node.js 13.x
* Typescript 3.x

## Premisas do software
Eu passei no mínimo 1 mês estudando e quebrando cabeça durante o desenvolvimento porque quis fazer o máximo por mim mesmo.
Talvez, esse projeto sairia em uma semana ou duas se eu tivesse usado coisas prontas como um servidor de mensageria
pronto(spoiler) como [RabbitMQ](https://www.rabbitmq.com/), biblioteca de socket pronta(mais spoiler) como 
[Socket.IO](https://socket.io/).

Para mim, foi muito mais proveitoso, a nível de aprendizado, utilizar as bibliotecas padrão do Node.js e quebrar a cabeça com
a arquitetura da coisa, estudar a documentação oficial do node e buscar links e artigos.

Esse projeto não serve como base fidedigna para um software profissional. Foi feito para aprendizado e somente isso.

Talvez alguém olhe o cógido e pense: "Mas como alguém passou um mês para escrever poucas linhas de código se for comparar com
outros projetos?". Então... todo problema que eu encontrava me custava pelo menos metade de um dia. Motivo? Inexperiência,
falta de conhecimento, chame como quiser. Fazer tudo na mão e usar Typescript foi um desafio enorme. Mexer com Regex também.
Depois de deixar tudo pronto, encontrei um erro gigantesco de arquitetura que inviabilizava o funcionamento e lá fui eu apagar
e reescrever o código do zero. Isso aconteceu pelo menos duas vezes. Foi um grande desafio. Estou feliz que consegui pegar um
assunto que não conhecia nada e aprendê-lo. Também espero que, assim como eu, algum outro doido interessado em construir
buscadores ache esse repositório e seja capaz de aprender um pouco com meu esforço. Aproveite :)

## Conceito e arquitetura

De acordo com o Wikipedia: *"Motor de pesquisa ou ferramenta de busca ou buscador (em inglês: search engine) é um programa
desenhado para procurar palavras-chave fornecidas pelo utilizador em documentos e bases de dados. No contexto da internet,
um motor de pesquisa permite procurar palavras-chave em documentos alojados na world wide web, como aqueles que se encontram
armazenados em websites"*.

Então, precisamos de um programa que seja capaz de olhar a web e responder ao usuário de acordo com o que ele pedir. Então
que tal quando o usuário escrever o que ele deseja, fizermos um [crawling](https://en.wikipedia.org/wiki/Web_crawler) pela
web e devolvermos a busca? De acordo com o site (Internet Live Stats)[https://www.internetlivestats.com/] no momento que este
README.md foi escrito tinha 1,770,213,201 sites na web. Esperar resposta da rede para um número tão grande de sites e
processar tanto texto parece inviável para um tempo de resposta curto normalmente exigido. Uma tarefa que ocupa bem menos
tempo e mesmo assim consegue varrer grandes volumes de dados é uma query de banco de dados. Se já houvesse uma base de dados
com os textos das páginas web num banco, seria moleza devolver uma resposta rápida ao usuário.
missão é passear na web, 
