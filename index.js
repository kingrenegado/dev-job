const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');


require('dotenv').config({path: 'variables.env'})

const port = process.env.PUERTO;
const app = express();

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//habilitar handlebars
app.engine('handlebars',
    exphbs({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
)
app.set('view engine', 'handlebars');

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

app.use('/', router())

app.listen(port);
console.log('Escuchando en el puerto ' + port)