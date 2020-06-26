// Requirements
var express = require('express');

// Inicializar e instanciar variables
var app = new express();

app.post('/procesar', (req, res) => {

    var body = req.body;

    if(Object.keys(body).length > 0) {
        console.log(`Pedido recibido exitosamente: ${body}`);
        return res.status(200).json(
            { 
                exitoso: true, 
                mensaje: 'Pedido procesado correctamente'
            }
        );
    }
    else {
        return res.status(500).json({
            exitoso: false,
            mensaje: 'Error no se recibieron datos del pedido',
        }); 
    }



});


// Exportacion para poder utilizar la ruta fuera de este archivo
module.exports = app;