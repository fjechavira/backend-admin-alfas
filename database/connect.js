// Requirements
const { Pool } = require('pg');
const Config = require('../config/config');

// Inicializacion de la instancia
const pool = new Pool({
  user: Config.user,
  host: Config.host,
  database: Config.database,
  password: Config.password,
  port: Config.port
});

// Exporto la variable con los parametros de conexion para uso de la misma
module.exports = pool;