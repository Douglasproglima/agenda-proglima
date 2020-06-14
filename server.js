//Gerenciamento as configurações da conexão com o bd para que a senha e user não fique exposta
require('dotenv').config();

/********************Express Framework********************/
const express = require('express');
const app = express();

/********************Variável para conectar ao BD********************/
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }) 
  .then(() => {
    app.emit('Great');
  })
  .catch(error => console.log(error));

//********************Session********************/
const session = require('express-session'); //Indentifica o navegador do cliente e salva um coockie
const MongoStore = require('connect-mongo')(session); //Sessões serão salvar na base de dados
const flash = require('connect-flash'); //Mensagens auto destrutivas - Lê e apaga
const routes = require('./routes'); //Define o diretório onde estão as rotas do app
const path = require('path'); //para trabalhar com caminhos

//********************SEGURANÇA HELMET********************/
const helmet = require('helmet'); //Deixa o app mais seguro, ele trabalha no cabelho da requisição
//********************SEGURANÇA CSURF********************/
const csurf = require('csurf'); //São tokens para os formulários, previne ataques de CSRF

//********************MIDDLEWARE********************/
const { middlewareGlobal, validateCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); //middleware: Funções executadas nas rotas (No meio das rotas)

app.use(helmet());

app.use(express.urlencoded({ extended: true })); //Possibilidade postar form's dentro do app
app.use(express.json()); //Possibilita o parse de JSON dentro do app
app.use(express.static(path.resolve(__dirname, 'public'))); //Define os arquivos estáticos do app. img, js, css


//********************Configuração da Session********************/
const sessionOptions = session({
  secret: 'asd32)()*(&¨¨¨:>>:?:^^LIOIOIPOHU*(*78787sdfsdf',
  store: new MongoStore({ mongooseConnection: mongoose.connection }), //Retorna uma promise
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //7 dias em milésimo de segundos
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); //Caminhos dos arquivos HTML
app.set('view engine', 'ejs'); //Define a engine que irá reinderizar o HTML, abaixo todas as engines
                              //https://expressjs.com/en/resources/template-engines.html

//********************Chamada dos Middlewares********************//
//Middlewares do CSURF
app.use(csurf());  //Configura o csrf

app.use(middlewareGlobal);

//********************Meus middlewares********************/

app.use(validateCsrfError); //Redireciona o erro para page 404
app.use(csrfMiddleware); //Insere o token em todas as páginas

//********************Chamada das Rotas********************//
app.use(routes);

//********************CONEXAO BD********************
//A conexão com o BD so ira ocorrer quando o app abaixo emitir o sinal definido no .then() do mongoose.connect()
app.on('Great', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});