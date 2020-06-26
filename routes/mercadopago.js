// Requirements
var express = require('express');
var mercadopago = require('mercadopago');

// Inicializar variables e instancias
var app = express();

// Funcion Get Mercado para para obtener el link de pago 
app.get('/:access_token', (req, res) => {

    var token = req.params.access_token;
    var body = req.body;

    if(token != null && token != '' && JSON.stringify(body) != '{}') {
        mercadopago.configure({
            access_token: token
        });
    
        var item = {
            title: body['title'],
            quantity: Number(body['quantity']),
            currency_id: body['currency'],
            unit_price: Number(body['total'])
        }
    
        var payer = {
            email: body['email']
        }
    
        var preference = { items: [item], payer: payer }
    
        mercadopago.preferences.create(preference)
            .then(
                (mercadopagoresponse) => {
                    return res.status(200).json({
                        exitoso: true,
                        data: mercadopagoresponse['body']['init_point']
                    });
    
                })
            .catch(
                (error) => {
                    return res.status(403).json({
                        exitoso: false,
                        data: error.toString()
                    });
                });

    } else {
        return res.status(403).json({
            exitoso: false,
            data: 'No se recibieron los parametros requeridos, intentar nuevamente'
        });
    }

                
});

// Exportacion para poder utilizar la ruta fuera de este archivo
module.exports = app;