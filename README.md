# Sistema de Leilão Web
Desafio Fullstack para processo seletivo na TOTVS

- Link do desafio
- https://gist.github.com/filipenonato/0183c086bc147f6322095572ff7ff403


## Teste
- Rodando em servidor Heroku com banco de dados gratuito PostgreSQL
- Link acesso "https://totvs-desafio-fullstack.herokuapp.com/"


## Backend - NodeJS

*1* - Instalar dependencias
```shell
npm install
```

*2* - Configurar variaveis de ambiente
```env
DATABASE_URL = Alguma URL de banco de dados SQL

JWT_PASSWORD = Senha para gerar o token JWT

PORT = Porta 
```

*3* - Executar as migrations
- Utilizei knexjs para comunicação com o banco para facilitar a mudança de um banco para outro se necessário.
```
npx knex migrate:latest
```

*4* - Executar o backend
```
npm start
```


------
## Frontend - React

*1* - Instalar dependencias
```shell
yarn
```

*2* - Substituir o URL da rota da api
- Está em 
```
TOTVS_Auction_System -> frontend -> src -> services -> api.js -> 8
```

*3* - Executar o projeto
```
npm start
```

