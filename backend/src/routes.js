const express = require("express");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post('/sessions', SessionController.create); //Rota de criação de sessão

routes.get('/ongs', OngController.index); //Rota de listagem de todas as ONGS
routes.post('/ongs', OngController.create); //Rota de criação de ONGs

routes.get('/incidents', IncidentController.index); //Rota de listagem de casos
routes.post('/incidents', IncidentController.create); //Rota de criação de casos
routes.delete('/incidents/:id', IncidentController.delete); //Rota de exclusão de casos

routes.get('/profile', ProfileController.index);



module.exports = routes;
