const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate')
const routes = require('./routes');

const app = express();

app.use(cors());
/*
Funcionamento correto ao fazer deploy:
app.use(cors({
  origin: 'http://meufrontend.com'
}));
*/
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;


/*
ANOTAÇÕES:

iniciar servidor -> npm start
BD -> SQLite

Métodos em Node

GET: busca no back
POST: criar uma infos no back
PUT: altera info no back
DELETE: deleta uma info no back

Parametros:
Query params: parametros nomeados enviados na rota/url após "?"
Route params: parametros para identificar recursos
Request body: corpo da requisição

Driver: SELECT * FROM users...
Query Builder: table('users').select('*').where()
|-> Knex
*/