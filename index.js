// Requirements
var express = require('express');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var mercadopagoRoutes = require('./routes/mercadopago');
var usuarioRoutes = require('./routes/usuario');

// Rutas
app.use('/mercadopago', mercadopagoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'Online')
});