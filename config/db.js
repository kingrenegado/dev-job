const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const db = process.env.DATABASE

mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on('error', (error) => {
    console.log('Error');
})

//importar modelos
require('../models/Vacantes');
require('../models/Usuarios');