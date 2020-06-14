const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const agendaController = require('./src/controllers/agendaController');
const contactController = require('./src/controllers/contactController');

//Middleware de sessão contato
const { loginRequiredMiddleware } = require('./src/middlewares/middleware');


//Rotas de Login
route.get('/', (req, res) => {
    res.redirect('/login/index');
});
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.post('/login/edit/:id', loginRequiredMiddleware, loginController.edit);
route.get('/login/reset', loginRequiredMiddleware, loginController.reset);
route.get('/login/logout', loginController.logout);

// Rotas da home
route.get('/home', loginRequiredMiddleware, homeController.index);
//route.post('/home', homeController.index);

// Rotas Agenda
route.get('/agenda', loginRequiredMiddleware, agendaController.index);
route.get('/agenda/:id', loginRequiredMiddleware, contactController.editIndex);
route.get('/agenda/delete/:id', loginRequiredMiddleware, contactController.delete);

//Rotas Contato
route.get('/contact', loginRequiredMiddleware, contactController.index);
route.post('/contact/register', loginRequiredMiddleware, contactController.register);
route.get('/contact/:id', loginRequiredMiddleware, contactController.editIndex);
route.post('/contact/edit/:id', loginRequiredMiddleware, contactController.edit);

module.exports = route;