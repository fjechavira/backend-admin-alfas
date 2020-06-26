// Requirements
var express = require('express');

// Inicializar variables
var app = express();

// Ruta Base 
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// Exportacion para poder utilizar la ruta fuera de este archivo
module.exports = app;