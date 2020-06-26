// Requirements
var express = require('express');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Configuration Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
    next();
  });

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var mercadopagoRoutes = require('./routes/mercadopago');
var usuarioRoutes = require('./routes/usuario');
var pedidoRoutes = require('./routes/pedido');

// Rutas
app.use('/mercadopago', mercadopagoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'Online')
});