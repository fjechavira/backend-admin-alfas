// Requirements
var express = require('express');
const pool = require('../database/connect');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Inicializar variables e instancias
var app = express();
var SEED = require('../config/config').SEED;

// Funcion Post para crear un nuevo usuario
app.post('/',(req, res) => {

    var body = req.body;

    var usuario = { usuario: body['usuario'], correo: body['correo'], password: body['password'], activo: true }
    
    // Realizo la conexion a la base de datos
    pool.connect((err, client) => {

        // Valido si la conexion fue establecida
        if(err) {
            return res.status(500).json({
                exitoso: false,
                mensaje: 'Error al realizar la conexion con la bd',
                error: err.stack
            });
        }
        
        // Si la conexion fue exitosa
        var query = 'insert into usuario(idusuario, correo, password, activo) VALUES($1, $2, $3, $4)';
        var values = [usuario.usuario, usuario.correo, bcrypt.hashSync(usuario.password,10), usuario.activo];

        // Realizo la ejecucion del query
        client.query(query, values, (err, result) => {
            if(err) {
                return res.status(500).json({
                    exitoso: false,
                    mensaje: 'Error al realizar alta de la data en bd',
                    error: err.stack
                });
            }

            res.status(200).json({
                exitoso: true,
                mensaje: 'Operacion alta usuario exitosa'
            });


        });

    });
    
});


// Funcion para la autenticacion del usuario
app.get('/login',(req, res) => {

    var body = req.body;

    var usuario = { usuario: body['usuario'], password: body['password'] }

    // Realizo la conexion a la base de datos
    pool.connect((err, client) => {

        // Valido si la conexion fue establecida
        if(err) {
            return res.status(500).json({
                exitoso: false,
                mensaje: 'Error al realizar la conexion con la bd',
                error: err.stack
            });
        }
        
        // Si la conexion fue exitosa
        var query = 'select * from usuario where idusuario = $1 or correo = $2';
        var values = [usuario.usuario, bcrypt.hashSync(usuario.password,10)];

        // Realizo la ejecucion del query
        client.query(query, values, (err, result) => {
            
            if(err) {
                return res.status(500).json({
                    exitoso: false,
                    mensaje: 'Error al realizar buscar los datos del usuario',
                    error: err.stack
                });
            }

            // Si no se encontraron resultados de le ejecucion del query
            if (!result.rows[0]) {
                return res.status(400).json({
                    exitoso: false,
                    mensaje: 'Credenciales Invalidas',
                    error: 'El Usuario o el Correo son Incorrectos'
                });
            }

            // Valido que el Password que ingreso el usuario y el obtenido de la bd sean iguales
            if (!bcrypt.compareSync(body.password, result.rows[0]['password'])) {
                return res.status(400).json({
                    exitoso: false,
                    mensaje: 'Credenciales Invalidas',
                    error: 'El Password es Incorrecto'
                });
            
            }

            // El login fue correcto genero el token de la sesion y lo devuelvo
            var token = jwt.sign({ usuario: result.rows[0] }, SEED, { expiresIn: 14400 }); //el token expira en 4 horas

            var data_usuario = { idusuario: result.rows[0]['idusuario'], correo: result.rows[0]['correo'], token: token }

            // Envio la informacion Obtenida y el Token generado
            res.status(200).json({
                exitoso: true,
                data: data_usuario
            });

        });

    });


});

// Exportacion para poder utilizar la ruta fuera de este archivo
module.exports = app;